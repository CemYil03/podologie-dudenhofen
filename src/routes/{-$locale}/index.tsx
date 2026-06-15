import { createFileRoute, Link } from '@tanstack/react-router';
import { ExternalLinkIcon, PhoneIcon, QuoteIcon, SendIcon, SparklesIcon, StarIcon } from 'lucide-react';
import { useState } from 'react';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { useVisitorChat } from '../../web/chat/VisitorChatProvider';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SeasonalBanner } from '../../web/components/SeasonalBanner/SeasonalBanner';
import { SeasonalEffect } from '../../web/components/SeasonalEffect/SeasonalEffect';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { VacationBanner } from '../../web/components/VacationBanner';
import {
    INDEX_CREDENTIALS,
    INDEX_PRAXIS_PILLARS,
    INDEX_SERVICES,
    INDEX_SUGGESTED_QUESTIONS,
    INDEX_TESTIMONIALS,
} from '../../web/content/indexContent';
import { HomePageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/')({
    loader: () => routeLoaderGraphqlClient(HomePageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            // Homepage already names the practice — `noBrandSuffix` skips
            // the ` — Podologie Dudenhofen` tail so social cards don't
            // duplicate it.
            title: {
                de: 'Podologie & Fußpflege in Dudenhofen bei Speyer — Podologie Dudenhofen',
                en: 'Podiatry & foot care in Dudenhofen near Speyer — Podologie Dudenhofen',
                ru: 'Подология и уход за ногами в Дуденхофене рядом со Шпайером — Podologie Dudenhofen',
                ar: 'العناية بالقدم والأمراض الجلدية للقدم في دودنهوفن بالقرب من شباير — Podologie Dudenhofen',
            }[locale],
            description: {
                de: 'Podologie Dudenhofen — kleine podologische Praxis, auch für medizinische Fußpflege, Diabetisches Fußsyndrom und Nagelkorrekturen. Mit Kassenzulassung. Termine nach Vereinbarung.',
                en: 'Podologie Dudenhofen — a small podiatry practice, also offering medical foot-care, diabetic foot syndrome treatment and nail-correction. Statutory health-insurance accredited. By appointment.',
                ru: 'Podologie Dudenhofen — небольшая подологическая практика, также предлагающая медицинский уход за ногами, лечение диабетической стопы и коррекцию ногтей. С аккредитацией обязательного медицинского страхования. Приём по предварительной записи.',
                ar: 'Podologie Dudenhofen — عيادة صغيرة متخصصة في علم الأقدام، تقدم أيضاً العناية الطبية بالقدم وعلاج متلازمة القدم السكرية وتصحيح الأظافر. معتمدة لدى التأمين الصحي القانوني. المواعيد بالحجز المسبق.',
            }[locale],
            path: '/',
            locale,
            webPageUrl: webPageUrlGet(),
            noBrandSuffix: true,
            // FAQ rich result on long-tail queries — mirrors the four
            // suggested questions rendered below the hero. Keep answers
            // short and plain-text; Google strips HTML in most contexts.
            faq: [
                {
                    question: {
                        de: 'Brauche ich eine Verordnung?',
                        en: 'Do I need a prescription?',
                        ru: 'Нужно ли мне направление?',
                        ar: 'هل أحتاج إلى وصفة طبية؟',
                    }[locale],
                    answer: {
                        de: 'Eine ärztliche Verordnung benötigen Sie für Kassenleistungen — typisch bei Diabetischem Fußsyndrom oder vergleichbaren Diagnosen. Privat- und Selbstzahler*innen können auch ohne Verordnung einen Termin vereinbaren.',
                        en: 'You need a medical prescription for statutory-insurance treatment — typically for diabetic foot syndrome or comparable diagnoses. Private patients and self-payers can book without a prescription.',
                        ru: 'Медицинское направление необходимо для получения услуг по обязательному медицинскому страхованию — обычно при диабетической стопе или сходных диагнозах. Частные пациенты и пациенты, оплачивающие самостоятельно, могут записаться и без направления.',
                        ar: 'تحتاج إلى وصفة طبية للعلاج المغطى بالتأمين الصحي القانوني — عادةً في حالات متلازمة القدم السكرية أو التشخيصات المماثلة. أما المرضى الخاصون والذين يدفعون بأنفسهم فيمكنهم حجز موعد دون الحاجة إلى وصفة.',
                    }[locale],
                },
                {
                    question: {
                        de: 'Was bringe ich zum ersten Termin mit?',
                        en: 'What should I bring to the first appointment?',
                        ru: 'Что взять с собой на первый приём?',
                        ar: 'ماذا أُحضر معي إلى الموعد الأول؟',
                    }[locale],
                    answer: {
                        de: 'Versichertenkarte, ärztliche Verordnung (falls vorhanden), eine Liste der aktuellen Medikamente, bequeme Schuhe und etwas Zeit — der erste Termin dauert ca. 60 Minuten.',
                        en: 'Insurance card, medical prescription (if you have one), a list of your current medication, comfortable shoes, and a little time — the first appointment takes about 60 minutes.',
                        ru: 'Полис медицинского страхования, медицинское направление (если есть), список текущих лекарств, удобную обувь и немного времени — первый приём длится примерно 60 минут.',
                        ar: 'بطاقة التأمين الصحي، الوصفة الطبية (إن وُجدت)، قائمة بالأدوية الحالية، حذاءً مريحاً، وبعضاً من الوقت — يستغرق الموعد الأول حوالي 60 دقيقة.',
                    }[locale],
                },
                {
                    question: {
                        de: 'Übernimmt meine Krankenkasse das?',
                        en: 'Will my health insurance cover this?',
                        ru: 'Покроет ли это моя страховая компания?',
                        ar: 'هل يغطي تأميني الصحي تكاليف العلاج؟',
                    }[locale],
                    answer: {
                        de: 'Bei Diabetischem Fußsyndrom oder vergleichbaren Erkrankungen mit ärztlicher Verordnung übernehmen die gesetzlichen Krankenkassen die Kosten. Wir rechnen direkt mit der Kasse ab.',
                        en: 'For diabetic foot syndrome or comparable conditions with a medical prescription, statutory health insurance covers the cost. We bill the fund directly.',
                        ru: 'При диабетической стопе или сходных заболеваниях при наличии медицинского направления расходы покрывает обязательное медицинское страхование. Мы выставляем счёт напрямую страховой кассе.',
                        ar: 'في حالات متلازمة القدم السكرية أو الأمراض المماثلة وبوجود وصفة طبية، يتحمل التأمين الصحي القانوني التكاليف. نحن نتعامل مباشرة مع صندوق التأمين للفوترة.',
                    }[locale],
                },
                {
                    question: {
                        de: 'Was zahle ich als Kassenpatient*in?',
                        en: 'What will I pay as a statutory patient?',
                        ru: 'Сколько я плачу как пациент обязательного страхования?',
                        ar: 'كم أدفع كمريض تأمين قانوني؟',
                    }[locale],
                    answer: {
                        de: 'Eine einmalige Rezeptgebühr von 10 € pro Verordnung sowie 10 % gesetzlichen Eigenanteil je Behandlung. Bei Befreiung bringen Sie bitte den Befreiungsausweis mit.',
                        en: 'A one-off €10 prescription fee plus a 10% statutory co-payment per treatment. If you are exempt, please bring your exemption certificate.',
                        ru: 'Единоразовый сбор за рецепт в размере 10 € за направление и установленная законом доплата в размере 10 % за каждое лечение. При наличии освобождения, пожалуйста, возьмите с собой удостоверение об освобождении.',
                        ar: 'رسوم وصفة طبية لمرة واحدة بقيمة 10 يورو لكل وصفة، بالإضافة إلى مساهمة قانونية بنسبة 10٪ عن كل جلسة علاج. في حال الإعفاء، يُرجى إحضار شهادة الإعفاء معكم.',
                    }[locale],
                },
            ],
        });
    },
    component() {
        const locale = useLocale();
        const { openWithMessage, resetChat } = useVisitorChat();
        const { activeVacation } = Route.useLoaderData();
        // Faux composer in the "Fragen?" section. The home page does not
        // host the real chat — the visitor sheet does — so this textarea
        // only buffers a draft and hands it off to `openWithMessage` on
        // submit. Stays in sync with the suggested-question buttons (both
        // routes go through the provider) and clears once dispatched so a
        // returning visitor sees an empty field.
        //
        // Both entry points (textarea + chip) call `resetChat()` first.
        // The provider keeps `chatId` alive across sheet open/close so a
        // visitor mid-conversation can dismiss the sheet and come back —
        // but a send fired from the landing page is always meant as a
        // fresh start, not an append to whatever chat happened to be open
        // last. Without the reset, "click chip → close sheet → type new
        // question → send" tacks the new message onto the previous chat.
        const [assistantDraft, setAssistantDraft] = useState('');
        const assistantStartFresh = (message: string) => {
            const trimmed = message.trim();
            if (!trimmed) return;
            resetChat();
            void openWithMessage(trimmed);
        };
        const assistantDraftSubmit = () => {
            if (!assistantDraft.trim()) return;
            const message = assistantDraft;
            setAssistantDraft('');
            assistantStartFresh(message);
        };

        return (
            <main>
                <SeasonalEffect locale={locale} />
                {activeVacation ? <VacationBanner vacation={activeVacation} locale={locale} /> : null}
                <SeasonalBanner locale={locale} isSuppressed={Boolean(activeVacation)} />
                {/* 1. Hero */}
                <section id="hero" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-20">
                    <div className="grid gap-12 md:grid-cols-2 md:items-center">
                        <Reveal>
                            <SectionEyebrow>
                                {
                                    {
                                        de: 'Praxis für Podologie',
                                        en: 'Practice for podiatry',
                                        ru: 'Практика подологии',
                                        ar: 'عيادة علم الأقدام',
                                    }[locale]
                                }
                            </SectionEyebrow>
                            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                                {
                                    {
                                        de: 'Podologische Praxis in Dudenhofen — mit Kassenzulassung.',
                                        en: 'Podiatry practice in Dudenhofen — covered by statutory health insurance.',
                                        ru: 'Подологическая практика в Дуденхофене — с аккредитацией обязательного медицинского страхования.',
                                        ar: 'عيادة علم الأقدام في دودنهوفن — معتمدة لدى التأمين الصحي القانوني.',
                                    }[locale]
                                }
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Eine kleine, ruhige Praxis für Podologie und alles, was geübte Hände und Zeit braucht. Diabetisches Fußsyndrom, Nagelkorrekturen, Hornhautprobleme — schonend, fachlich fundiert, im rechtlich vollen Umfang.',
                                        en: 'A small, calm practice for podiatry and anything that needs trained hands and time. Diabetic foot syndrome, nail-correction, calluses — gentle, expert, within the full legal scope.',
                                        ru: 'Небольшая, спокойная практика подологии и всего, что требует опытных рук и времени. Диабетическая стопа, коррекция ногтей, проблемы с ороговевшей кожей — бережно, профессионально, в полном объёме, разрешённом законом.',
                                        ar: 'عيادة صغيرة هادئة لعلم الأقدام ولكل ما يحتاج إلى أيدٍ ماهرة ووقت. متلازمة القدم السكرية، تصحيح الأظافر، مشاكل الجلد المتقرن — برفق وخبرة، وضمن النطاق القانوني الكامل.',
                                    }[locale]
                                }
                            </p>
                            <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                                <Button variant="brand" size="lg" asChild>
                                    <Link to="/{-$locale}/kontakt">
                                        {
                                            { de: 'Termin anfragen', en: 'Request appointment', ru: 'Записаться на приём', ar: 'طلب موعد' }[
                                                locale
                                            ]
                                        }
                                    </Link>
                                </Button>
                                <Button variant="brand-outline" size="lg" asChild>
                                    <Link to="/{-$locale}/leistungen">
                                        {
                                            {
                                                de: 'Leistungen ansehen',
                                                en: 'View services',
                                                ru: 'Посмотреть услуги',
                                                ar: 'استعراض الخدمات',
                                            }[locale]
                                        }
                                    </Link>
                                </Button>
                            </div>
                        </Reveal>
                        <Reveal delayMs={120} className="hidden md:block">
                            <div className="aspect-4/5 overflow-hidden rounded-xl border border-aubergine/10 shadow-sm">
                                <img
                                    src="/podologie-dudenhofen-praxis.jpg"
                                    alt={
                                        {
                                            de: 'Innenansicht der Praxis Podologie Dudenhofen',
                                            en: 'Interior view of the Podologie Dudenhofen practice',
                                            ru: 'Интерьер практики Podologie Dudenhofen',
                                            ar: 'منظر داخلي لعيادة Podologie Dudenhofen',
                                        }[locale]
                                    }
                                    // LCP candidate on the desktop home — explicit
                                    // dimensions reserve layout, `fetchpriority` lifts
                                    // it ahead of below-the-fold assets, and
                                    // `decoding="async"` keeps the main thread free
                                    // while it paints. The actual file is taller; the
                                    // 4:5 wrapper crops via `object-cover`, so any
                                    // ratio whose aspect matches works.
                                    width={800}
                                    height={1000}
                                    fetchPriority="high"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* 2. Praxis overview — three pillars previewing /praxis */}
                <section id="praxis-uebersicht" className="scroll-mt-20 bg-blush">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <Reveal>
                            <SectionEyebrow>{{ de: 'Praxis', en: 'Practice', ru: 'Практика', ar: 'العيادة' }[locale]}</SectionEyebrow>
                            <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Eine ruhige Praxis — Räume, Therapeutin, Hygiene.',
                                        en: 'A calm practice — rooms, therapist, hygiene.',
                                        ru: 'Спокойная практика — помещения, специалист, гигиена.',
                                        ar: 'عيادة هادئة — الغرف، المعالجة، النظافة.',
                                    }[locale]
                                }
                            </h2>
                        </Reveal>
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {INDEX_PRAXIS_PILLARS.map((pillar, index) => {
                                const Icon = pillar.icon!;
                                return (
                                    <Reveal key={pillar.id} delayMs={index * 80}>
                                        <Link
                                            to="/{-$locale}/praxis"
                                            hash={pillar.target}
                                            id={pillar.id}
                                            className="search-target group flex h-full scroll-mt-20 flex-col rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                        >
                                            <div className="flex size-10 items-center justify-center rounded-md bg-blush p-2 transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                                <Icon
                                                    className="size-5 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                    aria-hidden
                                                />
                                            </div>
                                            <h3 className="mt-4 font-serif text-xl font-semibold text-aubergine-dark">
                                                {pillar.heading[locale]}
                                            </h3>
                                            <p className="mt-2 text-(--color-brand-charcoal-2)">{pillar.body[locale]}</p>
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                        <Reveal className="mt-10 text-center">
                            <Link
                                to="/{-$locale}/praxis"
                                className="group inline-flex items-center gap-1 font-medium text-aubergine hover:underline"
                            >
                                {
                                    {
                                        de: 'Mehr zur Praxis',
                                        en: 'More about the practice',
                                        ru: 'Подробнее о практике',
                                        ar: 'المزيد عن العيادة',
                                    }[locale]
                                }
                                <span
                                    aria-hidden
                                    className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </Link>
                        </Reveal>
                    </div>
                </section>

                {/* 3. Services overview */}
                <section id="leistungen-uebersicht" className="scroll-mt-20 bg-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <Reveal>
                            <SectionEyebrow>{{ de: 'Leistungen', en: 'Services', ru: 'Услуги', ar: 'الخدمات' }[locale]}</SectionEyebrow>
                            <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Wofür Sie kommen.',
                                        en: 'What we do.',
                                        ru: 'С чем вы к нам приходите.',
                                        ar: 'ما نقوم به من أجلكم.',
                                    }[locale]
                                }
                            </h2>
                        </Reveal>
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {INDEX_SERVICES.map((service, index) => {
                                const Icon = service.icon!;
                                return (
                                    <Reveal key={service.id} delayMs={index * 80}>
                                        <div
                                            id={service.id}
                                            className="search-target group h-full scroll-mt-20 rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                        >
                                            <div className="flex size-10 items-center justify-center rounded-md bg-blush p-2 transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                                <Icon
                                                    className="size-5 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                    aria-hidden
                                                />
                                            </div>
                                            <h3 className="mt-4 font-serif text-xl font-semibold text-aubergine-dark">
                                                {service.heading[locale]}
                                            </h3>
                                            <p className="mt-2 text-(--color-brand-charcoal-2)">{service.body[locale]}</p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                        <Reveal className="mt-10 text-center">
                            <Link
                                to="/{-$locale}/leistungen"
                                className="group inline-flex items-center gap-1 font-medium text-aubergine hover:underline"
                            >
                                {
                                    {
                                        de: 'Alle Leistungen ansehen',
                                        en: 'View all services',
                                        ru: 'Посмотреть все услуги',
                                        ar: 'استعراض جميع الخدمات',
                                    }[locale]
                                }
                                <span
                                    aria-hidden
                                    className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </Link>
                        </Reveal>
                    </div>
                </section>

                {/* 4. Credential strip */}
                <section id="qualifikation" className="scroll-mt-20 bg-aubergine-dark text-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold">
                                {{ de: 'Qualifikation', en: 'Credentials', ru: 'Квалификация', ar: 'المؤهلات' }[locale]}
                            </span>
                            <span aria-hidden className="h-px flex-1 bg-gold/40" />
                        </div>
                        <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                            {
                                {
                                    de: 'Staatlich anerkannt. Heilpraktikerin für Podologie.',
                                    en: 'State-accredited. Heilpraktiker for podiatry.',
                                    ru: 'Государственно признана. Heilpraktiker по подологии.',
                                    ar: 'معتمدة من الدولة. Heilpraktiker متخصصة في علم الأقدام.',
                                }[locale]
                            }
                        </h2>
                        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                            {INDEX_CREDENTIALS.map((credential) => {
                                const Icon = credential.icon!;
                                return (
                                    <li
                                        key={credential.id}
                                        id={credential.id}
                                        className="search-target flex scroll-mt-20 items-center gap-3 text-cream/80"
                                    >
                                        <Icon className="size-5 text-gold" aria-hidden />
                                        <span>{credential.heading[locale]}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-10">
                            <Link
                                to="/{-$locale}/qualifikation"
                                hash="urkunden"
                                className="inline-flex items-center font-medium text-gold hover:underline"
                            >
                                {
                                    {
                                        de: 'Mehr zur Qualifikation →',
                                        en: 'More on credentials →',
                                        ru: 'Подробнее о квалификации →',
                                        ar: 'المزيد عن المؤهلات →',
                                    }[locale]
                                }
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 5. Testimonials */}
                <section id="stimmen" className="scroll-mt-20 bg-blush">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <Reveal>
                            <SectionEyebrow>{{ de: 'Stimmen', en: 'Voices', ru: 'Отзывы', ar: 'آراء' }[locale]}</SectionEyebrow>
                            <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Stimmen aus der Praxis.',
                                        en: 'Voices from the practice.',
                                        ru: 'Отзывы из практики.',
                                        ar: 'آراء من العيادة.',
                                    }[locale]
                                }
                            </h2>
                        </Reveal>
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {INDEX_TESTIMONIALS.map((testimonial, index) => (
                                <Reveal key={testimonial.id} delayMs={index * 80}>
                                    <figure className="flex h-full flex-col rounded-xl border border-aubergine/10 bg-cream p-6">
                                        <QuoteIcon className="size-5 text-aubergine/60" aria-hidden />
                                        <blockquote className="mt-4 flex-1 text-(--color-brand-charcoal-2)">
                                            <p>„{testimonial.quote[locale]}“</p>
                                        </blockquote>
                                        <figcaption className="mt-4 text-sm font-medium text-aubergine-dark">
                                            — {testimonial.attribution[locale]}
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                        <Reveal className="mt-10 text-center">
                            <div
                                className="flex items-center justify-center gap-1"
                                role="img"
                                aria-label={
                                    {
                                        de: 'Bewertungen auf Google',
                                        en: 'Reviews on Google',
                                        ru: 'Отзывы на Google',
                                        ar: 'التقييمات على Google',
                                    }[locale]
                                }
                            >
                                {Array.from({ length: 5 }, (_, index) => (
                                    <StarIcon key={index} className="size-5 fill-yellow-400 text-yellow-400" aria-hidden />
                                ))}
                            </div>
                            <a
                                href={PRACTICE.maps.reviews}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group mt-4 inline-flex items-center gap-1.5 font-medium text-aubergine hover:underline"
                            >
                                {
                                    {
                                        de: 'Alle Bewertungen auf Google ansehen',
                                        en: 'View all reviews on Google',
                                        ru: 'Посмотреть все отзывы на Google',
                                        ar: 'استعراض جميع التقييمات على Google',
                                    }[locale]
                                }
                                <ExternalLinkIcon
                                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                                    aria-hidden
                                />
                            </a>
                        </Reveal>
                    </div>
                </section>

                {/* 6. Inline AI chat entry — pre-booking objections (extension, no spoke) */}
                <section id="fragen" className="scroll-mt-20 bg-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <Reveal>
                            <SectionEyebrow>{{ de: 'Fragen?', en: 'Questions?', ru: 'Вопросы?', ar: 'أسئلة؟' }[locale]}</SectionEyebrow>
                            <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Erst kurz fragen — dann anrufen.',
                                        en: 'A quick answer before you call.',
                                        ru: 'Сначала спросите — потом звоните.',
                                        ar: 'سؤال سريع قبل أن تتصلوا.',
                                    }[locale]
                                }
                            </h2>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Unser Assistent kennt die häufigsten Fragen rund um Behandlungen, Verordnungen und den ersten Termin — Tag und Nacht, ohne Wartezeit. Stellen Sie Ihre Frage in Ruhe.',
                                        en: 'Our assistant knows the most common questions about treatments, prescriptions, and the first visit — day and night, no waiting. Take your time and ask.',
                                        ru: 'Наш ассистент знает самые частые вопросы о процедурах, направлениях и первом приёме — днём и ночью, без ожидания. Спросите спокойно.',
                                        ar: 'يعرف مساعدنا أكثر الأسئلة شيوعاً عن العلاجات والوصفات الطبية والموعد الأول — ليلاً ونهاراً وبلا انتظار. اسألوا بهدوء.',
                                    }[locale]
                                }
                            </p>
                        </Reveal>
                        <Reveal delayMs={120} className="mx-auto mt-10 max-w-2xl">
                            <div className="rounded-xl border border-aubergine/10 bg-blush p-6">
                                {/* Identity row — small avatar + name + live status. The
                                 *  green dot is honest: the assistant is an LLM and is
                                 *  always available. */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex size-10 items-center justify-center rounded-full bg-aubergine text-cream"
                                        aria-hidden
                                    >
                                        <SparklesIcon className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-medium text-aubergine-dark">
                                            {
                                                {
                                                    de: 'Praxis-Assistent',
                                                    en: 'Practice assistant',
                                                    ru: 'Ассистент практики',
                                                    ar: 'مساعد العيادة',
                                                }[locale]
                                            }
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-(--color-brand-charcoal-3)">
                                            <span aria-hidden className="size-1.5 rounded-full bg-green-600" />
                                            {
                                                {
                                                    de: 'jetzt verfügbar · rund um die Uhr',
                                                    en: 'available now · 24/7',
                                                    ru: 'на связи · круглосуточно',
                                                    ar: 'متاح الآن · على مدار الساعة',
                                                }[locale]
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Faux composer — a real `<textarea>` so paste, autofill,
                                 *  IME, and screen-reader form semantics all behave. The
                                 *  send goes through the same `openWithMessage` funnel
                                 *  the suggested chips use, so the chat sheet picks the
                                 *  draft up identically either way. */}
                                <form
                                    className="mt-5"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        assistantDraftSubmit();
                                    }}
                                >
                                    <label htmlFor="assistant-draft" className="sr-only">
                                        {
                                            {
                                                de: 'Frage an den Praxis-Assistenten',
                                                en: 'Question for the practice assistant',
                                                ru: 'Вопрос ассистенту практики',
                                                ar: 'سؤال إلى مساعد العيادة',
                                            }[locale]
                                        }
                                    </label>
                                    <div className="flex items-end gap-2 rounded-lg border border-aubergine/20 bg-cream px-3 py-2 transition-colors duration-200 ease-out focus-within:border-aubergine focus-within:ring-2 focus-within:ring-aubergine/30">
                                        <textarea
                                            id="assistant-draft"
                                            rows={1}
                                            value={assistantDraft}
                                            onChange={(event) => setAssistantDraft(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' && !event.shiftKey) {
                                                    event.preventDefault();
                                                    assistantDraftSubmit();
                                                }
                                            }}
                                            placeholder={
                                                {
                                                    de: 'Stellen Sie Ihre Frage…',
                                                    en: 'Ask your question…',
                                                    ru: 'Задайте свой вопрос…',
                                                    ar: 'اطرحوا سؤالكم…',
                                                }[locale]
                                            }
                                            className="block min-h-9 flex-1 resize-none bg-transparent py-1 text-sm text-charcoal placeholder:text-(--color-brand-charcoal-4) focus:outline-none"
                                        />
                                        <Button
                                            type="submit"
                                            variant="brand"
                                            size="sm"
                                            disabled={!assistantDraft.trim()}
                                            aria-label={
                                                {
                                                    de: 'Frage absenden',
                                                    en: 'Send question',
                                                    ru: 'Отправить вопрос',
                                                    ar: 'إرسال السؤال',
                                                }[locale]
                                            }
                                        >
                                            <SendIcon className="size-4" aria-hidden />
                                        </Button>
                                    </div>
                                </form>

                                {/* Canned questions — chip-style, visually subordinate
                                 *  to the input above. Each chip is one tap that opens
                                 *  the sheet AND fires the question as the first turn,
                                 *  same code path as before. */}
                                <div className="mt-5">
                                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Beliebte Fragen',
                                                en: 'Popular questions',
                                                ru: 'Частые вопросы',
                                                ar: 'أسئلة شائعة',
                                            }[locale]
                                        }
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {INDEX_SUGGESTED_QUESTIONS.map((q) => (
                                            <button
                                                key={q.id}
                                                id={q.id}
                                                type="button"
                                                onClick={() => assistantStartFresh(q.heading[locale])}
                                                className="search-target scroll-mt-20 rounded-full border border-aubergine/20 bg-cream/60 px-4 py-1.5 text-start text-sm text-aubergine transition-colors duration-200 ease-out hover:border-aubergine hover:bg-aubergine/5"
                                            >
                                                {q.heading[locale]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Phone fallback + disclaimer share one footer. Phone is
                             *  inline so the section also serves visitors who would
                             *  rather speak; the disclaimer stays small and grey. */}
                            <p className="mt-5 text-center text-sm text-(--color-brand-charcoal-3)">
                                {
                                    {
                                        de: 'Lieber direkt sprechen? ',
                                        en: 'Prefer to speak directly? ',
                                        ru: 'Хотите поговорить напрямую? ',
                                        ar: 'تفضّلون التحدث مباشرة؟ ',
                                    }[locale]
                                }
                                <a
                                    href={`tel:${PRACTICE.phone}`}
                                    className="inline-flex items-center gap-1.5 font-medium text-aubergine hover:underline"
                                >
                                    <PhoneIcon className="size-4" aria-hidden />
                                    {formatPhoneNumber(PRACTICE.phone)}
                                </a>
                                <span className="text-(--color-brand-charcoal-4)">
                                    {' · '}
                                    {
                                        {
                                            de: 'Mo–Fr 08:00 – 16:00',
                                            en: 'Mon–Fri 08:00 – 16:00',
                                            ru: 'Пн–Пт 08:00 – 16:00',
                                            ar: 'الإثنين–الجمعة 08:00 – 16:00',
                                        }[locale]
                                    }
                                </span>
                            </p>
                            <p className="mt-3 text-center text-xs text-(--color-brand-charcoal-4)">
                                {
                                    {
                                        de: 'Der Assistent gibt keine medizinische Beratung. Bei akuten Beschwerden bitte direkt anrufen.',
                                        en: 'The assistant does not provide medical advice. For acute concerns, please call us directly.',
                                        ru: 'Ассистент не предоставляет медицинских консультаций. При острых жалобах, пожалуйста, звоните нам напрямую.',
                                        ar: 'لا يقدم المساعد استشارات طبية. في حال وجود شكاوى حادة، يُرجى الاتصال بنا مباشرة.',
                                    }[locale]
                                }
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* 7. Opening hours + map preview + address */}
                <section id="oeffnungszeiten" className="scroll-mt-20 bg-blush">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <div className="grid gap-12 md:grid-cols-2 md:items-start">
                            <Reveal>
                                <SectionEyebrow>
                                    {{ de: 'Öffnungszeiten', en: 'Opening hours', ru: 'Часы работы', ar: 'ساعات العمل' }[locale]}
                                </SectionEyebrow>
                                <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                    {
                                        {
                                            de: 'Wir sind für Sie da.',
                                            en: 'We are here for you.',
                                            ru: 'Мы здесь для вас.',
                                            ar: 'نحن في خدمتكم.',
                                        }[locale]
                                    }
                                </h2>
                                <dl className="mt-8 space-y-2 text-(--color-brand-charcoal-2)">
                                    <div className="flex justify-between gap-6 border-b border-aubergine/10 py-2">
                                        <dt className="font-medium text-charcoal">
                                            {{ de: 'Mo–Do', en: 'Mon–Thu', ru: 'Пн–Чт', ar: 'الإثنين–الخميس' }[locale]}
                                        </dt>
                                        <dd>08:00 – 18:00</dd>
                                    </div>
                                    <div className="flex justify-between gap-6 border-b border-aubergine/10 py-2">
                                        <dt className="font-medium text-charcoal">
                                            {{ de: 'Fr', en: 'Fri', ru: 'Пт', ar: 'الجمعة' }[locale]}
                                        </dt>
                                        <dd>08:00 – 14:00</dd>
                                    </div>
                                    <div className="flex justify-between gap-6 border-b border-aubergine/10 py-2">
                                        <dt className="font-medium text-charcoal">
                                            {{ de: 'Sa & So', en: 'Sat & Sun', ru: 'Сб и Вс', ar: 'السبت والأحد' }[locale]}
                                        </dt>
                                        <dd>{{ de: 'geschlossen', en: 'closed', ru: 'закрыто', ar: 'مغلق' }[locale]}</dd>
                                    </div>
                                </dl>
                                <address className="mt-8 not-italic text-(--color-brand-charcoal-2)">
                                    <div className="font-medium text-charcoal">{PRACTICE.person}</div>
                                    <div>{PRACTICE.address.street}</div>
                                    <div>
                                        {PRACTICE.address.postcode} {PRACTICE.address.city}
                                    </div>
                                </address>
                                <a
                                    href={`tel:${PRACTICE.phone}`}
                                    className="mt-6 inline-flex items-center gap-2 font-serif text-2xl text-aubergine transition-transform duration-150 ease-out hover:underline active:scale-[0.98]"
                                    aria-label={
                                        {
                                            de: 'Praxis anrufen',
                                            en: 'Call the practice',
                                            ru: 'Позвонить в практику',
                                            ar: 'الاتصال بالعيادة',
                                        }[locale]
                                    }
                                >
                                    <PhoneIcon className="size-5" aria-hidden />
                                    {formatPhoneNumber(PRACTICE.phone)}
                                </a>
                            </Reveal>
                            <Reveal delayMs={120}>
                                <div className="aspect-square overflow-hidden rounded-xl border border-aubergine/10">
                                    <iframe
                                        src={PRACTICE.maps.embed}
                                        title={
                                            {
                                                de: 'Karte: Podologie Dudenhofen',
                                                en: 'Map: Podologie Dudenhofen',
                                                ru: 'Карта: Podologie Dudenhofen',
                                                ar: 'خريطة: Podologie Dudenhofen',
                                            }[locale]
                                        }
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="h-full w-full border-0"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <Link
                                        to="/{-$locale}/kontakt"
                                        hash="anfahrt"
                                        className="group inline-flex items-center gap-1 font-medium text-aubergine hover:underline"
                                    >
                                        {
                                            {
                                                de: 'Anfahrt & Kontakt',
                                                en: 'Directions & contact',
                                                ru: 'Как добраться и контакты',
                                                ar: 'الوصول والتواصل',
                                            }[locale]
                                        }
                                        <span
                                            aria-hidden
                                            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* 7. Final CTA */}
                <section id="termin" className="scroll-mt-20 bg-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20 text-center">
                        <Reveal>
                            <h2 className="font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Termin vereinbaren? Rufen Sie an.',
                                        en: 'Want an appointment? Give us a call.',
                                        ru: 'Хотите записаться на приём? Позвоните нам.',
                                        ar: 'هل تودون حجز موعد؟ اتصلوا بنا.',
                                    }[locale]
                                }
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Am besten während unserer Anrufzeiten Mo–Fr 08:00 – 16:00.',
                                        en: 'Best reached during our call hours, Mon–Fri 08:00 – 16:00.',
                                        ru: 'Лучше всего звонить в наши часы приёма звонков: Пн–Пт 08:00 – 16:00.',
                                        ar: 'يُفضّل الاتصال خلال ساعات الاتصال لدينا، من الإثنين إلى الجمعة 08:00 – 16:00.',
                                    }[locale]
                                }
                            </p>
                            <div className="mt-10 flex flex-col items-center gap-4">
                                <Button variant="brand" size="lg" asChild>
                                    <Link to="/{-$locale}/kontakt">
                                        {
                                            { de: 'Termin anfragen', en: 'Request appointment', ru: 'Записаться на приём', ar: 'طلب موعد' }[
                                                locale
                                            ]
                                        }
                                    </Link>
                                </Button>
                                <Button
                                    variant="link"
                                    asChild
                                    className="inline-flex items-center gap-2 text-sm text-(--color-brand-charcoal-2) transition-transform duration-150 ease-out hover:text-aubergine active:scale-[0.98]"
                                >
                                    <a href={`tel:${PRACTICE.phone}`}>
                                        <PhoneIcon className="size-4" aria-hidden />
                                        {formatPhoneNumber(PRACTICE.phone)}
                                    </a>
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
        );
    },
});
