import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/podologie')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Podologie', en: 'Podiatry' }[locale],
            description: {
                de: 'Was Podologie bedeutet, wofür sie da ist und wann eine podologische Behandlung sinnvoll ist.',
                en: 'What podiatry is, what it treats, and when a podiatric appointment is the right next step.',
            }[locale],
            path: '/podologie',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: PodologiePage,
});

function PodologiePage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Podologie', en: 'Podiatry' }[locale]}</h1>
        </main>
    );
}
