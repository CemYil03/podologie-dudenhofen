import { createFileRoute, Link } from '@tanstack/react-router';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { KARRIERE_OFFERINGS, KARRIERE_REQUIREMENTS, KARRIERE_STEPS, KARRIERE_VALUE_CARDS } from '../../web/content/karriereContent';
import { KarrierePageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/karriere')({
    loader: () => routeLoaderGraphqlClient(KarrierePageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: {
                de: 'Karriere — Podologie-Praxis in Dudenhofen',
                en: 'Careers — podiatry practice in Dudenhofen',
                ru: 'Карьера — подологическая практика в Dudenhofen',
                ar: 'الوظائف — عيادة العناية بالقدم في Dudenhofen',
            }[locale],
            description: {
                de: 'Stellenangebot und Initiativbewerbung — Podologie Dudenhofen sucht Podologinnen und Podologen mit Anspruch an Qualität und Hygiene.',
                en: 'Open roles and unsolicited applications — Podologie Dudenhofen is looking for podiatrists who care about quality and hygiene.',
                ru: 'Открытые вакансии и инициативные заявки — Podologie Dudenhofen ищет подологов, для которых важны качество и гигиена.',
                ar: 'وظائف شاغرة وطلبات تقدم تلقائية — تبحث Podologie Dudenhofen عن أخصائيي عناية بالقدم يهتمون بالجودة والنظافة.',
            }[locale],
            path: '/karriere',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                { name: { de: 'Karriere', en: 'Careers', ru: 'Карьера', ar: 'الوظائف' }[locale], path: '/karriere' },
            ],
        });
    },
    component: KarrierePage,
});

