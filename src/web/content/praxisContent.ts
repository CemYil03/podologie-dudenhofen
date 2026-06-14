import { PackageIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';
import type { ContentLeaf, LocaleString } from './contentLeaf';

export const PRAXIS_HYGIENE_PILLARS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'hygiene-aufbereitung',
        icon: ShieldCheckIcon,
        heading: {
            de: 'Aufbereitung der Instrumente',
            en: 'Instrument reprocessing',
            ru: 'Обработка инструментов',
            ar: 'معالجة الأدوات',
        },
        body: {
            de: 'Thermische Desinfektion und anschließende Sterilisation nach den Empfehlungen des Robert Koch-Instituts. Jedes Instrument verlässt die Aufbereitung verpackt und gekennzeichnet.',
            en: 'Thermal disinfection followed by sterilisation in line with the Robert Koch Institute recommendations. Every instrument leaves reprocessing sealed and labelled.',
            ru: 'Термическая дезинфекция и последующая стерилизация в соответствии с рекомендациями Института Роберта Коха. Каждый инструмент покидает обработку упакованным и маркированным.',
            ar: 'تطهير حراري يليه تعقيم وفقًا لتوصيات معهد روبرت كوخ. تخرج كل أداة من المعالجة معبأة ومُعلّمة.',
        },
        keywords: {
            de: ['aufbereitung', 'instrumente', 'sterilisation', 'desinfektion', 'rki'],
            en: ['reprocessing', 'instruments', 'sterilisation', 'disinfection', 'rki'],
            ru: ['обработка', 'инструменты', 'стерилизация', 'дезинфекция', 'rki'],
            ar: ['معالجة', 'أدوات', 'تعقيم', 'تطهير', 'rki'],
        },
    },
    {
        id: 'hygiene-flaechendesinfektion',
        icon: SparklesIcon,
        heading: {
            de: 'Flächendesinfektion',
            en: 'Surface disinfection',
            ru: 'Дезинфекция поверхностей',
            ar: 'تطهير الأسطح',
        },
        body: {
            de: 'Behandlungseinheit, Liege und Kontaktflächen werden zwischen jeder Behandlung mit VAH-gelisteten Mitteln desinfiziert — mit ausreichender Einwirkzeit.',
            en: 'The treatment unit, couch and contact surfaces are disinfected between every patient with VAH-listed agents — with the proper contact time.',
            ru: 'Между каждым пациентом лечебный блок, кушетка и контактные поверхности дезинфицируются средствами из списка VAH — с соблюдением времени экспозиции.',
            ar: 'تُطهَّر وحدة العلاج والسرير والأسطح الملامسة بين كل مريض وآخر بمواد مُدرجة في قائمة VAH — مع وقت تماس كافٍ.',
        },
        keywords: {
            de: ['flächendesinfektion', 'desinfektion', 'vah'],
            en: ['surface disinfection', 'disinfection', 'vah'],
            ru: ['дезинфекция поверхностей', 'дезинфекция', 'vah'],
            ar: ['تطهير الأسطح', 'تطهير', 'vah'],
        },
    },
    {
        id: 'hygiene-einmalmaterial',
        icon: PackageIcon,
        heading: {
            de: 'Einmal-Materialien',
            en: 'Single-use materials',
            ru: 'Одноразовые материалы',
            ar: 'مواد للاستعمال مرة واحدة',
        },
        body: {
            de: 'Schleifkörper, Skalpellklingen, Tupfer und Handschuhe sind Einmal-Material und werden nach jeder Behandlung verworfen — überall dort, wo es medizinisch sinnvoll ist.',
            en: 'Burrs, scalpel blades, swabs and gloves are single-use and discarded after every treatment — wherever this is medically appropriate.',
            ru: 'Шлифовальные насадки, лезвия скальпелей, тампоны и перчатки — одноразовые и утилизируются после каждой процедуры везде, где это медицински оправдано.',
            ar: 'رؤوس الصنفرة وشفرات المشرط والقطن والقفازات للاستعمال مرة واحدة وتُتلف بعد كل علاج — حيثما يكون ذلك ملائمًا طبيًا.',
        },
        keywords: {
            de: ['einmal', 'einmalmaterial', 'einwegmaterial', 'skalpell', 'tupfer'],
            en: ['single-use', 'disposable', 'scalpel', 'swab'],
            ru: ['одноразовый', 'одноразовые материалы', 'скальпель', 'тампон'],
            ar: ['مرة واحدة', 'مواد للاستعمال مرة واحدة', 'مشرط', 'قطن'],
        },
    },
];

export type ReprocessingStep = ContentLeaf & {
    image: { src: string; alt: LocaleString };
};

