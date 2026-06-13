# Project Brief — Podologie Dudenhofen

This file is the working brief for the public-facing site of **Podologie Dudenhofen**. It captures _what_ we're building, _why_, and _what
to do next_. Architecture lives in [`docs/architecture/`](./architecture/), conventions in [`docs/conventions.md`](./conventions.md); this
file is the product layer that sits on top of them.

Keep it current. When a roadmap item ships, move it into "Done" with a one-line note and link the PR or feature doc.

---

## Identity

| Field            | Value                                                             |
| ---------------- | ----------------------------------------------------------------- |
| Product name     | Podologie Dudenhofen                                              |
| Live URL         | <https://podologie-dudenhofen.de>                                 |
| Replaces         | <https://podologie-dudenhofen.jimdoweb.com/>                      |
| Locales          | German (default), English (`/en/...`)                             |
| Audience         | Local patients in Speyer-Dudenhofen / Schifferstadt / Speyer area |
| Practice profile | Small private medical-foot-care (Podologie) practice              |

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
4. **Be bilingual without being a translation site.** German is canonical; English exists but is concise — it lists services, contact, and
   directions, not full long-form essays.

Non-goals (for now): online booking with a calendar, payments, patient portal, multi-staff scheduling. We start with a request form.

---

## Audience

- **Primary:** German-speaking adults in the immediate region looking for medical-foot-care, often referred by a GP / diabetologist or
  prompted by a specific complaint (Hühneraugen, eingewachsene Nägel, diabetisches Fußsyndrom).
- **Secondary:** Family members searching on behalf of an elderly parent — looking for Hausbesuche (home visits) and reassurance about
  hygiene/insurance handling.
- **Tertiary (English):** English-speaking residents and staff at nearby military/research sites who need to understand what is offered and
  how to book; expect them to read the English page once and then call.

---

## Practice details

Confirmed by the practice owner; mirrored in code via `PRACTICE_PHONE_HUMAN` / `PRACTICE_PHONE_TEL` (in
[`src/web/components/SiteHeader.tsx`](../src/web/components/SiteHeader.tsx)) and a `PRACTICE_EMAIL` constant in
[`src/routes/{-$locale}/kontakt.tsx`](../src/routes/{-$locale}/kontakt.tsx). When any of these change, update both the code constants and
this section.

| Field         | Value                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Practitioner  | Annette Yilmaz                                                                                  |
| Address       | Speyerer Straße 60, 67373 Dudenhofen                                                            |
| Phone         | +49 6232 621064                                                                                 |
| Email         | podologie.annette@gmail.com                                                                     |
| Opening hours | Mo–Do 08:00–18:00, Fr 08:00–14:00, Sa & So geschlossen                                          |
| Bus stops     | "Speyerer Straße" and "Boligweg" (Dudenhofen)                                                   |
| Bus lines     | 591 and 507 from Speyer                                                                         |
| Photo, room   | `public/podologie-dudenhofen-praxis.jpg`                                                        |
| Photo, person | `public/podologie-dudenhofen-annette-yilmaz.jpg`                                                |
| Urkunde       | `public/podologie-urkunde.png` (Podologie only — HP-Urkunde not yet digitized; shown in person) |

---

## Content Inventory

The site launches with these pages. Every page is bilingual unless marked otherwise.

