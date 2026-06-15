// Returns the "now" the seasonal resolvers should use. In production this
// is just `new Date()`; for local previews you can override it via URL
// query params:
//
//   /?seasonalDate=2027-12-25       → both banner and animation see Dec 25
//   /?seasonalDate=2027-12-31&seasonalHour=23  → Silvester fireworks
//
// `seasonalDate` is parsed as `YYYY-MM-DD` and resolved in the practice's
// local calendar. `seasonalHour` is optional and only matters for the
// time-of-day cutoffs (currently fireworks). Both are ignored on the
// server — this runs only in `useEffect`, so SSR is unaffected.
export function seasonalNow(): Date {
    if (typeof window === 'undefined') return new Date();

    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('seasonalDate');
    if (!dateParam) return new Date();

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateParam);
    if (!match) return new Date();

    const year = parseInt(match[1]!, 10);
    const month = parseInt(match[2]!, 10) - 1;
    const day = parseInt(match[3]!, 10);
    const hour = parseInt(params.get('seasonalHour') ?? '12', 10);

    return new Date(year, month, day, isFinite(hour) ? hour : 12);
}
