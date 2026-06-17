import { createFileRoute, Link } from '@tanstack/react-router';
import { ClockIcon, MapPinIcon, PhoneCallIcon, PhoneIcon } from 'lucide-react';
import { Fragment } from 'react';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
// Note: the page intentionally has no `#anfrage` section today — phone CTAs
// throughout the page (and the site-wide header CTA) cover the same intent.
// The section will return once an online booking flow ships; see
// `docs/project.md` ("Roadmap → Contact form").
import { KontaktPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/kontakt')({
    loader: () => routeLoaderGraphqlClient(KontaktPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        const addressLine = `${PRACTICE.address.street}, ${PRACTICE.address.postcode} ${PRACTICE.address.city}`;
        const weekdayHours = PRACTICE.hours[0].time[locale];
        const fridayHours = PRACTICE.hours[1].time[locale];
        return seoMeta({
            title: {
                de: 'Kontakt & Anfahrt — Speyerer Str. 60, Dudenhofen',
                en: 'Contact & directions — Speyerer Str. 60, Dudenhofen',
                ru: 'Контакты и как добраться — Speyerer Str. 60, Dudenhofen',
                ar: 'التواصل والوصول — Speyerer Str. 60, Dudenhofen',
            }[locale],
            description: {
                de: `Kontakt zur ${PRACTICE.name} — Telefon ${formatPhoneNumber(PRACTICE.phone)}, ${addressLine}. Öffnungszeiten Mo–Do ${weekdayHours}, Fr ${fridayHours}. Anfahrt aus Speyer, Schifferstadt und Römerberg, Parkplätze direkt vor der Praxis.`,
                en: `Contact ${PRACTICE.name} — phone ${formatPhoneNumber(PRACTICE.phone)}, ${addressLine}. Opening hours Mon–Thu ${weekdayHours}, Fri ${fridayHours}. Easily reached from Speyer, Schifferstadt and Römerberg with parking right outside the practice.`,
                ru: `Связь с ${PRACTICE.name} — телефон ${formatPhoneNumber(PRACTICE.phone)}, ${addressLine}. Часы работы: Пн–Чт ${weekdayHours}, Пт ${fridayHours}. Удобный подъезд из Speyer, Schifferstadt и Römerberg, парковка прямо перед практикой.`,
                ar: `تواصلوا مع ${PRACTICE.name} — الهاتف ${formatPhoneNumber(PRACTICE.phone)}، ${addressLine}. ساعات العمل: الإثنين–الخميس ${weekdayHours}، الجمعة ${fridayHours}. يسهل الوصول من Speyer وSchifferstadt وRömerberg، مع مواقف سيارات أمام العيادة مباشرة.`,
            }[locale],
            path: '/kontakt',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                { name: { de: 'Kontakt', en: 'Contact', ru: 'Контакты', ar: 'التواصل' }[locale], path: '/kontakt' },
            ],
        });
    },
    component: KontaktPage,
});

