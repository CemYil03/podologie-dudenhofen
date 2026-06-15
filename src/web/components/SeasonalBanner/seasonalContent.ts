import type { Locale } from '../../utils/locale';

// Date-driven copy for the home-page seasonal banner. Pure functions in,
// pure data out — see `seasonalBannerResolve`. Adding a season:
//
// 1. Add a `kind` to `SeasonalBannerKind`
// 2. Add the copy + icon name in `SEASONAL_BANNER_CONTENT`
// 3. Wire the resolution window in `seasonalBannerResolve`
//
// No animation lives here — that's `SeasonalEffect`. The two coexist; see
// `docs/features/seasonal-effects.md` for the calendar.

export type SeasonalBannerKind = 'advent' | 'weihnachten' | 'neujahr' | 'ostern' | 'muttertag' | 'sommer' | 'erntedank';

export type SeasonalIcon = 'snowflake' | 'pine' | 'sparkles' | 'flower' | 'heart' | 'sun' | 'wheat';

export interface SeasonalBannerCopy {
    headline: string;
    body: string;
}

export const SEASONAL_BANNER_CONTENT: Record<SeasonalBannerKind, { icon: SeasonalIcon; copy: Record<Locale, SeasonalBannerCopy> }> = {
    advent: {
        icon: 'pine',
        copy: {
            de: {
                headline: 'Eine schöne Adventszeit.',
                body: 'Wir wünschen Ihnen ruhige Tage und freuen uns, Sie weiter begleiten zu dürfen.',
            },
            en: {
                headline: 'A peaceful Advent season.',
                body: 'Wishing you calm days — we look forward to seeing you again soon.',
            },
            ru: {
                headline: 'Спокойного Адвента.',
                body: 'Желаем вам тихих дней и будем рады снова видеть вас в нашей практике.',
            },
            ar: {
                headline: 'نتمنى لكم وقتاً هادئاً في فترة الأدفنت.',
                body: 'أياماً مفعمة بالسكينة، ونتطلع إلى لقائكم مجدداً.',
            },
        },
    },
    weihnachten: {
        icon: 'snowflake',
        copy: {
            de: {
                headline: 'Frohe Weihnachten.',
                body: 'Ein paar warme, ruhige Tage im Kreis Ihrer Liebsten — das wünschen wir Ihnen von Herzen.',
            },
            en: {
                headline: 'Merry Christmas.',
                body: 'A few warm, quiet days with the people closest to you — that is our wish for you.',
            },
            ru: {
                headline: 'Счастливого Рождества.',
                body: 'Желаем вам нескольких тёплых, спокойных дней в кругу близких.',
            },
            ar: {
                headline: 'عيد ميلاد مجيد.',
                body: 'نتمنى لكم أياماً دافئة وهادئة بصحبة أحبائكم.',
            },
        },
    },
    neujahr: {
        icon: 'sparkles',
        copy: {
            de: {
                headline: 'Ein gutes neues Jahr.',
                body: 'Wir wünschen Ihnen Gesundheit und einen ruhigen Start ins kommende Jahr.',
            },
            en: {
                headline: 'A good new year.',
                body: 'Wishing you good health and a calm start to the year ahead.',
            },
            ru: {
                headline: 'С Новым годом.',
                body: 'Желаем вам крепкого здоровья и спокойного начала нового года.',
            },
            ar: {
                headline: 'سنة جديدة سعيدة.',
                body: 'نتمنى لكم الصحة وبداية هادئة للعام الجديد.',
            },
        },
    },
    ostern: {
        icon: 'flower',
        copy: {
            de: {
                headline: 'Frohe Ostern.',
                body: 'Genießen Sie die Frühlingstage — wir freuen uns auf den nächsten Termin.',
            },
            en: {
                headline: 'Happy Easter.',
                body: 'Enjoy the spring days — we look forward to seeing you at your next appointment.',
            },
            ru: {
                headline: 'Светлой Пасхи.',
                body: 'Наслаждайтесь весенними днями — будем рады видеть вас на следующем приёме.',
            },
            ar: {
                headline: 'عيد فصح سعيد.',
                body: 'استمتعوا بأيام الربيع — في انتظار لقائكم في الموعد القادم.',
            },
        },
    },
    muttertag: {
        icon: 'heart',
        copy: {
            de: {
                headline: 'Alles Liebe zum Muttertag.',
                body: 'An alle Mütter, Großmütter und Bezugspersonen — danke für alles, was Sie tragen.',
            },
            en: {
                headline: 'Happy Mother’s Day.',
                body: 'To every mother, grandmother and caregiver — thank you for all that you carry.',
            },
            ru: {
                headline: 'С Днём матери.',
                body: 'Всем мамам, бабушкам и близким, заботящимся о других, — спасибо за всё, что вы делаете.',
            },
            ar: {
                headline: 'عيد أم سعيد.',
                body: 'إلى كل أم وجدة وكل من يقدم الرعاية — شكراً على كل ما تحملونه.',
            },
        },
    },
    sommer: {
        icon: 'sun',
        copy: {
            de: {
                headline: 'Schöne Sommerzeit.',
                body: 'Achten Sie bei Hitze auf Ihre Füße — leichtes Schuhwerk und ausreichend Wasser tun gut.',
            },
            en: {
                headline: 'Have a lovely summer.',
                body: 'In the heat, look after your feet — light footwear and plenty of water go a long way.',
            },
            ru: {
                headline: 'Хорошего лета.',
                body: 'В жару берегите ноги — лёгкая обувь и достаточное количество воды очень помогают.',
            },
            ar: {
                headline: 'صيفاً طيباً.',
                body: 'اعتنوا بأقدامكم في الحر — أحذية خفيفة وكثير من الماء.',
            },
        },
    },
    erntedank: {
        icon: 'wheat',
        copy: {
            de: {
                headline: 'Schönen Erntedank.',
                body: 'Eine kleine Danksagung für alles, was uns trägt — und für Ihr Vertrauen.',
            },
            en: {
                headline: 'A peaceful harvest festival.',
                body: 'A quiet thank-you for all that sustains us — and for your trust in our practice.',
            },
            ru: {
                headline: 'С праздником урожая.',
                body: 'Маленькое «спасибо» за всё, что нас поддерживает — и за ваше доверие.',
            },
            ar: {
                headline: 'عيد حصاد سعيد.',
                body: 'شكراً صغيراً على كل ما يسندنا — وعلى ثقتكم بنا.',
            },
        },
    },
};
