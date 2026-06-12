import { createFileRoute, Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useMutation } from 'urql';
import { Button } from '../../web/components/base/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../web/components/base/tooltip';
import { LanguageSwitcher } from '../../web/components/LanguageSwitcher';
import { HomePageDocument, TerminateSessionsDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/')({
    loader: () => routeLoaderGraphqlClient(HomePageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Podologie Dudenhofen', en: 'Podiatry Dudenhofen' }[locale],
            description: {
                de: 'Eine Vorlage für Full-Stack-Anwendungen mit TanStack Start.', // todo: adjust
                en: 'A template for full-stack applications built with TanStack Start.', // todo: adjust
            }[locale],
            path: '/',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component() {
        const loaderData = Route.useLoaderData();
        const locale = useLocale();

        const [, terminateCurrentSession] = useMutation(TerminateSessionsDocument);

        return (
            <main className="p-8 grid gap-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{{ de: 'Willkommen', en: 'Welcome' }[locale]}</h1>
                    <LanguageSwitcher />
                </div>
                <div>
                    {{ de: 'Angemeldeter Benutzer', en: 'Signed in user' }[locale]}{' '}
                    {loaderData.currentSession.user?.name || { de: 'keiner', en: 'none' }[locale]}
                </div>
                <div className="grid gap-4 justify-items-start">
                    <Button onClick={() => terminateCurrentSession({ currentSessionId: loaderData.currentSession.sessionId })}>
                        End session
                    </Button>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button" className="mt-4 cursor-pointer" onClick={() => toast('Test')}>
                                {{ de: 'Benachrichtigung', en: 'Alert' }[locale]}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>{{ de: 'Hallo Welt!', en: 'Hello world!' }[locale]}</TooltipContent>
                    </Tooltip>
                    <Link to="/{-$locale}/chat" search={{ chatId: undefined }}>
                        to chat
                    </Link>
                    <Link to="/{-$locale}/terms">to terms</Link>
                </div>

                <h1 className="font-semibold text-3xl">Podologin mit Krankenkassenzulassung und Heilpraktikerin für Podologie</h1>
                <p>
                    Im Jahr 2008 habe ich meine erste Ausbildung im Bereich der kosmetischen Fußpflege gemacht und auch direkt im Anschluss
                    ein Gewerbe angemeldet.
                </p>
                <p>
                    Mit dieser Ausbildung durfte ich aber nur kosmetisch arbeiten. Das heißt, mir liebgewonnene Kunden durfte ich auf einmal
                    nicht mehr behandeln, nachdem sie an Diabetes erkrankten, Medikamente einnehmen mussten, oder wenn die Nägel anfingen
                    einzuwachsen.
                </p>
                <p>
                    Aus diesem Grund habe ich mich an einer Podologie- Schule angemeldet und die dreijährige Ausbildung, mit abschließendem
                    Staatsexamen abgeschlossen.
                </p>
                <p>
                    Am 02.09.2017 habe ich dann die Prüfung zum sektoralen Heilpraktiker für Podologie mit Erfolg bestanden, die am
                    22.03.2022 in Rheinland Pfalz anerkannt wurde.
                </p>
                <p>
                    Als Podologin mit Kassenzulassung bin ich verpflichtet in regelmäßigen Abständen Fortbildungen zu besuchen, über die ich
                    immer über Neuheiten informiert werde, um meinen Patienten gerecht zu werden.
                </p>
            </main>
        );
    },
});
