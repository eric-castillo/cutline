import type {Language} from '../i18n';

// The shop is in the US, so Spanish uses es-US ("$25") rather than generic es
// ("25 US$"). Dates, times and money always go through Intl.
const INTL_LOCALE: Record<Language, string> = {en: 'en-US', es: 'es-US'};

/** Money is stored as integer cents; shown with Intl in the shop currency. */
export function formatMoney(cents: number, language: Language): string {
  const hasCents = cents % 100 !== 0;
  return new Intl.NumberFormat(INTL_LOCALE[language], {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
