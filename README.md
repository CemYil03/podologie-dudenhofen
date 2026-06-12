# Podologie Dudenhofen

Marketing and patient-information website for **Podologie Dudenhofen**, a private medical-foot-care (Podologie) practice in
Speyer-Dudenhofen, Germany. Replaces the legacy Jimdo site at <https://podologie-dudenhofen.jimdoweb.com/> and is published at
<https://podologie-dudenhofen.de>.

The site is bilingual (**Deutsch** / **English**) and is built on a TanStack Start full-stack template so that public marketing pages and
later-stage interactive features (an AI assistant on the landing page, an appointment-request flow, etc.) live in a single codebase.

**Stack:** TanStack Start + React 19 · Apollo Server v5 + URQL (SDL-first GraphQL) · Drizzle ORM + PostgreSQL · graphql-sse + PG
NOTIFY/LISTEN · pg-boss · Vercel AI SDK · Tailwind 4 + shadcn/Radix · Vitest + Playwright · Storybook · Docker via Coolify.

> **For Claude / coding agents:** the project's working agreement is in [`AGENTS.md`](./AGENTS.md) and [`CLAUDE.md`](./CLAUDE.md). The full
> architecture lives under [`docs/`](./docs/). The active product brief and roadmap is [`docs/project.md`](./docs/project.md). **Read the
> docs before writing code; update the docs after.**

---

## Quick Start

```bash
# 1. Install (npm only — yarn / pnpm are blocked by package.json#engines)
npm install

# 2. Provision environment variables — see "Environment files" below
cp .env.local.example .env.local   # dev / drizzle / vite — edit, then fill secrets
cp .env.test.example  .env.test    # integration-test DB — point at a separate DB

# 3. Set up the database
npm run db:push              # quick dev: pushes schema directly
# or: npm run db:migrate     # apply committed migrations

# 4. Run the dev server
npm run dev                  # http://localhost:3000

# 5. Before pushing — run the full quality gate
npm run check                # format + lint + spell + types + knip + commitlint
npm test                     # vitest
```

---

## Environment files

The repo ships **two committed example files**; copy each to its real (gitignored) sibling on first setup. Validation rules and the full
table of variables live in [`docs/architecture/environment.md`](./docs/architecture/environment.md) and
[`docs/infrastructure.md`](./docs/infrastructure.md) — this section only covers _which file holds what_.

| Committed example    | Copy to      | Loaded by                                                                                      | Holds                                                                                                                      |
| -------------------- | ------------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `.env.local.example` | `.env.local` | Vite (`npm run dev`/`build`) and `drizzle.config.ts` (`db:push`/`migrate`/`generate`/`studio`) | All boot-required vars (`DATABASE_URL`, `sessionCookieName`, `WEB_PAGE_URL`) plus the capability and optional vars you use |
| `.env.test.example`  | `.env.test`  | `src/server/test/commandTestUtils.ts` (integration tests via dotenv)                           | Just `DATABASE_URL` for a **separate** test database that the test suite is free to truncate                               |

Notes:

- **Unit tests do not load any `.env` file** — they pass an explicit source object to `environmentVariablesCreate()`. See
  [`docs/architecture/environment.md`](./docs/architecture/environment.md).
- **Capability vars are intentionally optional in `EnvironmentVariables`** but become required when their feature runs:
  `GOOGLE_GENERATIVE_AI_API_KEY` (chat assistant) and `SERVER_TOKEN_SECRET` (server-side rendering, e.g. OG-image generation). If you delete
  the corresponding feature, drop the var from your `.env.local` and from the example file.
- **Production / preview** values are configured in Coolify, not in any `.env*` file. The example files exist for local dev only.

---

## What the site is

Podologie Dudenhofen is a small medical-foot-care practice. The site's primary jobs are:

1. **Be findable** — replace the Jimdo site at the same domain authority and rank for local "Podologie Dudenhofen / Speyer / Schifferstadt"
   queries.
2. **Tell visitors what they can book** — services (medizinische Fußpflege, Nagelkorrektur-Spangen, diabetisches Fußsyndrom, Hausbesuche,
   …), prices/insurance handling, opening hours, location, accessibility.
3. **Make contact friction-free** — phone, email, address, map, and a contact / appointment-request form. Eventually an AI assistant on the
   landing page that can answer common questions ("Übernimmt die Krankenkasse das?", "Macht ihr Hausbesuche?") and route into the contact
   flow.
4. **Be bilingual** — German is the default; English is offered for English-speaking residents and tourists in the Rhein-Neckar region.

The full product brief — audience, content inventory, design direction, feature roadmap, and open questions — lives in
[`docs/project.md`](./docs/project.md). **Read it before adding pages or features.**

---

## Internationalization

The site ships with both locales served from a single route tree:

- `/` → German (default)
- `/en/...` → English
- A `locale` cookie remembers the visitor's choice; first-time visitors are auto-detected from `Accept-Language`
- Every public page must add a `head:` block via `seoMeta()` so canonical + `hreflang` alternates are emitted automatically

The full rules and copy-paste templates are in [`docs/architecture/i18n.md`](./docs/architecture/i18n.md) and
[`docs/architecture/seo.md`](./docs/architecture/seo.md).

When adding user-visible copy, write the German text first (it is the canonical voice of the practice); add the English translation in the
same change. Inline `{ de: '…', en: '…' }[locale]` is the project's translation pattern — there is no separate message catalog.

---

## Documentation Map

| Read first                                           | When                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------- |
| [`docs/project.md`](./docs/project.md)               | Always. The product brief and roadmap for Podologie Dudenhofen.        |
| [`docs/conventions.md`](./docs/conventions.md)       | Always. Naming, two-phase commands, generated files, testing patterns. |
| [`docs/documentation.md`](./docs/documentation.md)   | Before adding a doc — so you put it in the right place.                |
| [`docs/infrastructure.md`](./docs/infrastructure.md) | Touching deploy, CI, Dockerfile, env vars.                             |
| `docs/architecture/*.md`                             | Working in that area (api-layer, jobs, chat, auth, file-storage, …).   |
| `docs/features/*.md`                                 | Working on a shipped feature (chat, logging, navigation-progress).     |

---

## Common Commands

```bash
npm run dev                  # vite dev server, port 3000
npm run build                # vite + nitro production build into .output/
npm test                     # vitest (run --project=server or --project=web for one)
npm run check                # full quality gate — must pass before push
npm run db:generate          # drizzle-kit migration from schema.ts
npm run db:migrate           # apply committed migrations
npm run db:push              # push schema directly (dev only)
npm run db:studio            # drizzle studio
npm run graphql:generate     # regenerate GqlS*/GqlC* types from schema.graphqls
npm run storybook            # storybook dev, port 6006
```

---

## Deployment

- **Production**: <https://podologie-dudenhofen.de>, deployed via Coolify from the `main` branch.
- **CI/CD**: `.github/workflows/pipeline.yml` runs gates and, on green pushes to `main`, builds and ships a Docker image from GHCR.
- See [`docs/infrastructure.md`](./docs/infrastructure.md) for the full topology, secrets list, and migration handling.

The DNS cutover from the Jimdo site to this build is tracked in [`docs/project.md`](./docs/project.md) under "Launch checklist".

---

## License

Proprietary — all rights reserved by the practice owner. No `LICENSE` file is shipped intentionally; do not redistribute the codebase
without written permission.
