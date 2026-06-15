import { describe, expect, it } from 'vitest';
import { seasonalBannerResolve } from './seasonalBannerResolve';

// `new Date(year, monthZeroBased, day)` evaluates in the local timezone,
// which matches what the resolver consumes (it reads `getMonth()` /
// `getDate()`). Tests run on UTC machines and on a developer's machine and
// always agree, because the resolver never crosses a UTC boundary against
// a local timestamp constructed the same way.

describe('seasonalBannerResolve', () => {
    it('returns null in the deliberate gaps (e.g. mid-March, late October)', () => {
        expect(seasonalBannerResolve(new Date(2027, 2, 1))).toBeNull(); // March 1
        expect(seasonalBannerResolve(new Date(2027, 9, 25))).toBeNull(); // October 25
        expect(seasonalBannerResolve(new Date(2027, 10, 15))).toBeNull(); // November 15
    });

    it('returns Advent through most of December', () => {
        expect(seasonalBannerResolve(new Date(2027, 11, 1))).toBe('advent');
        expect(seasonalBannerResolve(new Date(2027, 11, 15))).toBe('advent');
        expect(seasonalBannerResolve(new Date(2027, 11, 23))).toBe('advent');
    });

    it('returns Weihnachten on Dec 24-30', () => {
        expect(seasonalBannerResolve(new Date(2027, 11, 24))).toBe('weihnachten');
        expect(seasonalBannerResolve(new Date(2027, 11, 26))).toBe('weihnachten');
        expect(seasonalBannerResolve(new Date(2027, 11, 30))).toBe('weihnachten');
    });

    it('returns Neujahr around the year boundary', () => {
        expect(seasonalBannerResolve(new Date(2027, 11, 31))).toBe('neujahr');
        expect(seasonalBannerResolve(new Date(2028, 0, 1))).toBe('neujahr');
        expect(seasonalBannerResolve(new Date(2028, 0, 6))).toBe('neujahr');
        // Out the other side
        expect(seasonalBannerResolve(new Date(2028, 0, 10))).toBeNull();
    });

    it('returns Ostern in a 10-day window around Ostersonntag', () => {
        // Easter 2027 = March 28. Window: March 25 – April 3.
        expect(seasonalBannerResolve(new Date(2027, 2, 25))).toBe('ostern');
        expect(seasonalBannerResolve(new Date(2027, 2, 28))).toBe('ostern');
        expect(seasonalBannerResolve(new Date(2027, 3, 3))).toBe('ostern');
        // Outside the window
        expect(seasonalBannerResolve(new Date(2027, 2, 24))).toBeNull();
        expect(seasonalBannerResolve(new Date(2027, 3, 4))).toBeNull();
    });

    it('returns Muttertag in the days leading up to and including the second Sunday of May', () => {
        // Muttertag 2027 = May 9 (second Sunday).
        expect(seasonalBannerResolve(new Date(2027, 4, 7))).toBe('muttertag');
        expect(seasonalBannerResolve(new Date(2027, 4, 9))).toBe('muttertag');
        expect(seasonalBannerResolve(new Date(2027, 4, 10))).toBe('muttertag');
        // Just outside
        expect(seasonalBannerResolve(new Date(2027, 4, 6))).toBeNull();
        expect(seasonalBannerResolve(new Date(2027, 4, 11))).toBeNull();
    });

    it('returns Sommer through summer break', () => {
        expect(seasonalBannerResolve(new Date(2027, 5, 15))).toBe('sommer');
        expect(seasonalBannerResolve(new Date(2027, 6, 1))).toBe('sommer');
        expect(seasonalBannerResolve(new Date(2027, 7, 15))).toBe('sommer');
        expect(seasonalBannerResolve(new Date(2027, 8, 10))).toBe('sommer');
        // Day after Sommer ends
        expect(seasonalBannerResolve(new Date(2027, 8, 11))).toBeNull();
    });

    it('returns Erntedank in the first week of October', () => {
        // Erntedank 2027 = October 3 (first Sunday).
        expect(seasonalBannerResolve(new Date(2027, 9, 3))).toBe('erntedank');
        expect(seasonalBannerResolve(new Date(2027, 9, 7))).toBe('erntedank');
        // Outside
        expect(seasonalBannerResolve(new Date(2027, 9, 2))).toBeNull();
        expect(seasonalBannerResolve(new Date(2027, 9, 8))).toBeNull();
    });

    it('Weihnachten beats Advent on Dec 24', () => {
        expect(seasonalBannerResolve(new Date(2027, 11, 24))).toBe('weihnachten');
    });
});
