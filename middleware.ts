import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './src/i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // Used when no locale matches
  defaultLocale: defaultLocale,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en|fr|de|ja|ru)/:path*']
}; 