import { Link } from '@tanstack/react-router';
import { useLocale } from '../hooks/useLocale';
import { PRACTICE } from '../practice';

// Minimal chrome for `/admin/*` pages. The public site header carries
// navigation, search, the call button, and the language switcher — none of
// which apply inside the admin area, where the surfaces are an authenticated
// staff workflow. We render just the company name (clickable back to the
// admin landing) and an "Administration" eyebrow so the surface is visibly
// separate from the public site. The public footer and the visitor-chat
// launcher are intentionally NOT mounted under `/admin/*` either — see
// `src/routes/{-$locale}.tsx`.

const ADMIN_LABEL: Record<string, string> = {
    de: 'Administration',
    en: 'Administration',
    ru: 'Администрирование',
    ar: 'الإدارة',
};

export function AdminHeader() {
    const locale = useLocale();
    return (
        <header className="sticky top-0 z-50 border-b border-aubergine/10 bg-cream/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
                <Link
                    to="/{-$locale}/admin"
                    className="min-w-0 truncate rounded-md font-serif text-base font-semibold tracking-tight whitespace-nowrap text-aubergine-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:text-lg"
                >
                    {PRACTICE.name}
                </Link>
                <span className="text-xs uppercase tracking-wide text-(--color-brand-charcoal-3) md:text-sm">{ADMIN_LABEL[locale]}</span>
            </div>
        </header>
    );
}
