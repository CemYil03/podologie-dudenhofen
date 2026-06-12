import { createFileRoute } from '@tanstack/react-router';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/kontakt')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Kontakt', en: 'Contact' }[locale],
            description: {
                de: 'So erreichen Sie die Podologie-Praxis in Dudenhofen — Telefon, E-Mail, Adresse und Öffnungszeiten.',
                en: 'How to reach the podiatry practice in Dudenhofen — phone, email, address, and opening hours.',
            }[locale],
            path: '/kontakt',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: KontaktPage,
});

function KontaktPage() {
    const locale = useLocale();
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{{ de: 'Kontakt', en: 'Contact' }[locale]}</h1>
        </main>
    );
}
