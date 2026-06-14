import type { GqlSAdmin, GqlSAdminMutation, GqlSSession } from '../graphql/generated';

// Parent guard for `Session.admin` and `Mutation.admin`. Hardcoded to deny
// today — the proper admin sign-in flow (OTP) hasn't landed yet, so there is
// no real signal to gate on. The seam exists so every admin-only field can
// live behind one obvious check; once OTP ships, this returns the parent
// shape iff the session's User row carries an admin claim.
//
// Returning the parent type — not a boolean — keeps the resolver wiring a
// one-liner: `Mutation.admin: (_, __, session) => guardAdmin(session)`. The
// same helper backs both `Session.admin` (read) and `Mutation.admin` (write);
// a future split (e.g. read-allowed-but-write-rate-limited) gets two
// functions at that point. Throwing rather than returning `null` matches
// `guardChatRead` / `guardChatWrite` — Apollo turns the throw into a
// top-level error and the resolver-level `try/catch` in chat commands logs
// it.
function guardAdminInner(_requestingSession: GqlSSession): void {
    throw new Error('Unauthorized');
}

export function guardAdmin(requestingSession: GqlSSession): GqlSAdmin {
    guardAdminInner(requestingSession);
    return {} as GqlSAdmin;
}

export function guardAdminMutation(requestingSession: GqlSSession): GqlSAdminMutation {
    guardAdminInner(requestingSession);
    return {} as GqlSAdminMutation;
}
