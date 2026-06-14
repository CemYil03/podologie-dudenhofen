import type { Locale } from '../utils/locale';
import { DEFAULT_LOCALE } from '../utils/locale';
import type { SearchEntryPath } from './searchIndex';

/**
 * The locale-aware path used by `useNavigate({ to: searchEntryPathname(...) })`.
 * The hash is intentionally NOT included — TanStack Router takes the hash via
 * its dedicated `hash` option and only then triggers `hashScrollIntoView`.
 */
export function searchEntryPathname(path: SearchEntryPath, locale: Locale): string {
    if (locale === DEFAULT_LOCALE) return path;
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
}
