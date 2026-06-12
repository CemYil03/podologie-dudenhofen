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

## Content Inventory

The site launches with these pages. Every page is bilingual unless marked otherwise.

| Route                    | Purpose                                                                                          | Priority |
| ------------------------ | ------------------------------------------------------------------------------------------------ | -------- |
| `/` (Home)               | Hook + 2–3 service highlights + opening hours + map + contact CTA + (later) AI assistant entry   | P0       |
| `/leistungen` (Services) | Catalog: medizinische Fußpflege, Nagelkorrektur-Spangen, diabetisches Fußsyndrom, Hausbesuche, … | P0       |
| `/ueber-uns` (About)     | Practitioner bio, qualifications, hygiene approach                                               | P0       |
| `/kontakt` (Contact)     | Phone, email, address, map, contact / appointment-request form                                   | P0       |
| `/preise` (Prices)       | Self-payer prices + insurance handling (gesetzlich, privat, Verordnung)                          | P1       |
| `/faq`                   | Common questions extracted from phone calls and the AI assistant transcript                      | P1       |
| `/impressum`             | Legal imprint — required by §5 TMG                                                               | P0       |
| `/datenschutz`           | Privacy policy — required by GDPR                                                                | P0       |
| `/barrierefreiheit`      | Accessibility statement (BFSG / EU 2025)                                                         | P1       |

URL-slug rule: German slugs for `/`, English route segment is the `/en/...` mirror with English slugs (`/en/services`, `/en/contact`,
`/en/imprint`, `/en/privacy`). The router's `{-$locale}` segment handles both; see [`docs/architecture/i18n.md`](./architecture/i18n.md).

---

## Design Direction

These are starting constraints, not a finished design system. We will refine them with real content in place rather than in the abstract.

- **Tone:** calm, clean, medical — not corporate, not "wellness". Generous whitespace, low chroma.
- **Color:** muted teal / sage as primary (`#0f766e` provisional — same as the PWA `theme_color`), warm-neutral background, single accent
  for CTAs. Avoid stock-medical blue and avoid spa-pink.
- **Typography:** one humanist sans for body (Inter or similar) and a slightly warmer display face for headings — both with full Latin
  Extended coverage (Umlauts must look right). System fallbacks acceptable.
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
3. Final color palette — locked once we have the hero photo.

---

## Feature Roadmap

Ordered by priority. P0 items block launch; P1 items are post-launch but pre-cutover-of-old-site; P2 is "nice to have".

### P0 — Launch blockers

- [ ] **Project identity pass.** Replace remaining template placeholders: HTML `<title>` in `src/routes/__root.tsx`, favicon set, theme
      tokens in `src/styles.css`, 404 copy. Re-grep for `Project name`, `TanStack App`, `example.com` after each change.
- [ ] **Static content pages.** Build out `/leistungen`, `/ueber-uns`, `/kontakt`, `/impressum`, `/datenschutz` with real copy provided by
      the practice owner. Both locales.
- [ ] **Home page.** Hook, services-overview, opening hours, map, primary CTA. Bilingual.
- [ ] **Contact form.** Single form on `/kontakt`: name, contact (phone or email), preferred-callback window, free-text reason. Submits via
      a GraphQL mutation, sends an email via a transactional provider (decision pending — Postmark / Resend / SES), stores a row for audit.
      **No PHI in the form** — patients should not type diagnoses; we collect intent only.
- [ ] **Email transport.** Pick a provider, add the env var, wire `serverRuntime.mailer.send()`, add the contact-form integration test.
- [ ] **SEO.** Every public page has `seoMeta()` with German + English copy and is in `SITEMAP_PATHS`. Verify `/sitemap.xml` and
      `/robots.txt` look correct against `WEB_PAGE_URL=https://podologie-dudenhofen.de`. Set up Google Search Console for both
      `podologie-dudenhofen.de` and `www.podologie-dudenhofen.de`.
- [ ] **Schema.org `LocalBusiness` / `MedicalBusiness` JSON-LD** on the home page (name, address, geo, opening hours, telephone,
      `priceRange`, image, sameAs).
- [ ] **Legal pages reviewed by the practice owner / their lawyer.** Imprint and privacy must be accurate before public launch.
- [ ] **Cookie / consent banner — only if needed.** If we ship without third-party trackers (preferred), no banner is required for the
      strictly-functional `locale` and `sessionId` cookies. Re-evaluate when analytics are added.
- [ ] **Production env in Coolify.** `DATABASE_URL`, `sessionCookieName`, `sessionCookieSecure=true`, `WEB_PAGE_URL`,
      `GOOGLE_GENERATIVE_AI_API_KEY` (if AI assistant ships at launch), email provider keys.
- [ ] **DNS cutover plan.** See "Launch checklist" below.

### P1 — Pre-cutover, can ship after first deploy

- [ ] **AI assistant on landing page.** A floating widget that answers the top-of-funnel questions ("Übernimmt die gesetzliche Krankenkasse
      das?", "Macht ihr Hausbesuche?", "Wie läuft der erste Termin?"). Grounded in a structured FAQ blob; explicitly hands off to the
      contact form for anything booking-shaped. Conservative system prompt: never gives medical advice, never guesses prices, falls back to
      "Bitte rufen Sie uns an" with the phone number when uncertain. The chat foundation in `docs/architecture/chat.md` is the starting
      point; we'll likely simplify it (no input collections, no tool approvals) for this surface and document the slimmed-down variant in
      `docs/features/landing-assistant.md`.
- [ ] **`/preise` page.** Self-payer price list + insurance handling explainer.
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
- [ ] Hero photograph — bespoke or licensed?
- [ ] AI assistant at launch, or post-launch?
- [ ] Practice owner's preference on a cookie/consent banner if we add analytics?
- [ ] What does the legacy Jimdo URL set look like? (export needed for the 301 map.)
- [ ] Does the practice have an existing Google Business Profile? If yes, who owns it — we need to claim or transfer it.

---

## Done

_(Move shipped roadmap items here with a one-line note + PR link. Prepend the date so the order is obvious.)_

- 2026-06-12 — Repository rebranded from the TanStack template to Podologie Dudenhofen (README, package name, manifest, doc placeholders).
