import lt from './lt.json';
import en from './en.json';
import ru from './ru.json';

const translations: Record<string, typeof lt> = { lt, en, ru };

export const defaultLocale = 'lt';
export const locales = ['lt', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export function t(locale?: string) {
  const lang = locale && locale in translations ? locale : defaultLocale;
  return translations[lang];
}

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (locales.includes(lang as Locale)) return lang as Locale;
  return defaultLocale;
}
