import type { Session } from '../db/schema';
import type { GqlSAdmin, GqlSSession } from '../graphql/generated';

export function toGqlSession(session: Session): GqlSSession {
    return {
        sessionId: session.sessionId,
        userId: session.userId,

        // resolved fields
        user: null,
        // `Session.admin` runs `guardAdmin` and throws when the session is
        // not admin, so the parent value is irrelevant — it never reaches
        // the field resolver. Carry a non-null placeholder so the wire-shape
        // match for `Session` is well-typed.
        admin: {} as GqlSAdmin,
        // `Session.visitorChats` is a resolved field — `chatsFindBySession`
        // runs at query time keyed by the requesting session. The placeholder
        // here is never read.
        visitorChats: [],
    };
}
