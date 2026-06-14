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
const POLICY_VERSION = { de: '13. Juni 2026', en: '13 June 2026', ru: '13 июня 2026 г.', ar: '13 يونيو 2026' };

export const Route = createFileRoute('/{-$locale}/datenschutz')({
    loader: () => routeLoaderGraphqlClient(DatenschutzPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: {
                de: 'Datenschutzerklärung',
                en: 'Privacy policy',
                ru: 'Политика конфиденциальности',
                ar: 'سياسة الخصوصية',
            }[locale],
            description: {
                de: 'Datenschutzerklärung der Praxis Podologie Dudenhofen — welche Daten wir verarbeiten, auf welcher Rechtsgrundlage und wie Sie Ihre Rechte ausüben.',
                en: 'Privacy policy of Podologie Dudenhofen — which data we process, on what legal basis and how to exercise your rights.',
                ru: 'Политика конфиденциальности практики Podologie Dudenhofen — какие данные мы обрабатываем, на каком правовом основании и как вы можете осуществить свои права.',
                ar: 'سياسة الخصوصية لعيادة Podologie Dudenhofen — البيانات التي نعالجها والأساس القانوني لذلك وكيفية ممارسة حقوقكم.',
            }[locale],
            path: '/datenschutz',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                {
                    name: { de: 'Datenschutz', en: 'Privacy', ru: 'Конфиденциальность', ar: 'الخصوصية' }[locale],
                    path: '/datenschutz',
                },
            ],
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
                <SectionEyebrow>
                    {{ de: 'Rechtliches', en: 'Legal', ru: 'Правовая информация', ar: 'معلومات قانونية' }[locale]}
                </SectionEyebrow>
                <h1 className="mt-6 font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                    {
                        {
                            de: 'Datenschutzerklärung',
                            en: 'Privacy policy',
                            ru: 'Политика конфиденциальности',
                            ar: 'سياسة الخصوصية',
                        }[locale]
                    }
                </h1>
                <p className="mt-6 text-(--color-brand-charcoal-2)">
                    {
                        {
                            de: 'Diese Erklärung beschreibt, welche personenbezogenen Daten wir beim Besuch dieser Webseite und bei einer Kontaktaufnahme verarbeiten und worauf sich die Verarbeitung rechtlich stützt.',
                            en: 'This statement describes which personal data we process when you visit this website or contact us, and on what legal basis.',
                            ru: 'В настоящем заявлении описано, какие персональные данные мы обрабатываем при посещении этого веб-сайта и при обращении к нам, а также на каком правовом основании осуществляется такая обработка.',
                            ar: 'يصف هذا البيان البيانات الشخصية التي نعالجها عند زيارتكم لهذا الموقع الإلكتروني أو عند التواصل معنا، والأساس القانوني الذي تستند إليه المعالجة.',
                        }[locale]
                    }
                </p>
                <p className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                    {{ de: 'Stand', en: 'Last updated', ru: 'Дата редакции', ar: 'آخر تحديث' }[locale]}:{' '}
                    {POLICY_VERSION[locale]}
                </p>
            </section>

            {/* Body */}
            <section className="mx-auto max-w-3xl px-6 pb-24">
                <div className="space-y-12 leading-relaxed text-(--color-brand-charcoal-2)">
                    <Block
                        id="block-1-verantwortlicher"
                        heading={
                            {
                                de: '1. Verantwortlicher',
                                en: '1. Controller',
                                ru: '1. Контролёр данных',
                                ar: '1. المسؤول عن المعالجة',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Verantwortliche im Sinne des Art. 4 Nr. 7 DSGVO ist:',
                                    en: 'The controller within the meaning of Art. 4 (7) GDPR is:',
                                    ru: 'Контролёром в значении ст. 4 п. 7 DSGVO (GDPR) является:',
                                    ar: 'المسؤول عن المعالجة بالمعنى الوارد في المادة 4 (7) من DSGVO (GDPR) هو:',
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
                            {{ de: 'Deutschland', en: 'Germany', ru: 'Германия', ar: 'ألمانيا' }[locale]}
                        </address>
                        <p className="mt-3">
                            {{ de: 'Telefon', en: 'Phone', ru: 'Телефон', ar: 'الهاتف' }[locale]}:{' '}
                            <a href={`tel:${PRACTICE.phone}`} className="text-aubergine hover:underline">
                                {formatPhoneNumber(PRACTICE.phone)}
                            </a>
                            <br />
                            {{ de: 'E-Mail', en: 'Email', ru: 'Электронная почта', ar: 'البريد الإلكتروني' }[locale]}:{' '}
                            <a href={`mailto:${PRACTICE.email}`} className="text-aubergine hover:underline">
                                {PRACTICE.email}
                            </a>
                        </p>
                    </Block>

                    <Block
                        id="block-2-allgemeines"
                        heading={
                            {
                                de: '2. Allgemeines zur Datenverarbeitung',
                                en: '2. General principles',
                                ru: '2. Общие положения об обработке данных',
                                ar: '2. مبادئ عامة لمعالجة البيانات',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wir verarbeiten personenbezogene Daten nur, soweit dies erforderlich ist, um eine funktionsfähige Webseite bereitzustellen, Anfragen zu beantworten und Termine zu organisieren. Rechtsgrundlagen sind je nach Verarbeitung Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Anbahnung oder Erfüllung eines Behandlungsvertrags (Art. 6 Abs. 1 lit. b DSGVO), eine rechtliche Verpflichtung (lit. c) oder unser berechtigtes Interesse am sicheren und benutzerfreundlichen Betrieb der Webseite (lit. f). Soweit Gesundheitsdaten betroffen sind, stützt sich die Verarbeitung zusätzlich auf Art. 9 Abs. 2 lit. h DSGVO i. V. m. § 22 BDSG.',
                                    en: 'We process personal data only insofar as it is necessary to operate a functioning website, respond to enquiries and schedule appointments. Depending on the processing, the legal basis is your consent (Art. 6 (1) (a) GDPR), the initiation or performance of a treatment contract (Art. 6 (1) (b)), a legal obligation (lit. c) or our legitimate interest in the secure, user-friendly operation of the website (lit. f). Where health data is involved, processing is additionally based on Art. 9 (2) (h) GDPR in conjunction with § 22 BDSG.',
                                    ru: 'Мы обрабатываем персональные данные лишь в той мере, в какой это необходимо для обеспечения работоспособности веб-сайта, ответа на запросы и организации записи на приём. В зависимости от вида обработки правовым основанием служат ваше согласие (Art. 6 Abs. 1 lit. a DSGVO), заключение или исполнение договора об оказании услуг (Art. 6 Abs. 1 lit. b DSGVO), правовое обязательство (lit. c) либо наш законный интерес в безопасной и удобной работе сайта (lit. f). В случаях, когда обрабатываются данные о здоровье, обработка дополнительно основывается на Art. 9 Abs. 2 lit. h DSGVO в сочетании с § 22 BDSG.',
                                    ar: 'نعالج البيانات الشخصية فقط بالقدر اللازم لتشغيل موقع إلكتروني فعّال والرد على الاستفسارات وتنظيم المواعيد. ووفقاً لنوع المعالجة، يكون الأساس القانوني هو موافقتكم (Art. 6 Abs. 1 lit. a DSGVO)، أو الإعداد لعقد علاج أو تنفيذه (Art. 6 Abs. 1 lit. b DSGVO)، أو التزام قانوني (lit. c)، أو مصلحتنا المشروعة في تشغيل الموقع بشكل آمن وسهل الاستخدام (lit. f). وعند تعلّق الأمر بالبيانات الصحية، تستند المعالجة إضافةً إلى Art. 9 Abs. 2 lit. h DSGVO بالاقتران مع § 22 BDSG.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-3-server-logs"
                        heading={
                            {
                                de: '3. Beim Aufruf der Webseite (Server-Logs)',
                                en: '3. Server logs',
                                ru: '3. Журналы сервера при обращении к веб-сайту',
                                ar: '3. سجلات الخادم عند زيارة الموقع',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Beim Aufruf dieser Webseite verarbeitet unser Hosting-Anbieter technisch notwendige Verbindungsdaten in Server-Protokolldateien: IP-Adresse, Datum und Uhrzeit, aufgerufene Ressource, HTTP-Statuscode, übertragene Datenmenge, Referrer und User-Agent. Diese Daten sind notwendig, um die Webseite auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nur so lange gespeichert, wie es zu diesem Zweck erforderlich ist, und dann gelöscht; eine Zusammenführung mit anderen Datenbeständen findet nicht statt.',
                                    en: 'When you load this website, our hosting provider processes technically necessary connection data in server log files: IP address, date and time, the resource requested, HTTP status code, transferred data volume, referrer and user agent. This data is needed to deliver the site, ensure its stability and security, and prevent abuse. The legal basis is Art. 6 (1) (f) GDPR. The data is stored only as long as necessary for that purpose and is then deleted; it is not merged with other data sets.',
                                    ru: 'При обращении к этому веб-сайту наш хостинг-провайдер обрабатывает технически необходимые данные соединения в журнальных файлах сервера: IP-адрес, дату и время, запрошенный ресурс, код состояния HTTP, объём переданных данных, реферер и user-agent. Эти данные необходимы для доставки сайта, обеспечения его стабильности и безопасности, а также для предотвращения злоупотреблений. Правовое основание — Art. 6 Abs. 1 lit. f DSGVO. Данные хранятся только столько, сколько необходимо для указанной цели, после чего удаляются; их объединение с другими наборами данных не производится.',
                                    ar: 'عند زيارتكم لهذا الموقع، يعالج مزوّد الاستضافة لدينا بيانات الاتصال اللازمة تقنياً في ملفات سجلات الخادم: عنوان IP، التاريخ والوقت، المورد المطلوب، رمز حالة HTTP، حجم البيانات المنقولة، المُحيل (Referrer)، ووكيل المستخدم (User-Agent). هذه البيانات ضرورية لتقديم الموقع وضمان استقراره وأمنه ومنع إساءة الاستخدام. الأساس القانوني هو Art. 6 Abs. 1 lit. f DSGVO. تُحفظ البيانات فقط للمدة اللازمة لهذا الغرض ثم تُحذف، ولا يتم دمجها مع مجموعات بيانات أخرى.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-4-cookies"
                        heading={
                            { de: '4. Cookies', en: '4. Cookies', ru: '4. Файлы cookie', ar: '4. ملفات تعريف الارتباط' }[
                                locale
                            ]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wir setzen ausschließlich technisch notwendige Cookies ein. Es findet kein Tracking statt, keine Reichweitenmessung und keine Cookies von Dritten zu Werbezwecken. Eine Einwilligung nach § 25 Abs. 1 TTDSG ist nicht erforderlich, weil die Speicherung gemäß § 25 Abs. 2 Nr. 2 TTDSG unbedingt erforderlich ist, um den von Ihnen gewünschten Dienst zur Verfügung zu stellen.',
                                    en: 'We use only strictly necessary cookies. There is no tracking, no analytics and no third-party advertising cookies. Consent under § 25 (1) TTDSG is not required, because storage is strictly necessary to provide the service you requested (§ 25 (2) Nr. 2 TTDSG).',
                                    ru: 'Мы используем исключительно технически необходимые файлы cookie. Отслеживание, веб-аналитика и рекламные cookie третьих сторон отсутствуют. Согласие в соответствии с § 25 Abs. 1 TTDSG не требуется, поскольку хранение, согласно § 25 Abs. 2 Nr. 2 TTDSG, строго необходимо для предоставления запрошенной вами услуги.',
                                    ar: 'نستخدم فقط ملفات تعريف الارتباط اللازمة تقنياً. لا يوجد أي تتبّع ولا قياس للإقبال ولا ملفات تعريف ارتباط تابعة لأطراف ثالثة لأغراض إعلانية. ولا يلزم الحصول على موافقة بموجب § 25 Abs. 1 TTDSG، لأن التخزين ضروري ضرورة قاطعة لتقديم الخدمة التي طلبتموها وفقاً لـ § 25 Abs. 2 Nr. 2 TTDSG.',
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
                                            ru: 'Идентифицирует ваш сеанс на стороне сервера (например, для сохранения состояния в чате). HttpOnly, Secure, SameSite=Strict. Создаётся при первом посещении и деактивируется на стороне сервера по завершении сеанса.',
                                            ar: 'يحدّد جلستكم على جانب الخادم (مثلاً للحفاظ على الحالة في المحادثة). HttpOnly، Secure، SameSite=Strict. يُنشأ عند أول زيارة ويُعطَّل على جانب الخادم عند انتهاء الجلسة.',
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
                                            ru: 'Сохраняет выбранный вами язык, чтобы при следующем посещении сайт встретил вас на нужном языке. SameSite=Lax, срок действия — один год.',
                                            ar: 'يحفظ اللغة التي اخترتموها كي يستقبلكم الموقع باللغة الصحيحة في زيارتكم القادمة. SameSite=Lax، ومدة الصلاحية سنة واحدة.',
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
                                    ru: 'Вы в любое время можете удалить файлы cookie в настройках своего браузера или ограничить их приём; однако без сессионного cookie чат-ассистент и языкозависимые функции не будут работать надёжно.',
                                    ar: 'يمكنكم في أي وقت حذف ملفات تعريف الارتباط أو تقييد قبولها من إعدادات متصفّحكم؛ غير أنه بدون ملف تعريف ارتباط الجلسة لن يعمل مساعد المحادثة والوظائف المرتبطة باللغة بشكل موثوق.',
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
                                ru: '5. Контакт по телефону и электронной почте',
                                ar: '5. التواصل عبر الهاتف والبريد الإلكتروني',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wenn Sie uns telefonisch oder per E-Mail erreichen, verarbeiten wir die von Ihnen mitgeteilten Daten — typischerweise Name, Kontaktmöglichkeit und Anliegen — ausschließlich, um Ihre Anfrage zu beantworten oder einen Termin zu vereinbaren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss oder die Durchführung eines Behandlungsvertrags gerichtet ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO an einer effizienten Bearbeitung von Anfragen.',
                                    en: 'When you contact us by phone or email, we process the data you provide — typically name, contact information and your concern — solely in order to respond to your enquiry or arrange an appointment. The legal basis is Art. 6 (1) (b) GDPR insofar as your enquiry concerns the conclusion or performance of a treatment contract; otherwise Art. 6 (1) (f) GDPR for efficient handling of enquiries.',
                                    ru: 'Когда вы связываетесь с нами по телефону или электронной почте, мы обрабатываем сообщённые вами данные — обычно имя, контактные данные и суть обращения — исключительно для ответа на ваш запрос или согласования записи на приём. Правовым основанием является Art. 6 Abs. 1 lit. b DSGVO в той мере, в какой ваш запрос направлен на заключение или исполнение договора об оказании услуг; в остальных случаях — Art. 6 Abs. 1 lit. f DSGVO в целях эффективной обработки обращений.',
                                    ar: 'عندما تتواصلون معنا هاتفياً أو عبر البريد الإلكتروني، نعالج البيانات التي تقدّمونها — عادةً الاسم وبيانات التواصل وموضوع الطلب — حصراً للرد على استفساركم أو تحديد موعد. والأساس القانوني هو Art. 6 Abs. 1 lit. b DSGVO إذا كان طلبكم متعلّقاً بإبرام عقد علاج أو تنفيذه؛ وفي ما عدا ذلك Art. 6 Abs. 1 lit. f DSGVO من أجل المعالجة الفعّالة للاستفسارات.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Wir löschen die Daten, sobald sie für die Beantwortung Ihrer Anfrage nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Werden Inhalte Teil einer Patientenakte, gilt die Aufbewahrungsfrist nach § 630f BGB von zehn Jahren; steuer- und handelsrechtliche Aufbewahrungspflichten (z. B. § 257 HGB, § 147 AO) bleiben unberührt.',
                                    en: 'We delete the data as soon as it is no longer needed to respond to your request, unless statutory retention obligations apply. If content becomes part of a patient file, the ten-year retention period under § 630f BGB applies; statutory retention obligations under tax and commercial law (e.g. § 257 HGB, § 147 AO) remain unaffected.',
                                    ru: 'Мы удаляем данные, как только они больше не нужны для ответа на ваш запрос, если этому не препятствуют установленные законом обязательства по хранению. Если содержание становится частью медицинской документации пациента, применяется десятилетний срок хранения согласно § 630f BGB; обязательства по хранению, предусмотренные налоговым и коммерческим правом (например, § 257 HGB, § 147 AO), остаются в силе.',
                                    ar: 'نحذف البيانات بمجرد أن تصبح غير ضرورية للرد على طلبكم، ما لم تكن هناك التزامات قانونية بالاحتفاظ بها. وإذا أصبح المحتوى جزءاً من ملف المريض، فتُطبَّق مدة الاحتفاظ البالغة عشر سنوات وفقاً لـ § 630f BGB؛ كما تبقى التزامات الاحتفاظ المنصوص عليها في القانون الضريبي والتجاري (مثل § 257 HGB، § 147 AO) سارية دون تأثّر.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Bitte beachten Sie, dass die Übertragung per unverschlüsselter E-Mail Sicherheitslücken aufweisen kann; teilen Sie sensible Gesundheitsdaten lieber im persönlichen Gespräch oder am Telefon.',
                                    en: 'Please note that unencrypted email may expose information in transit; please prefer the phone or an in-person conversation for sensitive health information.',
                                    ru: 'Обратите внимание, что передача по незашифрованной электронной почте может иметь уязвимости; конфиденциальные сведения о здоровье лучше сообщать в личной беседе или по телефону.',
                                    ar: 'يرجى الانتباه إلى أن الإرسال عبر بريد إلكتروني غير مشفّر قد يكون عرضةً لثغرات أمنية؛ ويُفضَّل مشاركة المعلومات الصحية الحسّاسة في حديث شخصي أو هاتفي.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-6-google-maps"
                        heading={
                            {
                                de: '6. Eingebettete Karte (Google Maps)',
                                en: '6. Embedded map (Google Maps)',
                                ru: '6. Встроенная карта (Google Maps)',
                                ar: '6. الخريطة المضمَّنة (Google Maps)',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Auf der Seite ',
                                    en: 'On ',
                                    ru: 'На странице ',
                                    ar: 'في صفحة ',
                                }[locale]
                            }
                            <Link to="/{-$locale}/kontakt" hash="anfahrt" className="text-aubergine hover:underline">
                                {
                                    {
                                        de: 'Kontakt → Anfahrt',
                                        en: 'Contact → How to find us',
                                        ru: 'Контакты → Как добраться',
                                        ar: 'التواصل ← كيفية الوصول',
                                    }[locale]
                                }
                            </Link>
                            {
                                {
                                    de: ' binden wir eine Karte über einen iframe von Google ein, damit Sie die Praxis schnell finden. Beim Aufruf der Seite verbindet sich Ihr Browser direkt mit Servern von Google Ireland Ltd. (Google Building, Gordon House, Barrow Street, Dublin 4, Irland) bzw. — bei Datenübermittlung in die USA — Google LLC. Dabei können IP-Adresse, Browser-Informationen und Aufrufdatum verarbeitet werden. Auf den Inhalt und Umfang dieser Datenverarbeitung haben wir keinen Einfluss.',
                                    en: ' we embed a map via an iframe from Google so you can locate the practice quickly. When you load that page, your browser connects directly to servers operated by Google Ireland Ltd. (Google Building, Gordon House, Barrow Street, Dublin 4, Ireland) or — for data transferred to the United States — Google LLC. IP address, browser information and the time of request may be processed. We have no control over the scope or content of this processing.',
                                    ru: ' мы встраиваем карту через iframe от Google, чтобы вы быстро могли найти практику. При загрузке этой страницы ваш браузер устанавливает прямое соединение с серверами Google Ireland Ltd. (Google Building, Gordon House, Barrow Street, Dublin 4, Ирландия) либо — при передаче данных в США — Google LLC. При этом могут обрабатываться IP-адрес, сведения о браузере и время обращения. На объём и содержание такой обработки данных мы не имеем влияния.',
                                    ar: ' نقوم بتضمين خريطة عبر إطار iframe من Google لتتمكنوا من الوصول إلى العيادة بسرعة. وعند تحميل تلك الصفحة يتصل متصفّحكم مباشرةً بخوادم Google Ireland Ltd. (Google Building, Gordon House, Barrow Street, Dublin 4, إيرلندا) أو — في حال نقل البيانات إلى الولايات المتحدة — Google LLC. وقد يتم في هذا السياق معالجة عنوان IP ومعلومات المتصفح ووقت الطلب. وليس لدينا أي تأثير على نطاق هذه المعالجة أو محتواها.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse besteht darin, Ihnen die Anfahrt anschaulich darzustellen. Die Übermittlung in die USA stützt sich auf den EU-US Data Privacy Framework. Möchten Sie diese Datenübermittlung vermeiden, nutzen Sie auf der Anfahrtsseite die Schaltflächen „Google Maps öffnen" oder „Apple Maps öffnen" — diese werden erst nach einem Klick aktiv. Weitere Informationen finden Sie in der Datenschutzerklärung von Google: ',
                                    en: 'The legal basis is Art. 6 (1) (f) GDPR; our legitimate interest is showing you how to reach the practice. Transfers to the United States rely on the EU–US Data Privacy Framework. To avoid this data transfer, use the "Open Google Maps" / "Open Apple Maps" buttons on the same page — they become active only when clicked. For more information see Google\'s privacy policy: ',
                                    ru: 'Правовое основание — Art. 6 Abs. 1 lit. f DSGVO; наш законный интерес заключается в наглядном представлении пути к практике. Передача данных в США опирается на EU-US Data Privacy Framework. Если вы хотите избежать такой передачи данных, воспользуйтесь на странице «Как добраться» кнопками «Открыть Google Maps» или «Открыть Apple Maps» — они активируются только после клика. Дополнительную информацию вы найдёте в политике конфиденциальности Google: ',
                                    ar: 'الأساس القانوني هو Art. 6 Abs. 1 lit. f DSGVO؛ ومصلحتنا المشروعة هي توضيح طريقة الوصول إلى العيادة. ويستند نقل البيانات إلى الولايات المتحدة إلى EU-US Data Privacy Framework. وإذا رغبتم في تجنّب هذا النقل، فاستخدموا في الصفحة ذاتها زرّي «فتح Google Maps» أو «فتح Apple Maps» — حيث لا يصبحان نشطَين إلا بعد النقر. لمزيد من المعلومات يُرجى الاطلاع على سياسة خصوصية Google: ',
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

                    <Block
                        id="block-7-ai-chat"
                        heading={
                            {
                                de: '7. AI-Assistent (Chat)',
                                en: '7. AI assistant (chat)',
                                ru: '7. AI-ассистент (чат)',
                                ar: '7. المساعد الذكي (المحادثة)',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Auf dieser Webseite ist ein optionaler Chat-Assistent erreichbar, der allgemeine Fragen rund um die Praxis beantwortet (z. B. zu Leistungen oder Öffnungszeiten). Hierfür nutzen wir das Sprachmodell Gemini von Google (Google Ireland Ltd., bzw. — bei Datenübermittlung in die USA — Google LLC). Ihre Eingaben sowie die Antworten des Modells werden zur Inferenz an Google übertragen. Zusätzlich speichern wir den Verlauf in unserer eigenen Datenbank und verknüpfen ihn mit Ihrer Sitzung, damit Sie das Gespräch fortsetzen können.',
                                    en: "This website offers an optional chat assistant that answers general questions about the practice (e.g. services or opening hours). We use Google's Gemini language model (Google Ireland Ltd., or — for data transfers to the United States — Google LLC). Your prompts and the model's responses are sent to Google for inference. In addition we store the conversation in our own database, linked to your session, so you can continue the conversation later.",
                                    ru: 'На этом веб-сайте доступен необязательный чат-ассистент, отвечающий на общие вопросы о практике (например, об услугах или часах работы). Для этого мы используем языковую модель Gemini от Google (Google Ireland Ltd. либо — при передаче данных в США — Google LLC). Ваши вводы, а также ответы модели передаются в Google для выполнения вывода. Кроме того, мы сохраняем историю в нашей собственной базе данных и связываем её с вашим сеансом, чтобы вы могли продолжить разговор позднее.',
                                    ar: 'يتوفّر على هذا الموقع مساعد محادثة اختياري يجيب على الأسئلة العامة حول العيادة (مثل الخدمات أو ساعات العمل). ولهذا الغرض نستخدم نموذج اللغة Gemini من Google (Google Ireland Ltd.، أو — في حال نقل البيانات إلى الولايات المتحدة — Google LLC). تُرسَل مدخلاتكم وإجابات النموذج إلى Google لإجراء الاستدلال. كما نحفظ سجل المحادثة في قاعدة بياناتنا الخاصة ونربطه بجلستكم حتى تتمكنوا من متابعة المحادثة لاحقاً.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse besteht in der niedrigschwelligen Beantwortung allgemeiner Fragen ohne telefonische Belastung. Die Datenübermittlung in die USA stützt sich auf den EU-US Data Privacy Framework. Die Nutzung des Chats ist freiwillig.',
                                    en: 'The legal basis is Art. 6 (1) (f) GDPR; our legitimate interest is providing low-threshold answers to general questions without burdening the phone line. Transfers to the United States rely on the EU–US Data Privacy Framework. Use of the chat is voluntary.',
                                    ru: 'Правовое основание — Art. 6 Abs. 1 lit. f DSGVO; наш законный интерес состоит в простом и доступном ответе на общие вопросы без нагрузки на телефонную линию. Передача данных в США опирается на EU-US Data Privacy Framework. Использование чата является добровольным.',
                                    ar: 'الأساس القانوني هو Art. 6 Abs. 1 lit. f DSGVO؛ ومصلحتنا المشروعة هي تقديم إجابات سهلة الوصول على الأسئلة العامة دون إثقال الخط الهاتفي. ويستند نقل البيانات إلى الولايات المتحدة إلى EU-US Data Privacy Framework. واستخدام المحادثة طوعي.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Bitte geben Sie im Chat keine Diagnosen, Namen Dritter oder andere sensible Informationen ein, die Sie auch in einer offenen E-Mail nicht teilen würden. Für medizinische Anliegen wenden Sie sich bitte direkt an die Praxis.',
                                    en: 'Please do not enter diagnoses, names of others or other sensitive information you would not share in an open email. For medical concerns, please contact the practice directly.',
                                    ru: 'Пожалуйста, не вводите в чате диагнозы, имена третьих лиц или иную конфиденциальную информацию, которую вы не сообщили бы в открытом письме. По медицинским вопросам обращайтесь, пожалуйста, непосредственно в практику.',
                                    ar: 'يُرجى عدم إدخال أي تشخيصات أو أسماء أشخاص آخرين أو أي معلومات حساسة في المحادثة لم تكونوا لتشاركوها في بريد إلكتروني مفتوح. وللاستفسارات الطبية يُرجى التواصل مع العيادة مباشرة.',
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
                                ru: '8. Внешние ссылки (телефон, электронная почта, Apple Maps)',
                                ar: '8. الروابط الخارجية (الهاتف، البريد الإلكتروني، Apple Maps)',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Telefon-, Mailto- und Apple-Maps-Links auf dieser Webseite öffnen Anwendungen oder Webseiten Dritter (Telefon-App, E-Mail-Programm bzw. Apple Inc.). Diese Aufrufe sind durch Sie ausgelöst; die nachfolgende Datenverarbeitung liegt außerhalb unseres Einflussbereichs und richtet sich nach den jeweiligen Datenschutzbestimmungen der Anbieter.',
                                    en: "Phone, mailto and Apple Maps links on this site open third-party applications or websites (your phone app, your email client, or Apple Inc.). These actions are initiated by you; the resulting data processing is outside our control and is governed by the relevant providers' privacy policies.",
                                    ru: 'Телефонные, mailto- и Apple-Maps-ссылки на этом веб-сайте открывают приложения или веб-сайты третьих сторон (ваше приложение телефона, почтовый клиент или Apple Inc.). Эти действия инициируются вами; последующая обработка данных находится вне нашего контроля и регулируется соответствующими политиками конфиденциальности провайдеров.',
                                    ar: 'تفتح روابط الهاتف وmailto وApple Maps على هذا الموقع تطبيقات أو مواقع تابعة لأطراف ثالثة (تطبيق الهاتف لديكم، أو برنامج البريد الإلكتروني، أو Apple Inc.). وتُتَّخذ هذه الإجراءات بمبادرة منكم؛ ومعالجة البيانات الناتجة تقع خارج نطاق سيطرتنا وتخضع لسياسات الخصوصية الخاصة بمقدّمي الخدمة المعنيّين.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-9-empfaenger"
                        heading={
                            {
                                de: '9. Empfänger und Auftragsverarbeiter',
                                en: '9. Recipients and processors',
                                ru: '9. Получатели и обработчики по поручению',
                                ar: '9. المتلقّون والمعالجون بالنيابة',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wir setzen sorgfältig ausgewählte Dienstleister ein, die uns beim Betrieb der Webseite unterstützen. Mit diesen Auftragsverarbeitern bestehen Verträge nach Art. 28 DSGVO. Eingesetzt werden insbesondere ein Hosting-Anbieter zur Bereitstellung der Webseite (Server-Logs, siehe Ziffer 3) und Google für Karten und den Chat-Assistenten (siehe Ziffern 6 und 7). Eine Weitergabe an darüber hinausgehende Dritte findet nicht statt, soweit nicht eine gesetzliche Verpflichtung besteht.',
                                    en: 'We use carefully selected service providers to help us operate the website. We have data-processing agreements under Art. 28 GDPR with these processors. In particular we use a hosting provider for serving the site (server logs — see section 3) and Google for the embedded map and chat assistant (see sections 6 and 7). We do not share data with any further third parties unless legally obligated to do so.',
                                    ru: 'Мы привлекаем тщательно отобранных поставщиков услуг, которые помогают нам в эксплуатации веб-сайта. С этими обработчиками заключены договоры в соответствии с Art. 28 DSGVO. В частности, привлекаются хостинг-провайдер для предоставления веб-сайта (журналы сервера — см. раздел 3) и Google для карт и чат-ассистента (см. разделы 6 и 7). Передача данных другим третьим сторонам не производится, если не существует соответствующего правового обязательства.',
                                    ar: 'نستعين بمقدّمي خدمات تم اختيارهم بعناية ليساعدونا في تشغيل الموقع. وقد أبرمنا مع هؤلاء المعالجين بالنيابة اتفاقيات معالجة البيانات وفقاً لـ Art. 28 DSGVO. ونستعين على وجه الخصوص بمزوّد استضافة لتقديم الموقع (سجلات الخادم — انظر الفقرة 3) وبشركة Google للخرائط ومساعد المحادثة (انظر الفقرتين 6 و7). ولا نشارك البيانات مع أي أطراف ثالثة أخرى إلا إذا كان هناك التزام قانوني بذلك.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-10-rechte"
                        heading={
                            { de: '10. Ihre Rechte', en: '10. Your rights', ru: '10. Ваши права', ar: '10. حقوقكم' }[
                                locale
                            ]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Sie haben uns gegenüber jederzeit folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:',
                                    en: 'With regard to the personal data concerning you, you have the following rights at any time:',
                                    ru: 'В отношении касающихся вас персональных данных вы в любое время имеете перед нами следующие права:',
                                    ar: 'لديكم في أي وقت في مواجهتنا الحقوق التالية بشأن البيانات الشخصية المتعلقة بكم:',
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
                                            ru: 'Право на доступ (Art. 15 DSGVO)',
                                            ar: 'الحق في الوصول إلى البيانات (Art. 15 DSGVO)',
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
                                            ru: 'Право на исправление (Art. 16 DSGVO)',
                                            ar: 'الحق في التصحيح (Art. 16 DSGVO)',
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
                                            ru: 'Право на удаление (Art. 17 DSGVO)',
                                            ar: 'الحق في المحو (Art. 17 DSGVO)',
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
                                            ru: 'Право на ограничение обработки (Art. 18 DSGVO)',
                                            ar: 'الحق في تقييد المعالجة (Art. 18 DSGVO)',
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
                                            ru: 'Право на переносимость данных (Art. 20 DSGVO)',
                                            ar: 'الحق في نقل البيانات (Art. 20 DSGVO)',
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
                                            ru: 'Право на возражение против обработки (Art. 21 DSGVO), в частности при обработке на основании законных интересов',
                                            ar: 'الحق في الاعتراض على المعالجة (Art. 21 DSGVO)، لا سيما المعالجة المستندة إلى المصالح المشروعة',
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
                                            ru: 'Право отозвать данное согласие с действием на будущее (Art. 7 Abs. 3 DSGVO)',
                                            ar: 'الحق في سحب الموافقة الممنوحة بأثر مستقبلي (Art. 7 Abs. 3 DSGVO)',
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
                                    ru: 'Для осуществления ваших прав достаточно неформального сообщения по контактным данным, указанным в разделе 1.',
                                    ar: 'لممارسة حقوقكم تكفي رسالة غير رسمية إلى بيانات التواصل المذكورة في الفقرة 1.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-11-beschwerderecht"
                        heading={
                            {
                                de: '11. Beschwerderecht',
                                en: '11. Right to lodge a complaint',
                                ru: '11. Право на подачу жалобы',
                                ar: '11. الحق في تقديم شكوى',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren (Art. 77 DSGVO). Zuständig für unsere Praxis ist:',
                                    en: 'You have the right to lodge a complaint with a data-protection supervisory authority about our processing of your personal data (Art. 77 GDPR). The authority responsible for our practice is:',
                                    ru: 'Вы имеете право подать жалобу в надзорный орган по защите данных на обработку нами ваших персональных данных (Art. 77 DSGVO). Для нашей практики компетентным является:',
                                    ar: 'يحق لكم تقديم شكوى إلى هيئة الرقابة على حماية البيانات بشأن معالجتنا لبياناتكم الشخصية (Art. 77 DSGVO). والجهة المختصّة بعيادتنا هي:',
                                }[locale]
                            }
                        </p>
                        <address className="mt-3 not-italic">
                            {
                                {
                                    de: 'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz',
                                    en: 'State Commissioner for Data Protection and Freedom of Information of Rhineland-Palatinate',
                                    ru: 'Уполномоченный земли по защите данных и свободе информации земли Рейнланд-Пфальц (Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz)',
                                    ar: 'مفوّض ولاية راينلاند-بفالتس لحماية البيانات وحرية المعلومات (Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz)',
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
                                ru: '12. Отсутствие автоматизированного принятия решений',
                                ar: '12. لا يوجد اتخاذ قرارات آلي',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Eine automatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO oder ein Profiling findet nicht statt.',
                                    en: 'No automated decision-making within the meaning of Art. 22 GDPR and no profiling takes place.',
                                    ru: 'Автоматизированное принятие решений в значении Art. 22 DSGVO и профилирование не осуществляются.',
                                    ar: 'لا يجري أي اتخاذ قرارات آلي بالمعنى الوارد في Art. 22 DSGVO ولا أي تنميط.',
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
                                ru: '13. Обновления настоящего заявления',
                                ar: '13. تحديثات هذا البيان',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wir passen diese Datenschutzerklärung an, wenn sich die zugrunde liegende Datenverarbeitung ändert oder neue rechtliche Anforderungen umzusetzen sind. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.',
                                    en: 'We update this privacy statement when the underlying processing changes or new legal requirements need to be implemented. The current version is always available on this page.',
                                    ru: 'Мы обновляем настоящую политику конфиденциальности при изменении лежащей в её основе обработки данных или при необходимости внедрения новых правовых требований. Актуальная редакция всегда доступна на этой странице.',
                                    ar: 'نقوم بتحديث بيان الخصوصية هذا عند تغيُّر المعالجة التي يستند إليها أو عند الحاجة إلى تنفيذ متطلّبات قانونية جديدة. وتتوفّر النسخة السارية دوماً على هذه الصفحة.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                            {{ de: 'Stand', en: 'Last updated', ru: 'Дата редакции', ar: 'آخر تحديث' }[locale]}:{' '}
                            {POLICY_VERSION[locale]}
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
