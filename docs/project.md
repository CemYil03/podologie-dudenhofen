# Project Brief — Podologie Dudenhofen

This file is the working brief for the public-facing site of **Podologie Dudenhofen**. It captures _what_ we're building, _why_, and _what
to do next_. Architecture lives in [`docs/architecture/`](./architecture/), conventions in [`docs/conventions.md`](./conventions.md);
shipped features are documented in [`docs/features/`](./features/); this file is the product layer that sits on top of them.

Keep it current. When a roadmap item ships, move it into "Done" with a one-line note and link the PR or feature doc.

---

## Identity

| Field            | Value                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Product name     | Podologie Dudenhofen                                                                                          |
| Live URL         | <https://podologie-dudenhofen.de>                                                                             |
| Replaces         | <https://podologie-dudenhofen.jimdoweb.com/>                                                                  |
| Locales          | German (default, canonical), English (`/en/...`), Russian (`/ru/...`), Arabic (`/ar/...`, RTL)                |
| Audience         | Local patients in Speyer-Dudenhofen / Schifferstadt / Speyer area, plus regional Russian- and Arabic-speakers |
| Practice profile | Small private medical-foot-care (Podologie) practice                                                          |

The practice owner is the editorial voice. Copy is patient-facing, calm, factual; we explicitly avoid clinical jargon unless we then explain
it inline.

---

## Goals

1. **Replace the Jimdo site at the same domain authority.** No drop in local search ranking during the cutover. Every URL the legacy site
   exposed needs either a like-for-like replacement or a 301 redirect.
2. **Convert visits into contact.** Phone, address, opening hours, and a single contact / appointment-request CTA are reachable from every
   page.
3. **Reduce the "is this for me?" friction.** Visitors should be able to read what we treat, who pays for it (gesetzlich vs. privat,
   Verordnung), and what a first appointment looks like — without picking up the phone.
4. **Speak the patient's language.** German is canonical and gets the full long-form treatment; English, Russian, and Arabic mirror the same
   content with full translations and proper RTL handling for Arabic. The site is fully four-locale, not a German page with translations
   bolted on.

Non-goals (for now): online booking with a calendar, payments, patient portal, multi-staff scheduling. We start with a request form.

---

## Audience

- **Primary:** German-speaking adults in the immediate region looking for medical-foot-care, often referred by a GP / diabetologist or
  prompted by a specific complaint (Hühneraugen, eingewachsene Nägel, diabetisches Fußsyndrom).
- **Secondary:** Family members searching on behalf of an elderly parent — looking for Hausbesuche (home visits) and reassurance about
  hygiene/insurance handling.
- **Tertiary:** English-speaking residents and staff at nearby military/research sites; Russian- and Arabic-speaking residents in the Speyer
  / Vorderpfalz region. The non-German pages serve the same content, so a visitor can read everything in their own language and then call.

---

## Practice details

Confirmed by the practice owner; the single source of truth in code is [`src/web/practice.ts`](../src/web/practice.ts), which exports a
`PRACTICE` constant consumed by site chrome, route content, `seoMeta()`, and the AI assistants. **Never re-declare any of these values
inline.** When any value changes, update `src/web/practice.ts` and this section together — and remember `phone` is stored E.164-only; human
formatting is handled at render time by `formatPhoneNumber()` from `src/shared/formatters`.

| Field                  | Value                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| Practitioner           | Annette Yilmaz                                                                                  |
| Address                | Speyerer Straße 60, 67373 Dudenhofen                                                            |
| Phone (E.164)          | +496232621064                                                                                   |
| Email                  | podologie.annette@gmail.com                                                                     |
| Opening hours          | Mo–Do 08:00–18:00, Fr 08:00–14:00, Sa & So geschlossen                                          |
| Phone hours            | Mo–Fr 08:00–16:00 (narrower than opening hours — phone goes unanswered during later treatments) |
| Bus stops              | "Speyerer Straße" and "Boligweg" (Dudenhofen)                                                   |
| Bus lines              | 591 and 507 from Speyer                                                                         |
| Geo (lat/long)         | 49.3158, 8.39613 (Nominatim — `src/web/seo/seoConstants.ts`)                                    |
| Google Place ID        | `ChIJzcTVmG20l0cR7OwkPRBebrY`                                                                   |
| Photo, room            | `public/podologie-dudenhofen-praxis.jpg`                                                        |
| Photo, person          | `public/podologie-dudenhofen-annette-yilmaz.jpg`                                                |
| Urkunde, Podologie     | `public/urkunden/annette-yilmaz-podologin.png`                                                  |
| Urkunde, Heilpraktiker | `public/urkunden/annette-yilmaz-heilpraktikerin.png`                                            |
| Logo                   | `public/podologie-dudenhofen-logo.png` (also the default OG / Twitter share image)              |
| Reprocessing photos    | `public/instrumentenaufbereitung/{autoclave,folienschweissgeraet,thermodesinfektor}.jpg`        |

