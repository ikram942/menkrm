import { getRequestConfig } from 'next-intl/server';
import { Locale, routing } from '@/i18n/routing';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import ar from '@/messages/ar.json';

const messages: Record<string, any> = {
  en,
  fr,
  ar,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as Locale;

  const validatedLocale = routing.locales.includes(locale) ? (locale) : routing.defaultLocale;

  return {
    locale: validatedLocale,
    messages: messages[validatedLocale]
  };
});
