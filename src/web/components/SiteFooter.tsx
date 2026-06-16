import { Link } from '@tanstack/react-router';
import { useLocale } from '../hooks/useLocale';

const YEAR = new Date().getFullYear();

export function SiteFooter() {
    const locale = useLocale();

    return (
        <footer className="mt-auto border-t border-aubergine/10 bg-cream/60">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 py-6 text-sm text-(--color-brand-charcoal-3)">
                <span>© {YEAR} Annette Yilmaz</span>
                <span aria-hidden className="text-aubergine/30">
                    ·
                </span>
                <Link
                    to="/{-$locale}/karriere"
                    className="rounded-sm hover:text-aubergine hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                    {{ de: 'Karriere', en: 'Careers', ru: 'Карьера', ar: 'الوظائف' }[locale]}
                </Link>
                <span aria-hidden className="text-aubergine/30">
                    ·
                </span>
                <Link
                    to="/{-$locale}/impressum"
                    className="rounded-sm hover:text-aubergine hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                    {{ de: 'Impressum', en: 'Imprint', ru: 'Выходные данные', ar: 'بيانات الناشر' }[locale]}
                </Link>
                <span aria-hidden className="text-aubergine/30">
                    ·
                </span>
                <Link
                    to="/{-$locale}/datenschutz"
                    className="rounded-sm hover:text-aubergine hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                    {{ de: 'Datenschutz', en: 'Privacy', ru: 'Конфиденциальность', ar: 'الخصوصية' }[locale]}
                </Link>
            </div>
        </footer>
    );
}
