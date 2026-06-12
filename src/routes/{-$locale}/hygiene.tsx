import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/hygiene')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Hygiene', en: 'Hygiene' }[locale],
            description: {
                de: 'Hygiene-Konzept der Praxis: Aufbereitung der Instrumente, Flächendesinfektion und Schutz für Patientinnen und Patienten.',
                en: 'The practice hygiene concept: instrument reprocessing, surface disinfection, and patient protection.',
            }[locale],
            path: '/hygiene',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: HygienePage,
});

function HygienePage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Hygiene', en: 'Hygiene' }[locale]}</h1>
        </main>
    );
}
