import { createFileRoute, Link } from '@tanstack/react-router';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

// Stand der Erklärung — bei jeder inhaltlichen Änderung mitziehen.
const STATEMENT_VERSION = { de: '17. Juni 2026', en: '17 June 2026', ru: '17 июня 2026 г.', ar: '17 يونيو 2026' };

export const Route = createFileRoute('/{-$locale}/barrierefreiheit')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: {
                de: 'Erklärung zur Barrierefreiheit',
                en: 'Accessibility statement',
                ru: 'Заявление о доступности',
                ar: 'بيان إمكانية الوصول',
            }[locale],
            description: {
                de: 'Erklärung zur Barrierefreiheit der Praxis Podologie Dudenhofen — angestrebte Standards, bekannte Einschränkungen und wie Sie uns Hindernisse melden können.',
                en: 'Accessibility statement of Podologie Dudenhofen — the standards we aim for, known limitations, and how to report any barriers you encounter.',
                ru: 'Заявление о доступности практики Podologie Dudenhofen — целевые стандарты, известные ограничения и порядок обращения о выявленных барьерах.',
                ar: 'بيان إمكانية الوصول لعيادة Podologie Dudenhofen — المعايير التي نلتزم بها والقيود المعروفة وكيفية الإبلاغ عن أيّ عوائق.',
            }[locale],
            path: '/barrierefreiheit',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                {
                    name: {
                        de: 'Barrierefreiheit',
                        en: 'Accessibility',
                        ru: 'Доступность',
                        ar: 'إمكانية الوصول',
                    }[locale],
                    path: '/barrierefreiheit',
                },
            ],
        });
    },
    component: BarrierefreiheitPage,
});

