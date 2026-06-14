import { describe, expect, it } from 'vitest';
import { searchEntryPathname } from './searchEntryPathname';

describe('searchEntryPathname', () => {
    it('returns the bare path for the default locale', () => {
        // Arrange — nothing

        // Act
        const result = searchEntryPathname('/leistungen', 'de');

        // Assert
        expect(result).toBe('/leistungen');
    });

    it('prefixes the locale segment for non-default locales', () => {
        // Arrange — nothing

        // Act
        const result = searchEntryPathname('/leistungen', 'en');

        // Assert
        expect(result).toBe('/en/leistungen');
    });

    it('returns "/" for the home path on the default locale', () => {
        // Arrange — nothing

        // Act
        const result = searchEntryPathname('/', 'de');

        // Assert
        expect(result).toBe('/');
    });

    it('returns "/<locale>" for the home path on non-default locales (no trailing slash)', () => {
        // Arrange — nothing

        // Act
        const result = searchEntryPathname('/', 'en');

        // Assert
        expect(result).toBe('/en');
    });

    it('does not embed a hash fragment in the returned path', () => {
        // Arrange — nothing

        // Act
        const result = searchEntryPathname('/leistungen', 'de');

        // Assert — hash plumbing is the caller's job
        expect(result).not.toContain('#');
    });
});
