import { useLocale } from '../hooks/useLocale';

/**
 * Skip-to-main-content link. Hidden until focused — keyboard users land on it
 * with the first Tab on every page and can jump past the site header straight
 * to `<main id="main-content">`. Mouse and screen-reader-with-arrows users
 * never see it; both modalities have other ways to reach the main content.
 *
 * The link must be the first focusable element in the document, so it lives
 * directly inside the locale layout — above `<SiteHeader />`. See
 * docs/style/accessibility.md.
 */
export function SkipLink() {
    const locale = useLocale();
    const label = {
        de: 'Zum Inhalt springen',
        en: 'Skip to main content',
        ru: 'Перейти к содержимому',
        ar: 'الانتقال إلى المحتوى الرئيسي',
    }[locale];

    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-aubergine focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-cream focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-cream"
        >
            {label}
        </a>
    );
}
