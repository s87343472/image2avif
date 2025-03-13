import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
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

const initI18next = async (locale: string = defaultLocale) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      interpolation: {
        escapeValue: false
      }
    });

  return i18nInstance;
};

export default initI18next; 