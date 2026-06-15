import { describe, it, expect } from 'vitest';
import { eq } from 'drizzle-orm';

import { sessionUpsert } from './sessionUpsert';
import { testDb, testLogger } from '../test/commandTestUtils';
import { sessions } from '../db/schema';

describe('sessionUpsert', () => {
    it('creates a new session when no existing session ID is provided', async () => {
        // Act
        const result = await sessionUpsert(testDb, testLogger, null, 'TestAgent', null);

        // Assert
        expect(result.sessionId).toBeDefined();
        expect(typeof result.sessionId).toBe('string');

        const [row] = await testDb.select().from(sessions).where(eq(sessions.sessionId, result.sessionId));
        expect(row).toBeDefined();
        expect(row!.userAgent).toBe('TestAgent');
    });

    it('creates a new session when session ID does not exist in DB', async () => {
        // Arrange
        const unknownId = crypto.randomUUID();

        // Act
        const result = await sessionUpsert(testDb, testLogger, unknownId, 'TestAgent', null);

        // Assert
        expect(result.sessionId).not.toBe(unknownId);

        const [row] = await testDb.select().from(sessions).where(eq(sessions.sessionId, result.sessionId));
        expect(row).toBeDefined();
        expect(row!.userAgent).toBe('TestAgent');
    });

    it('creates a new session when the existing session was terminated', async () => {
        // Arrange
        const [terminated] = await testDb
            .insert(sessions)
            .values({
                sessionId: crypto.randomUUID(),
                userAgent: 'OldAgent',
                wasTerminatedAt: new Date(),
            })
            .returning();

        // Act
        const result = await sessionUpsert(testDb, testLogger, terminated!.sessionId, 'TestAgent', null);

        // Assert
        expect(result.sessionId).not.toBe(terminated!.sessionId);

        const [row] = await testDb.select().from(sessions).where(eq(sessions.sessionId, result.sessionId));
        expect(row).toBeDefined();
        expect(row!.userAgent).toBe('TestAgent');
    });

    it('updates an existing non-terminated session', async () => {
        // Arrange
        const past = new Date('2020-01-01');
        const [existing] = await testDb
            .insert(sessions)
            .values({
                sessionId: crypto.randomUUID(),
                userAgent: 'OldAgent',
                lastInteractionAt: past,
            })
            .returning();

        // Act
        const result = await sessionUpsert(testDb, testLogger, existing!.sessionId, 'NewAgent', null);

        // Assert
        expect(result.sessionId).toBe(existing!.sessionId);

        const [row] = await testDb.select().from(sessions).where(eq(sessions.sessionId, existing!.sessionId));
        expect(row!.userAgent).toBe('NewAgent');
        expect(row!.lastInteractionAt.getTime()).toBeGreaterThan(past.getTime());
    });

    it('handles null userAgent', async () => {
        // Act
        const result = await sessionUpsert(testDb, testLogger, null, null, null);

        // Assert
        expect(result.sessionId).toBeDefined();

        const [row] = await testDb.select().from(sessions).where(eq(sessions.sessionId, result.sessionId));
        expect(row!.userAgent).toBeNull();
    });

    it('hashes a provided client IP into ipHash, deterministically', async () => {
        // Act — same IP twice should produce the same hash (salted with the
        // test env's VISITOR_IP_HASH_SALT) and that hash is not the raw IP.
        const first = await sessionUpsert(testDb, testLogger, null, null, '203.0.113.7');
        const second = await sessionUpsert(testDb, testLogger, null, null, '203.0.113.7');

        const [firstRow] = await testDb.select().from(sessions).where(eq(sessions.sessionId, first.sessionId));
        const [secondRow] = await testDb.select().from(sessions).where(eq(sessions.sessionId, second.sessionId));

        expect(firstRow!.ipHash).toBeDefined();
        expect(firstRow!.ipHash).not.toBe('203.0.113.7');
        expect(firstRow!.ipHash).toBe(secondRow!.ipHash);
    });

    it('leaves ipHash null when no client IP is provided', async () => {
        const result = await sessionUpsert(testDb, testLogger, null, null, null);

        const [row] = await testDb.select().from(sessions).where(eq(sessions.sessionId, result.sessionId));
        expect(row!.ipHash).toBeNull();
    });
});
