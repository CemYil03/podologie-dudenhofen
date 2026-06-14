import type { Locale } from '../../web/utils/locale';

// Single source of truth for the practice facts the visitor agent grounds
// its answers in. Mirrors the "Practice details" section of `docs/project.md`
// and the constants in `src/web/components/SiteHeader.tsx` /
// `src/routes/{-$locale}/kontakt.tsx` — when any of these change, update both
// places and this file.
//
// Kept as a small TypeScript constant rather than a JSON blob so the
// strings live where IDE go-to-definition lands and so refactors that
// rename a field in the prompt fail loudly instead of silently going
// stale.
export const PODOLOGIE_FACTS = {
    practitioner: 'Annette Yilmaz',
    address: 'Speyerer Straße 60, 67373 Dudenhofen',
    phone: '+49 6232 621064',
    phoneTel: '+496232621064',
    email: 'podologie.annette@gmail.com',
    pageAnchors: {
        services: '/leistungen',
        servicesNeed: '/leistungen#brauche-ich-podologen',
        servicesList: '/leistungen#leistungen',
        firstAppointment: '/leistungen#was-bringe-ich-mit',
        costs: '/leistungen#kosten',
        rooms: '/praxis#raeume',
        therapist: '/praxis#therapeutin',
        hygiene: '/praxis#hygiene',
        directions: '/kontakt#anfahrt',
        contactRequest: '/kontakt#anfrage',
    },
} as const;

// Locale-specific facts. Hours and transit text use locale-appropriate day
// abbreviations and connectors; the `services` list is grounded medical-
// vocabulary text the visitor agent quotes back at users when they ask what
// the practice offers. Adding a new locale here is enough to make the agent
// respond in that language — see `agentVisitorAssistant.ts`.
export const PODOLOGIE_FACTS_LOCALIZED: Record<
    Locale,
    {
        hours: string;
        transit: string;
        services: ReadonlyArray<string>;
    }
> = {
    de: {
        hours: 'Mo–Do 08:00–18:00, Fr 08:00–14:00, Sa & So geschlossen — Termine nach Vereinbarung',
        transit: 'Bus 591 und 507 ab Speyer; Haltestellen "Speyerer Straße" und "Boligweg" (Dudenhofen)',
        services: [
            'Podologische Behandlung (Hornhaut, Hühneraugen, eingewachsene Nägel)',
            'Diabetisches Fußsyndrom — Verordnung über Heilmittel möglich',
            'Nagelkorrekturspangen / Orthonyxie',
            'Hausbesuche nach Absprache',
        ],
    },
    en: {
        hours: 'Mon–Thu 08:00–18:00, Fri 08:00–14:00, Sat & Sun closed — appointments by arrangement',
        transit: 'Buses 591 and 507 from Speyer; stops "Speyerer Straße" and "Boligweg" (Dudenhofen)',
        services: [
            'Podiatry treatment (calluses, corns, ingrown nails)',
            'Diabetic foot syndrome — prescription via medical aid possible',
            'Nail-correction braces / orthonyxia',
            'Home visits by arrangement',
        ],
    },
    ru: {
        hours: 'Пн–Чт 08:00–18:00, Пт 08:00–14:00, Сб и Вс выходной — приём по предварительной записи',
        transit: 'Автобусы 591 и 507 из Шпайера; остановки «Speyerer Straße» и «Boligweg» (Dudenhofen)',
        services: [
            'Подологическое лечение (мозоли, натоптыши, вросшие ногти)',
            'Синдром диабетической стопы — возможно назначение по медицинской страховке',
            'Ортонихические скобы / ортониксия',
            'Визиты на дом по согласованию',
        ],
    },
    ar: {
        hours: 'الإثنين–الخميس 08:00–18:00، الجمعة 08:00–14:00، السبت والأحد مغلق — المواعيد بالحجز المسبق',
        transit: 'الحافلتان 591 و507 من شباير؛ المحطتان «Speyerer Straße» و«Boligweg» (Dudenhofen)',
        services: [
            'علاج الأقدام (الجلد المتيبس، الكالو، الأظافر الغارزة)',
            'متلازمة القدم السكرية — يمكن الحصول على وصفة عبر التأمين الصحي',
            'أقواس تصحيح الأظافر / أوثونيكسيا',
            'الزيارات المنزلية بالاتفاق',
        ],
    },
};
