import { eq, inArray } from 'drizzle-orm';
import { afterEach, describe, expect, it } from 'vitest';

import { vacations } from '../db/schema';
import { commandSetup, findLogsForSession, testDb } from '../test/commandTestUtils';
import { vacationCreate } from './vacationCreate';

const createdIds = new Set<string>();

afterEach(async () => {
    if (createdIds.size === 0) return;
    await testDb.delete(vacations).where(inArray(vacations.vacationId, [...createdIds]));
    createdIds.clear();
});

describe('vacationCreate', () => {
    it('inserts a row and returns it', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();

        // Act
        const result = await vacationCreate(
            { input: { startsOn: '2027-07-01', endsOn: '2027-07-14', note: 'Sommerurlaub' } },
            requestingSession,
            serverRuntime,
        );
        createdIds.add(result.vacationId);

        // Assert — return shape and persisted row.
        expect(result.startsOn).toBe('2027-07-01');
        expect(result.endsOn).toBe('2027-07-14');
        expect(result.note).toBe('Sommerurlaub');

        const rows = await testDb.select().from(vacations).where(eq(vacations.vacationId, result.vacationId));
        expect(rows).toHaveLength(1);
        expect(rows[0]!.note).toBe('Sommerurlaub');
    });

    it('persists null when the note is empty or whitespace', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();

        // Act — empty string and whitespace-only note both normalize to null.
        const empty = await vacationCreate(
            { input: { startsOn: '2027-08-01', endsOn: '2027-08-02', note: '' } },
            requestingSession,
            serverRuntime,
        );
        const whitespace = await vacationCreate(
            { input: { startsOn: '2027-09-01', endsOn: '2027-09-02', note: '   ' } },
            requestingSession,
            serverRuntime,
        );
        createdIds.add(empty.vacationId);
        createdIds.add(whitespace.vacationId);

        // Assert
        expect(empty.note).toBeNull();
        expect(whitespace.note).toBeNull();
    });

    it('rejects an inverted range (startsOn after endsOn)', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();

        // Act + Assert
        await expect(
            vacationCreate({ input: { startsOn: '2027-07-14', endsOn: '2027-07-01' } }, requestingSession, serverRuntime),
        ).rejects.toThrow(/startsOn must be on or before endsOn/);

        const logRows = await findLogsForSession(requestingSession.sessionId);
        expect(logRows).toHaveLength(1);
        expect(logRows[0]!.level).toBe('error');
    });

    it('rejects a window that overlaps an existing one', async () => {
        // Arrange — seed an existing period.
        const { serverRuntime, requestingSession } = await commandSetup();
        const existing = await vacationCreate(
            { input: { startsOn: '2028-03-10', endsOn: '2028-03-20' } },
            requestingSession,
            serverRuntime,
        );
        createdIds.add(existing.vacationId);

        // Act + Assert — every overlap kind gets the same rejection.
        await expect(
            // overlaps on the right
            vacationCreate({ input: { startsOn: '2028-03-15', endsOn: '2028-03-25' } }, requestingSession, serverRuntime),
        ).rejects.toThrow(/overlaps an existing scheduled period/);
        await expect(
            // fully contained
            vacationCreate({ input: { startsOn: '2028-03-12', endsOn: '2028-03-18' } }, requestingSession, serverRuntime),
        ).rejects.toThrow(/overlaps an existing scheduled period/);
        await expect(
            // fully containing
            vacationCreate({ input: { startsOn: '2028-03-01', endsOn: '2028-03-31' } }, requestingSession, serverRuntime),
        ).rejects.toThrow(/overlaps an existing scheduled period/);
        await expect(
            // touches on the boundary day (inclusive both ends)
            vacationCreate({ input: { startsOn: '2028-03-20', endsOn: '2028-03-25' } }, requestingSession, serverRuntime),
        ).rejects.toThrow(/overlaps an existing scheduled period/);
    });

    it('accepts a window directly adjacent to an existing one (no shared boundary day)', async () => {
        // Arrange
        const { serverRuntime, requestingSession } = await commandSetup();
        const first = await vacationCreate({ input: { startsOn: '2028-04-10', endsOn: '2028-04-20' } }, requestingSession, serverRuntime);
        createdIds.add(first.vacationId);

        // Act — start the next day after `endsOn`.
        const second = await vacationCreate({ input: { startsOn: '2028-04-21', endsOn: '2028-04-25' } }, requestingSession, serverRuntime);
        createdIds.add(second.vacationId);

        // Assert
        expect(second.startsOn).toBe('2028-04-21');
    });
});