---

## Content Inventory

The site launches with these pages. Every page is multilingual across all four locales (de/en/ru/ar) unless marked otherwise.

| Route                               | Purpose                                                                                                                                                                                                                                                                                                           | Priority |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `/` (Home)                          | Services-led hero + 3 service highlights + AI-assistant entry card + opening hours + map + dark credential strip + testimonials + final CTA. Vacation banner takes priority over the seasonal banner at the top.                                                                                                  | P0       |
| `/praxis` (Practice)                | Long-scroll page with anchored sections `#raeume`, `#therapeutin`, `#hygiene` (incl. instrument-reprocessing pipeline) — replaces the legacy `/therapeutin` and `/hygiene` pages                                                                                                                                  | P0       |
| `/leistungen` (Services)            | `#brauche-ich-eine-behandlung` checklist · `#leistungen` service cards · `#was-bringe-ich-mit` (first-appointment list) · `#kosten` (insurance vs self-payer) · `#termin` CTA                                                                                                                                     | P0       |
| `/qualifikation` (Credentials)      | `#podologie` · `#heilpraktiker` · `#urkunden` (renders both Urkunden inline) · `#termin` CTA — replaces legacy `/podologie`, `/heilpraktiker-podologie`, `/podologie-urkunde`, `/heilpraktiker-urkunde`                                                                                                           | P0       |
| `/karriere` (Careers)               | Initiativbewerbung surface for other Podolog\*innen — `#was-uns-ausmacht`, `#wen-wir-suchen`, `#was-wir-bieten`, `#bewerbung`. German-only in the sitemap; the other locales render but aren't indexed.                                                                                                           | P0       |
| `/kontakt` (Contact)                | `#kontaktdaten` (with phone CTA in the hero) · `#anfahrt` with Google + Apple Maps deep-links + embedded map + ÖPNV + parking — absorbs the legacy `/anfahrt` page. The `#anfrage` request CTA section will return when the online booking flow ships; until then the page-wide phone CTAs cover the same intent. | P0       |
| `/chat` (Visitor AI assistant)      | Public chat surface backed by `agentVisitorAssistant`, grounded in `podologieFacts.ts`. Top-of-funnel only — never gives medical advice or quotes prices, hands off to the phone number on `/kontakt#kontaktdaten`. See `chat-visitor.md`.                                                                        | P0       |
| `/admin/chat`, `/admin/vacations`   | Practice-owner surfaces. Admin AI chat (`chat-admin.md`) and vacation scheduler (`vacations.md`). Behind auth; not in sitemap.                                                                                                                                                                                    | P0       |
| `/impressum` (Imprint)              | Legal imprint — required by §5 TMG. German-only in sitemap.                                                                                                                                                                                                                                                       | P0       |
| `/datenschutz` (Privacy)            | Privacy policy — required by GDPR. German-only in sitemap.                                                                                                                                                                                                                                                        | P0       |
| `/barrierefreiheit` (Accessibility) | Accessibility statement (BFSG / EU 2025) — not yet built                                                                                                                                                                                                                                                          | P1       |

The top-level navigation in [`SiteHeader`](../src/web/components/SiteHeader.tsx) shows five items: Praxis · Leistungen · Qualifikation ·
Karriere · Kontakt — translated per locale. Legal pages live in the [`SiteFooter`](../src/web/components/SiteFooter.tsx) only, alongside the
copyright line.

Indexable paths and per-locale availability live in [`src/web/seo/sitemapRoutes.ts`](../src/web/seo/sitemapRoutes.ts) — `/karriere`,
`/impressum`, and `/datenschutz` are restricted to `de`; everything else is in all four locales.

### Anchors that must not change

The chat assistant and the curated site-search index deep-link into these — renaming a section ID is a breaking change for both:

