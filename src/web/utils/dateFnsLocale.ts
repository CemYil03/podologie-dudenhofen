import { ar, de, enUS, ru } from 'date-fns/locale';
import type { Locale as DateFnsLocale } from 'date-fns/locale';
import type { Locale } from './locale';

// Maps app locales to the date-fns `Locale` objects used by `format`,
// `formatDistance`, etc. Add a new entry here whenever you add a locale in
// `src/web/utils/locale.ts`.
export const DATE_FNS_LOCALE: Record<Locale, DateFnsLocale> = {
    de,
    en: enUS,
    ru,
    ar,
};
