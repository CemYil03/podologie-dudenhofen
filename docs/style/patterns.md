# Patterns

Reusable visual patterns that combine the [palette](./colors.md) and the [type system](./typography.md). Treat each entry as canonical: when
a page needs the pattern, reach for the existing component or copy the documented class set rather than re-inventing.

## Sticky site header

The persistent top bar that frames every page: practice wordmark on the left, language switcher on the right. Sticks to the top of the
viewport and frosts the content below as it scrolls under.

- **Component:** [`SiteHeader`](../../src/web/components/SiteHeader.tsx)
- **Mount point:** the locale layout route (`src/routes/{-$locale}.tsx`) — every locale page inherits it; never re-mount per page.
- **Surface:** `bg-cream/80` + `backdrop-blur-md` so the cream stays consistent with the page but content scrolling beneath is softened.
- **Hairline:** `border-b border-aubergine/10` — same hairline convention as service cards (see below).
- **Wordmark:** "Podologie Dudenhofen" in Fraunces, `text-aubergine-dark`, links back to the locale home.
- **Stacking:** `z-50`, `sticky top-0` — sits above all page content but below toasts/dialogs.

```
┌───────────────────────────────────────────────────────────────┐
│  Podologie Dudenhofen                              DE  EN     │
└───────────────────────────────────────────────────────────────┘
```

## Section eyebrow + rule

The standard "section header" tag: a small uppercase sage label in the mono face paired with a thin horizontal rule. Every major section
gets one — it gives the page rhythm and lets visitors skim category-by-category.

- **Component:** [`SectionEyebrow`](../../src/web/components/SectionEyebrow.tsx)
- **Usage:** `<SectionEyebrow>Werdegang</SectionEyebrow>` directly above the section's `h1` or `h2`.
- **Reference:** the home page hero and about section in `src/routes/{-$locale}/index.tsx`.

```
WERDEGANG ─────────────────────
```

## Pill buttons (primary + secondary)

The site's CTAs are pill-shaped (full radius), aubergine-fill for primary and aubergine-outline for secondary. They are always paired —
primary plus secondary — so the visitor has a clear next step and a softer alternative.

- **Component:** [`Button`](../../src/web/components/base/button.tsx) with `variant="brand"` (primary) or `variant="brand-outline"`
  (secondary). Combine with `size="lg"` for hero CTAs.
- **Pairing rule:** never ship a `brand` button without an adjacent `brand-outline` (or vice-versa) on hero / above-the-fold sections.
- **Reference:** the home page hero — _Termin anfragen_ + _Leistungen ansehen_.

```tsx
<Button variant="brand" size="lg" asChild>
  <Link to="/{-$locale}/kontakt">Termin anfragen</Link>
</Button>
<Button variant="brand-outline" size="lg" asChild>
  <Link to="/{-$locale}/leistungen">Leistungen ansehen</Link>
</Button>
```

## Service card

Cream background, hairline border, blush icon-wrap, lift + gold border on hover. The gold border is what signals "this card is now active" —
it's the only place gold appears outside credential blocks.

| Layer           | Token                                                 |
| --------------- | ----------------------------------------------------- |
| Card background | `bg-cream`                                            |
| Card border     | `border border-aubergine/10` (hairline)               |
| Icon wrap       | `bg-blush` rounded square, aubergine icon stroke      |
| Hover           | `hover:border-gold hover:-translate-y-0.5 transition` |

No `ServiceCard` component exists yet — it'll be added when the first page that needs it (`/leistungen`) is built. When that happens, drop
the component under `src/web/components/ServiceCard.tsx` and update this section to point at it.

## Timeline icon (outline vs filled)

For a Werdegang / certification timeline: outline-style icons by default, filled aubergine for the single "current / most important"
milestone. Use the filled-vs-outline distinction sparingly — it loses meaning the moment two or three milestones get filled.

- Default: aubergine stroke, transparent fill.
- Active/key milestone: filled aubergine (white interior detail if the icon needs it).

## Credential / certificate block

The dark "Hygiene & Qualifikation" surface. This is the only context where **gold** is allowed.

| Layer        | Token                                   |
| ------------ | --------------------------------------- |
| Background   | `bg-aubergine-dark`                     |
| Body text    | `text-cream` / `text-cream/80`          |
| Eyebrow      | `text-gold` in JetBrains Mono uppercase |
| Icon strokes | `text-gold`                             |
| Heading      | `font-serif text-cream`                 |

Reserve this surface for trust badges, Urkunden, and seals. Don't reach for it just because a section needs visual weight — there are other
ways (blush, larger headings) that don't burn the gold accent.

## Page rhythm

The default rhythm for a long-form content page:

1. Cream hero with `SectionEyebrow` + Fraunces `h1` + body in charcoal + pill-button pair.
2. Blush "story" or "context" section with the editorial italic pull-quote (Fraunces, weight 300, italic, aubergine-dark) and supporting
   body copy.
3. Cream service / detail section with hairline-bordered service cards.
4. Aubergine-dark credential / hygiene block (where appropriate) — gold icons, mono eyebrow, serif heading on cream text.
5. Cream contact / CTA section, single primary `brand` button.

Pages don't need every step — the home, `/therapeutin`, `/leistungen`, and `/hygiene` will each pick from this set. The order matters when
more than one is used: cream → blush → cream → dark → cream keeps the visitor moving through the page without the surface ever feeling
repetitive.
