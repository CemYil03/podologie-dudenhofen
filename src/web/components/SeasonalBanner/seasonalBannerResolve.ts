import type { SeasonalBannerKind } from './seasonalContent';

// Maps a `Date` (the user's "now") to the seasonal banner kind that should
// show, or `null` if no banner applies. Pure — every test case fakes a date
// and asserts the result.
//
// Conventions:
//
// - Calendar windows are [start, end] inclusive on both days, evaluated in
//   the practice's local time. We work in JS month/day fields directly (no
//   external date library) — the comparisons are simple and a month/day
//   tuple is locale-agnostic.
// - When two windows overlap, the more specific one wins (e.g. Weihnachten
//   eats Advent on Dec 24-26). Order in `WINDOWS` encodes priority.
// - Easter is moveable; `easterDateUtc` computes it via the Anonymous
//   Gregorian algorithm. Muttertag (2nd Sunday of May) is computed inline.
//
// See `docs/features/seasonal-effects.md` for the rationale behind the set
// of seasons we mark and the ones we deliberately skip.

export function seasonalBannerResolve(now: Date): SeasonalBannerKind | null {
    const year = now.getFullYear();
    const monthDay = monthDayValue(now);

    // Christmas + Neujahr cluster — wraps the year boundary, so we resolve
    // the calendar fields directly rather than try to express it as a single
    // window.
    if (between(monthDay, [12, 24], [12, 30])) return 'weihnachten';
    if (monthDay >= mdValue(12, 31) || monthDay <= mdValue(1, 6)) return 'neujahr';
    if (between(monthDay, [12, 1], [12, 23])) return 'advent';

    // Ostern — a 10-day window centred on Ostersonntag.
    const easter = easterDateUtc(year);
    const easterStart = addDaysUtc(easter, -3);
    const easterEnd = addDaysUtc(easter, 6);
    if (isBetweenDates(now, easterStart, easterEnd)) return 'ostern';

    // Muttertag — second Sunday of May, the calendar week leading up to it.
    const muttertag = secondSundayOfMay(year);
    const muttertagStart = addDaysUtc(muttertag, -2);
    const muttertagEnd = addDaysUtc(muttertag, 1);
    if (isBetweenDates(now, muttertagStart, muttertagEnd)) return 'muttertag';

    // Sommer — the deliberate "summer has no animation, give it a banner"
    // window. June 15 → September 10 covers school holidays in Rhineland-
    // Palatinate without overreaching.
    if (between(monthDay, [6, 15], [9, 10])) return 'sommer';

    // Erntedank — first Sunday of October, plus a 4-day tail.
    const erntedank = firstSundayOfOctober(year);
    const erntedankEnd = addDaysUtc(erntedank, 4);
    if (isBetweenDates(now, erntedank, erntedankEnd)) return 'erntedank';

    return null;
}

function mdValue(month: number, day: number): number {
    return month * 100 + day;
}

function monthDayValue(d: Date): number {
    return mdValue(d.getMonth() + 1, d.getDate());
}

function between(value: number, start: [number, number], end: [number, number]): boolean {
    return value >= mdValue(...start) && value <= mdValue(...end);
}

function isBetweenDates(now: Date, startInclusive: Date, endInclusive: Date): boolean {
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const start = Date.UTC(startInclusive.getUTCFullYear(), startInclusive.getUTCMonth(), startInclusive.getUTCDate());
    const end = Date.UTC(endInclusive.getUTCFullYear(), endInclusive.getUTCMonth(), endInclusive.getUTCDate());
    return today >= start && today <= end;
}

function addDaysUtc(d: Date, days: number): Date {
    const next = new Date(d);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}

// Anonymous Gregorian algorithm — returns Easter Sunday in UTC for the
// given Gregorian year. Used for the Ostern banner window.
function easterDateUtc(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(year, month - 1, day));
}

function secondSundayOfMay(year: number): Date {
    return nthWeekdayOfMonth(year, 4, 0, 2); // May, Sunday, 2nd
}

function firstSundayOfOctober(year: number): Date {
    return nthWeekdayOfMonth(year, 9, 0, 1); // October, Sunday, 1st
}

// `monthZeroBased` matches `Date.getMonth()`. `weekday`: 0=Sun..6=Sat.
function nthWeekdayOfMonth(year: number, monthZeroBased: number, weekday: number, n: number): Date {
    const firstOfMonth = new Date(Date.UTC(year, monthZeroBased, 1));
    const offset = (7 + weekday - firstOfMonth.getUTCDay()) % 7;
    const day = 1 + offset + (n - 1) * 7;
    return new Date(Date.UTC(year, monthZeroBased, day));
}
