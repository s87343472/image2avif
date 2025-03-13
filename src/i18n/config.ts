import { createI18nClient } from 'next-international/client';
import { createI18nServer } from 'next-international/server';

export const locales = ['zh', 'en', 'fr', 'de', 'ja', 'ru'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'zh';

export const getI18nClient = createI18nClient({
  locales,
  defaultLocale,
  fallbackLocale: defaultLocale,
  loadLocale: async (locale: Locale) => (await import(`./locales/${locale}.json`)).default,
});

export const getI18nServer = createI18nServer({
  locales,
  defaultLocale,
  fallbackLocale: defaultLocale,
  loadLocale: async (locale: Locale) => (await import(`./locales/${locale}.json`)).default,
});

export const languageNames: Record<Locale, string> = {
  zh: '简体中文',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ru: 'Русский',
}; 