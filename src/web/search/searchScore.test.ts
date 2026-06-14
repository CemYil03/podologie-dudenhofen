import { describe, expect, it } from 'vitest';
import { SEARCH_INDEX } from './searchIndex';
import { searchEntryScore } from './searchScore';

function rankAll(query: string, locale: 'de' | 'en' = 'de') {
    return SEARCH_INDEX.map((entry) => ({ entry, score: searchEntryScore(entry, query, locale) }))
        .filter((row) => row.score > 0)
        .sort((a, b) => b.score - a.score);
}

describe('searchEntryScore', () => {
    it('ranks the Pilzbehandlung treatment card first for "Pilzinfektionen"', () => {
        // Arrange
        const query = 'Pilzinfektionen';

        // Act
        const ranked = rankAll(query);

        // Assert — the actionable service card wins over the symptom checklist
        expect(ranked.length).toBeGreaterThan(0);
        expect(ranked[0]!.entry.sectionId).toBe('service-haut-pilzbehandlung');
    });

    it('ranks the Hühneraugen treatment card first for "Hühnerauge"', () => {
        // Arrange
        const query = 'Hühnerauge';

        // Act
        const ranked = rankAll(query);

        // Assert
        expect(ranked.length).toBeGreaterThan(0);
        expect(ranked[0]!.entry.sectionId).toBe('service-haut-huehneraugen');
    });

    it('ranks the Anfahrt section first for "Anfahrt"', () => {
        // Arrange
        const query = 'Anfahrt';

        // Act
        const ranked = rankAll(query);

        // Assert
        expect(ranked.length).toBeGreaterThan(0);
        expect(ranked[0]!.entry.path).toBe('/kontakt');
        expect(ranked[0]!.entry.sectionId).toBe('anfahrt');
    });

    it('still surfaces "Anfahrt" for a typo via fuzzy fallback', () => {
        // Arrange — transposed letter so we cannot hit any literal tier
        const query = 'anfart';

        // Act
        const ranked = rankAll(query);

        // Assert — fuzzy is allowed to match, but only below the literal ceiling
        const anfahrt = ranked.find((row) => row.entry.path === '/kontakt' && row.entry.sectionId === 'anfahrt');
        expect(anfahrt).toBeDefined();
        expect(anfahrt!.score).toBeLessThanOrEqual(0.25);
    });

    it('returns 0 for every entry on a clearly absent query', () => {
        // Arrange — gibberish that no haystack should fuzzy-match
        const query = 'zzz qqq nope alien';

        // Act
        const scores = SEARCH_INDEX.map((e) => searchEntryScore(e, query, 'de'));

        // Assert
        expect(scores.every((s) => s === 0)).toBe(true);
    });

    it('matches the English locale', () => {
        // Arrange
        const query = 'fungal';

        // Act
        const ranked = rankAll(query, 'en');

        // Assert — at least one Pilzbehandlung-shaped entry surfaces
        expect(ranked.length).toBeGreaterThan(0);
        const ids = ranked.map((row) => row.entry.sectionId);
        expect(ids).toContain('service-haut-pilzbehandlung');
    });

    it('puts a literal title hit ahead of a description-only hit', () => {
        // Arrange — "anfahrt" is the title of the Kontakt section and also lives
        // in the home-page Öffnungszeiten keywords list. The Kontakt section
        // (literal title) must outrank the Home keyword hit.
        const query = 'anfahrt';

        // Act
        const ranked = rankAll(query);

        // Assert
        expect(ranked[0]!.entry.path).toBe('/kontakt');
    });
});
