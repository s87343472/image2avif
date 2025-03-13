import { NextRequest } from 'next/server';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

// 支持的输出格式
const supportedOutputFormats = {
  'avif': { contentType: 'image/avif' },
  'jpeg': { contentType: 'image/jpeg' },
  'png': { contentType: 'image/png' },
  'webp': { contentType: 'image/webp' },
} as const;

type OutputFormat = keyof typeof supportedOutputFormats;

// 质量设置
const qualitySettings = {
  high: {
    quality: 90,
    effort: 9,
    chromaSubsampling: '4:4:4',
  },
  medium: {
    quality: 75,
    effort: 6,
    chromaSubsampling: '4:2:2',
  },
  low: {
    quality: 60,
    effort: 3,
    chromaSubsampling: '4:2:0',
  },
};

export async function POST(request: NextRequest) {
  try {
    // 获取文件和参数
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const quality = formData.get('quality') as keyof typeof qualitySettings | null;
    const outputFormat = formData.get('outputFormat') as OutputFormat | null;

    // 验证文件
    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    // 验证文件大小（4MB限制）
    if (file.size > 4 * 1024 * 1024) {
      return new Response('File size exceeds 4MB limit', { status: 400 });
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return new Response('Invalid file type. Only images are allowed', { status: 400 });
    }

    // 获取文件Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 创建Sharp实例
    let image = sharp(buffer);

    // 获取图像元数据
    const metadata = await image.metadata();
    if (!metadata) {
      return new Response('Invalid image file', { status: 400 });
    }

    // 获取质量设置
    const settings = quality ? qualitySettings[quality] : qualitySettings.high;

    // 根据输出格式进行转换
    const format = outputFormat || 'avif';
    if (!supportedOutputFormats[format]) {
      return new Response('Unsupported output format', { status: 400 });
    }

    switch (format) {
      case 'avif':
        image = image.avif({
          quality: settings.quality,
          effort: settings.effort,
          chromaSubsampling: settings.chromaSubsampling,
        });
        break;
      case 'jpeg':
        image = image.jpeg({
          quality: settings.quality,
          chromaSubsampling: settings.chromaSubsampling,
        });
        break;
      case 'png':
        image = image.png({
          quality: settings.quality,
        });
        break;
      case 'webp':
        image = image.webp({
          quality: settings.quality,
          effort: settings.effort,
        });
        break;
    }

    // 处理图像并获取输出buffer
    const outputBuffer = await image.toBuffer();

    // 设置响应头
    const headers = new Headers();
    headers.set('Content-Type', supportedOutputFormats[format].contentType);
    headers.set('Content-Disposition', `attachment; filename="converted.${format}"`);

    return new Response(outputBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return new Response('Image conversion failed', { status: 500 });
  }
} 