import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import en from '../messages/en.json';
import fr from '../messages/fr.json';
import ar from '../messages/ar.json';

const messages: Record<string, any> = {
  en,
  fr,
  ar,
};

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a Promise in Next.js 15+
  let locale = await requestLocale;
  
  // Validate that the incoming locale is valid
  const validatedLocale = routing.locales.includes(locale as any) ? (locale as string) : routing.defaultLocale;

  return {
    locale: validatedLocale,
    messages: messages[validatedLocale]
  } as any;
});
