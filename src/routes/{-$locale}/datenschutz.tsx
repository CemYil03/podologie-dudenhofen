import { createFileRoute, Link } from '@tanstack/react-router';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { DatenschutzPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

// Stand der Erklärung — bei jeder inhaltlichen Änderung mitziehen.
const POLICY_VERSION = { de: '13. Juni 2026', en: '13 June 2026' };

export const Route = createFileRoute('/{-$locale}/datenschutz')({
    loader: () => routeLoaderGraphqlClient(DatenschutzPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Datenschutzerklärung', en: 'Privacy policy' }[locale],
            description: {
                de: 'Datenschutzerklärung der Praxis Podologie Dudenhofen — welche Daten wir verarbeiten, auf welcher Rechtsgrundlage und wie Sie Ihre Rechte ausüben.',
                en: 'Privacy policy of Podologie Dudenhofen — which data we process, on what legal basis and how to exercise your rights.',
            }[locale],
            path: '/datenschutz',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: DatenschutzPage,
});

function DatenschutzPage() {
    const locale = useLocale();

    return (
        <main>
            {/* Hero — cream */}
            <section id="hero" className="mx-auto max-w-3xl scroll-mt-20 px-6 pt-16 pb-12">
                <SectionEyebrow>{{ de: 'Rechtliches', en: 'Legal' }[locale]}</SectionEyebrow>
                <h1 className="mt-6 font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                    {{ de: 'Datenschutzerklärung', en: 'Privacy policy' }[locale]}
                </h1>
                <p className="mt-6 text-(--color-brand-charcoal-2)">
                    {
                        {
                            de: 'Diese Erklärung beschreibt, welche personenbezogenen Daten wir beim Besuch dieser Webseite und bei einer Kontaktaufnahme verarbeiten und worauf sich die Verarbeitung rechtlich stützt.',
                            en: 'This statement describes which personal data we process when you visit this website or contact us, and on what legal basis.',
                        }[locale]
                    }
                </p>
                <p className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                    {{ de: 'Stand', en: 'Last updated' }[locale]}: {POLICY_VERSION[locale]}
                </p>
            </section>

            {/* Body */}
            <section className="mx-auto max-w-3xl px-6 pb-24">
                <div className="space-y-12 leading-relaxed text-(--color-brand-charcoal-2)">
                    <Block id="block-1-verantwortlicher" heading={{ de: '1. Verantwortlicher', en: '1. Controller' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Verantwortliche im Sinne des Art. 4 Nr. 7 DSGVO ist:',
                                    en: 'The controller within the meaning of Art. 4 (7) GDPR is:',
                                }[locale]
                            }
                        </p>
                        <address className="mt-3 not-italic">
                            {PRACTICE.person}
                            <br />
                            {PRACTICE.name}
                            <br />
                            {PRACTICE.address.street}
                            <br />
                            {PRACTICE.address.postcode} {PRACTICE.address.city}
                            <br />
                            {{ de: 'Deutschland', en: 'Germany' }[locale]}
                        </address>
                        <p className="mt-3">
                            {{ de: 'Telefon', en: 'Phone' }[locale]}:{' '}
                            <a href={`tel:${PRACTICE.phone}`} className="text-aubergine hover:underline">
                                {formatPhoneNumber(PRACTICE.phone)}
                            </a>
                            <br />
                            {{ de: 'E-Mail', en: 'Email' }[locale]}:{' '}
                            <a href={`mailto:${PRACTICE.email}`} className="text-aubergine hover:underline">
                                {PRACTICE.email}
                            </a>
                        </p>
                    </Block>

                    <Block
                        id="block-2-allgemeines"
                        heading={{ de: '2. Allgemeines zur Datenverarbeitung', en: '2. General principles' }[locale]}
                    >
                        <p>
                            {
                                {
                                    de: 'Wir verarbeiten personenbezogene Daten nur, soweit dies erforderlich ist, um eine funktionsfähige Webseite bereitzustellen, Anfragen zu beantworten und Termine zu organisieren. Rechtsgrundlagen sind je nach Verarbeitung Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Anbahnung oder Erfüllung eines Behandlungsvertrags (Art. 6 Abs. 1 lit. b DSGVO), eine rechtliche Verpflichtung (lit. c) oder unser berechtigtes Interesse am sicheren und benutzerfreundlichen Betrieb der Webseite (lit. f). Soweit Gesundheitsdaten betroffen sind, stützt sich die Verarbeitung zusätzlich auf Art. 9 Abs. 2 lit. h DSGVO i. V. m. § 22 BDSG.',
                                    en: 'We process personal data only insofar as it is necessary to operate a functioning website, respond to enquiries and schedule appointments. Depending on the processing, the legal basis is your consent (Art. 6 (1) (a) GDPR), the initiation or performance of a treatment contract (Art. 6 (1) (b)), a legal obligation (lit. c) or our legitimate interest in the secure, user-friendly operation of the website (lit. f). Where health data is involved, processing is additionally based on Art. 9 (2) (h) GDPR in conjunction with § 22 BDSG.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-3-server-logs"
                        heading={{ de: '3. Beim Aufruf der Webseite (Server-Logs)', en: '3. Server logs' }[locale]}
                    >
                        <p>
                            {
                                {
                                    de: 'Beim Aufruf dieser Webseite verarbeitet unser Hosting-Anbieter technisch notwendige Verbindungsdaten in Server-Protokolldateien: IP-Adresse, Datum und Uhrzeit, aufgerufene Ressource, HTTP-Statuscode, übertragene Datenmenge, Referrer und User-Agent. Diese Daten sind notwendig, um die Webseite auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nur so lange gespeichert, wie es zu diesem Zweck erforderlich ist, und dann gelöscht; eine Zusammenführung mit anderen Datenbeständen findet nicht statt.',
                                    en: 'When you load this website, our hosting provider processes technically necessary connection data in server log files: IP address, date and time, the resource requested, HTTP status code, transferred data volume, referrer and user agent. This data is needed to deliver the site, ensure its stability and security, and prevent abuse. The legal basis is Art. 6 (1) (f) GDPR. The data is stored only as long as necessary for that purpose and is then deleted; it is not merged with other data sets.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-4-cookies" heading={{ de: '4. Cookies', en: '4. Cookies' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Wir setzen ausschließlich technisch notwendige Cookies ein. Es findet kein Tracking statt, keine Reichweitenmessung und keine Cookies von Dritten zu Werbezwecken. Eine Einwilligung nach § 25 Abs. 1 TTDSG ist nicht erforderlich, weil die Speicherung gemäß § 25 Abs. 2 Nr. 2 TTDSG unbedingt erforderlich ist, um den von Ihnen gewünschten Dienst zur Verfügung zu stellen.',
                                    en: 'We use only strictly necessary cookies. There is no tracking, no analytics and no third-party advertising cookies. Consent under § 25 (1) TTDSG is not required, because storage is strictly necessary to provide the service you requested (§ 25 (2) Nr. 2 TTDSG).',
                                }[locale]
                            }
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border border-aubergine/10 bg-blush/40 p-4">
                                <p className="font-mono text-xs tracking-wide text-aubergine-dark uppercase">sessionId</p>
                                <p className="mt-2 text-sm">
                                    {
                                        {
                                            de: 'Identifiziert Ihre Sitzung serverseitig (z. B. für die Sprachwahl im Chat). HttpOnly, Secure, SameSite=Strict. Wird beim ersten Besuch erzeugt und nach Abschluss der Sitzung serverseitig deaktiviert.',
                                            en: 'Identifies your session on the server side (e.g. to keep state in the chat). HttpOnly, Secure, SameSite=Strict. Created on first visit and deactivated server-side once the session ends.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                            <div className="rounded-lg border border-aubergine/10 bg-blush/40 p-4">
                                <p className="font-mono text-xs tracking-wide text-aubergine-dark uppercase">locale</p>
                                <p className="mt-2 text-sm">
                                    {
                                        {
                                            de: 'Speichert Ihre gewählte Sprache (Deutsch oder Englisch), damit die Webseite Sie beim nächsten Besuch in der richtigen Sprache empfängt. SameSite=Lax, Lebensdauer ein Jahr.',
                                            en: 'Stores your chosen language (German or English) so the site greets you in the right language on your next visit. SameSite=Lax, lifetime one year.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Sie können Cookies in den Einstellungen Ihres Browsers jederzeit löschen oder deren Annahme einschränken; ohne den Sitzungscookie funktionieren der Chat-Assistent und sprachabhängige Funktionen jedoch nicht zuverlässig.',
                                    en: 'You can delete cookies or restrict their acceptance in your browser settings at any time; without the session cookie, the chat assistant and language-dependent features will not work reliably.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-5-kontakt"
                        heading={
                            {
                                de: '5. Kontaktaufnahme per Telefon und E-Mail',
                                en: '5. Contact by phone and email',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wenn Sie uns telefonisch oder per E-Mail erreichen, verarbeiten wir die von Ihnen mitgeteilten Daten — typischerweise Name, Kontaktmöglichkeit und Anliegen — ausschließlich, um Ihre Anfrage zu beantworten oder einen Termin zu vereinbaren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss oder die Durchführung eines Behandlungsvertrags gerichtet ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO an einer effizienten Bearbeitung von Anfragen.',
                                    en: 'When you contact us by phone or email, we process the data you provide — typically name, contact information and your concern — solely in order to respond to your enquiry or arrange an appointment. The legal basis is Art. 6 (1) (b) GDPR insofar as your enquiry concerns the conclusion or performance of a treatment contract; otherwise Art. 6 (1) (f) GDPR for efficient handling of enquiries.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Wir löschen die Daten, sobald sie für die Beantwortung Ihrer Anfrage nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Werden Inhalte Teil einer Patientenakte, gilt die Aufbewahrungsfrist nach § 630f BGB von zehn Jahren; steuer- und handelsrechtliche Aufbewahrungspflichten (z. B. § 257 HGB, § 147 AO) bleiben unberührt.',
                                    en: 'We delete the data as soon as it is no longer needed to respond to your request, unless statutory retention obligations apply. If content becomes part of a patient file, the ten-year retention period under § 630f BGB applies; statutory retention obligations under tax and commercial law (e.g. § 257 HGB, § 147 AO) remain unaffected.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Bitte beachten Sie, dass die Übertragung per unverschlüsselter E-Mail Sicherheitslücken aufweisen kann; teilen Sie sensible Gesundheitsdaten lieber im persönlichen Gespräch oder am Telefon.',
                                    en: 'Please note that unencrypted email may expose information in transit; please prefer the phone or an in-person conversation for sensitive health information.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-6-google-maps"
                        heading={{ de: '6. Eingebettete Karte (Google Maps)', en: '6. Embedded map (Google Maps)' }[locale]}
                    >
                        <p>
                            {
                                {
                                    de: 'Auf der Seite ',
                                    en: 'On ',
                                }[locale]
                            }
                            <Link to="/{-$locale}/kontakt" hash="anfahrt" className="text-aubergine hover:underline">
                                {{ de: 'Kontakt → Anfahrt', en: 'Contact → How to find us' }[locale]}
                            </Link>
                            {
                                {
                                    de: ' binden wir eine Karte über einen iframe von Google ein, damit Sie die Praxis schnell finden. Beim Aufruf der Seite verbindet sich Ihr Browser direkt mit Servern von Google Ireland Ltd. (Google Building, Gordon House, Barrow Street, Dublin 4, Irland) bzw. — bei Datenübermittlung in die USA — Google LLC. Dabei können IP-Adresse, Browser-Informationen und Aufrufdatum verarbeitet werden. Auf den Inhalt und Umfang dieser Datenverarbeitung haben wir keinen Einfluss.',
                                    en: ' we embed a map via an iframe from Google so you can locate the practice quickly. When you load that page, your browser connects directly to servers operated by Google Ireland Ltd. (Google Building, Gordon House, Barrow Street, Dublin 4, Ireland) or — for data transferred to the United States — Google LLC. IP address, browser information and the time of request may be processed. We have no control over the scope or content of this processing.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse besteht darin, Ihnen die Anfahrt anschaulich darzustellen. Die Übermittlung in die USA stützt sich auf den EU-US Data Privacy Framework. Möchten Sie diese Datenübermittlung vermeiden, nutzen Sie auf der Anfahrtsseite die Schaltflächen „Google Maps öffnen" oder „Apple Maps öffnen" — diese werden erst nach einem Klick aktiv. Weitere Informationen finden Sie in der Datenschutzerklärung von Google: ',
                                    en: 'The legal basis is Art. 6 (1) (f) GDPR; our legitimate interest is showing you how to reach the practice. Transfers to the United States rely on the EU–US Data Privacy Framework. To avoid this data transfer, use the "Open Google Maps" / "Open Apple Maps" buttons on the same page — they become active only when clicked. For more information see Google\'s privacy policy: ',
                                }[locale]
                            }
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aubergine hover:underline"
                            >
                                policies.google.com/privacy
                            </a>
                            .
                        </p>
                    </Block>

                    <Block id="block-7-ai-chat" heading={{ de: '7. AI-Assistent (Chat)', en: '7. AI assistant (chat)' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Auf dieser Webseite ist ein optionaler Chat-Assistent erreichbar, der allgemeine Fragen rund um die Praxis beantwortet (z. B. zu Leistungen oder Öffnungszeiten). Hierfür nutzen wir das Sprachmodell Gemini von Google (Google Ireland Ltd., bzw. — bei Datenübermittlung in die USA — Google LLC). Ihre Eingaben sowie die Antworten des Modells werden zur Inferenz an Google übertragen. Zusätzlich speichern wir den Verlauf in unserer eigenen Datenbank und verknüpfen ihn mit Ihrer Sitzung, damit Sie das Gespräch fortsetzen können.',
                                    en: "This website offers an optional chat assistant that answers general questions about the practice (e.g. services or opening hours). We use Google's Gemini language model (Google Ireland Ltd., or — for data transfers to the United States — Google LLC). Your prompts and the model's responses are sent to Google for inference. In addition we store the conversation in our own database, linked to your session, so you can continue the conversation later.",
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse besteht in der niedrigschwelligen Beantwortung allgemeiner Fragen ohne telefonische Belastung. Die Datenübermittlung in die USA stützt sich auf den EU-US Data Privacy Framework. Die Nutzung des Chats ist freiwillig.',
                                    en: 'The legal basis is Art. 6 (1) (f) GDPR; our legitimate interest is providing low-threshold answers to general questions without burdening the phone line. Transfers to the United States rely on the EU–US Data Privacy Framework. Use of the chat is voluntary.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Bitte geben Sie im Chat keine Diagnosen, Namen Dritter oder andere sensible Informationen ein, die Sie auch in einer offenen E-Mail nicht teilen würden. Für medizinische Anliegen wenden Sie sich bitte direkt an die Praxis.',
                                    en: 'Please do not enter diagnoses, names of others or other sensitive information you would not share in an open email. For medical concerns, please contact the practice directly.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-8-externe-verweise"
                        heading={
                            {
                                de: '8. Externe Verweise (Telefon, E-Mail, Apple Maps)',
                                en: '8. External links (phone, email, Apple Maps)',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Telefon-, Mailto- und Apple-Maps-Links auf dieser Webseite öffnen Anwendungen oder Webseiten Dritter (Telefon-App, E-Mail-Programm bzw. Apple Inc.). Diese Aufrufe sind durch Sie ausgelöst; die nachfolgende Datenverarbeitung liegt außerhalb unseres Einflussbereichs und richtet sich nach den jeweiligen Datenschutzbestimmungen der Anbieter.',
                                    en: "Phone, mailto and Apple Maps links on this site open third-party applications or websites (your phone app, your email client, or Apple Inc.). These actions are initiated by you; the resulting data processing is outside our control and is governed by the relevant providers' privacy policies.",
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-9-empfaenger"
                        heading={{ de: '9. Empfänger und Auftragsverarbeiter', en: '9. Recipients and processors' }[locale]}
                    >
                        <p>
                            {
                                {
                                    de: 'Wir setzen sorgfältig ausgewählte Dienstleister ein, die uns beim Betrieb der Webseite unterstützen. Mit diesen Auftragsverarbeitern bestehen Verträge nach Art. 28 DSGVO. Eingesetzt werden insbesondere ein Hosting-Anbieter zur Bereitstellung der Webseite (Server-Logs, siehe Ziffer 3) und Google für Karten und den Chat-Assistenten (siehe Ziffern 6 und 7). Eine Weitergabe an darüber hinausgehende Dritte findet nicht statt, soweit nicht eine gesetzliche Verpflichtung besteht.',
                                    en: 'We use carefully selected service providers to help us operate the website. We have data-processing agreements under Art. 28 GDPR with these processors. In particular we use a hosting provider for serving the site (server logs — see section 3) and Google for the embedded map and chat assistant (see sections 6 and 7). We do not share data with any further third parties unless legally obligated to do so.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-10-rechte" heading={{ de: '10. Ihre Rechte', en: '10. Your rights' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Sie haben uns gegenüber jederzeit folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:',
                                    en: 'With regard to the personal data concerning you, you have the following rights at any time:',
                                }[locale]
                            }
                        </p>
                        <ul className="mt-3 space-y-2">
                            <li className="flex gap-3">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                <span>
                                    {
                                        {
                                            de: 'Recht auf Auskunft (Art. 15 DSGVO)',
                                            en: 'Right of access (Art. 15 GDPR)',
                                        }[locale]
                                    }
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                <span>
                                    {
                                        {
                                            de: 'Recht auf Berichtigung (Art. 16 DSGVO)',
                                            en: 'Right to rectification (Art. 16 GDPR)',
                                        }[locale]
                                    }
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                <span>
                                    {
                                        {
                                            de: 'Recht auf Löschung (Art. 17 DSGVO)',
                                            en: 'Right to erasure (Art. 17 GDPR)',
                                        }[locale]
                                    }
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                <span>
                                    {
                                        {
                                            de: 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                                            en: 'Right to restriction of processing (Art. 18 GDPR)',
                                        }[locale]
                                    }
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                <span>
                                    {
                                        {
                                            de: 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
                                            en: 'Right to data portability (Art. 20 GDPR)',
                                        }[locale]
                                    }
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                <span>
                                    {
                                        {
                                            de: 'Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO), insbesondere bei Verarbeitung auf Grundlage berechtigter Interessen',
                                            en: 'Right to object to processing (Art. 21 GDPR), in particular against processing based on legitimate interests',
                                        }[locale]
                                    }
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                <span>
                                    {
                                        {
                                            de: 'Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
                                            en: 'Right to withdraw a given consent with effect for the future (Art. 7 (3) GDPR)',
                                        }[locale]
                                    }
                                </span>
                            </li>
                        </ul>
                        <p className="mt-4">
                            {
                                {
                                    de: 'Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an die in Ziffer 1 genannten Kontaktdaten.',
                                    en: 'To exercise your rights, an informal message to the contact details given in section 1 is sufficient.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-11-beschwerderecht"
                        heading={{ de: '11. Beschwerderecht', en: '11. Right to lodge a complaint' }[locale]}
                    >
                        <p>
                            {
                                {
                                    de: 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren (Art. 77 DSGVO). Zuständig für unsere Praxis ist:',
                                    en: 'You have the right to lodge a complaint with a data-protection supervisory authority about our processing of your personal data (Art. 77 GDPR). The authority responsible for our practice is:',
                                }[locale]
                            }
                        </p>
                        <address className="mt-3 not-italic">
                            {
                                {
                                    de: 'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz',
                                    en: 'State Commissioner for Data Protection and Freedom of Information of Rhineland-Palatinate',
                                }[locale]
                            }
                            <br />
                            Hintere Bleiche 34
                            <br />
                            55116 Mainz
                            <br />
                            <a
                                href="https://www.datenschutz.rlp.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aubergine hover:underline"
                            >
                                www.datenschutz.rlp.de
                            </a>
                        </address>
                    </Block>

                    <Block
                        id="block-12-keine-automatisierung"
                        heading={
                            {
                                de: '12. Keine automatisierte Entscheidungsfindung',
                                en: '12. No automated decision-making',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Eine automatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO oder ein Profiling findet nicht statt.',
                                    en: 'No automated decision-making within the meaning of Art. 22 GDPR and no profiling takes place.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-13-aktualisierungen"
                        heading={
                            {
                                de: '13. Aktualisierungen dieser Erklärung',
                                en: '13. Updates to this statement',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wir passen diese Datenschutzerklärung an, wenn sich die zugrunde liegende Datenverarbeitung ändert oder neue rechtliche Anforderungen umzusetzen sind. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.',
                                    en: 'We update this privacy statement when the underlying processing changes or new legal requirements need to be implemented. The current version is always available on this page.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                            {{ de: 'Stand', en: 'Last updated' }[locale]}: {POLICY_VERSION[locale]}
                        </p>
                    </Block>
                </div>
            </section>
        </main>
    );
}

function Block({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-20">
            <h2 className="font-serif text-2xl font-semibold text-aubergine-dark">{heading}</h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}
