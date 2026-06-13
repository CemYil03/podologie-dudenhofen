# Colors

The brand palette and the rules that govern when each color is allowed.

## Context

The site is the public face of a small podiatry practice. Patients arrive from search results expecting something calm, editorial, and
trustworthy — not stock-medical blue, not spa-pink. The palette is deliberately small: one trust color, one calm accent, one rare "official"
accent, and a paper-warm background. Constraint is the point — when every page reaches into the same five-or-six tokens the site reads as
one practice speaking, not a stack of templates.

## Decision

Six brand colors plus a charcoal text scale. Tokens live in [`src/styles.css`](../../src/styles.css) and are exposed as Tailwind utilities
through `@theme inline` (`bg-aubergine`, `text-cream`, `border-gold`, …).

| Token              | Hex                               | Tailwind utility prefix                     | Role                                                                                                                                                                                                                                                     |
| ------------------ | --------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aubergine          | `#6B2545`                         | `aubergine`                                 | Primary brand color. Headlines (default variant), primary buttons, nav hover states, icon strokes, links.                                                                                                                                                |
| Aubergine Dark     | `#4A1830`                         | `aubergine-dark`                            | **Heading text only** — slightly darker than the primary so large serif headlines don't vibrate on cream.                                                                                                                                                |
| Cream              | `#FBF7F3`                         | `cream`                                     | Default page background. The "paper" of the whole site (set on `<body>` in `__root.tsx`).                                                                                                                                                                |
| Blush              | `#F7EDE9`                         | `blush`                                     | Secondary section background. Use to differentiate a section from cream without introducing a third surface.                                                                                                                                             |
| Sage               | `#8A9B7E`                         | `sage`                                      | Accent / eyebrow color only. Section eyebrows, timeline dates. Small and rare — never large fills, never CTAs.                                                                                                                                           |
| Gold               | `#C9A574`                         | `gold`                                      | Credential / certificate accent. Reserved for icons and eyebrows inside the dark "Hygiene & Qualifikation"                                                                                                                                               |
|                    |                                   |                                             | block, and the gold border of an active service card. Never scattered as a generic accent.                                                                                                                                                               |
| Charcoal           | `#2B2530`                         | `charcoal`                                  | Body text — primary tone.                                                                                                                                                                                                                                |
| Charcoal hierarchy | `#4A4350` / `#5A5158` / `#6B6270` | `--color-brand-charcoal-2` … `-4` (CSS var) | Charcoal at progressively lighter steps for paragraphs, captions, and meta text. Reach for these via `text-(--color-brand-charcoal-2)` — they're hierarchy variants, not stand-alone brand colors, and intentionally don't get short utility names. |

### Rules of thumb

- Background needs variety → **cream** (default) or **blush** (secondary section).
- Need attention or action → **aubergine**.
- Need a small label or category tag → **sage**.
- Need to signal "certified / official" → **gold**, sparingly, in dark sections only.
- Heading text → **aubergine-dark**, in [Fraunces](./typography.md).
- Body text → **charcoal**, in Source Sans 3, with the lighter hierarchy variants for less important runs.

### What never to do

- Don't use **aubergine-dark** for buttons or small UI elements. It's tuned for large serif headlines on cream and reads heavy at small
  sizes.
- Don't use **sage** for buttons or large fills. It will fight the aubergine and undermine the trust read.
- Don't scatter **gold** outside trust/credential contexts — it loses meaning the moment it shows up next to a regular icon or button.
- Don't re-introduce raw hex values like `bg-[#FBF7F3]` once a token exists. If a new role genuinely needs a new color, add a token first
  and update this document.

## Alternatives considered

- **A muted teal palette** (`#0f766e`-led, the original PWA `theme_color`). Read too clinical and didn't differentiate the practice from
  generic healthcare templates. Replaced by the editorial aubergine direction.
- **Two-color scheme** (just aubergine + cream). Sage and gold each carry a role — calm vs. official — that aubergine alone collapses;
  without them the page can't visually distinguish a wellness eyebrow from a credential block.
- **Tailwind palette colors** (`stone`, `rose`, `emerald`). The hex values matter: `#6B2545` was tuned against the cream + Fraunces
  combination and the closest Tailwind shade is noticeably off. Tokens beat scale shortcuts here.

## Implementation

| Concern                       | File                                                                      |
| ----------------------------- | ------------------------------------------------------------------------- |
| Hex values                    | `src/styles.css` — `:root { --color-brand-* }`                            |
| Tailwind utility tokens       | `src/styles.css` — `@theme inline { --color-aubergine, … }`               |
| Default page background       | `src/routes/__root.tsx` — `<body className="… bg-cream text-charcoal …">` |
| Reference page using the rule | `src/routes/{-$locale}/index.tsx` (cream hero + blush about section)      |
| Reusable patterns             | [patterns.md](./patterns.md)                                              |
| Why one theme only            | [themes.md](./themes.md)                                                  |
