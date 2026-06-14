# Site search

## User Behavior

- An icon button labelled "Suchen" / "Search" lives in the header on every page, with a `⌘K` (macOS) or `Ctrl+K` (Windows/Linux) hint
- Pressing `⌘K` / `Ctrl+K` from anywhere on the site opens the same dialog
- The dialog shows a search input, an empty state, and the full list of indexed sections as a flat list. Each row has a small page-label
  chip on the right (Praxis / Leistungen / Kontakt …) so visitors still see which page a hit belongs to
- Typing filters and ranks the list in real time using a field-aware scorer (see "Ranking" below). Title and curated keyword hits beat
  description hits; literal hits beat fuzzy hits. The most relevant result lands at position #1
- ↑ / ↓ navigate the list, `Enter` selects, `Esc` closes
- Selecting a result navigates to the target page and scrolls to the section anchor — `/de/leistungen#service-haut-pilzbehandlung`-style
  URLs, with `scroll-mt-20` keeping the heading clear of the sticky header
- The matched leaf card is briefly **pulsed gold** on arrival (see "Highlighting the matched card" below) so the visitor sees exactly which
  card they navigated to
- Search is locale-bound: only entries for the current locale are searched. Switching the language re-runs the same query against the other
  locale's haystack

## Options Considered

1. **Build-time JSX extraction** — parse the route files at build time, walk every `<section>` and inline `{ de, en }` object, emit a JSON
   index. Most automatic; brittle against any non-trivial JSX shape (state-driven tabs, JS-array `.map()` content, conditional rendering); a
   maintenance burden for marginal gain
2. **Runtime DOM crawl** — on first dialog open, navigate or pre-fetch every page's HTML and extract headings/paragraphs. Wastes
   round-trips; gives no editorial control over titles/descriptions; locale handling needs separate fetches per language
3. **Curated, typed index** — one TypeScript file declares one entry per section. Authors edit the same file when they add a section.
   Compile-time type-checked
4. **External search service** (Algolia, Meilisearch, etc.) — overkill for ~50 entries on a static site; adds an external dependency, key
   handling and a network round-trip per query

## Option Chosen

**Curated, typed index** built on the shadcn `Command` primitive (cmdk).

Reasons:

- The site has eight content routes, all single-file with inline `{ de, en }` copy — the index mirrors that shape exactly
- Adding a section already means touching the route file; one matching index entry next to it is a smaller cost than maintaining a JSX
  parser
- Editorial control: authors can write a search-friendly title and description independently of the visible heading
- shadcn `Command` (cmdk) gives accessible focus-trap, scoring, ↑/↓/Enter/Esc, role="dialog" + role="combobox" wiring out of the box.
  `CommandDialog` wraps it in the existing Radix Dialog so the visual treatment matches the rest of the site

## Implementation Details

### The index

`src/web/search/searchIndex.ts` exports:

- `SearchEntry` — typed shape:
  ```ts
  type SearchEntry = {
    path: '/' | '/praxis' | '/leistungen' | '/kontakt' | '/qualifikation' | '/karriere' | '/datenschutz' | '/impressum';
    sectionId: string | null;
    title: { de: string; en: string };
    description: { de: string; en: string };
    keywords?: { de: ReadonlyArray<string>; en: ReadonlyArray<string> };
  };
  ```
- `SEARCH_INDEX` — the readonly array of entries, built by `searchIndexBuild()`
- `SEARCH_PAGE_LABELS` — page-level group headings used by the dialog
- `searchEntryHaystack(entry, locale)` — joins title + description + keywords into the lowercase string fed to cmdk's `value` prop

The index has two sources:

1. **Curated section-level entries** are listed inline in `searchIndex.ts` (`SEARCH_INDEX_SECTIONS`). They give editorial control over the
   title and description shown in the dialog — the wording can differ from the on-page heading.
2. **Auto-derived leaf-level entries** come from the page-content modules in `src/web/content/*Content.ts` (see
   [architecture/page-content-modules.md](../architecture/page-content-modules.md)). Every `ContentLeaf` becomes one search entry whose
   `sectionId` matches the leaf's DOM id, so selecting a result anchors directly to that card. Adding a card to a page updates the search
   index automatically — no second edit required.

If a curated section and a leaf collide on `${path}#${sectionId}`, the curated entry wins.

### The dialog

`src/web/components/SiteSearch.tsx`:

