import { PRACTICE } from '../practice';
import type { Locale } from '../utils/locale';

// Site-wide branding and SEO defaults. Update `PRACTICE.name` in
// `src/web/practice.ts` and every page's `<title>`, `og:site_name`, and
// Twitter card text follows.
export const SITE_NAME = PRACTICE.name;

// Default Open Graph / Twitter Card image. Root-relative so the `seoMeta()`
// helper turns it into an absolute URL using `webPageUrl`. Replace with your
// actual social-share image (recommended 1200×630).
export const DEFAULT_SHARE_IMAGE = '/podologie-dudenhofen-logo.png';

// Dimensions of `DEFAULT_SHARE_IMAGE`. Emitted as `og:image:width` /
// `og:image:height` so Facebook, WhatsApp and LinkedIn can compose link
// previews without a pre-fetch round trip. Update in lockstep when you swap
// the image — a wrong size is worse than no size at all.
export const DEFAULT_SHARE_IMAGE_DIMENSIONS = { width: 1200, height: 630 } as const;

// `og:image:alt` — purely descriptive, never localized for the default. The
// per-page `image` and `imageAlt` overrides on `seoMeta()` win when the page
// ships its own share asset.
export const DEFAULT_SHARE_IMAGE_ALT: Record<Locale, string> = {
    de: 'Podologie Dudenhofen — Praxis von Annette Yilmaz',
    en: 'Podologie Dudenhofen — practice of Annette Yilmaz',
};

// Maps app locales to the IETF tags Open Graph expects. Add a new entry here
// whenever you add a locale in `src/web/utils/locale.ts`.
export const OG_LOCALE: Record<Locale, string> = {
    de: 'de_DE',
    en: 'en_US',
};

// Practice geo coordinates. Sourced from OpenStreetMap (Nominatim) for the
// building at Speyerer Straße 60, 67373 Dudenhofen. Used by the
// `MedicalBusiness` JSON-LD `geo` field and the `geo.position` / `ICBM`
// meta tags. Keep in sync with `PRACTICE.address` if the practice ever
// moves.
export const GEO_COORDINATES = { latitude: 49.3158, longitude: 8.39613 } as const;

// `geo.region` follows ISO 3166-2 — DE-RP is Rheinland-Pfalz.
export const REGION_CODE = 'DE-RP';
