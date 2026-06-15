import { asc } from 'drizzle-orm';
import { vacations } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSSession, GqlSVacation } from '../graphql/generated';
import { toGqlVacation } from '../mappers/toGqlVacation';

// All scheduled vacations, sorted ascending by `startsOn`. Backs the
// `Admin.vacations` field — the admin manager renders past, active and
// future entries as one table; sorting by `startsOn` keeps history at the
// top and the next upcoming break right below it. Authorization happens
// upstream at `Mutation.admin` / `Session.admin` via `guardAdmin`.
export async function vacationsFindAll(requestingSession: GqlSSession, serverRuntime: ServerRuntime): Promise<GqlSVacation[]> {
    try {
        const rows = await serverRuntime.db.select().from(vacations).orderBy(asc(vacations.startsOn));
        return rows.map(toGqlVacation);
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
