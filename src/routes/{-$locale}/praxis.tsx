import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/praxis')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Praxis', en: 'Practice' }[locale],
            description: {
                de: 'Einblicke in die Räume und Ausstattung der Podologie-Praxis in Dudenhofen.',
                en: 'A look at the rooms and equipment of the podiatry practice in Dudenhofen.',
            }[locale],
            path: '/praxis',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: PraxisPage,
});

function PraxisPage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Praxis', en: 'Practice' }[locale]}</h1>
        </main>
    );
}
