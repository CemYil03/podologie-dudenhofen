import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/heilpraktiker-podologie')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Heilpraktiker für Podologie', en: 'Heilpraktiker for Podiatry' }[locale],
            description: {
                de: 'Was den Heilpraktiker für Podologie auszeichnet — Befugnisse, Abgrenzung zur reinen Podologie und Bedeutung für die Behandlung.',
                en: 'What the Heilpraktiker for Podiatry qualification adds — scope of practice, distinction from podiatry alone, and what it means for treatment.',
            }[locale],
            path: '/heilpraktiker-podologie',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: HeilpraktikerPodologiePage,
});

function HeilpraktikerPodologiePage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Heilpraktiker für Podologie', en: 'Heilpraktiker for Podiatry' }[locale]}</h1>
        </main>
    );
}
