import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/anfahrt')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Anfahrt', en: 'Directions' }[locale],
            description: {
                de: 'Anfahrt zur Podologie-Praxis in Dudenhofen — mit Karte, ÖPNV-Anbindung und Parkmöglichkeiten.',
                en: 'How to find the podiatry practice in Dudenhofen — map, public transit, and parking.',
            }[locale],
            path: '/anfahrt',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: AnfahrtPage,
});

function AnfahrtPage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Anfahrt', en: 'Directions' }[locale]}</h1>
        </main>
    );
}
