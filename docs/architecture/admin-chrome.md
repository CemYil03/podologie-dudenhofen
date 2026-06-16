# Admin Chrome

The site has two distinct chrome flavours, picked by URL prefix at the locale-layout level:

| URL                                   | Header        | Footer       | Visitor chat surfaces |
| ------------------------------------- | ------------- | ------------ | --------------------- |
| `/`, `/praxis`, `/leistungen`, …      | `SiteHeader`  | `SiteFooter` | Mounted               |
| `/admin`, `/admin/chat`, `/admin/...` | `AdminHeader` | none         | Not mounted           |

The split lives in `src/routes/{-$locale}.tsx`: the layout matches `/(^|\/)admin(\/|$)/` against the current pathname and either renders the
public chrome (header + footer + `VisitorChatProvider`/launcher/sheet) or the admin chrome (header only).

## Why a separate admin header

The public `SiteHeader` carries five things — practice navigation, full-text site search, the call-the-practice button, the language
switcher, and a mobile drawer with the same. None of them belong in an authenticated staff workflow:

- The nav links target patient-facing topic pages — `/praxis`, `/leistungen`, etc. — that an admin is never trying to reach mid-task.
- Site search indexes those same pages; from inside `/admin/visitor-chats` it produces no useful results.
- The call button and language switcher are visitor affordances — the admin is the practice.

`AdminHeader` (`src/web/components/AdminHeader.tsx`) is intentionally minimal: the practice name (linking back to `/admin`) on the start
edge, a localized "Administration" eyebrow on the end edge. No nav, no search, no call button, no mobile drawer.

## Why no footer and no visitor chat under `/admin/*`

- The public `SiteFooter` exists to surface contact details, opening hours, legal links, and locale switching to a visitor who scrolled past
  the page content. None of it applies to a staff page.
- The visitor-chat launcher is a public conversion affordance — a floating action button that opens an AI assistant aimed at prospective
  patients. Inside `/admin/*` it would compete with the admin's own chat surface (`/admin/chat`) and clutter staff workflows. The launcher
  used to bail on `/admin/*` itself; not mounting `VisitorChatProvider` at all is a stronger version of the same rule and avoids paying for
  the provider's state on every admin page.

## Adding a new admin surface

Drop the route under `src/routes/{-$locale}/admin/`. The path-prefix match in `LocaleLayout` picks it up automatically — there is no opt-in.
The page itself only needs its own `<main>`; the admin header is supplied by the layout.

If a future admin page needs sub-navigation (more than the three current top-level surfaces — `chat`, `visitor-chats`, `vacations` — can fit
on the index card grid), revisit this doc: `AdminHeader` is the place to add it, not a fork of `SiteHeader`.