| Route                               | Purpose                                                                                                                                                                                                             | Priority |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `/` (Home)                          | Services-led hero + 3 service highlights + AI-assistant entry card + opening hours + map + dark credential strip + contact CTA                                                                                      | P0       |
| `/praxis` (Practice)                | Long-scroll page with anchored sections `#raeume`, `#therapeutin`, `#hygiene` — replaces the legacy `/therapeutin` and `/hygiene` pages                                                                             | P0       |
| `/leistungen` (Services)            | `#brauche-ich-podologen` checklist · `#leistungen` service cards · `#was-bringe-ich-mit` (first-appointment list) · `#kosten` (insurance vs self-payer)                                                             | P0       |
| `/qualifikation` (Credentials)      | `#podologie` · `#heilpraktiker` · `#urkunden` (renders `podologie-urkunde.png` inline; HP-Urkunde mentioned, shown in person) — replaces legacy `/podologie`, `/heilpraktiker-podologie` and both `*-urkunde` pages | P0       |
| `/karriere` (Careers)               | Initiativbewerbung surface for other Podologen/Podologinnen — values, role description, application path                                                                                                            | P0       |
| `/kontakt` (Contact)                | Phone, email, address, hours · `#anfahrt` with Google Maps + Apple Maps deep-links + embedded map + ÖPNV + parking · contact CTA card — absorbs the legacy `/anfahrt` page                                          | P0       |
| `/impressum` (Imprint)              | Legal imprint — required by §5 TMG                                                                                                                                                                                  | P0       |
| `/datenschutz` (Privacy)            | Privacy policy — required by GDPR                                                                                                                                                                                   | P0       |
| `/barrierefreiheit` (Accessibility) | Accessibility statement (BFSG / EU 2025)                                                                                                                                                                            | P1       |

The top-level navigation in [`SiteHeader`](../src/web/components/SiteHeader.tsx) shows five items: Praxis · Leistungen · Qualifikation ·
Karriere · Kontakt. Legal pages live in the footer only.

### Anchors that must not change

The chat assistant will deep-link into these — renaming the section IDs is a breaking change for assistant answers:

- `/praxis#raeume`, `/praxis#therapeutin`, `/praxis#hygiene`
- `/leistungen#brauche-ich-podologen`, `/leistungen#leistungen`, `/leistungen#was-bringe-ich-mit`, `/leistungen#kosten`
- `/qualifikation#podologie`, `/qualifikation#heilpraktiker`, `/qualifikation#urkunden`
- `/karriere#was-uns-ausmacht`, `/karriere#wen-wir-suchen`, `/karriere#was-wir-bieten`, `/karriere#bewerbung`
- `/kontakt#kontaktdaten`, `/kontakt#anfahrt`, `/kontakt#anfrage`

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

URL-slug rule: German slugs are canonical and shared across both locales. The router's `{-$locale}` segment exposes them at `/<slug>` for
German and `/en/<slug>` for English; the in-page copy translates per `useLocale()`. See
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

Open design questions (decide before launch):

1. Logo / wordmark — does the practice have one, or do we set type?
2. Primary photograph for the home hero — bespoke or licensed?

---

## Feature Roadmap

Ordered by priority. P0 items block launch; P1 items are post-launch but pre-cutover-of-old-site; P2 is "nice to have".

### P0 — Launch blockers

- [ ] **Project identity pass.** Replace remaining template placeholders: HTML `<title>` in `src/routes/__root.tsx`, favicon set, theme
      tokens in `src/styles.css`, 404 copy. Re-grep for `Project name`, `TanStack App`, `example.com` after each change.
- [x] **Static content pages.** `/`, `/praxis`, `/leistungen`, `/qualifikation`, `/karriere`, `/kontakt`, `/impressum`, `/datenschutz`
      shipped with full bilingual copy. Owner / lawyer review of the legal pages still pending — see "Launch checklist" below.
- [x] **Home page.** Services-led hero, 3 service highlights, AI-assistant entry card with three suggested questions, opening hours + map,
      dark credential strip, final CTA. Bilingual.
- [ ] **Contact form.** Single form on `/kontakt`: name, contact (phone or email), preferred-callback window, free-text reason. Submits via
      a GraphQL mutation, sends an email via a transactional provider (decision pending — Postmark / Resend / SES), stores a row for audit.
      **No PHI in the form** — patients should not type diagnoses; we collect intent only. Page currently shows a placeholder card with
      direct call/email buttons until this lands.
