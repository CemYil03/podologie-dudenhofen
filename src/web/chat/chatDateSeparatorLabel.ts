import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { DATE_FNS_LOCALE } from '../utils/dateFnsLocale';
import type { Locale } from '../utils/locale';

// Label rendered inside the chat transcript's per-day date separator. The
// current and previous day collapse to "Today" / "Yesterday" (localized) so
// the separators read naturally for the in-flight conversation; older days
// fall back to a long-form, locale-aware date. Today/Yesterday are evaluated
// against the viewer's local timezone — the same boundary
// `groupMessagesByDate` uses when it slices `createdAt` by ISO calendar day.
const TODAY: Record<Locale, string> = { de: 'Heute', en: 'Today', ru: 'Сегодня', ar: 'اليوم' };
const YESTERDAY: Record<Locale, string> = { de: 'Gestern', en: 'Yesterday', ru: 'Вчера', ar: 'أمس' };

export function formatChatDateSeparatorLabel(iso: string, locale: Locale): string {
    const date = parseISO(iso);
    if (isToday(date)) return TODAY[locale];
    if (isYesterday(date)) return YESTERDAY[locale];
    return format(date, 'PP', { locale: DATE_FNS_LOCALE[locale] });
}
