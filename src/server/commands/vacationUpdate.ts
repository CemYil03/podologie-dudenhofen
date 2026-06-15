import { eq } from 'drizzle-orm';
import { vacations } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSAdminMutationVacationUpdateArgs, GqlSSession, GqlSVacation } from '../graphql/generated';
import { toGqlVacation } from '../mappers/toGqlVacation';
import { vacationOverlapAssert } from './vacationOverlapAssert';

export async function vacationUpdate(
    { vacationId, input }: GqlSAdminMutationVacationUpdateArgs,
    requestingSession: GqlSSession,
    serverRuntime: ServerRuntime,
): Promise<GqlSVacation> {
    // Phase 1 — Payload construction
    const note = input.note?.trim() ?? '';
    const update = {
        startsOn: input.startsOn,
        endsOn: input.endsOn,
        note: note.length > 0 ? note : null,
        updatedAt: new Date(),
    };

    // Phase 2 — Transactional execution
    try {
        const updated = await serverRuntime.db.transaction(async (transaction) => {
            await vacationOverlapAssert(transaction, update, vacationId);
            const [row] = await transaction.update(vacations).set(update).where(eq(vacations.vacationId, vacationId)).returning();
            if (!row) {
                throw new Error(`vacationUpdate: vacation ${vacationId} not found`);
            }
            return row;
        });

        return toGqlVacation(updated);
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
