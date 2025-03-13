'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import I18nProvider from '../components/I18nProvider';
import { getI18n } from '../i18n';

// 初始化i18n
getI18n();

// 动态导入HomePage组件，禁用SSR
const HomePage = dynamic(() => import('./components/HomePage'), {
  ssr: false,
  loading: () => <div className="loading">Loading...</div>,
});

export default function Home() {
  return (
    <I18nProvider>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <HomePage />
      </Suspense>
    </I18nProvider>
  );
}
