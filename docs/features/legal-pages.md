# Legal Pages — Impressum and Datenschutzerklärung

## User behavior

Two routes are reachable from the site-wide footer (`SiteFooter`) on every public page:

- `/impressum` (`/en/imprint` via the `{-$locale}` segment) — Anbieterkennzeichnung gemäß § 5 TMG / § 18 MStV
- `/datenschutz` (`/en/privacy`) — Datenschutzerklärung nach Art. 13 DSGVO

The German slugs are canonical — same per-route file, English variant via `useLocale()`. Both pages are listed in the sitemap at
`priority: 0.3, changefreq: yearly` (see `src/web/seo/sitemapRoutes.ts`).

The `/kontakt#anfahrt` section additionally carries a one-line note under the embedded Google Maps iframe linking back to the privacy policy
— that map is the only third-party data transfer the site makes on page-load.

## What we shipped, content-wise

### Impressum

Adapted from the legacy Jimdo `/about/` page, with three deliberate departures from that source:

1. **Added a `Berufsbezeichnung und berufsrechtliche Regelungen` section** that the Jimdo text was missing. § 5 (1) Nr. 5 TMG and the
   DL-InfoV require regulated health professionals to name the title, the conferring state, and the applicable regulations (PodG, PodAPrV,
   HeilprG).
2. **Fixed the Aufsichtsbehörde heading.** The address (Dörrhorststraße 36, Ludwigshafen) is correct, but the heading should say
   "Gesundheitsamt **Rhein-Pfalz-Kreis**" — that's the authority; Ludwigshafen is just where it sits.
3. **Fixed an obvious typo in the insurer's address** — "Maximilian str." → "Maximilianstraße".

We dropped the Jimdo "Diese Seite wurde mit Jimdo Creator erstellt!" promo block.

### Datenschutzerklärung

Rewritten wholesale, because the technical landscape is different from Jimdo's. The Jimdo policy described Google reCAPTCHA and Jimdo's
Creator Statistiken; neither exists on this build. The new policy describes what we actually do:

| Section                                       | Covers                                                                                                                                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Verantwortlicher                           | Annette Yilmaz, sourced from `PRACTICE`                                                                                                                                                        |
| 2. Allgemeines                                | Plain-language overview of legal bases (Art. 6 (1) (a–f), plus Art. 9 (2) (h) for health data)                                                                                                 |
| 3. Server-Logs                                | Hosting-provider log entries — IP, User-Agent, timestamp — Art. 6 (1) (f)                                                                                                                      |
| 4. Cookies                                    | The two strictly-necessary cookies only — `sessionId` (HttpOnly, Secure, SameSite=Strict) and `locale` (one-year, SameSite=Lax). No banner needed under § 25 (2) Nr. 2 TTDSG                   |
| 5. Kontakt per Telefon/E-Mail                 | Purpose + retention; § 630f BGB (10 years) where content joins the patient file                                                                                                                |
| 6. Eingebettete Karte (Google Maps)           | The `/kontakt#anfahrt` iframe: discloses transfer to Google IE / Google LLC, names the EU-US Data Privacy Framework, and points users at the deep-link buttons as the consent-free alternative |
| 7. AI-Assistent (Chat)                        | The Gemini-backed `/chat` route — discloses prompt forwarding to Google and our own session-linked storage. Asks users not to enter health data or third-party names                           |
| 8. Externe Verweise                           | `tel:`, `mailto:`, Apple Maps deep links — user-initiated, third-party processing                                                                                                              |
| 9. Empfänger und Auftragsverarbeiter          | Hosting provider + Google, Art. 28 DSGVO contracts                                                                                                                                             |
| 10. Ihre Rechte                               | Standard list, Art. 15–21 + Art. 7 (3) GDPR                                                                                                                                                    |
| 11. Beschwerderecht                           | Landesbeauftragter für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz                                                                                                            |
| 12. Keine automatisierte Entscheidungsfindung | Art. 22 DSGVO — explicit no                                                                                                                                                                    |
| 13. Stand                                     | Date stamp constant in the route module — bump on substantive change                                                                                                                           |

## Two non-features

These were considered and explicitly rejected:

### No Terms of Service (AGB)

A foot-care practice that doesn't sell or book online has no need for website ToS. The treatment relationship is a Behandlungsvertrag formed
in person at the practice (§§ 630a ff. BGB). Website ToS are appropriate when there is an online shop, online booking with payment,
user-generated content, or a SaaS product. None of those apply here.

If any of those features are added later, this is the trigger to revisit the decision.

### No cookie / consent banner

Both cookies the site sets are strictly necessary:

- **`sessionId`** — see [`docs/architecture/authentication.md`](../architecture/authentication.md). Created on the first GraphQL request,
  HttpOnly, Secure, SameSite=Strict. Used for session continuity across requests; required for the chat surface.
- **`locale`** — set in `src/routes/{-$locale}.tsx` from `Accept-Language` on first visit. SameSite=Lax, one-year max-age. Used to remember
  the user's chosen language on subsequent visits.

§ 25 Abs. 2 Nr. 2 TTDSG exempts cookies that are strictly necessary to provide the service requested by the user. Neither cookie tracks
behavior, profiles users, or is shared with third parties. No banner is required.

When analytics (currently P1 in [`docs/project.md`](../project.md), Plausible/Umami being the leading candidates) lands, re-evaluate.
Plausible is cookieless and would not change this; a self-hosted Umami instance can be configured cookieless too. Anything that introduces a
non-functional cookie flips this back to "banner needed".

## Where the content lives

| File                                                                      | Purpose                                                                                         |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/routes/{-$locale}/impressum.tsx`                                     | Imprint route (DE+EN via `useLocale()`)                                                         |
| `src/routes/{-$locale}/datenschutz.tsx`                                   | Privacy policy route (DE+EN); `POLICY_VERSION` constant at the top — bump on substantive change |
| `src/routes/{-$locale}/ImpressumPage.graphql` / `DatenschutzPage.graphql` | Empty `currentSession` query, matches every other page                                          |
| `src/web/components/SiteFooter.tsx`                                       | Quiet single-line footer wired into `src/routes/{-$locale}.tsx`                                 |
| `src/web/seo/sitemapRoutes.ts`                                            | Sitemap entries for both pages                                                                  |

Contact info is sourced from `src/web/practice.ts` (`PRACTICE`). Phone is rendered via `formatPhoneNumber()`; raw E.164 goes into `tel:`
links.

## Owner / lawyer review

The content needs the practice owner's review (and, ideally, a lawyer's review) before public launch — see the "Launch checklist" in
[`docs/project.md`](../project.md). The roadmap entry is unchecked until that happens. Bump `POLICY_VERSION` in `datenschutz.tsx` on every
substantive change so the "Stand" date reflects reality.