function BarrierefreiheitPage() {
    const locale = useLocale();

    return (
        <main id="main-content">
            {/* Hero — cream */}
            <section id="hero" className="mx-auto max-w-3xl scroll-mt-20 px-6 pt-16 pb-12">
                <SectionEyebrow>
                    {{ de: 'Rechtliches', en: 'Legal', ru: 'Правовая информация', ar: 'الشؤون القانونية' }[locale]}
                </SectionEyebrow>
                <h1 className="mt-6 font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                    {
                        {
                            de: 'Erklärung zur Barrierefreiheit',
                            en: 'Accessibility statement',
                            ru: 'Заявление о доступности',
                            ar: 'بيان إمكانية الوصول',
                        }[locale]
                    }
                </h1>
                <p className="mt-6 text-(--color-brand-charcoal-2)">
                    {
                        {
                            de: 'Wir möchten, dass möglichst viele Menschen unsere Website nutzen können — unabhängig von technischen Hilfsmitteln oder körperlichen Voraussetzungen. Diese Erklärung beschreibt, welche Standards wir anstreben, wo es noch Einschränkungen gibt und wie Sie uns auf Hindernisse hinweisen können.',
                            en: 'We want as many people as possible to be able to use this site — regardless of assistive technology or physical ability. This statement explains the standards we aim for, where limitations remain, and how you can let us know about any barriers you encounter.',
                            ru: 'Мы хотим, чтобы нашим сайтом могли пользоваться как можно больше людей — независимо от вспомогательных технологий или физических возможностей. В этом заявлении описаны целевые стандарты, существующие ограничения и порядок обращения о выявленных барьерах.',
                            ar: 'نسعى إلى أن يتمكّن أكبر عدد ممكن من الأشخاص من استخدام موقعنا — بصرف النظر عن التقنيات المساعدة أو القدرات الجسديّة. يُوضّح هذا البيان المعايير التي نلتزم بها، والقيود القائمة، وكيفيّة إبلاغنا بأيّ عائق تواجهونه.',
                        }[locale]
                    }
                </p>
                <p className="mt-4 text-sm text-(--color-brand-charcoal-3)">
                    <span className="font-medium text-aubergine-dark">
                        {
                            {
                                de: 'Stand der Erklärung',
                                en: 'Statement last updated',
                                ru: 'Дата актуализации заявления',
                                ar: 'تاريخ آخر تحديث للبيان',
                            }[locale]
                        }
                        :
                    </span>{' '}
                    {STATEMENT_VERSION[locale]}
                </p>
            </section>

            {/* Body */}
            <section className="mx-auto max-w-3xl px-6 pb-24">
                <div className="space-y-12 leading-relaxed text-(--color-brand-charcoal-2)">
                    <Block
                        id="block-standard"
                        heading={
                            {
                                de: 'Angestrebter Standard',
                                en: 'Standard we aim for',
                                ru: 'Целевой стандарт',
                                ar: 'المعيار المستهدف',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Wir orientieren uns an den Web Content Accessibility Guidelines (WCAG) 2.1 in der Konformitätsstufe AA. Das umfasst unter anderem ausreichende Farbkontraste, klare Bedienung über die Tastatur, sinnvolle Überschriftenstruktur, beschreibende Alternativtexte für Bilder und das Berücksichtigen von „reduzierter Bewegung" als Systemvorgabe.',
                                    en: 'We follow the Web Content Accessibility Guidelines (WCAG) 2.1 at conformance level AA. That covers, among other things, sufficient color contrast, full keyboard operability, a meaningful heading structure, descriptive alt text for images, and respecting the "reduced motion" system preference.',
                                    ru: 'Мы ориентируемся на Руководство по доступности веб-контента (WCAG) 2.1, уровень соответствия AA. Это включает, в частности, достаточный цветовой контраст, полное управление с клавиатуры, осмысленную структуру заголовков, описательные альтернативные тексты для изображений и учёт системной настройки «уменьшенное движение».',
                                    ar: 'نلتزم بإرشادات إتاحة محتوى الويب (WCAG) 2.1 عند مستوى الالتزام AA. ويشمل ذلك — من بين أمور أخرى — تباينًا لونيًّا كافيًا، وإمكانية التشغيل الكامل عبر لوحة المفاتيح، وبنية عناوين منطقية، ونصوصًا بديلة وصفيّة للصور، واحترام إعداد النظام «تقليل الحركة».',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-massnahmen"
                        heading={
                            {
                                de: 'Was wir bereits umgesetzt haben',
                                en: 'What we have implemented',
                                ru: 'Что уже реализовано',
                                ar: 'ما الذي طبّقناه',
                            }[locale]
                        }
                    >
                        <ul className="list-disc space-y-2 ps-6">
                            <li>
                                {
                                    {
                                        de: 'Mehrsprachige Inhalte in Deutsch, Englisch, Russisch und Arabisch — inklusive übersetzter Alternativtexte für alle Bilder.',
                                        en: 'Multilingual content in German, English, Russian, and Arabic — including translated alt text for every image.',
                                        ru: 'Многоязычный контент на немецком, английском, русском и арабском — включая переведённые альтернативные тексты ко всем изображениям.',
                                        ar: 'محتوى متعدّد اللغات بالألمانية والإنجليزية والروسية والعربية — بما في ذلك نصوص بديلة مترجمة لكلّ صورة.',
                                    }[locale]
                                }
                            </li>
                            <li>
                                {
                                    {
                                        de: 'Vollständige Bedienung über die Tastatur, sichtbare Fokusringe und ein Sprung-Link „Zum Inhalt springen" beim ersten Tab.',
                                        en: 'Full keyboard operability, visible focus rings, and a "skip to main content" link on the first tab press.',
                                        ru: 'Полное управление с клавиатуры, видимые кольца фокуса и ссылка «Перейти к содержимому» по первому нажатию Tab.',
                                        ar: 'إمكانية التشغيل الكامل عبر لوحة المفاتيح، وإطارات تركيز ظاهرة، ورابط «الانتقال إلى المحتوى الرئيسي» عند أوّل ضغطة Tab.',
                                    }[locale]
                                }
                            </li>
                            <li>
                                {
                                    {
                                        de: 'Semantische HTML-Struktur (Landmarks, Überschriftenhierarchie ohne Sprünge) und beschriftete Symbol-Schaltflächen.',
                                        en: 'Semantic HTML structure (landmarks, heading hierarchy without skips) and labelled icon-only buttons.',
                                        ru: 'Семантическая HTML-структура (ориентиры, иерархия заголовков без пропусков) и подписанные кнопки-пиктограммы.',
                                        ar: 'بنية HTML دلاليّة (معالم، تسلسل عناوين دون تخطّي) وأزرار رمزيّة بمسمّيات وصفيّة.',
                                    }[locale]
                                }
                            </li>
                            <li>
                                {
                                    {
                                        de: 'Reduzierte Animationen, sobald das Betriebssystem „prefers-reduced-motion" meldet.',
                                        en: 'Reduced animations as soon as the operating system reports "prefers-reduced-motion".',
                                        ru: 'Уменьшение анимаций при включённом системном параметре «prefers-reduced-motion».',
                                        ar: 'تقليل الحركات فور إبلاغ نظام التشغيل عن إعداد «prefers-reduced-motion».',
                                    }[locale]
                                }
                            </li>
                            <li>
                                {
                                    {
                                        de: 'Unterstützung der Schreibrichtungen Links-nach-Rechts und Rechts-nach-Links, mit korrekter Spiegelung von Symbolen und Layout.',
                                        en: 'Support for both left-to-right and right-to-left writing directions, with icons and layout mirrored correctly.',
                                        ru: 'Поддержка направлений письма слева-направо и справа-налево с корректным зеркальным отображением иконок и макета.',
                                        ar: 'دعم اتجاهَي الكتابة من اليسار إلى اليمين ومن اليمين إلى اليسار، مع عكس الأيقونات والتخطيط بصورة صحيحة.',
                                    }[locale]
                                }
                            </li>
                        </ul>
                    </Block>

                    <Block
                        id="block-einschraenkungen"
                        heading={
                            {
                                de: 'Bekannte Einschränkungen',
                                en: 'Known limitations',
                                ru: 'Известные ограничения',
                                ar: 'القيود المعروفة',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Eine eingebettete Karte von Google Maps wird auf den Seiten „Start" und „Kontakt" eingebunden. Die Bedienung dieses Drittanbieter-Inhalts mit Hilfsmitteln können wir nicht vollständig garantieren. Adresse und Anfahrtshinweise stehen daneben jeweils auch als Text zur Verfügung.',
                                    en: 'An embedded Google Maps view appears on the home and contact pages. We cannot fully guarantee the assistive-technology behaviour of this third-party content. Address and directions are always provided as text alongside the map.',
                                    ru: 'На главной странице и на странице «Контакт» встроена карта Google Maps. Мы не можем полностью гарантировать поведение этого стороннего контента при использовании вспомогательных технологий. Адрес и пояснения о маршруте всегда приводятся также в виде текста рядом с картой.',
                                    ar: 'تظهر خريطة Google Maps مدمجة في صفحتَي «الرئيسية» و«التواصل». ولا يمكننا أن نضمن تمامًا توافق هذا المحتوى التابع لطرفٍ ثالث مع التقنيات المساعدة. ويُذكر العنوان وإرشادات الوصول دائمًا كنصّ بجوار الخريطة.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Inhalte in arabischer und russischer Sprache wurden mit Sorgfalt übersetzt; einzelne Fachbegriffe können dennoch in der Originalsprache erscheinen, wenn sie keine etablierte Entsprechung haben.',
                                    en: 'Arabic and Russian content has been translated carefully; individual technical terms may still appear in the original language when no established equivalent exists.',
                                    ru: 'Тексты на арабском и русском переведены тщательно; отдельные специальные термины могут оставаться на языке оригинала, если устойчивого эквивалента нет.',
                                    ar: 'تُرجم المحتوى العربيّ والروسيّ بعناية؛ ومع ذلك قد تظهر بعض المصطلحات المتخصّصة بلغتها الأصليّة إن لم يوجد لها مقابلٌ مستقرّ.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block
                        id="block-feedback"
                        heading={
                            {
                                de: 'Hindernisse melden',
                                en: 'Reporting barriers',
                                ru: 'Сообщить о барьерах',
                                ar: 'الإبلاغ عن العوائق',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Sind Ihnen Hindernisse aufgefallen oder benötigen Sie Inhalte in einer anderen Form? Wir freuen uns über jeden Hinweis und versuchen, gemeldete Probleme zeitnah zu beheben.',
                                    en: 'Have you noticed a barrier, or do you need content in a different format? We welcome every report and aim to address issues promptly.',
                                    ru: 'Если вы заметили барьер или вам нужен контент в иной форме — мы будем благодарны за любое сообщение и постараемся оперативно устранить выявленные проблемы.',
                                    ar: 'هل لاحظتم عائقًا أو تحتاجون إلى المحتوى بصيغة أخرى؟ نُرحّب بكلّ ملاحظة ونسعى إلى معالجة المشكلات المُبلَّغ عنها في أقرب وقت.',
                                }[locale]
                            }
                        </p>
                        <dl className="mt-6 grid grid-cols-[10rem_1fr] gap-y-1">
                            <dt className="font-medium text-aubergine-dark">
                                {{ de: 'E-Mail', en: 'Email', ru: 'Эл. почта', ar: 'البريد الإلكتروني' }[locale]}
                            </dt>
                            <dd>
                                <a
                                    href={`mailto:${PRACTICE.email}`}
                                    className="rounded-sm text-aubergine hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                                >
                                    {PRACTICE.email}
                                </a>
                            </dd>
                            <dt className="font-medium text-aubergine-dark">
                                {{ de: 'Telefon', en: 'Phone', ru: 'Телефон', ar: 'الهاتف' }[locale]}
                            </dt>
                            <dd>
                                <a
                                    href={`tel:${PRACTICE.phone}`}
                                    className="rounded-sm text-aubergine hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                                >
                                    {PRACTICE.phone}
                                </a>
                            </dd>
                        </dl>
                        <p className="mt-6 text-sm text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Die vollständige Anschrift finden Sie im ',
                                    en: 'You will find the full postal address in our ',
                                    ru: 'Полный почтовый адрес указан в ',
                                    ar: 'تجدون العنوان البريديّ الكامل في ',
                                }[locale]
                            }
                            <Link
                                to="/{-$locale}/impressum"
                                className="rounded-sm text-aubergine hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                            >
                                {{ de: 'Impressum', en: 'imprint', ru: 'Impressum', ar: 'صفحة بيانات الناشر' }[locale]}
                            </Link>
                            .
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
