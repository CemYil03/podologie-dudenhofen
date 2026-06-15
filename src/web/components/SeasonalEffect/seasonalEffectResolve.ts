// Date-driven seasonal animation kind. Pure function — see
// `seasonalEffectResolve`. Calendar windows are tuned per-season to fit
// the practice's local weather and culture; see
// `docs/features/seasonal-effects.md`.

export type SeasonalEffectKind = 'snow' | 'petals' | 'leaves' | 'fireworks' | 'confetti';

export function seasonalEffectResolve(now: Date): SeasonalEffectKind | null {
    const monthDay = (now.getMonth() + 1) * 100 + now.getDate();

    // Fireworks — Silvester through the wee hours of New Year's Day. Tight
    // window so it lands as a moment, not a vibe.
    if (monthDay === 1231 && now.getHours() >= 22) return 'fireworks';
    if (monthDay === 101 && now.getHours() < 3) return 'fireworks';

    // Fasching — checked before snow because the two windows overlap in
    // late January / early February and the regional Pfälzer signal beats
    // the generic winter one.
    if (isFaschingWeek(now)) return 'confetti';

    // Snow — Dec 1 through Feb 28. Skips March even though some Pfalz
    // winters drag on; March snow on the website would feel out of step
    // when the user's actual window shows tulips.
    if (monthDay >= 1201 || monthDay <= 228) return 'snow';

    // Petals — mid-March through end of May. Pfalz is fruit-tree country.
    if (monthDay >= 315 && monthDay <= 531) return 'petals';

    // Leaves — Sep 20 through Nov 15.
    if (monthDay >= 920 && monthDay <= 1115) return 'leaves';

    return null;
}

function isFaschingWeek(now: Date): boolean {
    const easter = easterDateUtc(now.getFullYear());
    const aschermittwoch = addDaysUtc(easter, -46);
    const fastnacht = addDaysUtc(aschermittwoch, -1);
    const weiberfastnacht = addDaysUtc(fastnacht, -5);
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return today >= dayUtc(weiberfastnacht) && today <= dayUtc(fastnacht);
}

function dayUtc(d: Date): number {
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function addDaysUtc(d: Date, days: number): Date {
    const next = new Date(d);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}

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
