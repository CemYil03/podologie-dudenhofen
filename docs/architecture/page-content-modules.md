# Page content modules

## Context

Until mid-2026 every route file under `src/routes/{-$locale}/*.tsx` held its content (service cards, checklist items, FAQ rows, hygiene
pillars, step-by-step lists) inline as `const` arrays defined at the top of the component. The arrays were typed ad-hoc, every page
re-invented the shape, and — most importantly — nothing else in the codebase could see them. The site-search index in
`src/web/search/searchIndex.ts` could only carry section-level entries; searching for a leaf-level term that appeared inside one of those
inline arrays (e.g. `Pilzinfektionen`, `Nagelprothetik`, `Probetag`) returned no results.

The same problem would block any future tool that wants to read page content programmatically — a sitemap-of-anchors, JSON-LD structured
data, an LLM-fed knowledge base, or a print build.

## Decision

Extract leaf-level content from the route files into typed page-content modules under `src/web/content/`. One module per page that has leaf
gaps:

- `src/web/content/leistungenContent.ts`
- `src/web/content/karriereContent.ts`
- `src/web/content/indexContent.ts`
- `src/web/content/praxisContent.ts`

Each module exports one or more `ReadonlyArray<ContentLeaf>` constants named with the entity-action style (`LEISTUNGEN_CHECKLIST`,
`KARRIERE_VALUE_CARDS`, `PRAXIS_REPROCESSING_STEPS`). All modules share a single `ContentLeaf` type from `src/web/content/contentLeaf.ts`:

```ts
export type ContentLeaf = {
  id: string; // kebab-case, stable; DOM id + search sectionId
  icon?: LucideIcon;
  heading: LocaleString;
  body: LocaleString;
  keywords?: { de: ReadonlyArray<string>; en: ReadonlyArray<string> };
};
```

The route file imports the constants and `.map()`s over them — exactly as before, just from a different source. The rendered card carries
`id={leaf.id}`, `scroll-mt-20`, and the `search-target` class so URL fragments scroll to it and the on-arrival highlight fires (see
[features/site-search.md](../features/site-search.md)).

The search index in `src/web/search/searchIndex.ts` is now built by `searchIndexBuild()`, which concatenates the curated section-level
entries with one auto-derived entry per leaf. Adding a card to a page updates the search index automatically — no second edit.

## Alternatives considered

1. **Build-time JSX extraction** — parse the route files at build time, walk every `<section>` and inline `{ de, en }` object, emit a JSON
   index. Most automatic; brittle against any non-trivial JSX shape (state-driven tabs, JS-array `.map()` content, conditional rendering); a
   maintenance burden for marginal gain.
2. **Headless CMS / external content service** — overkill for a small marketing site, adds an external dependency and a network round-trip,
   moves content out of source control where it can no longer be reviewed alongside code.
3. **Keep content inline** — minimal churn, but every consumer (search, structured data, future audits) ends up with its own scraper or
   stays blind. Pays the cost forever.

## Consequences

- Routes are smaller and read more like layout — the data declarations move out of the component body.
- The search index is auto-derived from the same source the page renders, so leaf-level terms are searchable by default and adding a card is
  a one-file change.
- Any future tool that wants page content (sitemap-of-anchors, structured data, knowledge base) reads from the same modules.
- Cost: one more file to touch when adding a new card, but the route file already needs editing too if the rendering changes — and most card
  additions are now content-only.
- Type discipline: `ContentLeaf` keeps icons optional (some leaves are bullet text without an icon — e.g. karriere requirements) and
  keywords optional. Extending the shape (e.g. adding an `image` field for reprocessing steps) is done by intersection in the per-page
  module, not by widening the shared type.

## Conventions

- Module names: `{page}Content.ts` (entity-action — the page is the entity).
- Constant names: `{PAGE}_{GROUP}` in SCREAMING_SNAKE_CASE (`LEISTUNGEN_CHECKLIST`, `KARRIERE_OFFERINGS`).
- Leaf ids: kebab-case, language-neutral, derived from the German wording, prefixed with the group (`check-diabetes`,
  `service-haut-pilzbehandlung`, `step-probetag`). Ids are URL fragments and DOM ids — they are never visible to users, so they do not need
  translation.
- Keywords: include German and English variants, common typos and synonyms (e.g. `mykose` → `pilzbehandlung`, `salary` → `vergütung`). The
  haystack joiner is locale-bound, so each locale only sees its own keyword list.
