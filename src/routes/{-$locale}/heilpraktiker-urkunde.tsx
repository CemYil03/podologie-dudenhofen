import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/heilpraktiker-urkunde')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Heilpraktiker-Urkunde', en: 'Heilpraktiker Certificate' }[locale],
            description: {
                de: 'Urkunde über die Erlaubnis zur Ausübung der Heilkunde ohne Bestallung — Heilpraktiker für Podologie.',
                en: 'Official permit to practice the healing arts without medical licensure — Heilpraktiker for Podiatry.',
            }[locale],
            path: '/heilpraktiker-urkunde',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: HeilpraktikerUrkundePage,
});

function HeilpraktikerUrkundePage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Heilpraktiker-Urkunde', en: 'Heilpraktiker Certificate' }[locale]}</h1>
        </main>
    );
}
