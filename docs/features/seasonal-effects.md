# Seasonal effects

Time-of-year personality on the home page: a subtle canvas-based animation plus a small text banner. Both are date-driven and pure-client —
no backend.

## What renders when

Two independent components, both mounted on the home page:

- `<SeasonalEffect />` — a canvas behind the page content with falling snow / petals / leaves / fireworks / Fasching confetti.
- `<SeasonalBanner />` — a small static card at the top of the page with a short greeting, dismissible per session.

The vacation banner (`<VacationBanner />`) takes precedence over the seasonal banner — see [`docs/features/vacations.md`](./vacations.md).
The animation is unaffected by vacation state.

### Animation calendar

| Window                     | Effect    | Notes                                         |
| -------------------------- | --------- | --------------------------------------------- |
| Dec 1 – Feb 28             | Snow      | Sparse, low opacity. The classic.             |
| Dec 31 22:00 – Jan 1 03:00 | Fireworks | Tight window so it lands as a moment.         |
| Fasching week              | Confetti  | Weiberfastnacht → Faschingsdienstag, computed |
|                            |           | from Easter via the Anonymous Gregorian algo. |
| Mid-Mar – end of May       | Petals    | Pfalz is fruit-tree country.                  |
| Jun – mid-Sep              | _Nothing_ | Summer reads "clean and bright" — restraint.  |
| Sep 20 – Nov 15            | Leaves    | Warm autumn palette.                          |

When two windows overlap (e.g. Fasching falls inside the Dec 1 – Feb 28 snow window), the more specific signal wins. Order in
`seasonalEffectResolve.ts` encodes priority: fireworks → Fasching → snow.

### Banner calendar

| Window                              | Greeting (DE)                | Icon      |
| ----------------------------------- | ---------------------------- | --------- |
| Dec 1 – Dec 23                      | _Eine schöne Adventszeit._   | Trees     |
| Dec 24 – Dec 30                     | _Frohe Weihnachten._         | Snowflake |
| Dec 31 – Jan 6                      | _Ein gutes neues Jahr._      | Sparkles  |
| 10 days around Ostersonntag         | _Frohe Ostern._              | Flower    |
| Days around Muttertag (2nd Sun May) | _Alles Liebe zum Muttertag._ | Heart     |
| Jun 15 – Sep 10                     | _Schöne Sommerzeit._         | Sun       |
| First week of October               | _Schönen Erntedank._         | Wheat     |

Copy is translated for all four supported locales (de/en/ru/ar) — see `src/web/components/SeasonalBanner/seasonalContent.ts`.

## What we deliberately skip

- **Halloween** is not a German tradition; ghosts on a medical site read as childish to a Pfalz audience.
- **Allerheiligen** (Nov 1) is solemn — wrong tone for a banner.
- **Valentinstag** is too commercial for medical.
- **Tag der Arbeit** is politically loaded for some.

If you find yourself wanting to add Halloween or Easter eggs, the answer is no — read the section above first, then come back if you have a
strong case.

## Non-intrusiveness rules

These are non-negotiable. A medical site has a duty of care for visitors who may be older, have vestibular issues, or visit while
distressed.

- **`prefers-reduced-motion`** disables the animation entirely. The banner is static, so it stays.
- **Page-visibility pause**: animation halts while the tab is hidden, both for battery and to avoid the surprise-burst on refocus.
- **Density caps**: 22 snow particles on desktop, 50% of that on mobile (<768px). All effects scale down proportionally.
- **Canvas behind everything**: `position: fixed`, `inset-0`, `z-0`, `pointer-events-none`, `aria-hidden`.
- **Animation dismiss**: a small × button bottom-right; once clicked the preference is saved in `localStorage` (`seasonal-effect-dismissed`)
  and never shown to that user again.
- **Banner dismiss**: × button on the right of the banner; persisted in `sessionStorage` (per-tab) so a returning visitor sees the
  next-season greeting on a fresh visit.
- **Home page only**: neither component is mounted on appointment forms, contact, or content pages.

## Previewing locally

Both resolvers go through `seasonalNow()` (`src/web/components/seasonalNow.ts`), which checks the URL for an override before falling back to
`new Date()`:

- `/?seasonalDate=2027-12-25` — preview Christmas (banner + animation)
- `/?seasonalDate=2027-12-31&seasonalHour=23` — Silvester fireworks
- `/?seasonalDate=2027-04-15` — Ostern banner + petals
- `/?seasonalDate=2027-02-08` — Fasching confetti
- `/?seasonalDate=2027-07-15` — summer banner, no animation

The override is client-only — SSR ignores it — and is read once per mount. Reload after changing the param. The vacation banner is
unaffected by this override; to preview it, add a row through `/admin/vacations`.

## SSR and hydration

Both components defer their decisions to client-side `useEffect`. The server never embeds an animation or a banner, which means:

- No hydration mismatch when the user's clock and the server's are in different windows (e.g. a German visitor at 23:55 vs. the server at
  22:55 UTC right before a season transition).
- A brief moment after hydration before the banner / canvas appears. We accept that flicker as the cheaper trade — banners are a soft
  surface.

## Files

```
src/web/components/SeasonalBanner/
├── SeasonalBanner.tsx
├── seasonalBannerResolve.ts          pure: Date → kind | null
├── seasonalBannerResolve.test.ts     walks the year
└── seasonalContent.ts                copy + icon table, all locales

src/web/components/SeasonalEffect/
├── SeasonalEffect.tsx                canvas, RAF loop, dismiss button, reduced-motion + visibility guards
├── seasonalEffectResolve.ts          pure: Date → kind | null
├── seasonalEffectResolve.test.ts
└── effects/
    ├── effectTypes.ts                shared particle interface
    ├── effectSnow.ts
    ├── effectPetals.ts
    ├── effectLeaves.ts
    ├── effectFireworks.ts            burst-emitter style
    └── effectConfetti.ts
```

## Adding a season

1. Decide the calendar window. **Read the "What we deliberately skip" section first.**
2. For the banner: extend `SeasonalBannerKind`, add to `SEASONAL_BANNER_CONTENT`, add the resolution branch in `seasonalBannerResolve.ts`,
   extend the test.
3. For the animation: add `effects/effect{Name}.ts` implementing `SeasonalEffectImpl`, extend `SeasonalEffectKind`, wire `effectFor()`,
   extend the resolver and its test.