- [ ] **Email transport.** Pick a provider, add the env var, wire `serverRuntime.mailer.send()`, add the contact-form integration test.
- [ ] **SEO.** Every public page has `seoMeta()` with German + English copy and is in `SITEMAP_PATHS`. Verify `/sitemap.xml` and
      `/robots.txt` look correct against `WEB_PAGE_URL=https://podologie-dudenhofen.de`. Set up Google Search Console for both
      `podologie-dudenhofen.de` and `www.podologie-dudenhofen.de`.
- [ ] **Schema.org `LocalBusiness` / `MedicalBusiness` JSON-LD** on the home page (name, address, geo, opening hours, telephone,
      `priceRange`, image, sameAs).
- [ ] **Legal pages reviewed by the practice owner / their lawyer.** Imprint and privacy must be accurate before public launch.
- [ ] **Cookie / consent banner — not required.** This build sets only strictly-necessary cookies — `sessionId` and `locale` (see
      [`docs/features/legal-pages.md`](./features/legal-pages.md)) — both exempt under § 25 Abs. 2 Nr. 2 TTDSG. Re-evaluate when analytics
      or any third-party tracking is added.
- [ ] **Terms of service — not required.** A practice that doesn't sell or book online doesn't need website ToS; the treatment relationship
      is a Behandlungsvertrag formed in person (§§ 630a ff. BGB). Reconsider only if the site grows an online shop, paid online booking,
      user accounts, or hosted user content.
- [ ] **Production env in Coolify.** `DATABASE_URL`, `sessionCookieName`, `sessionCookieSecure=true`, `WEB_PAGE_URL`,
      `GOOGLE_GENERATIVE_AI_API_KEY` (if AI assistant ships at launch), email provider keys.
- [ ] **DNS cutover plan.** See "Launch checklist" below.

### P1 — Pre-cutover, can ship after first deploy

