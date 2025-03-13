import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../i18n";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const lang = headersList.get('accept-language')?.split(',')[0].split('-')[0] || 'en';
  
  const metadata: Metadata = {
    metadataBase: new URL('https://image2avif.metric-converter.com'),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'zh': '/zh',
        'ja': '/ja',
        'fr': '/fr',
        'de': '/de',
        'ru': '/ru'
      }
    },
    openGraph: {
      type: 'website',
      locale: lang,
      alternateLocale: ['en', 'zh', 'ja', 'fr', 'de', 'ru'],
      url: 'https://image2avif.metric-converter.com',
      siteName: 'Image to AVIF Converter',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Image to AVIF Converter'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og-image.jpg']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large'
      }
    },
    verification: {
      google: 'your-google-verification-code'
    }
  };

  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.webp" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        <link rel="alternate" hrefLang="x-default" href="https://image2avif.metric-converter.com" />
        <link rel="alternate" hrefLang="en" href="https://image2avif.metric-converter.com/en" />
        <link rel="alternate" hrefLang="zh" href="https://image2avif.metric-converter.com/zh" />
        <link rel="alternate" hrefLang="ja" href="https://image2avif.metric-converter.com/ja" />
        <link rel="alternate" hrefLang="fr" href="https://image2avif.metric-converter.com/fr" />
        <link rel="alternate" hrefLang="de" href="https://image2avif.metric-converter.com/de" />
        <link rel="alternate" hrefLang="ru" href="https://image2avif.metric-converter.com/ru" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
