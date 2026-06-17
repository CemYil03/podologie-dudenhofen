# Accessibility

The intent and the patterns the site uses to deliver it. The public Erklärung zur Barrierefreiheit lives at
[`/barrierefreiheit`](../../src/routes/{-$locale}/barrierefreiheit.tsx); this doc is the engineering counterpart that captures _how_ we hit
those targets.

## Target

WCAG 2.1, conformance level **AA**, across all four supported locales (`de`, `en`, `ru`, `ar`). The Arabic build adds RTL on top — every
pattern below has to read correctly in both directions.

## Patterns we rely on

### Skip link

`<SkipLink />` lives in [`src/web/components/SkipLink.tsx`](../../src/web/components/SkipLink.tsx) and is rendered as the first focusable
element of the public layout in [`src/routes/{-$locale}.tsx`](../../src/routes/{-$locale}.tsx). Hidden via `sr-only` until focused, then
positions itself in the top-start corner with the brand-aubergine pill. Targets `#main-content`.

**Every public page's `<main>` carries `id="main-content"`** so the link resolves. Admin chrome is exempt — the admin shell has its own
keyboard layout and isn't part of the public a11y surface.

### Color contrast

Body text is **charcoal `#2B2530`** on cream — comfortably > 7:1. Sage was darkened to **`#5E6F53`** (was `#8A9B7E`) so the small uppercase
eyebrows still pass AA at 4.5:1 against cream. The full palette and the rule of thumb for each color live in
[`docs/style/colors.md`](./colors.md).

When introducing a new color or a new color-on-color combination, check it against the cream and aubergine surfaces with a contrast tool
before merging. Lighthouse runs as part of the visual check during review.

### Translated alt text

Every rendered `<img>` carries an `alt` value localized into all four locales via the `{ de, en, ru, ar }[locale]` pattern. Decorative icons
from `lucide-react` use `aria-hidden`. Image content sourced from `src/web/content/*Content.ts` keeps the alt object next to the `src` so
the two are edited together.

When adding a new image, the alt object is mandatory — there is no "decorative photo" exception for content images.

### Reduced motion

Both branches are covered:

- The `<Reveal>` component in [`src/web/components/Reveal.tsx`](../../src/web/components/Reveal.tsx) checks
  `matchMedia('(prefers-reduced-motion: reduce)')` and skips the IntersectionObserver fade-in entirely.
- A CSS fallback in [`src/styles.css`](../../src/styles.css) under the `@media (scripting: none), (prefers-reduced-motion: reduce)` rule
  shows `[data-reveal]` elements immediately, so the same content reaches users with JS off or a stricter motion preference.

The full motion contract is in [`docs/style/motion.md`](./motion.md).

### Semantic HTML and ARIA

- Each page exposes exactly one `<main id="main-content">`, with one `<h1>` and a heading hierarchy that doesn't skip levels.
- `<nav>` elements carry an `aria-label` translated into all locales.
- Icon-only buttons carry `aria-label`.
- Embedded Google Maps `<iframe>` elements carry a translated `title` attribute.
- Radix UI primitives handle dialog/sheet/popover ARIA out of the box; the `DirectionProvider` in
  [`src/routes/__root.tsx`](../../src/routes/__root.tsx) propagates `dir` into Radix portals.

### Language and direction

`<html lang={locale} dir={dir}>` is set in `RootDocument`. RTL detection lives in `src/web/utils/locale.ts` (`isRtlLocale`). When you add
content that needs to mirror under RTL — chevrons, arrows, list bullets — use Tailwind's `rtl:` variant rather than hard-coding
`left/right`.

## What we explicitly do not do

- **Two themes.** A dark theme is rejected at the brand level — see [`docs/style/themes.md`](./themes.md). The single theme is engineered to
  pass AA on its own; we don't ship a dark-mode equivalent.
- **High-contrast toggle.** The default palette already passes AA; OS-level contrast settings are honoured by the browser without a custom
  toggle.
- **Per-page font-size controls.** Browser zoom and the OS default font-size cover the same surface and don't fragment content.

## Reporting

Visitors report barriers via the email/phone listed on [`/barrierefreiheit`](../../src/routes/{-$locale}/barrierefreiheit.tsx). When a
report comes in, fix the underlying pattern (not just the reported page) and bump the `STATEMENT_VERSION` constant at the top of
`barrierefreiheit.tsx` so the "Stand" date stays honest.
