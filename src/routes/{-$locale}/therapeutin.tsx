import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/therapeutin')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Therapeutin', en: 'Therapist' }[locale],
            description: {
                de: 'Lernen Sie die Therapeutin der Podologie-Praxis in Dudenhofen kennen — Werdegang, Qualifikationen und Behandlungsansatz.',
                en: 'Meet the therapist behind the podiatry practice in Dudenhofen — background, qualifications, and treatment approach.',
            }[locale],
            path: '/therapeutin',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: TherapeutinPage,
});

function TherapeutinPage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Therapeutin', en: 'Therapist' }[locale]}</h1>
        </main>
    );
}
