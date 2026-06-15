import type { Vacation } from '../db/schema';
import type { GqlSVacation } from '../graphql/generated';

export function toGqlVacation(vacation: Vacation): GqlSVacation {
    return {
        vacationId: vacation.vacationId,
        startsOn: vacation.startsOn,
        endsOn: vacation.endsOn,
        note: vacation.note,
    };
}