- `/praxis#raeume`, `/praxis#therapeutin`, `/praxis#hygiene`
- `/leistungen#brauche-ich-eine-behandlung`, `/leistungen#leistungen`, `/leistungen#was-bringe-ich-mit`, `/leistungen#kosten`,
  `/leistungen#termin`
- `/qualifikation#podologie`, `/qualifikation#heilpraktiker`, `/qualifikation#urkunden`, `/qualifikation#termin`
- `/karriere#was-uns-ausmacht`, `/karriere#wen-wir-suchen`, `/karriere#was-wir-bieten`, `/karriere#bewerbung`
- `/kontakt#kontaktdaten`, `/kontakt#anfahrt` (the `#anfrage` anchor returns once online booking ships)

### Legacy → new redirect map

The Jimdo site exposed nine top-level slugs. The 301 map for cutover:

| Legacy URL                 | Target                         |
| -------------------------- | ------------------------------ |
| `/`                        | `/`                            |
| `/therapeutin`             | `/praxis#therapeutin`          |
| `/podologie`               | `/qualifikation#podologie`     |
| `/heilpraktiker-podologie` | `/qualifikation#heilpraktiker` |
| `/praxis`                  | `/praxis#raeume`               |
| `/leistungen`              | `/leistungen`                  |
| `/hygiene`                 | `/praxis#hygiene`              |
| `/podologie-urkunde`       | `/qualifikation#urkunden`      |
| `/heilpraktiker-urkunde`   | `/qualifikation#urkunden`      |
| `/kontakt`                 | `/kontakt`                     |
| `/anfahrt`                 | `/kontakt#anfahrt`             |

URL-slug rule: German slugs are canonical and shared across all locales. The router's `{-$locale}` segment exposes them at `/<slug>` for
German and `/<locale>/<slug>` for the other three (`/en/...`, `/ru/...`, `/ar/...`); the in-page copy translates per `useLocale()`. See
[`docs/architecture/i18n.md`](./architecture/i18n.md).

---

## Design Direction

The brand foundations are documented in [`docs/style/`](./style/) — the palette in [`colors.md`](./style/colors.md), the three-font system
in [`typography.md`](./style/typography.md), the reusable patterns (pill buttons, section eyebrow, service cards, credential blocks) in
[`patterns.md`](./style/patterns.md), and the single-theme decision in [`themes.md`](./style/themes.md). Constraints below are operational,
not visual.

- **Tone:** calm, editorial, medical — not corporate, not "wellness". Generous whitespace, low chroma.
- **Photography:** a small set of bespoke photographs of the practice (room, hands, instruments) takes priority over stock. Avoid close-up
  feet-trauma photos on landing pages — they perform poorly with elderly visitors and family-of-patient searchers.
- **Iconography:** Lucide React only ([`docs/conventions.md`](./conventions.md)). No clipart.
- **Components:** Radix/shadcn primitives in `src/web/components/base/`, branded composites in `src/web/components/`. Keep custom CSS to a
  minimum — Tailwind utility classes via `cn()`.
- **Mobile first.** Most local searches are mobile; the contact CTA must be reachable in one thumb-press from the top of every page.
- **Accessibility:** AA contrast, focus rings, large touch targets (≥44 px), respect `prefers-reduced-motion`. The audience skews older.
- **RTL.** Arabic flips the layout via the `rtl:` Tailwind variant; chrome and directional UI bits (the header tel-link arrow, etc.) are
  authored with this in mind. See [`docs/architecture/i18n.md`](./architecture/i18n.md).

Open design questions (decide before launch):

1. Logo / wordmark — does the practice want to commission a more deliberate mark? `podologie-dudenhofen-logo.png` is in place as the working
   logo and the OG default.

---

## Feature Roadmap

Ordered by priority. P0 items block launch; P1 items are post-launch but pre-cutover-of-old-site; P2 is "nice to have".

### P0 — Launch blockers

- [ ] **Contact form.** Single form to land back on `/kontakt` (anchor `#anfrage` returns then): name, contact (phone or email),
      preferred-callback window, free-text reason. Submits via a GraphQL mutation, sends an email via a transactional provider (decision
      pending — Postmark / Resend / SES), stores a row for audit. **No PHI in the form** — patients should not type diagnoses; we collect
      intent only. The page currently has no anfrage section at all — phone CTAs throughout the page cover the same intent until this lands.
