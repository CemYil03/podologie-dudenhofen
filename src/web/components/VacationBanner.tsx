import { CalendarOffIcon } from 'lucide-react';
import type { Locale } from '../utils/locale';

type Vacation = { startsOn: string; endsOn: string; note?: string | null };

// Public-facing vacation banner. Rendered at the very top of the home page
// when `Query.activeVacation` returns a row — see
// `docs/features/vacations.md`. Not dismissible: this is operational info
// patients need to plan around. The banner itself is static (no animation),
// so `prefers-reduced-motion` doesn't apply.
//
// The headline switches between "starting" and "active" tone based on
// whether `startsOn` has already passed. The free-text `note` is rendered
// only when the visitor's locale is German — it is authored in German and
// machine-translating it inline would be worse than omitting it for
// non-German visitors.
export function VacationBanner({ vacation, locale }: { vacation: Vacation; locale: Locale }) {
    const today = practiceLocalIsoDate(new Date());
    const isActive = today >= vacation.startsOn && today <= vacation.endsOn;
    const startLabel = formatLocaleDate(vacation.startsOn, locale);
    const endLabel = formatLocaleDate(vacation.endsOn, locale);

    const headline = isActive ? activeHeadline[locale] : upcomingHeadline[locale];
    const body = (isActive ? activeBody : upcomingBody)[locale]({ start: startLabel, end: endLabel });

    return (
        <aside role="status" aria-live="polite" className="border-b border-aubergine/10 bg-blush/40">
            <div className="mx-auto flex max-w-5xl items-start gap-3 px-6 py-4">
                <CalendarOffIcon className="mt-0.5 size-5 shrink-0 text-aubergine" aria-hidden />
                <div className="text-sm">
                    <p className="font-medium text-aubergine-dark">{headline}</p>
                    <p className="mt-1 text-(--color-brand-charcoal-2)">{body}</p>
                    {vacation.note && locale === 'de' ? <p className="mt-1 text-(--color-brand-charcoal-2)">{vacation.note}</p> : null}
                </div>
            </div>
        </aside>
    );
}

const activeHeadline: Record<Locale, string> = {
    de: 'Wir sind im Urlaub.',
    en: 'The practice is closed for vacation.',
    ru: 'Практика закрыта на отпуск.',
    ar: 'العيادة مغلقة بسبب الإجازة.',
};

const upcomingHeadline: Record<Locale, string> = {
    de: 'Geplanter Urlaub.',
    en: 'Upcoming vacation.',
    ru: 'Планируемый отпуск.',
    ar: 'إجازة مقررة.',
};

type DateRange = { start: string; end: string };

const activeBody: Record<Locale, (range: DateRange) => string> = {
    de: ({ start, end }) => `Vom ${start} bis ${end} ist die Praxis geschlossen. Wir bitten um Ihr Verständnis.`,
    en: ({ start, end }) => `The practice is closed from ${start} to ${end}. Thank you for your understanding.`,
    ru: ({ start, end }) => `Практика закрыта с ${start} по ${end}. Благодарим за понимание.`,
    ar: ({ start, end }) => `العيادة مغلقة من ${start} إلى ${end}. شكراً لتفهمكم.`,
};

const upcomingBody: Record<Locale, (range: DateRange) => string> = {
    de: ({ start, end }) => `Vom ${start} bis ${end} ist die Praxis geschlossen.`,
    en: ({ start, end }) => `The practice will be closed from ${start} to ${end}.`,
    ru: ({ start, end }) => `Практика будет закрыта с ${start} по ${end}.`,
    ar: ({ start, end }) => `ستكون العيادة مغلقة من ${start} إلى ${end}.`,
};

function formatLocaleDate(iso: string, locale: Locale): string {
    const [year, month, day] = iso.split('-').map((part) => parseInt(part, 10));
    const date = new Date(Date.UTC(year!, month! - 1, day));
    return new Intl.DateTimeFormat(localeBcp47(locale), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(date);
}

function localeBcp47(locale: Locale): string {
    return { de: 'de-DE', en: 'en-GB', ru: 'ru-RU', ar: 'ar' }[locale];
}

const PRACTICE_TIMEZONE = 'Europe/Berlin';

function practiceLocalIsoDate(d: Date): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: PRACTICE_TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(d);
}
