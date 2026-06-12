import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/podologie-urkunde')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Podologie-Urkunde', en: 'Podiatry Certificate' }[locale],
            description: {
                de: 'Staatliche Urkunde zur Berufsausübung als Podologin — Nachweis der Qualifikation.',
                en: 'Official state certificate qualifying the holder to work as a podiatrist — proof of qualification.',
            }[locale],
            path: '/podologie-urkunde',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: PodologieUrkundePage,
});

function PodologieUrkundePage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Podologie-Urkunde', en: 'Podiatry Certificate' }[locale]}</h1>
        </main>
    );
}
