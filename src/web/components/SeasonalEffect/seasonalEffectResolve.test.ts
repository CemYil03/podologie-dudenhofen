import { describe, expect, it } from 'vitest';
import { seasonalEffectResolve } from './seasonalEffectResolve';

// `new Date(year, month, day, hour)` evaluates locally; the resolver also
// reads local fields, so the tests behave the same on any machine.

describe('seasonalEffectResolve', () => {
    it('returns null in mid-summer and the deliberate gaps', () => {
        expect(seasonalEffectResolve(new Date(2027, 6, 15))).toBeNull(); // mid-July
        expect(seasonalEffectResolve(new Date(2027, 8, 5))).toBeNull(); // early September
        expect(seasonalEffectResolve(new Date(2027, 10, 20))).toBeNull(); // late November
    });

    it('returns snow Dec 1 – Feb 28', () => {
        expect(seasonalEffectResolve(new Date(2027, 11, 1))).toBe('snow'); // Dec 1
        expect(seasonalEffectResolve(new Date(2028, 0, 15))).toBe('snow'); // Jan 15
        // Easter 2027 = March 28 → Fasching ends Feb 9, 2027, so Feb 28
        // 2027 is unambiguously snow.
        expect(seasonalEffectResolve(new Date(2027, 1, 28))).toBe('snow'); // Feb 28
        // March 1, 2027 is past the snow window and outside the Ostern lead-up
        // for petals (which starts March 15) — it's a deliberate gap day.
        expect(seasonalEffectResolve(new Date(2027, 2, 1))).toBeNull();
    });

    it('returns fireworks in the Silvester window only', () => {
        // Dec 31 22:00 → fireworks
        expect(seasonalEffectResolve(new Date(2027, 11, 31, 22, 0))).toBe('fireworks');
        // Dec 31 23:30 → fireworks
        expect(seasonalEffectResolve(new Date(2027, 11, 31, 23, 30))).toBe('fireworks');
        // Jan 1 02:00 → fireworks
        expect(seasonalEffectResolve(new Date(2028, 0, 1, 2, 0))).toBe('fireworks');
        // Jan 1 03:00 → snow takes over
        expect(seasonalEffectResolve(new Date(2028, 0, 1, 3, 0))).toBe('snow');
        // Dec 31 21:00 → still snow
        expect(seasonalEffectResolve(new Date(2027, 11, 31, 21, 0))).toBe('snow');
    });

    it('returns petals through spring', () => {
        expect(seasonalEffectResolve(new Date(2027, 2, 15))).toBe('petals');
        expect(seasonalEffectResolve(new Date(2027, 3, 15))).toBe('petals');
        expect(seasonalEffectResolve(new Date(2027, 4, 31))).toBe('petals');
        expect(seasonalEffectResolve(new Date(2027, 5, 1))).toBeNull();
    });

    it('returns leaves through autumn', () => {
        expect(seasonalEffectResolve(new Date(2027, 8, 20))).toBe('leaves');
        expect(seasonalEffectResolve(new Date(2027, 9, 31))).toBe('leaves');
        expect(seasonalEffectResolve(new Date(2027, 10, 15))).toBe('leaves');
        expect(seasonalEffectResolve(new Date(2027, 10, 16))).toBeNull();
    });

    it('returns confetti during Fasching week (Easter 2027 = March 28 → Weiberfastnacht Feb 4 → Faschingsdienstag Feb 9)', () => {
        expect(seasonalEffectResolve(new Date(2027, 1, 4))).toBe('confetti');
        expect(seasonalEffectResolve(new Date(2027, 1, 9))).toBe('confetti');
        // Aschermittwoch = Feb 10 → no longer confetti, snow window
        expect(seasonalEffectResolve(new Date(2027, 1, 10))).toBe('snow');
    });
});