- Props: `{ open, onOpenChange }` — controlled from `SiteHeader`
- Built on `CommandDialog` from `src/web/components/base/command.tsx`
- Renders the entries as a single flat `CommandList` (no per-page `CommandGroup`). Each `CommandItem` carries a stable lowercase
  `${path}#${sectionId}` value, and a small page-label chip on the right shows which page the hit belongs to
- A custom `filter` prop is forwarded through `CommandDialog → Command` (via `commandProps`) and dispatches to
  `searchEntryScore(entry, query, locale)` from `src/web/search/searchScore.ts` — the dialog keeps a `Map<value, SearchEntry>` so the filter
  can look the entry up by the value cmdk passes in
- The flat-list layout is deliberate: cmdk 1.1.1 sorts items by descending score within a group but never reorders groups themselves by
  score (its group-reorder selector does not match how page-keyed groups are tagged here). Grouping by page would freeze the page order
  regardless of relevance, so the most-relevant entry would routinely sit below an irrelevant Praxis hit. Flat keeps the ordering honest
- The `CommandList` is snapped back to `scrollTop: 0` on every keystroke (via the input's `onValueChange`). cmdk reorders items by
  `appendChild`-ing each one and then calls `scrollIntoView({ block: 'nearest' })` on the auto-selected item — both nudge the scrollable
  list downward across keystrokes, hiding the top hits. Resetting the scroll keeps the highest-scoring result in view
- The input placeholder swaps to a shorter variant on viewports below `768px` (via `useIsMobile`) so it no longer overflows the dialog width
  on small screens
- `onSelect` closes the dialog and navigates with `useNavigate({ to: href, hash })`. The href is built locale-aware via:
  ```ts
  const base = locale === DEFAULT_LOCALE ? path : `/${locale}${path === '/' ? '' : path}`;
  const href = sectionId ? `${base}#${sectionId}` : base;
  ```

### Ranking

`src/web/search/searchScore.ts` exports `searchEntryScore(entry, query, locale): number`. It walks tiered checks against the entry's
locale-specific title, keywords and description and returns the **highest** weight that matches:

| Tier | Condition                                     | Weight |
| ---- | --------------------------------------------- | ------ |
| 1    | Title equals the query (case-insensitive)     | 1.00   |
| 2    | Any keyword equals the query                  | 0.95   |
| 3    | Title starts with the query                   | 0.90   |
| 4    | Any title word starts with the query          | 0.85   |
| 5    | Any keyword starts with the query             | 0.75   |
| 6    | Title contains the query as a substring       | 0.60   |
| 7    | Any keyword contains the query as a substring | 0.50   |
| 8    | Description contains the query as a substring | 0.30   |
| 9    | cmdk fuzzy fallback over the joined haystack  | ≤ 0.25 |
| —    | otherwise                                     | 0      |

cmdk treats any value > 0 as "include" and sorts items by descending score, so a literal title hit always lands above any keyword,
description, or fuzzy hit. The fuzzy fallback (`defaultFilter` re-exported from cmdk) preserves typo tolerance — `"anfart"` still surfaces
"Anfahrt" — but capped strictly below every literal tier. Ties between literal hits in the same tier are broken by registration order in
`SEARCH_INDEX`, which is why `searchIndexBuild()` lists the Leistungen service-group cards before the symptom-checklist cards: when a query
exact-matches a curated keyword on both, the actionable treatment card wins the tie.

`searchEntryHaystack(entry, locale)` (in `searchIndex.ts`) is still used — but only as the input to the fuzzy fallback. It no longer drives
the primary score.

### Trigger and shortcut

`src/web/hooks/useGlobalSearchShortcut.ts` — single hook that listens for `⌘K` / `Ctrl+K` on `window` and calls a callback.
`event.preventDefault()` keeps the browser's default focus-the-location-bar behavior from also firing.

`src/web/components/SiteHeader.tsx`:

- Holds the open state in `useState`
- Calls `useGlobalSearchShortcut(openSearch)` so the keyboard shortcut works from anywhere on the page
- Renders a header button with `SearchIcon`, a localized "Suchen" / "Search" label (visible at `md:` and up) and a `⌘K` `Kbd` hint
- Adds a "Suchen" entry at the top of the mobile `Sheet` nav so touch users have a visible affordance

### Section anchors

Every page section has a stable kebab-case `id` plus `scroll-mt-20` so anchor scrolls clear the sticky header. Legal pages use a shared
`Block` component that takes an `id` prop. Slugs are language-neutral and derive from German content (`raeume`, `oeffnungszeiten`,
`block-3-server-logs`) — they are URL-only identifiers and never visible to users.

Leaf-level cards (individual services, requirements, steps, FAQ rows, hygiene pillars, …) carry their own `id` taken from the corresponding
`ContentLeaf.id` plus the `search-target` utility class — see "Highlighting the matched card" below.

### Highlighting the matched card

`src/styles.css` and `src/web/hooks/useSearchTargetHighlight.ts` together drive both the persistent gold outline and the one-shot pulse on a
`.search-target` card the visitor reached via the dialog (or any URL whose fragment points at one). Both effects are hook-driven, not CSS
`:target`-driven. `:target` looks like a perfect fit but breaks twice:

1. Browsers do not re-evaluate `:target` on `pushState`-driven hash changes. Searching twice while staying on the same page leaves the ring
   glued to the previous match.
2. The animation fires the moment the hash flips, before smooth-scroll and the `<Reveal>` fade-in finish, so the pulse plays out invisibly
   on SPA navigation. (A hard reload happens to work — the browser jumps to the hash instantly with no smooth scroll and the card mounts
   already-visible.)

The hook owns two attributes:

- `data-search-target-current` — set on the matched element and cleared off the previous one whenever the hash changes. Drives the permanent
  `outline: 2px solid var(--color-brand-gold)`.
- `data-search-target-active` — set once the card has actually entered the viewport (an `IntersectionObserver` waits for smooth
  `hashScrollIntoView` and the `<Reveal>` fade-in), held for 1.5 s, then cleared. Drives the `search-target-pulse` keyframes. The hook
  force-restarts the keyframes (remove → reflow → re-add) when re-triggered on the same element.

When the hash effect runs the target may not be in the DOM yet — the visitor may have selected a result on another page, and the new route
component hasn't mounted at the moment `navigate()` flips the hash. The hook polls across `requestAnimationFrame` (~2 s budget) until the
element appears, then applies both attributes. Without this wait the initial highlight is silently dropped on cross-page hits.

`useSearchTargetHighlight` is mounted once in the locale layout (`src/routes/{-$locale}.tsx`) and watches `useLocation().hash`.
`SiteSearch.onSelect` also dispatches a `search-target-reveal` `CustomEvent` after `navigate()` so the pulse re-fires when the visitor
selects the same entry twice in a row (the hash is unchanged then, so the hash-effect alone would miss it).

`@media (prefers-reduced-motion: reduce)` drops the animation but keeps the outline. The selectors key on the class so curated section-level
anchors (e.g. `#kosten`) keep their plain anchor-scroll behaviour — only `search-target` elements pulse.

## How to Add a New Searchable Section

There are two ways to add a search hit, depending on how the content is shaped:

### A leaf card (preferred for services, requirements, FAQ rows, hygiene pillars, …)

1. Open the page's content module under `src/web/content/{page}Content.ts` (or create one — see
   [architecture/page-content-modules.md](../architecture/page-content-modules.md)).
