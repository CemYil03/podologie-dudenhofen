import { describe, expect, it } from 'vitest';
import { SEARCH_INDEX, searchEntryHaystack } from './searchIndex';

describe('SEARCH_INDEX', () => {
    it('contains a leaf entry for the Pilzbehandlung service card', () => {
        // Arrange — nothing

        // Act
        const entry = SEARCH_INDEX.find((e) => e.path === '/leistungen' && e.sectionId === 'service-haut-pilzbehandlung');

        // Assert
        expect(entry).toBeDefined();
        expect(entry?.title.de).toContain('Pilz');
    });

    it('matches "Pilzinfektionen" through a leaf haystack', () => {
        // Arrange
        const query = 'pilzinfektionen';

        // Act
        const matches = SEARCH_INDEX.filter((e) => searchEntryHaystack(e, 'de').includes(query));

        // Assert — the treatment card carries the symptom keyword so the user lands on the right place
        const ids = matches.map((m) => m.sectionId);
        expect(ids).toContain('service-haut-pilzbehandlung');
    });

    it('matches "mykose" via the synonym keyword', () => {
        // Arrange
        const query = 'mykose';

        // Act
        const matches = SEARCH_INDEX.filter((e) => searchEntryHaystack(e, 'de').includes(query));

        // Assert
        expect(matches.map((m) => m.sectionId)).toContain('service-haut-pilzbehandlung');
    });

    it('matches "Probetag" on the Karriere page', () => {
        // Arrange
        const query = 'probetag';

        // Act
        const ids = SEARCH_INDEX.filter((e) => e.path === '/karriere' && searchEntryHaystack(e, 'de').includes(query)).map(
            (e) => e.sectionId,
        );

        // Assert
        expect(ids).toContain('step-probetag');
    });

    it('matches "Autoklav" on the Praxis page', () => {
        // Arrange
        const query = 'autoklav';

        // Act
        const ids = SEARCH_INDEX.filter((e) => e.path === '/praxis' && searchEntryHaystack(e, 'de').includes(query)).map(
            (e) => e.sectionId,
        );

        // Assert
        expect(ids).toContain('aufbereitung-autoklav');
    });

    it('matches the English synonym "fungal" on the Pilzbehandlung leaf', () => {
        // Arrange
        const query = 'fungal';

        // Act
        const match = SEARCH_INDEX.find((e) => e.sectionId === 'service-haut-pilzbehandlung');

        // Assert
        expect(match).toBeDefined();
        expect(searchEntryHaystack(match!, 'en')).toContain(query);
    });

    it('has unique path#sectionId composite keys', () => {
        // Arrange — nothing

        // Act
        const keys = SEARCH_INDEX.map((e) => `${e.path}#${e.sectionId ?? ''}`);
        const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);

        // Assert
        expect(duplicates).toEqual([]);
    });
});
