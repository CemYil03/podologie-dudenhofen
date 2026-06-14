# Testimonials

A small social-proof block on the home page. Three quote cards followed by a row of five gold stars and a single link to the practice's live
Google reviews. There is no testimonials database, no admin UI, and no caching of Google reviews — see the
[alternatives](#alternatives-considered) for why.

## User behavior

The home page renders a `Stimmen aus der Praxis` section between the dark credential strip (`#qualifikation`) and the final CTA. Three cards
quote short statements about the _visit experience_. Below the cards, five gold star icons sit above a single link —
`Alle Bewertungen auf Google ansehen` — that opens the Google reviews list for the practice in a new tab.

The cards are intentionally not reviews of treatments. The wording stays on atmosphere, time taken, communication, accessibility, and
friendliness of the practice — never on medical outcomes.

The five-star row is decorative — it cues "this links to a Google reviews surface" without making a numeric rating claim on the page itself
(the live count drifts; the page would lie the moment a 1-star review lands). For that reason its `aria-label` is the neutral
`Bewertungen auf Google` / `Reviews on Google`, not "five out of five stars".

## Implementation

- **Source of truth.** `INDEX_TESTIMONIALS` in [`src/web/content/indexContent.ts`](../../src/web/content/indexContent.ts). Each entry has
  `id`, `quote`, and `attribution`.
- **Rendering.** The home route file [`src/routes/{-$locale}/index.tsx`](../../src/routes/{-$locale}/index.tsx) maps over the array and
  renders one `<figure>` per entry on a `bg-blush` surface, mirroring the service-card hairline + cream-fill convention.
- **Star row.** Five `StarIcon` lucide glyphs at `size-5 fill-gold text-gold`, wrapped in a `role="img"` `<div>` with the neutral
  `Bewertungen auf Google` aria-label. The gold token is also used by the credential block (`#qualifikation`); using it again here is
  intentional — both sections are trust signals — and is noted in [docs/style/colors.md](../style/colors.md).
- **Reviews link.** The CTA below the stars points at `PRACTICE.maps.reviews` — the Google Local reviews surface for the practice's listing.
  The Place ID (`ChIJzcTVmG20l0cR7OwkPRBebrY`) and CID for the listing are also stored on `PRACTICE` so future tooling (JSON-LD, sitemap,
  embedded review widget) can reuse them. The URL was confirmed against the practice's Google Maps embed payload in June 2026.
- **No DB, no job, no admin UI.** The cards are static React content hardcoded in the content module. Updating the quotes is a code change.

## Replacing a placeholder with a real patient quote

Three rules — every one of them is required:

1. **Get written consent on file.** A short signed note is enough: _"Annette Yilmaz / Podologie Dudenhofen darf folgende Aussage auf der
   Website veröffentlichen: …"_ with the patient's name and the date. Keep the signed copy at the practice. Without consent, do not change
   the file.
2. **Stay on visit experience.** HWG §11 restricts patient testimonials in healthcare advertising; outcome claims
   (`meine Schmerzen sind weg`, `endlich geheilt`) are the part the law bites on. Quotes about the _visit_ — atmosphere, time taken,
   explanation, accessibility — stay inside the law's safe lane. Reject any quote that promises a treatment result, even if the patient
   wrote it themselves.
3. **Update `attribution`** on the entry to reflect the patient — first name + initial of the surname (`Sabine M.`) unless they explicitly
   ask to be named in full. Never attribute by full name without an explicit request in the consent note.

## Alternatives considered

### Embed a feed of live Google reviews

Pulling the practice's Google reviews into a database via the Places API and rendering a curated subset.

- **TOS.** Google's Places API forbids long-term caching of review content — Place IDs may be cached indefinitely, but reviews must be
  refreshed on display and shown with author attribution and a link back to Google. A schema with stored quote copy and a recurring job that
  refreshes them drifts towards the line.
- **Cherry-picking.** Selecting which reviews to render — even from real Google content — turns "we display our Google reviews" into "we
  display a hand-picked marketing selection." That is a Google TOS issue (reviews must be shown as-is, in context), a German consumer-law
  issue (UWG §5; the BGH 2022 ruling on filtered reviews made this explicit), and an HWG issue specifically because podiatry is a
  _Heilberuf_.
- **Operational overhead.** A new table, a recurring pg-boss job, an admin route with auth, a guard, GraphQL ops, codegen — significant
  moving parts on a small marketing site whose social-proof CTA is a single link.

The current design pays none of those costs and keeps editorial control on the practice side.

### Embed a third-party widget (Elfsight, Trustindex, etc.)

The widget renders Google reviews server-side from its own infrastructure, so the TOS pressure shifts to the vendor. Trade-offs: a
third-party script on the home page (CSP, performance, GDPR/Datenschutzerklärung impact), a recurring fee, and visible vendor branding. Not
justified for a small practice site that already links out to Google for the live content.

### Build a full curation admin UI

A new DB table for testimonial copies, a recurring job to fetch from Google, and an admin route to select which to render. Has all the
issues above plus the build cost. Considered and rejected at the same time as the TOS objection — see this commit's PR description.

## Files touched

| File                              | What                                                     |
| --------------------------------- | -------------------------------------------------------- |
| `src/web/practice.ts`             | `maps.reviews` URL + `googlePlaceId`                     |
| `src/web/content/indexContent.ts` | `INDEX_TESTIMONIALS` const + `IndexTestimonial` type     |
| `src/routes/{-$locale}/index.tsx` | New `<section id="stimmen">` between credentials and CTA |
