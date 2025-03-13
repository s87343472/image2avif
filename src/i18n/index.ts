'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入所有语言文件
import zh from './locales/zh.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ja from './locales/ja.json';
import ru from './locales/ru.json';

// 避免在服务器端初始化
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        zh: { translation: zh },
        en: { translation: en },
        fr: { translation: fr },
        de: { translation: de },
        ja: { translation: ja },
        ru: { translation: ru }
      },
      fallbackLng: 'zh',
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        caches: ['localStorage', 'cookie']
      }
    });
}

export default i18n; 