# Site structure

How pages are organized across the site and how the home page relates to the rest. This is the rule we apply when deciding whether a new
piece of content gets its own page, a section on the home page, or just a link in the navigation.

## Context

The site is small — five public topic pages (`/praxis`, `/leistungen`, `/qualifikation`, `/karriere`, `/kontakt`) plus the home page and the
two legal pages (`/impressum`, `/datenschutz`). Most visitors arrive on the home page. The decisions they're trying to make are narrow:

- _Is this practice for me?_ — small, calm, accessible, statutory-insurance accredited
- _What do they treat?_ — services overview
- _Can I trust them?_ — credentials, voices from other patients
- _What do I need to know before booking?_ — common questions about prescriptions, costs, the first appointment
- _How do I reach them?_ — hours, address, phone, contact form

Without a shared rule, the home page drifts: every new piece of content (a job opening, a seasonal note, a photo gallery, a price list)
finds its way onto the landing page and the page stops being an overview. The four topic pages then duplicate or contradict it. This
document fixes the structure deliberately so the drift has somewhere else to go.

## Decision

The home page is a **hub-and-spoke overview** of the four topic pages. Each topic gets one section on the home page that previews it and
ends in a link into the dedicated page. Two further sections are **trust/support extensions** that have no dedicated page because they
aren't topics. One audience — job seekers — is intentionally not on the landing page at all.

### The four topic spokes

Each is a topic with depth that a patient might drill into. Each has a section on the home page _and_ a dedicated page.

| Spoke         | Home-page section                                                        | Dedicated page   |
| ------------- | ------------------------------------------------------------------------ | ---------------- |
| Praxis        | `#praxis-uebersicht` — 3 pillars (rooms, therapist, hygiene) → `/praxis` | `/praxis`        |
| Leistungen    | `#leistungen-uebersicht` — service cards → `/leistungen`                 | `/leistungen`    |
| Qualifikation | `#qualifikation` — credential strip → `/qualifikation`                   | `/qualifikation` |
| Kontakt       | `#oeffnungszeiten` — hours + address + map → `/kontakt`                  | `/kontakt`       |

Every overview section ends with the same shape of link: a single `Mehr zu X →` (or equivalent in the locale's pattern) into the dedicated
page. The visual treatment of that link is consistent across sections — visitors learn the contract on the first scroll.

### The two extensions

These sit on the home page only. They are trust/support signals that help the visitor commit to the decision they're already making — they
aren't topics with depth, so they don't get their own page.

| Extension | Home-page section | Why it stays home-page-only                                                                                                                                                                                                             |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stimmen   | `#stimmen`        | Three short quotes plus a link to the live Google reviews. A standalone `/stimmen` page would attract no traffic and force a moderation/refresh discipline we don't want — see [features/testimonials.md](../features/testimonials.md). |
| Fragen    | `#fragen`         | Four suggested questions that open the inline AI chat widget. The chat itself is the destination; there's no "questions page" worth indexing — see [features/chat-visitor.md](../features/chat-visitor.md).                             |

### The intentional omission

**Karriere is not on the landing page.** Different audience (job seekers, not patients), different intent (already-decided applicants, not
browsers). Including it would split the landing page's attention away from the dominant visitor. It lives in the header navigation and the
footer; that's enough for the people actively looking for it.

### Section order — decision flow, not nav order

Sections appear in the order that mirrors how a visitor's decision develops, not the order of the top navigation:

1. **Hero** — who we are, primary CTAs (request appointment / view services)
2. **Praxis** — _who/where/atmosphere_ (the section most likely to convert a hesitant first-time visitor)
3. **Leistungen** — _what we do_
4. **Qualifikation** — _why trust us_ (credentials)
5. **Stimmen** — _why trust us_ (other patients' voices)
6. **Fragen** — _what should I know before booking_ (chat entry)
7. **Öffnungszeiten + Adresse + Karte** — _how to reach us_
8. **Termin** — final CTA (call us)

Trust signals come before the practical/contact block: by the time the visitor reaches hours and the map, they've decided they're
interested. The chat-driven `Fragen` extension sits between trust-building and contact because that's where pre-booking objections surface
("do I need a prescription?", "what does it cost?").

The vacation/seasonal banners render _above_ the hero and don't participate in this order — they are state-driven announcements rather than
structural sections.

## Decision rule for new content

When proposing a new section, page, or link, classify it:

| Classification                                         | Rule                                                                                                              |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Topic with depth that patients drill into**          | Add a dedicated page, a home-page overview section, and a `Mehr zu X →` link from one to the other.               |
| **Trust signal supporting the current decision**       | Home-page extension only. No dedicated page. Document the reason it has no spoke (like Stimmen and Fragen above). |
| **Different audience** (job seekers, suppliers, press) | Header nav + footer only. Not on the landing page.                                                                |
| **State-driven announcement** (vacation, seasonal)     | Banner above the hero. Not a section.                                                                             |
| **Legal obligation**                                   | Footer link only (Impressum, Datenschutz).                                                                        |

If a proposal doesn't fit one of these rows, the proposal is wrong — not the rule. Reshape it (split it, narrow its audience, demote it to a
footer link) until it does.

## Alternatives considered

### Mirror the navigation order on the home page

Sections in the same order as the header nav (`Praxis → Leistungen → Qualifikation → Karriere → Kontakt`). Rejected: it puts Karriere in the
middle of the patient flow, disrupts the trust-then-contact arc, and treats the landing page as a menu rather than an argument.

### One section per page, no extensions

Strict 1:1 between home-page sections and dedicated pages. Rejected: forces Stimmen and Fragen to become standalone pages (`/stimmen`,
`/faq`) that nobody navigates to directly, and drains the home page of the trust signals that actually move the booking decision.

### Karriere as a landing-page section

Argued for: a small line near the bottom advertising open positions. Rejected for now: the practice rarely has open positions, the audience
is wrong for the home page, and the careers page is already reachable from the header and footer. The rule allows revisiting if active
recruiting becomes a sustained need — a banner above the hero (state-driven announcement) is the right escalation, not a permanent
landing-page section.

## Consequences

- The home page stays scannable. A visitor who only wants hours and address can find them without scrolling past careers content.
- Every topic page has exactly one entry surface from the home page, so there's a single place to update preview copy when the topic page
  changes.
- The "consistent `Mehr zu X →` link" pattern is enforceable in code review — any overview section without one is a bug.
- New content has a clear default home: it's almost always a topic page with a small overview section on the landing page. Proposals that
  don't fit the rule get pushed back at the planning stage rather than at implementation.
- Stimmen and Fragen don't get dedicated pages. If a future need _does_ require one (a fully-fledged FAQ archive, a moderated review feed),
  this document is the place to record the change.
