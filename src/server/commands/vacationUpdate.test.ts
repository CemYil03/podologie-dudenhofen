import { eq, inArray } from 'drizzle-orm';
import { afterEach, describe, expect, it } from 'vitest';

import { vacations } from '../db/schema';
import { commandSetup, testDb } from '../test/commandTestUtils';
import { vacationCreate } from './vacationCreate';
import { vacationUpdate } from './vacationUpdate';

const createdIds = new Set<string>();

afterEach(async () => {
    if (createdIds.size === 0) return;
    await testDb.delete(vacations).where(inArray(vacations.vacationId, [...createdIds]));
    createdIds.clear();
});

describe('vacationUpdate', () => {
    it('updates an existing row', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();
        const existing = await vacationCreate(
            { input: { startsOn: '2029-05-01', endsOn: '2029-05-10', note: 'original' } },
            requestingSession,
            serverRuntime,
        );
        createdIds.add(existing.vacationId);

        // Act
        const updated = await vacationUpdate(
            { vacationId: existing.vacationId, input: { startsOn: '2029-05-02', endsOn: '2029-05-12', note: 'updated' } },
            requestingSession,
            serverRuntime,
        );

        // Assert
        expect(updated.startsOn).toBe('2029-05-02');
        expect(updated.endsOn).toBe('2029-05-12');
        expect(updated.note).toBe('updated');

        const rows = await testDb.select().from(vacations).where(eq(vacations.vacationId, existing.vacationId));
        expect(rows[0]!.note).toBe('updated');
    });

    it('does not consider the row in conflict with itself', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();
        const existing = await vacationCreate(
            { input: { startsOn: '2029-06-01', endsOn: '2029-06-10' } },
            requestingSession,
            serverRuntime,
        );
        createdIds.add(existing.vacationId);

        // Act — same window, different note. The overlap check excludes
        // `vacationId` itself, so this must succeed.
        const updated = await vacationUpdate(
            { vacationId: existing.vacationId, input: { startsOn: '2029-06-01', endsOn: '2029-06-10', note: 'extended' } },
            requestingSession,
            serverRuntime,
        );

        // Assert
        expect(updated.note).toBe('extended');
    });

    it('rejects an update that would overlap a different row', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();
        const a = await vacationCreate({ input: { startsOn: '2029-07-01', endsOn: '2029-07-10' } }, requestingSession, serverRuntime);
        const b = await vacationCreate({ input: { startsOn: '2029-07-20', endsOn: '2029-07-25' } }, requestingSession, serverRuntime);
        createdIds.add(a.vacationId);
        createdIds.add(b.vacationId);

        // Act + Assert — moving `b` over `a` is rejected.
        await expect(
            vacationUpdate(
                { vacationId: b.vacationId, input: { startsOn: '2029-07-05', endsOn: '2029-07-15' } },
                requestingSession,
                serverRuntime,
            ),
        ).rejects.toThrow(/overlaps an existing scheduled period/);
    });

    it('throws when the row does not exist', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();

        // Act + Assert
        await expect(
            vacationUpdate(
                { vacationId: crypto.randomUUID(), input: { startsOn: '2029-08-01', endsOn: '2029-08-05' } },
                requestingSession,
                serverRuntime,
            ),
        ).rejects.toThrow(/not found/);
    });
});
