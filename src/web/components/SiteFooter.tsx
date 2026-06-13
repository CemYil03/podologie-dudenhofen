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
                <Link to="/{-$locale}/impressum" className="hover:text-aubergine hover:underline">
                    {{ de: 'Impressum', en: 'Imprint' }[locale]}
                </Link>
                <span aria-hidden className="text-aubergine/30">
                    ·
                </span>
                <Link to="/{-$locale}/datenschutz" className="hover:text-aubergine hover:underline">
                    {{ de: 'Datenschutz', en: 'Privacy' }[locale]}
                </Link>
            </div>
        </footer>
    );
}
