import { eq } from 'drizzle-orm';
import { vacations } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSAdminMutationVacationDeleteArgs, GqlSMutationResult, GqlSSession } from '../graphql/generated';

export async function vacationDelete(
    { vacationId }: GqlSAdminMutationVacationDeleteArgs,
    requestingSession: GqlSSession,
    serverRuntime: ServerRuntime,
): Promise<GqlSMutationResult> {
    try {
        const deleted = await serverRuntime.db
            .delete(vacations)
            .where(eq(vacations.vacationId, vacationId))
            .returning({ vacationId: vacations.vacationId });

        if (deleted.length === 0) {
            throw new Error(`vacationDelete: vacation ${vacationId} not found`);
        }

        return { success: true };
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
