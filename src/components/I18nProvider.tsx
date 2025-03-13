'use client';

import { useEffect } from 'react';
import '../i18n';

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 这里可以添加任何需要在客户端初始化的i18n逻辑
  }, []);

  return <>{children}</>;
} 