// Smooth-scrolls to the `#bewerbung` section. A plain `<Link hash=…>` would
// only fire when the URL hash actually changes — once the visitor has
// scrolled away after their first click, the URL still ends in `#bewerbung`
// and a second click is a no-op. Calling `scrollIntoView` directly avoids
// that, and honours `prefers-reduced-motion` by falling back to instant
// scroll.
function scrollToBewerbung() {
    const target = document.getElementById('bewerbung');
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

function KarrierePage() {
    const locale = useLocale();

    return (
        <main>
            {/* Hero */}
            <section id="hero" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Karriere', en: 'Careers', ru: 'Карьера', ar: 'الوظائف' }[locale]}</SectionEyebrow>
                        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                            {
                                {
                                    de: 'Mitarbeiten in einer kleinen Praxis mit großem Anspruch.',
                                    en: 'Work with us in a small practice with high standards.',
                                    ru: 'Работайте с нами в небольшой практике с высокими стандартами.',
                                    ar: 'انضموا إلينا في عيادة صغيرة بمعايير عالية.',
                                }[locale]
                            }
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Wir suchen erfahrene oder gerade ausgebildete Podologinnen und Podologen, die Wert auf saubere Arbeit, gute Hygiene und Zeit für die Patientinnen und Patienten legen.',
                                    en: 'We are looking for experienced or newly qualified podiatrists who care about clean work, good hygiene and time for the patient.',
                                    ru: 'Мы ищем опытных или недавно получивших квалификацию подологов, для которых важны чистая работа, надлежащая гигиена и время для пациентов.',
                                    ar: 'نبحث عن أخصائيي عناية بالقدم من ذوي الخبرة أو حديثي التأهيل ممن يهتمون بالعمل النظيف والنظافة الجيدة وتخصيص الوقت الكافي للمرضى.',
                                }[locale]
                            }
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                            <Button variant="brand" size="lg" onClick={scrollToBewerbung}>
                                {
                                    {
                                        de: 'Initiativbewerbung senden',
                                        en: 'Send unsolicited application',
                                        ru: 'Отправить инициативную заявку',
                                        ar: 'إرسال طلب تقدّم تلقائي',
                                    }[locale]
                                }
                            </Button>
                            <Button variant="brand-outline" size="lg" asChild>
                                <Link to="/{-$locale}/praxis">
                                    {
                                        {
                                            de: 'Mehr über die Praxis',
                                            en: 'More about the practice',
                                            ru: 'Подробнее о практике',
                                            ar: 'المزيد عن العيادة',
                                        }[locale]
                                    }
                                </Link>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Was uns ausmacht */}
            <section id="was-uns-ausmacht" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>
                            {{ de: 'Was uns ausmacht', en: 'What sets us apart', ru: 'Что нас отличает', ar: 'ما يميّزنا' }[locale]}
                        </SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Wofür wir stehen — und wofür wir nicht stehen.',
                                    en: 'What we stand for — and what we do not.',
                                    ru: 'За что мы выступаем — и за что нет.',
                                    ar: 'ما نمثّله — وما لا نمثّله.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {KARRIERE_VALUE_CARDS.map((card, index) => {
                            const Icon = card.icon!;
                            return (
                                <Reveal key={card.id} delayMs={index * 80}>
                                    <div
                                        id={card.id}
                                        className="search-target group h-full scroll-mt-20 rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                    >
                                        <div className="flex size-12 items-center justify-center rounded-lg bg-blush transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                            <Icon
                                                className="size-6 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                aria-hidden
                                            />
                                        </div>
                                        <h3 className="mt-5 font-serif text-xl font-semibold text-aubergine-dark">
                                            {card.heading[locale]}
                                        </h3>
                                        <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">{card.body[locale]}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Wen wir suchen */}
            <section id="wen-wir-suchen" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>
                            {{ de: 'Wen wir suchen', en: "Who we're looking for", ru: 'Кого мы ищем', ar: 'من نبحث عنه' }[locale]}
                        </SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Zwei Wege in unsere Praxis.',
                                    en: 'Two ways into our practice.',
                                    ru: 'Два пути в нашу практику.',
                                    ar: 'طريقان للانضمام إلى عيادتنا.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <Reveal>
                            <div className="h-full rounded-xl border border-aubergine/10 bg-cream p-6">
                                <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                    {
                                        {
                                            de: 'Podologin / Podologe (m/w/d)',
                                            en: 'Podiatrist (m/f/d)',
                                            ru: 'Подолог (м/ж/д)',
                                            ar: 'أخصائي/ـة عناية بالقدم (ذكر/أنثى/متنوع)',
                                        }[locale]
                                    }
                                </h3>
                                <p className="mt-2 text-sm tracking-wide text-(--color-brand-charcoal-3) uppercase">
                                    {{ de: 'Voraussetzungen', en: 'Requirements', ru: 'Требования', ar: 'المتطلبات' }[locale]}
                                </p>
                                <ul className="mt-4 space-y-2 text-(--color-brand-charcoal-2)">
                                    {KARRIERE_REQUIREMENTS.map((req) => (
                                        <li key={req.id} id={req.id} className="search-target flex scroll-mt-20 gap-3">
                                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                            <span className="leading-relaxed">{req.heading[locale]}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal delayMs={80}>
                            <div className="h-full rounded-xl border border-aubergine/10 bg-cream p-6">
                                <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                    {
                                        {
                                            de: 'Auszubildende (m/w/d)',
                                            en: 'Trainees (m/f/d)',
                                            ru: 'Стажёры (м/ж/д)',
                                            ar: 'المتدربون (ذكر/أنثى/متنوع)',
                                        }[locale]
                                    }
                                </h3>
                                <p className="mt-4 leading-relaxed text-(--color-brand-charcoal-2)">
                                    {
                                        {
                                            de: 'Wir bieten gelegentlich Praktikumsplätze für Auszubildende der Podologie an. Schreiben Sie uns gern.',
                                            en: 'We occasionally offer internships for podiatry trainees. Feel free to get in touch.',
                                            ru: 'Иногда мы предлагаем места для практики стажёрам в области подологии. Будем рады Вашему сообщению.',
                                            ar: 'نُتيح من حين لآخر فرص تدريب لمتدربي العناية بالقدم. لا تترددوا في التواصل معنا.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Was wir bieten */}
            <section id="was-wir-bieten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>
                            {{ de: 'Was wir bieten', en: 'What we offer', ru: 'Что мы предлагаем', ar: 'ما نقدّمه' }[locale]}
                        </SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Konditionen und Rahmen.',
                                    en: 'Conditions and framework.',
                                    ru: 'Условия и рамки.',
                                    ar: 'الشروط والإطار.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <dl className="mt-10 divide-y divide-aubergine/10 border-y border-aubergine/10">
                        {KARRIERE_OFFERINGS.map((entry, index) => (
                            <Reveal key={entry.id} delayMs={index * 80}>
                                <div id={entry.id} className="search-target grid scroll-mt-20 gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                                    <dt className="font-serif text-lg font-semibold text-aubergine-dark">{entry.heading[locale]}</dt>
                                    <dd className="leading-relaxed text-(--color-brand-charcoal-2)">{entry.body[locale]}</dd>
                                </div>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Bewerbung — dark aubergine */}
            <section id="bewerbung" className="scroll-mt-20 bg-aubergine-dark">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase">
                        {{ de: 'Bewerbung', en: 'How to apply', ru: 'Как подать заявку', ar: 'كيفية التقدّم' }[locale]}
                    </p>
                    <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                        {
                            {
                                de: 'In drei Schritten zum Probetag.',
                                en: 'Three steps to a trial day.',
                                ru: 'Три шага до Schnuppertag.',
                                ar: 'ثلاث خطوات نحو يوم Schnuppertag تجريبي.',
                            }[locale]
                        }
                    </h2>
                    <ol className="mt-10 grid gap-6 md:grid-cols-3">
                        {KARRIERE_STEPS.map((step, index) => (
                            <li
                                key={step.id}
                                id={step.id}
                                className="search-target scroll-mt-20 rounded-xl border border-gold/30 bg-aubergine-dark p-6"
                            >
                                <div className="flex size-10 items-center justify-center rounded-full border border-gold/50 font-mono text-sm text-gold">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-5 font-serif text-xl font-semibold text-cream">{step.heading[locale]}</h3>
                                <p className="mt-2 leading-relaxed text-cream/80">{step.body[locale]}</p>
                                {index === 0 ? (
                                    <p className="mt-3 text-sm text-cream/70">
                                        {{ de: 'Telefon', en: 'Phone', ru: 'Телефон', ar: 'الهاتف' }[locale]}:{' '}
                                        <a href={`tel:${PRACTICE.phone}`} className="text-gold hover:underline">
                                            {formatPhoneNumber(PRACTICE.phone)}
                                        </a>
                                    </p>
                                ) : null}
                            </li>
                        ))}
                    </ol>
                    <div className="mt-12 flex flex-wrap items-center gap-3 *:flex-1 sm:*:flex-none">
                        <Button size="lg" asChild className="rounded-full bg-cream px-6 text-aubergine-dark hover:bg-cream/90">
                            <a href={`mailto:${PRACTICE.email}`}>
                                {
                                    {
                                        de: 'Initiativbewerbung senden',
                                        en: 'Send unsolicited application',
                                        ru: 'Отправить инициативную заявку',
                                        ar: 'إرسال طلب تقدّم تلقائي',
                                    }[locale]
                                }
                            </a>
                        </Button>
                        <Button variant="link" asChild className="text-cream/80 hover:text-cream">
                            <a href={`tel:${PRACTICE.phone}`}>
                                {{ de: 'oder anrufen', en: 'or call', ru: 'или позвонить', ar: 'أو الاتصال' }[locale]}:{' '}
                                {formatPhoneNumber(PRACTICE.phone)}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
