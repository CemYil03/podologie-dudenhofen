// Site-wide practice facts. The single source of truth for the practice's
// name, person, contact details, address, opening hours, and external map
// URLs. Imported by site chrome (header, footer), route content, and
// `seoMeta()` — never re-declare any of these values inline.
export const PRACTICE = {
    name: 'Podologie Dudenhofen',
    person: 'Annette Yilmaz',
    email: 'podologie.annette@gmail.com',
    phone: {
        human: '+49 6232 621064',
        tel: '+496232621064',
    },
    address: {
        street: 'Speyerer Straße 60',
        postcode: '67373',
        city: 'Dudenhofen',
    },
    hours: [
        { days: { de: 'Mo–Do', en: 'Mon–Thu' }, time: { de: '08:00 – 18:00', en: '08:00 – 18:00' }, closed: false },
        { days: { de: 'Fr', en: 'Fri' }, time: { de: '08:00 – 14:00', en: '08:00 – 14:00' }, closed: false },
        { days: { de: 'Sa & So', en: 'Sat & Sun' }, time: { de: 'geschlossen', en: 'closed' }, closed: true },
    ],
    maps: {
        embed: 'https://www.google.com/maps?q=Podologie+Annette+Yilmaz,+Speyerer+Str.+60,+67373+Dudenhofen&output=embed',
        google: 'https://www.google.com/maps/dir/53.5542316,9.9152351/Podologie+Annette+Yilmaz,+Speyerer+Str.+60,+67373+Dudenhofen',
        apple: 'https://maps.apple.com/directions?destination=Podologie+Annette+Yilmaz%2C+Speyerer+Stra%C3%9Fe+60+67373+Dudenhofen+Deutschland&destination-place-id=IE4D6102C9A687DCD&mode=driving',
    },
} as const;
