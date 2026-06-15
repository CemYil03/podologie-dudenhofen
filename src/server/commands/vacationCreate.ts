import { vacations } from '../db/schema';
import type { VacationCreate } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSAdminMutationVacationCreateArgs, GqlSSession, GqlSVacation } from '../graphql/generated';
import { toGqlVacation } from '../mappers/toGqlVacation';
import { vacationOverlapAssert } from './vacationOverlapAssert';

export async function vacationCreate(
    { input }: GqlSAdminMutationVacationCreateArgs,
    requestingSession: GqlSSession,
    serverRuntime: ServerRuntime,
): Promise<GqlSVacation> {
    // Phase 1 — Payload construction
    const note = input.note?.trim() ?? '';
    const insert: VacationCreate = {
        vacationId: crypto.randomUUID(),
        startsOn: input.startsOn,
        endsOn: input.endsOn,
        note: note.length > 0 ? note : null,
    };

    // Phase 2 — Transactional execution
    try {
        const created = await serverRuntime.db.transaction(async (transaction) => {
            await vacationOverlapAssert(transaction, insert, null);
            const [row] = await transaction.insert(vacations).values(insert).returning();
            if (!row) {
                throw new Error('vacationCreate: insert returned no row');
            }
            return row;
        });

        return toGqlVacation(created);
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
