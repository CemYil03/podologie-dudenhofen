import type { GqlSVisitorChatQuota } from '../graphql/generated';
import { VISITOR_CHAT_DAILY_LIMIT, VISITOR_CHAT_WINDOW_MS } from '../chat/visitorChatLimits';

// Maps the list of in-window user-message timestamps (oldest first) into the
// quota shape exposed on `Session.visitorChatQuota`. The query upstream caps
// the row count at `VISITOR_CHAT_DAILY_LIMIT + 1` so callers can detect
// over-limit without scanning unbounded rows; that cap does NOT bias `used`
// here because at the limit we already refuse the next send.
//
// `resetsAt` is the moment the oldest in-window message ages out of the
// rolling 24h window — once that happens the bucket regains a slot. Null
// when `used = 0` so the UI can hide the "resets in …" line entirely
// instead of saying "resets in 24h" the first time the sheet opens.
export function toGqlVisitorChatQuota(inWindowCreatedAt: ReadonlyArray<Date>): GqlSVisitorChatQuota {
    const used = inWindowCreatedAt.length;
    const oldest = inWindowCreatedAt[0];
    const resetsAt = oldest ? new Date(oldest.getTime() + VISITOR_CHAT_WINDOW_MS) : null;
    return {
        used,
        limit: VISITOR_CHAT_DAILY_LIMIT,
        resetsAt,
    };
}
