import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';

export const LANGUAGES = ['en', 'es'] as const;
export type Language = (typeof LANGUAGES)[number];

export const resources = {
  en: {translation: en},
  es: {translation: es},
} as const;

/** First launch: follow the device language when it is Spanish, else English. */
export function detectLanguage(): Language {
  try {
    const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
    return locale.toLowerCase().startsWith('es') ? 'es' : 'en';
  } catch {
    return 'en';
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
  returnNull: false,
});

export function setLanguage(language: Language) {
  return i18n.changeLanguage(language);
}

export default i18n;
