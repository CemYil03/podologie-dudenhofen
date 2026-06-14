// Site-wide practice facts. The single source of truth for the practice's
// name, person, contact details, address, opening hours, and external map
// URLs. Imported by site chrome (header, footer), route content, and
// `seoMeta()` — never re-declare any of these values inline.
//
// `phone` is the raw E.164 number — also a valid `tel:` URI per RFC 3966.
// Use `formatPhoneNumber()` from `src/shared/formatters` whenever it is
// rendered to the UI; never store a pre-formatted human variant alongside.
export const PRACTICE = {
    name: 'Podologie Dudenhofen',
    person: 'Annette Yilmaz',
    email: 'podologie.annette@gmail.com',
    phone: '+496232621064',
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
    // Phone-staffed window — narrower than `hours` because the practice
    // can't answer the phone during treatments later in the day.
    callHours: [
        { days: { de: 'Mo–Fr', en: 'Mon–Fri' }, time: { de: '08:00 – 16:00', en: '08:00 – 16:00' }, closed: false },
        { days: { de: 'Sa & So', en: 'Sat & Sun' }, time: { de: 'geschlossen', en: 'closed' }, closed: true },
    ],
    maps: {
        embed: 'https://www.google.com/maps?q=Podologie+Annette+Yilmaz,+Speyerer+Str.+60,+67373+Dudenhofen&output=embed',
        google: 'https://www.google.com/maps/dir/53.5542316,9.9152351/Podologie+Annette+Yilmaz,+Speyerer+Str.+60,+67373+Dudenhofen',
        apple: 'https://maps.apple.com/directions?destination=Podologie+Annette+Yilmaz%2C+Speyerer+Stra%C3%9Fe+60+67373+Dudenhofen+Deutschland&destination-place-id=IE4D6102C9A687DCD&mode=driving',
        // Lands directly on the reviews list for the practice's Google
        // listing. Place ID and CID were confirmed from the listing's own
        // embed payload — see docs/features/testimonials.md.
        reviews: 'https://search.google.com/local/reviews?placeid=ChIJzcTVmG20l0cR7OwkPRBebrY',
    },
    googlePlaceId: 'ChIJzcTVmG20l0cR7OwkPRBebrY',
} as const;
