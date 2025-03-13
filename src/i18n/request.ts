import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['zh', 'en', 'fr', 'de', 'ja', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'zh';

// This is the configuration for next-intl
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (typeof locale !== 'string' || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});

export const languageNames: Record<Locale, string> = {
  zh: '简体中文',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ru: 'Русский',
}; 