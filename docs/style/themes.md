# Themes

The site ships a **single theme: light**. There is no dark mode, no theme toggle, and no `prefers-color-scheme` switching. This is a
deliberate decision, not an oversight.

## Context

The brand colors and the warm background (cream `#FBF7F3`) on `<body>` are specifically tuned for a healthcare context: the site is the
public face of a podiatry practice, and patients arriving from search results expect a calm, clinical, daylight-feeling page. A second theme
would either need its own brand palette (which doesn't exist) or a mechanical inversion that would clash with the warm cream background and
the photography. The full palette and the rules that govern it live in [colors.md](./colors.md) — this document is about the single-theme
decision itself, not the colors.

## Decision

One theme — light. The CSS variables in `src/styles.css` define a single set of values under `:root`; there is no `.dark { … }` block, and
there should not be one.

## What this means in practice

- **Don't add `dark:` Tailwind utility classes** to new components. They compile to dead CSS here and signal an intent the project does not
  support.
- **Don't add a `.dark` class block** to `src/styles.css` or any component CSS.
- **Don't read `prefers-color-scheme`** in components or guards.
- **`next-themes` is present** as a transitive dependency of `sonner` (the toaster). It is not wired up to anything user-facing — sonner
  consults `useTheme()` internally to pick its toast colors and falls back to `system`, which on a body without a `.dark` class always
  resolves to light. Don't introduce a `<ThemeProvider>` to drive it.

## When to revisit

If the brand ever commissions a second palette and the practice wants to offer a toggle for accessibility or evening-use reasons, this
decision is reversible: keep the existing tokens under `:root` as the light theme, add a parallel `.dark { … }` block with the new tokens,
and wire a toggle. Until then, treat additional themes as out of scope.