function KontaktPage() {
    const locale = useLocale();

    return (
        <main id="main-content">
            {/* Hero — cream */}
            <section id="hero" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-20">
                <Reveal>
                    <SectionEyebrow>{{ de: 'Kontakt', en: 'Contact', ru: 'Контакты', ar: 'التواصل' }[locale]}</SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {
                            { de: 'So erreichen Sie uns.', en: 'How to reach us.', ru: 'Как с нами связаться.', ar: 'كيف تتواصلون معنا.' }[
                                locale
                            ]
                        }
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Rufen Sie uns während unserer Anrufzeiten an — wir finden gemeinsam einen passenden Termin.',
                                en: 'Give us a call during our call hours — we will find a time that works together.',
                                ru: 'Позвоните нам в часы приёма звонков — вместе подберём удобное время.',
                                ar: 'اتصلوا بنا خلال ساعات استقبال المكالمات، وسنحدّد معاً موعداً مناسباً.',
                            }[locale]
                        }
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <a href={`tel:${PRACTICE.phone}`}>
                                {{ de: 'Jetzt anrufen', en: 'Call now', ru: 'Позвонить сейчас', ar: 'اتّصلوا الآن' }[locale]}
                            </a>
                        </Button>
                    </div>
                </Reveal>
            </section>

            {/* Kontaktdaten — blush */}
            <section id="kontaktdaten" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>
                            {{ de: 'Kontaktdaten', en: 'Contact details', ru: 'Контактные данные', ar: 'بيانات التواصل' }[locale]}
                        </SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Auf einen Blick.', en: 'At a glance.', ru: 'Кратко.', ar: 'لمحة سريعة.' }[locale]}
                        </h2>
                    </Reveal>

                    <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                        {/* Telefon */}
                        <Reveal delayMs={0}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <PhoneIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {{ de: 'Telefon', en: 'Phone', ru: 'Телефон', ar: 'الهاتف' }[locale]}
                                    </span>
                                    <a
                                        href={`tel:${PRACTICE.phone}`}
                                        className="mt-1 inline-flex w-fit font-serif text-2xl text-aubergine transition-[color,transform] duration-150 ease-out hover:text-aubergine-dark active:scale-[0.98]"
                                    >
                                        {formatPhoneNumber(PRACTICE.phone)}
                                    </a>
                                    <span className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Am besten erreichbar während unserer Anrufzeiten.',
                                                en: 'Best reached during our call hours.',
                                                ru: 'Лучше всего звонить в часы приёма звонков.',
                                                ar: 'يُفضَّل الاتصال خلال ساعات استقبال المكالمات.',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Anrufzeiten */}
                        <Reveal delayMs={80}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <PhoneCallIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {
                                            {
                                                de: 'Anrufzeiten',
                                                en: 'Call hours',
                                                ru: 'Часы приёма звонков',
                                                ar: 'ساعات استقبال المكالمات',
                                            }[locale]
                                        }
                                    </span>
                                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-charcoal">
                                        {PRACTICE.callHours.map((row) => (
                                            <Fragment key={row.days.de}>
                                                <dt className="font-serif text-base text-aubergine-dark">{row.days[locale]}</dt>
                                                <dd className={row.closed ? 'text-(--color-brand-charcoal-3)' : undefined}>
                                                    {row.time[locale]}
                                                </dd>
                                            </Fragment>
                                        ))}
                                    </dl>
                                    <span className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Wenn niemand abnimmt, sind wir gerade in Behandlung — bitte versuchen Sie es nach etwa 30 Minuten noch einmal.',
                                                en: 'If no one picks up we are with a patient — please try again in about 30 minutes.',
                                                ru: 'Если никто не отвечает, значит мы заняты с пациентом — пожалуйста, перезвоните примерно через 30 минут.',
                                                ar: 'إذا لم يردّ أحد فنحن مشغولون مع مريض — يُرجى المحاولة مرة أخرى بعد نحو 30 دقيقة.',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Anschrift */}
                        <Reveal delayMs={160}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <MapPinIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {{ de: 'Anschrift', en: 'Address', ru: 'Адрес', ar: 'العنوان' }[locale]}
                                    </span>
                                    <address className="mt-1 font-serif text-xl text-aubergine-dark not-italic">
                                        {PRACTICE.name}
                                        <br />
                                        {PRACTICE.person}
                                        <br />
                                        {PRACTICE.address.street}
                                        <br />
                                        {PRACTICE.address.postcode} {PRACTICE.address.city}
                                    </address>
                                    <span className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Eingang in der Ernst-Reuter-Straße (Eckhaus).',
                                                en: 'Entrance on Ernst-Reuter-Straße (corner building).',
                                                ru: 'Вход с улицы Ernst-Reuter-Straße (угловое здание).',
                                                ar: 'المدخل من شارع Ernst-Reuter-Straße (المبنى الزاوية).',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Öffnungszeiten */}
                        <Reveal delayMs={240}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <ClockIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {{ de: 'Öffnungszeiten', en: 'Opening hours', ru: 'Часы работы', ar: 'ساعات العمل' }[locale]}
                                    </span>
                                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-charcoal">
                                        {PRACTICE.hours.map((row) => (
                                            <Fragment key={row.days.de}>
                                                <dt className="font-serif text-base text-aubergine-dark">{row.days[locale]}</dt>
                                                <dd className={row.closed ? 'text-(--color-brand-charcoal-3)' : undefined}>
                                                    {row.time[locale]}
                                                </dd>
                                            </Fragment>
                                        ))}
                                    </dl>
                                    <span className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Termine nach Vereinbarung.',
                                                en: 'By appointment.',
                                                ru: 'Приём по предварительной записи.',
                                                ar: 'المواعيد بحجز مسبق.',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Anfahrt — cream */}
            <section id="anfahrt" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>
                            {{ de: 'Anfahrt', en: 'How to find us', ru: 'Как добраться', ar: 'كيفية الوصول' }[locale]}
                        </SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Mitten in Dudenhofen, gut zu erreichen.',
                                    en: 'In the heart of Dudenhofen, easy to reach.',
                                    ru: 'В центре Dudenhofen, удобный подъезд.',
                                    ar: 'في قلب Dudenhofen، يسهل الوصول إليها.',
                                }[locale]
                            }
                        </h2>
                        <p className="mt-6 max-w-2xl text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Die Praxis liegt in Dudenhofen bei Speyer und ist gut erreichbar aus Speyer, Schifferstadt und Römerberg — mit dem Auto, dem Bus oder zu Fuß.',
                                    en: 'The practice sits in Dudenhofen near Speyer and is easily reached from Speyer, Schifferstadt and Römerberg — by car, bus or on foot.',
                                    ru: 'Практика находится в Dudenhofen рядом со Speyer и легко достижима из Speyer, Schifferstadt и Römerberg — на автомобиле, автобусе или пешком.',
                                    ar: 'تقع العيادة في Dudenhofen قرب Speyer ويسهل الوصول إليها من Speyer وSchifferstadt وRömerberg — بالسيارة أو بالحافلة أو سيراً على الأقدام.',
                                }[locale]
                            }
                        </p>

                        {/* Maps deep-links */}
                        <div className="mt-8 flex flex-row flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                            <Button variant="brand" asChild>
                                <a href={PRACTICE.maps.google} target="_blank" rel="noopener noreferrer">
                                    {
                                        {
                                            de: 'Google Maps öffnen',
                                            en: 'Open Google Maps',
                                            ru: 'Открыть Google Maps',
                                            ar: 'فتح Google Maps',
                                        }[locale]
                                    }
                                </a>
                            </Button>
                            <Button variant="brand-outline" asChild>
                                <a href={PRACTICE.maps.apple} target="_blank" rel="noopener noreferrer">
                                    {
                                        { de: 'Apple Maps öffnen', en: 'Open Apple Maps', ru: 'Открыть Apple Maps', ar: 'فتح Apple Maps' }[
                                            locale
                                        ]
                                    }
                                </a>
                            </Button>
                        </div>
                    </Reveal>

                    {/* Embedded map */}
                    <Reveal delayMs={120}>
                        <div className="mt-10 aspect-video overflow-hidden rounded-xl border border-aubergine/10">
                            <iframe
                                src={PRACTICE.maps.embed}
                                title={
                                    {
                                        de: 'Karte: Podologie Dudenhofen',
                                        en: 'Map: Podologie Dudenhofen',
                                        ru: 'Карта: Podologie Dudenhofen',
                                        ar: 'الخريطة: Podologie Dudenhofen',
                                    }[locale]
                                }
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-full w-full border-0"
                            />
                        </div>
                        <p className="mt-3 text-xs text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Die eingebettete Karte lädt Inhalte von Google. Wenn Sie das vermeiden möchten, nutzen Sie die Schaltflächen oben — Details in der ',
                                    en: 'The embedded map loads content from Google. If you would rather avoid that, use the buttons above — details in our ',
                                    ru: 'Встроенная карта загружает содержимое от Google. Если вы хотите этого избежать, воспользуйтесь кнопками выше — подробности в ',
                                    ar: 'تُحمِّل الخريطة المضمَّنة محتوى من Google. إذا كنتم تفضّلون تجنّب ذلك فاستخدموا الأزرار أعلاه — التفاصيل في ',
                                }[locale]
                            }
                            <Link to="/{-$locale}/datenschutz" className="text-aubergine hover:underline">
                                {
                                    {
                                        de: 'Datenschutzerklärung',
                                        en: 'privacy policy',
                                        ru: 'политике конфиденциальности',
                                        ar: 'سياسة الخصوصية',
                                    }[locale]
                                }
                            </Link>
                            .
                        </p>
                    </Reveal>

                    <div className="mt-12 grid gap-8 md:grid-cols-2">
                        <Reveal>
                            <h3 className="font-serif text-xl text-aubergine-dark">
                                {{ de: 'Parkmöglichkeiten', en: 'Parking', ru: 'Парковка', ar: 'مواقف السيارات' }[locale]}
                            </h3>
                            <p className="mt-3 text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Kostenlose Straßenparkplätze gibt es in der Ernst-Reuter-Straße direkt vor dem Praxiseingang sowie auf der gegenüberliegenden Straßenseite. Der Zugang ist barrierefrei — auch mit Gehhilfe oder Rollstuhl.',
                                        en: 'Free street parking is available on Ernst-Reuter-Straße directly outside the entrance and on the opposite side of the street. Access is step-free, including with a walking aid or wheelchair.',
                                        ru: 'Бесплатные парковочные места на улице Ernst-Reuter-Straße имеются прямо перед входом в практику, а также на противоположной стороне улицы. Доступ без ступеней — в том числе с ходунками или инвалидной коляской.',
                                        ar: 'تتوفّر مواقف سيارات مجانية على شارع Ernst-Reuter-Straße أمام مدخل العيادة مباشرة وعلى الجهة المقابلة من الشارع. الوصول خالٍ من الدرجات — حتى مع وسيلة مساعدة على المشي أو كرسي متحرك.',
                                    }[locale]
                                }
                            </p>
                        </Reveal>
                        <Reveal delayMs={120}>
                            <h3 className="font-serif text-xl text-aubergine-dark">
                                {{ de: 'ÖPNV', en: 'Public transport', ru: 'Общественный транспорт', ar: 'النقل العام' }[locale]}
                            </h3>
                            <p className="mt-3 text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Zwei Bushaltestellen liegen wenige Minuten zu Fuß entfernt: „Speyerer Straße" und „Boligweg" in Dudenhofen. Aus Speyer fahren regelmäßig die Linien 591 und 507.',
                                        en: 'Two bus stops are a few minutes\' walk away: "Speyerer Straße" and "Boligweg" in Dudenhofen. From Speyer, lines 591 and 507 run regularly.',
                                        ru: 'В нескольких минутах ходьбы находятся две автобусные остановки: «Speyerer Straße» и «Boligweg» в Dudenhofen. Из Speyer регулярно ходят автобусы линий 591 и 507.',
                                        ar: 'تبعد محطّتا حافلات بضع دقائق سيراً على الأقدام: «Speyerer Straße» و«Boligweg» في Dudenhofen. ومن Speyer تسير بانتظام الحافلتان 591 و507.',
                                    }[locale]
                                }
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