- [ ] **AI assistant on landing page.** An inline card on `/` (not a floating widget — the home page already has the suggested-question card
      linking to `/{-$locale}/chat`) that answers the top-of-funnel questions ("Übernimmt die gesetzliche Krankenkasse das?", "Macht ihr
      Hausbesuche?", "Wie läuft der erste Termin?"). Grounded in a structured FAQ blob; explicitly hands off to the contact form for
      anything booking-shaped. Conservative system prompt: never gives medical advice, never guesses prices, falls back to "Bitte rufen Sie
      uns an" with the phone number when uncertain. The chat surface itself (`/chat`) needs its system prompt scoped — it currently uses the
      generic shell. Source of truth for FAQ answers should be the same blob the static `/leistungen#brauche-ich-podologen` and
      `#was-bringe-ich-mit` sections render from.
- [ ] **`/preise` page.** Self-payer price list + insurance handling explainer. Currently `/leistungen#kosten` covers the explainer; a price
      table is owner-pending.
- [ ] **`/faq` page.** Seeded from the AI assistant transcripts and the practice owner's most-asked phone questions.
- [ ] **OG images.** Per-page Open Graph image generation via the existing server-side rendering pipeline
      ([`docs/architecture/server-side-rendering.md`](./architecture/server-side-rendering.md)).
- [ ] **Privacy-respecting analytics.** Plausible self-hosted or Umami — not GA. Goal: page-level traffic and conversion on the contact
      form. Event we care about most: contact-form submission.
- [ ] **`/barrierefreiheit` accessibility statement.**

### P2 — Nice to have

- [ ] **Online appointment-request slot picker.** Same data the contact form collects, but with a calendar of "available callback windows"
      rather than free-text. Still not real booking — we phone back.
- [ ] **Patient FAQ bot trained on the actual practice's brochure** (if one exists), with retrieval over a handful of seeded answers.
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
- [ ] Sitemap reachable at `/sitemap.xml`, robots at `/robots.txt`, both locale homepages (`/`, `/en`) load and have correct hreflangs.
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
- [ ] Logo / wordmark — exists or needs design?
- [ ] Hero photograph — bespoke or licensed? (`podologie-dudenhofen-praxis.jpg` is in place as the home + `/praxis#raeume` photo.)
- [ ] AI assistant at launch, or post-launch?
- [ ] Practice owner's preference on a cookie/consent banner if we add analytics?
- [ ] What does the legacy Jimdo URL set look like? (export needed for the 301 map — see "Legacy → new redirect map" above.)
- [ ] Does the practice have an existing Google Business Profile? If yes, who owns it — we need to claim or transfer it.
- [ ] Heilpraktiker-Urkunde digitization — currently mentioned on `/qualifikation#urkunden` as "shown in person". Worth scanning?

---

## Done

_(Move shipped roadmap items here with a one-line note + PR link. Prepend the date so the order is obvious.)_

- 2026-06-12 — Repository rebranded from the TanStack template to Podologie Dudenhofen (README, package name, manifest, doc placeholders).
- 2026-06-12 — Scaffolded bilingual route stubs for `/therapeutin`, `/podologie`, `/heilpraktiker-podologie`, `/praxis`, `/leistungen`,
  `/hygiene`, `/podologie-urkunde`, `/heilpraktiker-urkunde`, `/kontakt`, `/anfahrt` with `seoMeta()` + sitemap entries. Bodies still
  placeholder `<h1>`s.
- 2026-06-12 — Brand design system foundations landed: aubergine-led palette, Fraunces / Source Sans 3 / JetBrains Mono self-hosted, pill
  button variants, `SectionEyebrow` component, home page retrofitted as the reference implementation. See
  [`docs/style/colors.md`](./style/colors.md), [`typography.md`](./style/typography.md), [`patterns.md`](./style/patterns.md).
- 2026-06-13 — Information architecture collapsed from 11 thin pages to 6 long-scroll pages. Top-level nav reduced to Praxis · Leistungen ·
  Qualifikation · Karriere · Kontakt; therapist bio moved to `/praxis#therapeutin`; both Urkunden consolidated into
  `/qualifikation#urkunden`; `/anfahrt` absorbed into `/kontakt#anfahrt`. New `/karriere` page added for Initiativbewerbungen. Deleted:
  `anfahrt`, `heilpraktiker-podologie`, `heilpraktiker-urkunde`, `hygiene`, `podologie-urkunde`, `podologie`, `therapeutin`, `terms`. New:
  `qualifikation`, `karriere`. Sitemap and the stub redirect map updated. See "Legacy → new redirect map" above.
- 2026-06-13 — Static content pages built with full bilingual copy: `/`, `/praxis`, `/leistungen`, `/qualifikation`, `/karriere`,
  `/kontakt`. `SiteHeader` rebuilt with desktop nav, mobile sheet, active-state pill, and a persistent header `tel:` link. Phone number
  centralized as `PRACTICE_PHONE_HUMAN` / `PRACTICE_PHONE_TEL` in `SiteHeader.tsx`.
- 2026-06-13 — Practice details confirmed by the owner and locked into code: Annette Yilmaz, Speyerer Straße 60, 67373 Dudenhofen, +49 6232
  621064, podologie.annette@gmail.com, Mo–Do 08–18 / Fr 08–14. Mirrored in the "Practice details" table above.
- 2026-06-13 — Legal pages shipped: `/impressum` (§ 5 TMG, including Berufsbezeichnung + Aufsichtsbehörde + Versicherer) and `/datenschutz`
  (Art. 13 GDPR, covering server logs, the two strictly-necessary cookies, the embedded Google Maps iframe, and the Gemini-backed chat
  assistant). Adapted from the legacy Jimdo content; technical specifics rewritten to match this build. Decision: no Terms of Service (no
  online sale or booking — Behandlungsvertrag in person, §§ 630a ff. BGB) and no cookie banner (only strictly-necessary cookies, exempt
  under § 25 Abs. 2 Nr. 2 TTDSG). Quiet site-wide footer (`SiteFooter`) added with `© Annette Yilmaz · Impressum · Datenschutz`. See
  [`docs/features/legal-pages.md`](./features/legal-pages.md). Owner / lawyer review still pending before launch.
