import { describe, expect, it } from 'vitest';
import type { ContentLeaf } from './contentLeaf';
import { INDEX_CREDENTIALS, INDEX_SERVICES, INDEX_SUGGESTED_QUESTIONS } from './indexContent';
import { KARRIERE_OFFERINGS, KARRIERE_REQUIREMENTS, KARRIERE_STEPS, KARRIERE_VALUE_CARDS } from './karriereContent';
import {
    LEISTUNGEN_BRING_LIST_KASSE,
    LEISTUNGEN_BRING_LIST_PRIVAT,
    LEISTUNGEN_CHECKLIST,
    LEISTUNGEN_SERVICE_GROUPS,
} from './leistungenContent';
import { PRAXIS_HYGIENE_PILLARS, PRAXIS_REPROCESSING_STEPS } from './praxisContent';

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

const ALL_LEAVES: Array<{ source: string; leaves: ReadonlyArray<ContentLeaf> }> = [
    { source: 'LEISTUNGEN_CHECKLIST', leaves: LEISTUNGEN_CHECKLIST },
    ...LEISTUNGEN_SERVICE_GROUPS.map((g) => ({ source: `LEISTUNGEN_SERVICE_GROUPS.${g.id}`, leaves: g.items })),
    { source: 'LEISTUNGEN_BRING_LIST_KASSE', leaves: LEISTUNGEN_BRING_LIST_KASSE },
    { source: 'LEISTUNGEN_BRING_LIST_PRIVAT', leaves: LEISTUNGEN_BRING_LIST_PRIVAT },
    { source: 'KARRIERE_VALUE_CARDS', leaves: KARRIERE_VALUE_CARDS },
    { source: 'KARRIERE_REQUIREMENTS', leaves: KARRIERE_REQUIREMENTS },
    { source: 'KARRIERE_OFFERINGS', leaves: KARRIERE_OFFERINGS },
    { source: 'KARRIERE_STEPS', leaves: KARRIERE_STEPS },
    { source: 'INDEX_SERVICES', leaves: INDEX_SERVICES },
    { source: 'INDEX_SUGGESTED_QUESTIONS', leaves: INDEX_SUGGESTED_QUESTIONS },
    { source: 'INDEX_CREDENTIALS', leaves: INDEX_CREDENTIALS },
    { source: 'PRAXIS_HYGIENE_PILLARS', leaves: PRAXIS_HYGIENE_PILLARS },
    { source: 'PRAXIS_REPROCESSING_STEPS', leaves: PRAXIS_REPROCESSING_STEPS },
];

describe('content module invariants', () => {
    it('every leaf id is non-empty kebab-case', () => {
        // Arrange — nothing
        const violations: string[] = [];

        // Act
        for (const { source, leaves } of ALL_LEAVES) {
            for (const leaf of leaves) {
                if (!KEBAB.test(leaf.id)) violations.push(`${source}: ${JSON.stringify(leaf.id)}`);
            }
        }

        // Assert
        expect(violations).toEqual([]);
    });

    it('every leaf id is unique across the whole site', () => {
        // Arrange — nothing
        // The same ContentLeaf object can legitimately appear in more than one
        // source array (e.g. LEISTUNGEN_BRING_LIST_SHARED is spread into both
        // the KASSE and PRIVAT lists, which render mutually exclusively). What
        // we forbid is two DIFFERENT objects sharing an id, which would point
        // the URL fragment at an ambiguous target.
        const idToLeaf = new Map<string, ContentLeaf>();
        const collisions: string[] = [];

        // Act
        for (const { source, leaves } of ALL_LEAVES) {
            for (const leaf of leaves) {
                const previous = idToLeaf.get(leaf.id);
                if (previous && previous !== leaf) collisions.push(`${leaf.id} (${source})`);
                else idToLeaf.set(leaf.id, leaf);
            }
        }

        // Assert
        expect(collisions).toEqual([]);
    });

    it('every leaf has non-empty headings and bodies in both locales', () => {
        // Arrange — nothing
        const violations: string[] = [];

        // Act
        for (const { source, leaves } of ALL_LEAVES) {
            for (const leaf of leaves) {
                for (const locale of ['de', 'en'] as const) {
                    if (!leaf.heading[locale].trim()) violations.push(`${source}/${leaf.id}: empty heading.${locale}`);
                    if (!leaf.body[locale].trim()) violations.push(`${source}/${leaf.id}: empty body.${locale}`);
                }
            }
        }

        // Assert
        expect(violations).toEqual([]);
    });
});