- [ ] **Email transport.** Pick a provider, add the env var, wire `serverRuntime.mailer.send()`, add the contact-form integration test.
- [ ] **Legal pages reviewed by the practice owner / their lawyer.** Imprint and privacy must be accurate before public launch.
- [ ] **Cookie / consent banner — not required.** This build sets only strictly-necessary cookies — `sessionId` and `locale` (see
      [`docs/features/legal-pages.md`](./features/legal-pages.md)) — both exempt under § 25 Abs. 2 Nr. 2 TTDSG. Re-evaluate when analytics
      or any third-party tracking is added.
- [ ] **Terms of service — not required.** A practice that doesn't sell or book online doesn't need website ToS; the treatment relationship
      is a Behandlungsvertrag formed in person (§§ 630a ff. BGB). Reconsider only if the site grows an online shop, paid online booking,
      user accounts, or hosted user content.
- [ ] **Production env in Coolify.** `DATABASE_URL`, `sessionCookieName`, `sessionCookieSecure=true`, `WEB_PAGE_URL`,
      `GOOGLE_GENERATIVE_AI_API_KEY`, email provider keys.
- [ ] **DNS cutover plan.** See "Launch checklist" below.
- [x] **Project identity pass.** HTML `<title>`, favicon set (`public/favicon/`), theme tokens, 404 copy, manifest, package metadata — all
      swapped from the TanStack template to Podologie Dudenhofen.
- [x] **Static content pages.** `/`, `/praxis`, `/leistungen`, `/qualifikation`, `/karriere`, `/kontakt`, `/impressum`, `/datenschutz`
      shipped with full four-locale copy. Owner / lawyer review of the legal pages still pending.
- [x] **Home page.** Services-led hero, 3 service highlights, AI-assistant entry card, opening hours + map, dark credential strip,
      testimonials block, final CTA. All four locales.
- [x] **SEO.** Every public page emits `seoMeta()` with per-locale title/description, OG + Twitter card, geo meta, hreflang alternates, and
      `application/ld+json`. `SITEMAP_PATHS` drives a dynamic `/sitemap.xml` with hreflang + `x-default`; `/robots.txt` is in place. See
      [`docs/architecture/seo.md`](./architecture/seo.md).
- [x] **Schema.org `MedicalBusiness` JSON-LD** on every page (name, address, geo, opening hours, telephone, image, sameAs). Built in
      `src/web/seo/structuredData.ts`.
- [x] **Visitor AI assistant.** `/chat`, backed by `agentVisitorAssistant` and grounded in `podologieFacts.ts`. Conservative system prompt,
      no medical advice, hands off to the phone number on `/kontakt#kontaktdaten`. Documented in
      [`docs/features/chat-visitor.md`](./features/chat-visitor.md).

### P1 — Pre-cutover, can ship after first deploy

- [ ] **`/preise` page.** Self-payer price list + insurance handling explainer. Currently `/leistungen#kosten` covers the explainer; a price
      table is owner-pending.
- [ ] **`/faq` page.** Seeded from visitor-chat transcripts and the practice owner's most-asked phone questions.
- [ ] **`/barrierefreiheit` accessibility statement.** No route file yet.
- [ ] **OG images.** Per-page Open Graph image generation via the existing server-side rendering pipeline
      ([`docs/architecture/server-side-rendering.md`](./architecture/server-side-rendering.md)). Default share image is the logo today.
- [ ] **Privacy-respecting analytics.** Plausible self-hosted or Umami — not GA. Goal: page-level traffic and conversion on the contact
      form. Event we care about most: contact-form submission.
- [x] **Russian and Arabic locales** with full content translations and RTL support for Arabic. See
      [`docs/architecture/i18n.md`](./architecture/i18n.md).

### P2 — Nice to have

- [ ] **Online appointment-request slot picker.** Same data the contact form collects, but with a calendar of "available callback windows"
      rather than free-text. Still not real booking — we phone back.
- [ ] **Newsletter / saisonale Hinweise.** Low priority — not the kind of practice that does monthly emails.
- [ ] **Multi-practitioner support.** Out of scope unless the practice grows.

---

## Launch checklist

Before flipping `podologie-dudenhofen.de` from the Jimdo site to this build:

