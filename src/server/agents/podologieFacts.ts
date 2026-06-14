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
    hours: 'Mo–Do 08:00–18:00, Fr 08:00–14:00, Sa & So geschlossen — Termine nach Vereinbarung',
    transit: 'Bus 591 und 507 ab Speyer; Haltestellen "Speyerer Straße" und "Boligweg" (Dudenhofen)',
    services: [
        'Podologische Behandlung (Hornhaut, Hühneraugen, eingewachsene Nägel)',
        'Diabetisches Fußsyndrom — Verordnung über Heilmittel möglich',
        'Nagelkorrekturspangen / Orthonyxie',
        'Hausbesuche nach Absprache',
    ],
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
