'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

// 创建一个简单的i18n实例，不依赖于React Context
const resources = {
  en: {
    translation: enTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

// 避免在服务器端初始化i18n
const initI18n = () => {
  // 如果i18n已经初始化，则直接返回
  if (i18n.isInitialized) {
    return i18n;
  }

  // 基本配置
  const i18nConfig = {
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    interpolation: {
      escapeValue: false,
    },
  };

  i18n.use(initReactI18next);

  // 仅在浏览器环境中使用LanguageDetector
  if (typeof window !== 'undefined') {
    i18n.use(LanguageDetector);
  }

  // 初始化i18n
  i18n.init(i18nConfig);

  return i18n;
};

// 导出一个函数，而不是直接导出实例
// 这样可以确保在使用时才初始化
export const getI18n = () => {
  return initI18n();
};

export default i18n; 