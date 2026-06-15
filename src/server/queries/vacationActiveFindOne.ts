import { and, asc, gte, lte } from 'drizzle-orm';
import { vacations } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSSession, GqlSVacation } from '../graphql/generated';
import { toGqlVacation } from '../mappers/toGqlVacation';
import { VACATION_LEAD_DAYS } from '../../web/practice';

// Returns the currently-visible vacation (if any) for the public home-page
// banner: a row whose `endsOn >= today` AND `startsOn <= today + VACATION_LEAD_DAYS`,
// picking the soonest `startsOn` when multiple match. Date comparisons run
// directly on the `date` columns — Drizzle returns them as `YYYY-MM-DD`
// strings, which compare lexicographically as calendar dates.
//
// "Today" is resolved in the practice's local timezone (Europe/Berlin), not
// the server's UTC clock, so the banner switches over at local midnight
// regardless of where the server runs.
//
// Public — no guard. The banner is a public surface.
export async function vacationActiveFindOne(requestingSession: GqlSSession, serverRuntime: ServerRuntime): Promise<GqlSVacation | null> {
    try {
        const todayIso = practiceLocalIsoDate(new Date());
        const leadEndIso = practiceLocalIsoDate(addDays(new Date(), VACATION_LEAD_DAYS));

        const [row] = await serverRuntime.db
            .select()
            .from(vacations)
            .where(and(gte(vacations.endsOn, todayIso), lte(vacations.startsOn, leadEndIso)))
            .orderBy(asc(vacations.startsOn))
            .limit(1);

        return row ? toGqlVacation(row) : null;
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}

const PRACTICE_TIMEZONE = 'Europe/Berlin';

function practiceLocalIsoDate(d: Date): string {
    // `en-CA` is the locale shortcut for ISO `YYYY-MM-DD` formatting; the
    // explicit timeZone resolves the date in the practice's calendar.
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: PRACTICE_TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(d);
}

function addDays(d: Date, days: number): Date {
    const next = new Date(d);
    next.setDate(next.getDate() + days);
    return next;
}
