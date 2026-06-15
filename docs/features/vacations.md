# Vacations

Practice vacation periods, scheduled by the admin and surfaced as a banner at the very top of the public home page.

## User behaviour

**Admin** — `/admin/vacations` lists every scheduled period (past, active, future), with an inline form to add a new one and edit-in-place /
delete on each row. Each entry has:

- `startsOn` — first closed day, inclusive
- `endsOn` — last closed day, inclusive
- `note` — optional free-text in German (e.g. _"Notfälle: Praxis XY, Tel. …"_)

**Visitor** — when a vacation is "visible" (see below), a banner appears at the very top of the home page. The banner shows the dates, a
translated short body, and the German note when the visitor's locale is German. It is **not dismissible** — patients need this information.

### Visibility window

A vacation row becomes visible on the home page when:

```
endsOn   >= today
AND
startsOn <= today + VACATION_LEAD_DAYS
```

`VACATION_LEAD_DAYS` is `7` and lives in `src/web/practice.ts`. "Today" is resolved in the practice's local timezone (`Europe/Berlin`), not
the server's UTC clock — the banner switches over at local midnight regardless of where the server runs.

If two rows match (rare — back-to-back closures), the one with the soonest `startsOn` wins. The query at
`src/server/queries/vacationActiveFindOne.ts` limits to one row.

### Active vs upcoming copy

The banner switches headline based on whether `startsOn <= today`:

- **Active** — _"Wir sind im Urlaub."_ / _"The practice is closed for vacation."_
- **Upcoming** — _"Geplanter Urlaub."_ / _"Upcoming vacation."_

Both forms always state the date range. See `src/web/components/VacationBanner.tsx`.

## Validation

Two rules, enforced in both `vacationCreate` and `vacationUpdate`:

1. `startsOn <= endsOn`
2. The window does not overlap any other row. Inclusive on both ends, so two periods overlap iff
   `a.startsOn <= b.endsOn AND a.endsOn >= b.startsOn`. Adjacent windows (e.g. ending on the 20th and starting on the 21st) are allowed.

The check runs inside a transaction so two concurrent admin submits cannot race past validation. See
`src/server/commands/vacationOverlapAssert.ts`.

## Banner precedence

When both a vacation and a seasonal banner would show on the same day, the vacation banner wins and the seasonal banner is suppressed — two
banners side by side is visual noise, and the vacation message is operationally more important. The home page passes
`isSuppressed={Boolean(activeVacation)}` to `<SeasonalBanner />`.

The seasonal **animation** runs independently and is unaffected — Christmas snow keeps falling even during a vacation.

## Authorization

- `Query.activeVacation` — public. The banner is a public surface.
- `Admin.vacations` — gated by the existing `guardAdmin` (which throws today, pending OTP).
- `AdminMutation.vacationCreate` / `vacationUpdate` / `vacationDelete` — same parent guard via `guardAdminMutation`.

## Locale handling

The templated headline and body are translated for all four supported locales (de/en/ru/ar). The optional `note` is written in German by the
admin and rendered only for German visitors — machine-translating it inline would be worse than omitting it for non-German visitors.

Dates are formatted via `Intl.DateTimeFormat` with the visitor's locale mapped to its BCP-47 tag (e.g. `de-DE`, `en-GB`). The date columns
are stored as `YYYY-MM-DD` strings (Drizzle's `date` type) — they compare lexicographically as calendar dates and need no zone conversion.

## Files

- `src/server/db/schema.ts` — `vacations` table
- `src/server/graphql/schema.graphqls` — `Vacation`, `VacationInput`, `Query.activeVacation`, `Admin.vacations`,
  `AdminMutation.vacationCreate/Update/Delete`
- `src/server/commands/vacationCreate.ts` / `vacationUpdate.ts` / `vacationDelete.ts`
- `src/server/commands/vacationOverlapAssert.ts` — shared validation
- `src/server/queries/vacationActiveFindOne.ts` — public banner query
- `src/server/queries/vacationsFindAll.ts` — admin list query
- `src/server/mappers/toGqlVacation.ts`
- `src/routes/{-$locale}/admin/vacations.tsx` — admin manager UI
- `src/routes/{-$locale}/admin/VacationsAdminPage.graphql` — operations
- `src/web/components/VacationBanner.tsx` — public banner
- `src/web/practice.ts` — `VACATION_LEAD_DAYS` constant

## Out of scope (today)

- Surfacing vacations inside the chat assistant
- Email/SMS reminders to patients with appointments inside a closure
- A "next available appointment" indicator below the banner
