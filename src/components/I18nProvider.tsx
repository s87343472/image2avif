'use client';

import { useEffect } from 'react';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
import { useParams } from 'next/navigation';
import { defaultLocale } from '../i18n/request';

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || defaultLocale;

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init({
        lng: locale
      });
    } else if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
} 