import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/leistungen')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Leistungen', en: 'Services' }[locale],
            description: {
                de: 'Das Leistungsangebot der Praxis: medizinische Fußpflege, Nagelkorrektur-Spangen, diabetisches Fußsyndrom und mehr.',
                en: 'Services offered by the practice: medical foot care, nail-correction braces, diabetic foot syndrome, and more.',
            }[locale],
            path: '/leistungen',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: LeistungenPage,
});

function LeistungenPage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Leistungen', en: 'Services' }[locale]}</h1>
        </main>
    );
}
