# Motion

How motion behaves on this site. The audience skews older and the brand voice is "kleine, ruhige Praxis" — small, calm. Motion is a quiet
helper, never a feature.

## Context

A medical-practice site is the opposite of a marketing landing page. Animation that draws attention to itself reads as noise; animation that
confirms a state change or smooths a layout transition reads as care. Beyond aesthetics, the audience is more likely than average to have
`prefers-reduced-motion: reduce` set, and screen readers / older browsers / search-engine crawlers must always see the final state without
depending on any animation having played.

## Decision

Motion on this site does exactly three things, and nothing else:

1. **Reveal** content as it enters the viewport (once, never on scroll-back).
2. **Confirm** a hover, press, or selection on an interactive element.
3. **Smooth** a layout transition the eye would otherwise jump over (route progress, dropdown open/close).

Anything that is not one of those three is out of scope.

### Durations

| Use                                            | Duration |
| ---------------------------------------------- | -------- |
| Press / tap acknowledgement (`active:` states) | 150 ms   |
| Color and small-property hover transitions     | 200 ms   |
| Lift / border / shadow on cards and chips      | 300 ms   |
| Scroll-reveal (opacity + translate)            | 500 ms   |
| Image hover scale, slow ambient motion         | 700 ms   |

Anything longer than 700 ms feels like the page is loading. Anything shorter than 150 ms isn't perceived as motion at all — use no
transition instead.

### Easing

`ease-out` only. No springs, no bounces, no `ease-in`, no custom cubic-bezier curves without a documented reason. `ease-out` reads as
"settling into place"; springs read as "marketing site"; the practice reads as "medical".

The one exception is the navigation-progress bar, which uses an asymptotic `ease-out` keyframe — see
[`features/navigation-progress.md`](../features/navigation-progress.md).

### Reduced-motion contract

Every animated element MUST honour `prefers-reduced-motion: reduce`. The contract:

- Reveal animations (opacity + translate) collapse to "show the final state immediately".
- Hover micro-interactions on cards, links, and buttons may keep their **color** transitions but drop their **transform** transitions.
- Press feedback (`active:scale-[0.98]`) is acceptable to keep — it's tactile feedback bound to a deliberate user action, not ambient
  motion.

Implementations: prefer Tailwind's `motion-reduce:` variant (compiles to `@media (prefers-reduced-motion: reduce)`) at the call site. The
[`Reveal`](../../src/web/components/Reveal.tsx) component additionally short-circuits in JS via `matchMedia`, and a defensive
`@media (scripting: none), (prefers-reduced-motion: reduce)` rule in `src/styles.css` covers crawlers and JS-disabled browsers so the hidden
state never sticks.

### Surfaces that stay still