export const PRAXIS_REPROCESSING_STEPS: ReadonlyArray<ReprocessingStep> = [
    {
        id: 'aufbereitung-thermodesinfektor',
        heading: {
            de: 'Thermodesinfektor',
            en: 'Thermal disinfector',
            ru: 'Термодезинфектор',
            ar: 'جهاز التطهير الحراري',
        },
        body: {
            de: 'Reinigung und thermische Desinfektion der Instrumente. Jeder Vorgang wird automatisch dokumentiert.',
            en: 'Instruments are cleaned and thermally disinfected. Every cycle is automatically logged.',
            ru: 'Очистка и термическая дезинфекция инструментов. Каждый цикл автоматически документируется.',
            ar: 'تنظيف الأدوات وتطهيرها حراريًا. تُسجَّل كل دورة تلقائيًا.',
        },
        keywords: {
            de: ['thermodesinfektor', 'thermische desinfektion'],
            en: ['thermal disinfector', 'thermal disinfection'],
            ru: ['термодезинфектор', 'термическая дезинфекция'],
            ar: ['جهاز التطهير الحراري', 'التطهير الحراري'],
        },
        image: {
            src: '/instrumentenaufbereitung/thermodesinfektor.jpg',
            alt: {
                de: 'Thermodesinfektor zur Reinigung und Desinfektion der Instrumente.',
                en: 'Thermal disinfector for cleaning and disinfecting instruments.',
                ru: 'Термодезинфектор для очистки и дезинфекции инструментов.',
                ar: 'جهاز تطهير حراري لتنظيف الأدوات وتطهيرها.',
            },
        },
    },
    {
        id: 'aufbereitung-folienschweissgeraet',
        heading: {
            de: 'Folienschweißgerät',
            en: 'Pouch sealer',
            ru: 'Запайщик пакетов',
            ar: 'جهاز لحام أكياس التعقيم',
        },
        body: {
            de: 'Die getrockneten Instrumente werden in Sterilisationsfolie verpackt und eingeschweißt.',
            en: 'Once dried, the instruments are packed into sterilisation pouches and sealed.',
            ru: 'Высушенные инструменты упаковываются в стерилизационную плёнку и запаиваются.',
            ar: 'تُعبأ الأدوات بعد تجفيفها في أكياس تعقيم ويُغلق طرفها بالحرارة.',
        },
        keywords: {
            de: ['folienschweißgerät', 'sterilisationsfolie', 'verpackung'],
            en: ['pouch sealer', 'sterilisation pouch'],
            ru: ['запайщик пакетов', 'стерилизационная плёнка', 'упаковка'],
            ar: ['جهاز لحام أكياس التعقيم', 'كيس تعقيم'],
        },
        image: {
            src: '/instrumentenaufbereitung/folienschweissgeraet.jpg',
            alt: {
                de: 'Folienschweißgerät zum Verpacken der Instrumente in Sterilisationsfolie.',
                en: 'Pouch sealer used to package instruments in sterilisation film.',
                ru: 'Запайщик для упаковки инструментов в стерилизационную плёнку.',
                ar: 'جهاز لحام لتعبئة الأدوات في كيس تعقيم.',
            },
        },
    },
    {
        id: 'aufbereitung-autoklav',
        heading: {
            de: 'Autoklav',
            en: 'Autoclave',
            ru: 'Автоклав',
            ar: 'جهاز التعقيم بالبخار (الأوتوكلاف)',
        },
        body: {
            de: 'Die verpackten Instrumente werden sterilisiert und mit Datum und Chargennummer beschriftet.',
            en: 'The sealed instruments are sterilised and labelled with date and batch number.',
            ru: 'Упакованные инструменты стерилизуются и маркируются датой и номером партии.',
            ar: 'تُعقَّم الأدوات المغلفة وتُعلَّم بتاريخ التعقيم ورقم الدفعة.',
        },
        keywords: {
            de: ['autoklav', 'sterilisation', 'chargennummer'],
            en: ['autoclave', 'sterilisation', 'batch number'],
            ru: ['автоклав', 'стерилизация', 'номер партии'],
            ar: ['أوتوكلاف', 'تعقيم', 'رقم الدفعة'],
        },
        image: {
            src: '/instrumentenaufbereitung/autoclave.jpg',
            alt: {
                de: 'Autoklav zur Sterilisation der verpackten Instrumente.',
                en: 'Autoclave used to sterilise the sealed instruments.',
                ru: 'Автоклав для стерилизации упакованных инструментов.',
                ar: 'جهاز أوتوكلاف لتعقيم الأدوات المغلفة.',
            },
        },
    },
];
