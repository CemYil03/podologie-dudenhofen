# Typography

The site's three-font system, how each face is sourced, and what each one is allowed to do.

## Context

The site is editorial without being cold. It needs a serif voice for the practice speaking, a high-legibility sans for body copy (the
audience skews older — Hühneraugen, diabetisches Fußsyndrom, Verordnungen), and a small mono face that signals "stamped, dated, official"
for eyebrow labels and dates. All three must self-host with no flash of unstyled text or font-swap when navigating into lazy-loaded routes.
CDN webfonts add a network round-trip on first paint and depend on a third party staying up; system fonts vary across platforms and
undermine the brand.

## Decision

Self-host three variable fonts and bundle them with the app. Each font has one role and one role only.

| Face               | Tailwind family | Used for                                                                        |
| ------------------ | --------------- | ------------------------------------------------------------------------------- |
| **Fraunces**       | `font-serif`    | All headings (`h1`, `h2`, `h3`), the logo wordmark, large italic pull-quotes.   |
| **Source Sans 3**  | `font-sans`     | All body copy, buttons, navigation links, footer links. Site default.           |
| **JetBrains Mono** | `font-mono`     | Section eyebrows, dates, and other short uppercase / letter-spaced labels only. |

Each font ships via the matching `@fontsource-variable/*` package. Their `wght.css` (and `wght-italic.css` where used) declare `@font-face`
rules that point at relative `./files/*.woff2` URLs; Vite's CSS pipeline resolves those, content-hashes, and emits each `.woff2` into
`assets/<face>-*-[hash].woff2`. Nothing is fetched from a third-party CDN at runtime.

The Tailwind v4 `--font-sans`, `--font-serif`, and `--font-mono` theme tokens in `src/styles.css` put the variable face first in each stack
so every utility (`font-sans`, `font-serif`, `font-mono`) and the body's default resolve to it.

### Rules of thumb

- Big and emotional → **Fraunces** (weight 600 for normal headings; weight 300 + italic for the editorial pull-quote variant).
- Anything someone reads at length → **Source Sans 3**.
- A short tag, date, or label (uppercase, letter-spaced) → **JetBrains Mono**. Use the
  [`SectionEyebrow`](../../src/web/components/SectionEyebrow.tsx) component for the canonical pattern.

### What never to do

- Don't use Fraunces for body copy. It's a display face — at paragraph sizes it reads ornamental and fights legibility for older patients.
- Don't use Source Sans for headings. The serif voice is what makes the practice read editorial instead of corporate.
- Don't use JetBrains Mono for body copy or full sentences. It's reserved for short, uppercase, letter-spaced labels — anything else makes
  the page feel like a terminal.

### First-paint preloads

The primary Latin `.woff2` of each face is `<link rel="preload" as="font" type="font/woff2" crossorigin>`-ed from `__root.tsx` so the
browser fetches each one in parallel with the HTML and CSS, eliminating swap flash on first paint. If the site adds non-Latin pages where
first-paint text uses another unicode subset, add a matching preload for that file.

## Alternatives considered

- **Google Fonts CDN** — one line to set up but adds a third-party request on every cold load, can be blocked by ad-blockers or regional
  filters, and introduces a noticeable swap on slow networks.
- **One-font system** (Source Sans for everything). Read flat — the practice needed an editorial register that a single sans can't carry.
- **Inter / Lora / IBM Plex Mono** instead of the chosen three. Each is fine in isolation; the chosen trio was tuned against the
  aubergine-on-cream palette and the chosen weights and italics. See [colors.md](./colors.md).
- **`next/font`-style bundler plugin** — overkill and not idiomatic in TanStack Start; `@fontsource-variable/*` already produces a
  Vite-friendly CSS + woff2 layout.
- **System font stack** — fastest but inconsistent across OSes and undermines the brand.

## Consequences

- The full variable-weight Latin / Latin-Ext / Cyrillic / Greek / Vietnamese subset set ships in the build output (multiple woff2 files per
  face); only the subsets the browser actually needs are fetched at runtime via the `unicode-range` rules.
- The preload tags reference each face's Latin subset specifically. Add a second preload tag if a page introduces non-Latin first-paint
  text.
- Updating a font means bumping its `@fontsource-variable/*` package; nothing in `src/` references the woff2 files by path.

## Implementation

| Concern              | File                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Font packages        | `@fontsource-variable/source-sans-3`, `@fontsource-variable/fraunces`, `@fontsource-variable/jetbrains-mono` |
| `@font-face` imports | `src/styles.css` (top-level `@import` for each face's `wght.css` / `wght-italic.css`)                        |
| Tailwind tokens      | `src/styles.css` — `@theme inline { --font-sans, --font-serif, --font-mono }`                                |
| First-paint preloads | `src/routes/__root.tsx` — three `links: [{ rel: 'preload', as: 'font', … }]` entries                         |
| Default applied via  | `<body className="font-sans …">` in `__root.tsx`                                                             |
| Eyebrow component    | `src/web/components/SectionEyebrow.tsx` — the canonical mono-label + rule pattern                            |