- The aubergine-dark **credential / hygiene block** ([patterns.md](./patterns.md#credential--certificate-block)) does not animate. That
  surface carries the brand's quiet flex; animating it cheapens it.
- The **map iframe** does not get a hover scale (the iframe content already moves on user interaction).
- The **site header** does not shrink, fade, or transform on scroll.

## Patterns

### Scroll-reveal

The canonical "as the visitor scrolls in, the section settles into place" pattern. Used on every long-form content section.

- **Component:** [`Reveal`](../../src/web/components/Reveal.tsx)
- **Trigger:** `IntersectionObserver` with `rootMargin: '0px 0px -8% 0px'` and `threshold: 0.05` — the element only counts as in-view once
  ~5 % of it is past 8 % above the bottom of the viewport. Avoids reveals firing while the element is still off-screen on tall hero
  sections.
- **Once only.** The observer disconnects on the first intersection. Scrolling back never re-plays the animation.
- **Stagger.** Sibling reveals (e.g. service cards in a grid) accept `delayMs={index * 80}` for a brief cascade.
- **From state:** `opacity-0 translate-y-2`. **To state:** `opacity-100 translate-y-0`. **Duration:** 500 ms. **Easing:** `ease-out`.

```tsx
<Reveal>
    <SectionEyebrow>Leistungen</SectionEyebrow>
    <h2>…</h2>
</Reveal>

<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {services.map((service, index) => (
        <Reveal key={service.title.de} delayMs={index * 80}>
            <ServiceCard {...service} />
        </Reveal>
    ))}
</div>
```

### Service-card hover

Cards lift, fence with gold, and warm the icon-wrap. Only one new pattern beyond the base card definition in
[patterns.md](./patterns.md#service-card): the icon-wrap fills aubergine on hover and the icon stroke flips to cream. That fill swap is the
single "alive" gesture in the system — use it sparingly.

```tsx
<div className="group h-full rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md">
  <div className="flex size-10 items-center justify-center rounded-md bg-blush p-2 transition-colors duration-300 ease-out group-hover:bg-aubergine">
    <Icon className="size-5 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream" />
  </div>
  …
</div>
```

The transition list is explicit (`transition-[transform,border-color,box-shadow]`) rather than the catch-all `transition` so the icon-wrap
color transition can have its own duration.

### Inline-arrow nudge

Text links that end in `→` (e.g. _"Alle Leistungen ansehen →"_) translate the arrow 4 px on hover. The arrow lives in its own `<span>` so
the transform doesn't disturb the underline.

```tsx
<Link to="/{-$locale}/leistungen" className="group inline-flex items-center gap-1 font-medium text-aubergine hover:underline">
  Alle Leistungen ansehen
  <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
    →
  </span>
</Link>
```

### Phone-link press feedback

`tel:` links get a 2 % scale-down on `:active`. The OS dial sheet takes the user away from the page on tap; the brief tactile dip is the
only confirmation they get that the tap was received.

```tsx
<a href={`tel:${PRACTICE.phone}`} className="… transition-transform duration-150 ease-out active:scale-[0.98]">
  …
</a>
```

The `brand` and `brand-outline` `Button` variants already ship `active:scale-[0.97]` (see `src/web/components/base/button.tsx`). When a
`tel:` link is rendered as `<Button … asChild>`, do not layer another `active:scale-*` on top — the variant's value wins by virtue of being
the canonical CTA. The 0.98 figure above is for raw `<a href="tel:…">` anchors that don't sit inside a Button.

### Inline `→` button nudge

The arrow-nudge pattern documented above for `<Link>` works identically on `<button>`. Use it on any inline trigger that ends in `→`,
whether it's a router link, a plain anchor, or a `<button>` that fires a client-side action (e.g. an in-page tab/state switcher).

### Staggered lists (`<Reveal as="li">`)

When the staggered grid is an ordered or unordered list, wrap each `<li>` directly with `<Reveal as="li" delayMs={index * 80}>` rather than
wrapping the `<li>` in a `<div>`. The `as` prop preserves list semantics; nesting a `<div>` inside `<ol>`/`<ul>` is invalid HTML.

```tsx
<ol>
  {steps.map((step, index) => (
    <Reveal as="li" key={step.id} delayMs={index * 80}>
      …
    </Reveal>
  ))}
</ol>
```

The same applies to description lists (`<dl>`): each `<div>` row stays a `<div>`, but a `Reveal` wrapping it is fine because `<div>` is
valid inside `<dl>` per HTML5.

### Per-group stagger in nested grids

When a section has more than one grid (e.g. three sub-categories of services, each with its own card grid), let the `delayMs={index * 80}`
counter restart inside each group rather than running a single counter across all cards. The sub-headings between grids are non-equivalent
siblings; the cards within a single grid are equivalent. The reveal cascade should match that hierarchy.

### Reveal re-play on `key` remount

If a Reveal-wrapped subtree is remounted (e.g. via a `key` change on a tab switch or filter change), its reveal animation will re-play from
scratch. This is acceptable — it doubles as a "the panel just changed" gesture. Don't go out of your way to suppress it; just be aware that
adding `key` to a parent of a `Reveal` will cost you the "once per visit" guarantee on that subtree, which is the right trade-off for a tab
panel and the wrong trade-off for a top-level section.

## Alternatives considered

- **Framer Motion / Motion One.** Rejected. Adds 15–40 KB and a runtime to a 6-page brochure site whose entire motion needs are covered by
  CSS transitions and one `IntersectionObserver`. The cost-benefit is wrong for this audience and this surface area.
- **Scroll-linked / parallax effects.** Rejected. Scroll-coupled motion is the opposite of "calm". Always trades legibility and battery for
  novelty.
- **Spring or bounce easings.** Rejected. They read as marketing, not medical.
- **Staggering everything.** Rejected. Stagger is reserved for grids of equivalent items (service cards, credential icons). Stagger applied
  to a single hero's eyebrow → headline → body chains the visitor through a scripted reveal that has no functional value.

## Consequences

- A new convention to keep: anything we add that animates must fit the three-job rule and the duration/easing tables above. If a future
  feature needs motion that doesn't fit, this doc is the place to argue for the exception.
- The reduced-motion contract is now load-bearing for SEO and accessibility. The `[data-reveal]` fallback in `src/styles.css` must stay; if
  the `Reveal` component is ever renamed or its `data-reveal` attribute changes, that CSS rule has to follow.
- Pages that do not yet use `Reveal` (the legal pages, `/karriere`, `/kontakt`, …) are not broken — they simply render in their final state
  immediately, which is the same baseline as before this doc existed.