2. Append a `ContentLeaf` entry: `{ id, icon?, heading, body, keywords? }`. Pick a stable kebab-case `id` derived from the German wording.
3. The page already `.map()`s over the array, so the card renders automatically. Make sure the rendered card carries `id={leaf.id}`,
   `scroll-mt-20` and the `search-target` class so the highlight fires.
4. The search index picks the entry up automatically. No second edit is needed.

### A curated section-level entry (for editorial control over the dialog text)

1. Add the section to its route file with a stable kebab-case `id` and `scroll-mt-20` class:
   ```tsx
   <section id="my-new-section" className="scroll-mt-20 …">
   ```
2. Append a `SearchEntry` to `SEARCH_INDEX_SECTIONS` in `src/web/search/searchIndex.ts`:
   - `path` — must be one of the typed paths
   - `sectionId` — must match the `id` you added
   - `title` and `description` — both languages, search-friendly (not necessarily identical to the on-page heading)
   - `keywords` — optional, but worth filling in for synonyms / common typos / German+English terms users might type interchangeably

## How to Add a New Page to the Index

1. Add the page's path to the `SearchEntryPath` union and `SEARCH_PAGE_LABELS` map in `src/web/search/searchIndex.ts`
2. Add curated section entries to `SEARCH_INDEX_SECTIONS`, and/or extend `searchIndexBuild()` with new content-module imports for that page

## Out of Scope

- Search analytics — not currently captured. If wanted later, hook into the existing logger from the dialog's `onSelect`
- The `/chat` route — already `noindex`; intentionally not in the index
- Fuzzy or typo-tolerant matching beyond what cmdk provides
