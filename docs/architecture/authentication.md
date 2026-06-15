# Authentication

## Context

The application needs to identify users across requests without requiring an upfront login. Sessions must be established automatically on
first visit and persist across browser sessions.

## Decision

Cookie-based session management with automatic session creation on every GraphQL request.

### How It Works

1. Every request to `/api/graphql` or `/api/stream` calls `sessionUpsert()` before executing the GraphQL operation
2. `sessionUpsert()` reads the session ID from the cookie whose name is configured via `env.sessionCookie.name` (see
   [environment.md](./environment.md))
3. If a valid session exists (not terminated), it updates `lastInteractionAt` and returns the session
4. If no session exists or the session was terminated, a new session is created with `crypto.randomUUID()`
5. The response includes a `Set-Cookie` header to persist the session ID in the browser. The cookie is set `HttpOnly` so the session ID is
   not readable from JavaScript (mitigating XSS exfiltration), along with `Secure` and `SameSite=Strict` by default — see
   `createSetCookieString` in `src/server/utils/sessionUtils.ts`

### Session Lifecycle

- **Created**: automatically on first request
- **Active**: `lastInteractionAt` updated on every request; `connectionActive` tracks real-time connections
- **Terminated**: soft-deleted via `wasTerminatedAt` timestamp (row is preserved, not deleted)
- **User binding**: `userId` column exists on the session but is nullable — sessions start anonymous and can be linked to a user later

### Client IP is hashed, not stored

Each session row carries `ipHash`: a SHA-256 of `<VISITOR_IP_HASH_SALT>:<client ip>`, where the IP is the first hop of `x-forwarded-for` (or
`x-real-ip` as a fallback) — see [`clientIpFromRequest`](../../src/server/utils/clientIpFromRequest.ts). The salt is a per-deploy required
env var (see [infrastructure.md](../infrastructure.md)). We hash so a DB leak does not expose visitor IPs and two deploys cannot be
cross-correlated; we keep the hash so the visitor-chat rate limiter can group sessions that share an IP across cookie clears (see
[features/chat-visitor.md — Rate limiting](../features/chat-visitor.md#rate-limiting)). Requests without a usable proxy header land
`ipHash = null` and skip the IP arm of any bucket built on it.

### Key Files

- `src/server/utils/sessionUpsert.ts` — session creation and update logic
- `src/server/utils/sessionUtils.ts` — cookie reading/writing helpers
- `src/server/db/schema.ts` — `Sessions` table definition
- `src/routes/api/graphql.ts` — session context wiring for queries and mutations
- `src/routes/api/stream.ts` — session context wiring for subscriptions

## Alternatives Considered

- **JWT tokens**: Stateless but harder to revoke, no server-side session state for real-time tracking
- **Third-party auth (OAuth providers)**: Adds external dependency; can be layered on top of sessions later

## Consequences

- Every request hits the database for session upsert — acceptable given the PostgreSQL connection pool
- Sessions start anonymous, so user identity requires a separate linking step
- Soft-delete means the sessions table grows over time — may need a cleanup job eventually
