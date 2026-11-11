import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';
import {storage} from '../storage';

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

const LANGUAGE_KEY = 'language';

/** Switch language now and remember the choice (best effort). */
export async function setLanguage(language: Language) {
  await i18n.changeLanguage(language);
  try {
    await storage.setItem(LANGUAGE_KEY, language);
  } catch {
    // Persistence is a convenience; the switch itself already worked.
  }
}

/** Apply the language saved on a previous visit, if any. */
export async function restoreLanguage() {
  try {
    const saved = await storage.getItem(LANGUAGE_KEY);
    if (saved === 'en' || saved === 'es') {
      await i18n.changeLanguage(saved);
    }
  } catch {
    // Keep the detected language.
  }
}

export default i18n;
