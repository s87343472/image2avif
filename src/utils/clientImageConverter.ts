// 客户端图像转换工具

/**
 * 使用Canvas API将图像转换为指定格式
 * @param file 要转换的图像文件
 * @param format 输出格式 ('avif', 'webp', 'jpeg', 'png')
 * @param quality 输出质量 (0-1)
 * @returns Promise<Blob> 转换后的图像Blob
 */
export async function convertImageInBrowser(
  file: File,
  format: 'avif' | 'webp' | 'jpeg' | 'png' = 'avif',
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // 创建文件读取器
    const reader = new FileReader();
    
    reader.onload = (event) => {
      // 创建图像对象
      const img = new Image();
      
      img.onload = () => {
        // 创建Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('无法创建Canvas上下文'));
          return;
        }
        
        // 设置Canvas尺寸
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 在Canvas上绘制图像
        ctx.drawImage(img, 0, 0);
        
        // 将Canvas转换为Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('图像转换失败'));
            }
          },
          `image/${format}`,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('图像加载失败'));
      };
      
      // 设置图像源
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    
    // 读取文件
    reader.readAsDataURL(file);
  });
}

/**
 * 获取文件大小的可读字符串
 * @param bytes 字节数
 * @returns 格式化的大小字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
} 