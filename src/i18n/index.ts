'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { locales, defaultLocale } from './request';

// 导入所有语言文件
import zh from './locales/zh.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ja from './locales/ja.json';
import ru from './locales/ru.json';

const resources = {
  zh: { translation: zh },
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
  ja: { translation: ja },
  ru: { translation: ru }
};

// 避免在服务器端初始化
if (typeof window !== 'undefined' && !i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator'],
        caches: ['localStorage', 'cookie'],
        lookupFromPathIndex: 0
      }
    });
}

export default i18n; 