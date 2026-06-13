# Instrument Reprocessing Pipeline

A three-step photo pipeline at the bottom of the Praxis page's `#hygiene` section, showing how instruments are cleaned, sealed, and
sterilised between every patient.

## User Behavior

- Sits inside the dark aubergine `#hygiene` section, directly below the existing 3-card hygiene grid (reprocessing / surfaces / single-use).
- Heading reads "Instrumentenaufbereitung — Schritt für Schritt." with a short lead-in clarifying the equipment lives in the practice
  itself.
- Three numbered cards (`01`, `02`, `03`) — each with the same gold mono number + hairline rule used by
  [`SectionEyebrow`](../../src/web/components/SectionEyebrow.tsx), followed by a 4:3 photo, a serif sub-heading, and a short body paragraph.
- Single column on mobile, three columns from `md:` up.
- Photos are `loading="lazy"` and live in `public/instrumentenaufbereitung/`.

## Options Considered

| Option                                        | Pros                                                          | Cons                                                               |
| --------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| New top-level "Instrumente" section           | Maximum visual weight                                         | Breaks page rhythm (Räume → Therapeutin → Hygiene), adds a section |
| Replace existing reprocessing card            | Less duplication                                              | Loses the abstract triad (reprocessing / surfaces / single-use)    |
| Numbered pipeline below hygiene grid (chosen) | Concrete proof for the abstract claim, photos earn their keep | One extra screen on mobile                                         |
| Modal/lightbox over a single image            | Compact                                                       | Hides the strongest trust content behind a click                   |

## Option Chosen

Numbered pipeline below the existing hygiene grid. The 3-card grid states the policy ("instruments are reprocessed, surfaces disinfected,
single-use materials discarded"); the pipeline below it shows the policy in action. The dark aubergine background continues — gold numbers
keep the credential-block aesthetic ([`docs/style/patterns.md`](../style/patterns.md#credential--certificate-block)) and re-use the eyebrow
rule pattern already used on the page.

The original site's "_unter Einsatz von Chemikalien_" wording was softened to "Reinigung und thermische Desinfektion" — modern thermal
disinfectors run on heat plus detergents, not chemical disinfection, so the original phrasing was technically inaccurate.

## Implementation

- [`src/routes/{-$locale}/praxis.tsx`](../../src/routes/{-$locale}/praxis.tsx) — pipeline lives at the end of the `#hygiene` section. The
  three steps are an inline data array consumed by a single `.map()` rendering an `<ol>` of `<li>` cards. Each step holds `src`, `title`,
  `alt`, and `body`, with `title`/`alt`/`body` as `{ de, en }` objects keyed by the locale from `useLocale()` — same locale-as-key pattern
  as the rest of the file.
- `public/instrumentenaufbereitung/` — `thermodesinfektor.jpg`, `folienschweissgeraet.jpg`, `autoclave.jpg`. Aspect ratio is enforced via
  Tailwind's `aspect-[4/3]` so all three cards stay aligned regardless of source photo dimensions.
- No new component file — the pipeline is local to the Praxis page and reuses the eyebrow + rule motif inline. If a second page ever needs
  the same numbered-photo pattern, lift it into `src/web/components/`.

### Why an `<ol>` and numbered labels

Order matters here — soiled instrument → cleaned → sealed → sterilised is a process, not a set. An ordered list is the right semantic, and
the visible `01 / 02 / 03` labels reinforce the sequence for sighted users without relying on list-marker styling.
