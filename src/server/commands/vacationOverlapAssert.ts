import { and, gte, lte, ne } from 'drizzle-orm';
import { vacations } from '../db/schema';
import type { VacationCreate } from '../db/schema';
import type { DatabaseTransaction } from '../db';

// Shared validation for `vacationCreate` and `vacationUpdate`. Two checks:
//
// 1. `startsOn <= endsOn` — a closure can't end before it begins.
// 2. No overlap with any other row. The window `[startsOn, endsOn]` is
//    inclusive on both ends, so two periods overlap iff
//    `a.startsOn <= b.endsOn AND a.endsOn >= b.startsOn`. The optional
//    `excludeVacationId` lets `vacationUpdate` exclude the row it is
//    updating from the overlap check (a row never conflicts with itself).
//
// `transaction` is the Drizzle transaction handle so the check and the
// subsequent insert/update see a consistent snapshot — without it, two
// concurrent admin submits could each pass validation and then create
// overlapping rows.
export async function vacationOverlapAssert(
    transaction: DatabaseTransaction,
    payload: Pick<VacationCreate, 'startsOn' | 'endsOn'>,
    excludeVacationId: string | null,
): Promise<void> {
    if (payload.startsOn > payload.endsOn) {
        throw new Error('vacation: startsOn must be on or before endsOn');
    }

    const overlapWhere = and(lte(vacations.startsOn, payload.endsOn), gte(vacations.endsOn, payload.startsOn));
    const where = excludeVacationId ? and(overlapWhere, ne(vacations.vacationId, excludeVacationId)) : overlapWhere;

    const [conflict] = await transaction.select({ vacationId: vacations.vacationId }).from(vacations).where(where).limit(1);
    if (conflict) {
        throw new Error('vacation: overlaps an existing scheduled period');
    }
}
