'use client';

import { useEffect } from 'react';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 确保i18n已经初始化
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
} 