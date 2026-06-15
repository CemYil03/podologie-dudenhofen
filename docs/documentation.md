# Documentation

Guide for the `docs/` directory — what to find where and what to put where.

## Structure

```text
docs/
├── documentation.md              # This file — docs directory guide
├── conventions.md                # How to work in this repo
├── infrastructure.md             # Deployment and CI
├── architecture/                 # Architectural decision records
│   ├── api-layer.md              # Type-safe client-server API (GraphQL, SSR data loading)
│   ├── authentication.md         # Session-based auth design
│   ├── authorization.md          # Guard-based access control
│   ├── chat.md                   # Chat foundation — polymorphic message model
│   ├── chat-persistence.md       # Chat persistence — DB schema and AI SDK replay
│   ├── dependency-injection.md   # Dependency injection container
│   ├── file-storage.md           # Generic file-upload store (Postgres bytea); consumers join by fileUploadId
│   ├── page-content-modules.md   # Typed leaf-card content extracted from route files; auto-derived search index
│   ├── seo.md                    # SEO standards — seoMeta() helper, dynamic sitemap.xml, robots.txt
│   ├── server-side-rendering.md  # Playwright-based UI capture for image/PDF exports
│   ├── site-structure.md         # Hub-and-spoke landing page; rules for where new content goes
│   ├── state-synchronization.md  # Client-server state sync via subscriptions
│   └── server-architecture.md    # Server-side domain logic structure (CQRS)
├── style/                        # Visual-design decisions (typography, color, theming, motion)
│   ├── colors.md                 # Brand palette — aubergine/cream/blush/sage/gold/charcoal + when-to-use rules
│   ├── motion.md                 # Motion system — durations, easings, the reveal pattern, reduced-motion contract
│   ├── patterns.md               # Reusable patterns — pill buttons, section eyebrow + rule, service cards, credential block
│   ├── typography.md             # Three-font system — Fraunces (display), Source Sans 3 (body), JetBrains Mono (labels)
│   └── themes.md                 # One theme, light — no dark mode, no toggle
├── features/                     # Implemented feature documentation
└── assets/                       # Diagrams, images, and other media
```

## What Goes Where

### `architecture/`

One file per architectural decision. Each document should cover:

- **Context** — what problem the decision addresses
- **Decision** — what was chosen and why
- **Alternatives considered** — what was rejected and why
- **Consequences** — trade-offs accepted

Add a new file when introducing a fundamentally new pattern, technology, or structural choice. These documents should remain stable over
time — they describe _why_ the system is shaped the way it is, not _how_ to use it day-to-day.

### `features/`

One file per user-facing feature, added once the feature is implemented. Each document should cover:

- **User behavior** — what the user sees and does
- **Options considered** — approaches evaluated with pros/cons
- **Option chosen** — the selected approach and rationale
- **Implementation** — key files and data flow for the concrete implementation

Features are different from architecture: architecture describes structural decisions that affect many features; features describe specific
end-to-end functionality built on top of that architecture.

### `style/`

Visual-design decisions: type, color, theming, motion, brand. Each document follows the same shape as `architecture/` (context, decision,
alternatives, consequences) but covers _how the site looks_ rather than how the system is structured. Add a file whenever a new design
constraint is introduced or an explicit non-decision needs to be recorded (e.g. "one theme only, light" — see
[style/themes.md](./style/themes.md)).

### `conventions.md`

Living document for working agreements: naming, file organization, tooling workflows, things not to touch. Update it whenever a new
convention is established.

### `infrastructure.md`

Deployment pipeline, CI configuration, environment setup. Update it when the deployment or CI process changes.

### `assets/`

Supporting media referenced from other docs (diagrams, screenshots). Name files to match the doc they support (e.g., `state-sync-flow.png`
for `architecture/state-synchronization.md`).
