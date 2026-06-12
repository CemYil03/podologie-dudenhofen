# Typography

How the site's default font is sourced, bundled, and applied.

## Context

The site needs a consistent default sans-serif font across every page with no flash of unstyled text or font-swap when navigating into
lazy-loaded routes. CDN-served webfonts add a network round-trip on first paint and depend on a third party staying up; system fonts vary
across platforms.

## Decision

Self-host **Source Sans 3** as a variable font and bundle it with the app:

- The font ships via the `@fontsource-variable/source-sans-3` package — its `wght.css` and `wght-italic.css` files declare `@font-face`
  rules pointing at relative `./files/*.woff2` URLs.
- `src/styles.css` `@import`s those CSS files, which lets Vite's CSS pipeline resolve, content-hash, and emit each `.woff2` into
  `assets/source-sans-3-*-[hash].woff2`. The font travels with the deployed bundle; nothing is fetched from a third-party CDN.
- The Tailwind v4 `--font-sans` theme token is overridden in `@theme inline` to put `'Source Sans 3 Variable'` first in the stack, so every
  `font-sans` utility (and the body's default) resolves to it.
- The primary Latin `.woff2` is `<link rel="preload" as="font" type="font/woff2" crossorigin>`-ed from `__root.tsx` so the browser fetches
  it in parallel with the HTML and CSS, eliminating the swap flash on first paint.

## Alternatives considered

- **Google Fonts CDN** — one line to set up but adds a third-party request on every cold load, can be blocked by ad-blockers or regional
  filters, and introduces a noticeable swap when the network is slow.
- **`next/font`-style bundler plugin** — overkill for a single font family and not idiomatic in TanStack Start; `@fontsource` already
  produces a Vite-friendly CSS + woff2 layout.
- **System font stack** — fastest but inconsistent across OSes and undermines the brand.
- **Static `<link>` to `/public/fonts/*.woff2`** — works, but loses content-hashing/cache-busting and forces a manual download of the font
  files into the repo.

## Consequences

- The full variable-weight latin/latin-ext/cyrillic/greek/vietnamese subset set ships in the build output (~25 woff2 files, only the ones
  the browser actually needs are loaded at runtime via `unicode-range`).
- The preload tag in `__root.tsx` references the latin subset specifically. If the site adds non-Latin pages where first-paint text uses
  another subset, add a matching preload for that file.
- Updating the font means bumping `@fontsource-variable/source-sans-3`; nothing in `src/` references the woff2 files by path.

## Implementation

| Concern              | File                                                                   |
| -------------------- | ---------------------------------------------------------------------- |
| Font package         | `@fontsource-variable/source-sans-3` in dependencies                   |
| `@font-face` imports | `src/styles.css` (top-level `@import`)                                 |
| Tailwind token       | `src/styles.css` — `@theme inline { --font-sans }`                     |
| First-paint preload  | `src/routes/__root.tsx` — `links: [{ rel: 'preload', as: 'font', … }]` |
| Default applied via  | `<body className="font-sans …">` in `__root.tsx`                       |
