'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { getI18n } from '../i18n';
import { useParams } from 'next/navigation';

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params?.locale || 'en';

  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window !== 'undefined') {
      // 初始化i18n
      const i18nInstance = getI18n();
      
      // 如果当前语言与URL中的语言不同，则切换语言
      if (i18nInstance.language !== locale) {
        i18nInstance.changeLanguage(locale as string);
      }
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
} 