- [ ] All P0 items done and visually reviewed by the practice owner on a phone and on a desktop.
- [ ] Imprint + privacy reviewed by the practice owner / their lawyer.
- [ ] `npm run check && npm test` green; `docker build` green; preview deploy looks correct end-to-end.
- [ ] `WEB_PAGE_URL` set to `https://podologie-dudenhofen.de` in Coolify.
- [ ] Contact-form submission delivers an email to the practice's mailbox in production.
- [ ] Sitemap reachable at `/sitemap.xml`, robots at `/robots.txt`, all four locale homepages (`/`, `/en`, `/ru`, `/ar`) load and emit
      correct hreflang alternates.
- [ ] 301-redirect map drafted from the old Jimdo URL set (export the old sitemap, map every URL to its new home or to `/`).
- [ ] Google Search Console verified for the new property; sitemap submitted.
- [ ] A handful of friendly testers (family, the practice owner's next-door colleague) have walked through the site and tried to find phone
      number, opening hours, and the contact form on a mobile phone.
- [ ] Cutover window agreed with the practice owner — typically a quiet evening; phone forwarding still works either way.
- [ ] DNS A/AAAA records updated; TTL pre-lowered to 300 s 24 h before. Old Jimdo plan is kept active for 7 days as a rollback.

---

## Open Questions

Track unresolved product/legal/operational questions here. Resolve and remove rather than leave stale.

- [ ] Email provider for the contact form (Postmark / Resend / SES)?
- [ ] Logo / wordmark — keep the current `podologie-dudenhofen-logo.png` or commission a more deliberate mark?
- [ ] Practice owner's preference on a cookie/consent banner if we add analytics?
- [ ] What does the legacy Jimdo URL set look like? (export needed for the 301 map — see "Legacy → new redirect map" above.)
- [ ] Does the practice owner control the existing Google Business Profile (Place ID `ChIJzcTVmG20l0cR7OwkPRBebrY`)? If not — claim or
      transfer is needed before launch.

---

## Done

_(Move shipped roadmap items here with a one-line note + commit/PR link. Prepend the date so the order is obvious.)_

- 2026-06-15 — Vacation scheduler shipped: admin CRUD at `/admin/vacations`, public banner at the top of the home page with a 7-day lead
  window (`VACATION_LEAD_DAYS`), Europe/Berlin local-midnight switchover. See [`docs/features/vacations.md`](./features/vacations.md).
  Commit `483025a`.
- 2026-06-15 — Seasonal effects shipped: date-driven `<SeasonalEffect />` canvas (snow / petals / leaves / fireworks / Fasching confetti)
  - `<SeasonalBanner />` greeting card; `prefers-reduced-motion` honoured. Vacation banner takes precedence. See
    [`docs/features/seasonal-effects.md`](./features/seasonal-effects.md). Commit `483025a`.
- 2026-06-14/15 — Mobile chat polish: composer behaviour, button placement, sheet ergonomics. Commits `c61d70b`, `2d3762e`, `c022a38`,
  `af033c9`.
- 2026-06-14 — Full RTL support for Arabic via the `rtl:` Tailwind variant; chrome and directional UI bits authored with locale direction in
  mind. Commit `70b1a71`.
- 2026-06-14 — Russian and Arabic locales with complete content translations across every page. Commits `003db0a`, `6c269ea`.
- 2026-06-14 — Visitor AI chat shipped at `/chat`, backed by `agentVisitorAssistant` and grounded in `podologieFacts.ts`. Anchored to the
  same anchor list above so the assistant deep-links into existing sections. See
  [`docs/features/chat-visitor.md`](./features/chat-visitor.md). Commit `4839ead`.
- 2026-06-14 — Site search shipped: `⌘K` / `Ctrl+K` curated index over the eight content routes, locale-bound, gold-pulse highlight on the
  matched leaf card after navigation. See [`docs/features/site-search.md`](./features/site-search.md). Commit `f4742b5`.
- 2026-06-14 — Testimonials block on the home page: three quote cards on a `bg-blush` surface, gold-star row linking to the practice's
  Google reviews via `PRACTICE.maps.reviews`. Place ID and CID confirmed against the listing's embed payload. See
  [`docs/features/testimonials.md`](./features/testimonials.md). Commit `29be113`.
- 2026-06-14 — SEO pass: per-page `seoMeta()`, dynamic `/sitemap.xml` with hreflang + `x-default`, `/robots.txt`, geo meta tags, and
  site-wide `MedicalBusiness` JSON-LD via `src/web/seo/structuredData.ts`. Commit `9e6f230`. Architecture doc:
  [`docs/architecture/seo.md`](./architecture/seo.md).
- 2026-06-14 — Reveal-on-scroll and pointer-aware hover micro-motion across the site, honouring `prefers-reduced-motion`. Commit `9016b96`.
  Style doc: [`docs/style/motion.md`](./style/motion.md).
- 2026-06-14 — Imprint and privacy texts finalized. See [`docs/features/legal-pages.md`](./features/legal-pages.md). Commit `7ea080a`.
- 2026-06-13 — Heilpraktiker-Urkunde digitised and rendered inline at `/qualifikation#urkunden` alongside the Podologie-Urkunde. Both now
  live in `public/urkunden/`. Resolves the "shown in person" caveat and the matching open question. Commit `4b63c11`.
- 2026-06-13 — Instrument-reprocessing pipeline added to `/praxis#hygiene`: numbered three-step block with photos in
  `public/instrumentenaufbereitung/`. See [`docs/features/instrument-reprocessing.md`](./features/instrument-reprocessing.md).
- 2026-06-13 — Per-route loader queries replaced the shared `SessionBootstrap`; central constants moved to `src/web/practice.ts` (the single
  source of truth — `name`, `person`, `email`, `phone` E.164, `address`, `hours`, `callHours`, `maps`, `googlePlaceId`,
  `VACATION_LEAD_DAYS`). Commits `f11887d`, `d26437e`. Earlier `PRACTICE_PHONE_HUMAN` / `PRACTICE_EMAIL` constants are gone — UI uses
  `formatPhoneNumber()` against `PRACTICE.phone`.
- 2026-06-13 — Phone-staffed window (`callHours`, Mo–Fr 08–16) confirmed by the practice owner and added to `PRACTICE` so the contact page
  can render it separately from the wider `hours`.
- 2026-06-13 — Information architecture collapsed from 11 thin pages to 6 long-scroll pages. Top-level nav reduced to Praxis · Leistungen ·
  Qualifikation · Karriere · Kontakt; therapist bio moved to `/praxis#therapeutin`; both Urkunden consolidated into
  `/qualifikation#urkunden`; `/anfahrt` absorbed into `/kontakt#anfahrt`. New `/karriere` page added for Initiativbewerbungen. Deleted:
  `anfahrt`, `heilpraktiker-podologie`, `heilpraktiker-urkunde`, `hygiene`, `podologie-urkunde`, `podologie`, `therapeutin`, `terms`. New:
  `qualifikation`, `karriere`. Sitemap and the redirect map updated.
- 2026-06-13 — Static content pages built with full bilingual copy (Russian and Arabic added the next day): `/`, `/praxis`, `/leistungen`,
  `/qualifikation`, `/karriere`, `/kontakt`. `SiteHeader` rebuilt with desktop nav, mobile sheet, active-state pill, and a persistent header
  `tel:` link.
- 2026-06-13 — Practice details confirmed by the owner and locked into `src/web/practice.ts`: Annette Yilmaz, Speyerer Straße 60, 67373
  Dudenhofen, +49 6232 621064, podologie.annette@gmail.com, Mo–Do 08–18 / Fr 08–14. Mirrored in the "Practice details" table above.
- 2026-06-13 — Legal pages shipped: `/impressum` (§ 5 TMG, including Berufsbezeichnung + Aufsichtsbehörde + Versicherer) and `/datenschutz`
  (Art. 13 GDPR, covering server logs, the two strictly-necessary cookies, the embedded Google Maps iframe, and the chat assistant).
  Decision: no Terms of Service (no online sale or booking — Behandlungsvertrag in person, §§ 630a ff. BGB) and no cookie banner (only
  strictly-necessary cookies, exempt under § 25 Abs. 2 Nr. 2 TTDSG). Quiet site-wide footer (`SiteFooter`) added. See
  [`docs/features/legal-pages.md`](./features/legal-pages.md). Owner / lawyer review still pending before launch.
- 2026-06-12 — Brand design system foundations landed: aubergine-led palette, Fraunces / Source Sans 3 / JetBrains Mono self-hosted, pill
  button variants, `SectionEyebrow` component, home page retrofitted as the reference implementation. See
  [`docs/style/colors.md`](./style/colors.md), [`typography.md`](./style/typography.md), [`patterns.md`](./style/patterns.md).
- 2026-06-12 — Repository rebranded from the TanStack template to Podologie Dudenhofen (README, package name, manifest, doc placeholders).
