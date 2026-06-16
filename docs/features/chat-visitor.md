# Visitor AI Chat

The public-website assistant for anonymous visitors. Backed by [`agentVisitorAssistant`](../../src/server/agents/agentVisitorAssistant.ts);
shares the chat foundation with the admin surface — see [Chat](../architecture/chat.md) and
[Chat Persistence](../architecture/chat-persistence.md).

## Scope

The visitor agent answers top-of-funnel questions about the practice — services, opening hours, address, ÖPNV, what to bring to a first
appointment, who pays. It explicitly does **not**:

- give medical advice, diagnose, or recommend treatments
- quote concrete practice prices for individual services. The **statutory** GKV co-payment numbers — €10 prescription fee per
  Verordnungsblatt and 10% Zuzahlung per treatment, plus the Befreiungsausweis carve-out — are explicitly allowed because they are set by
  law, not by the practice; the system prompt grounds these in [`podologieFacts.ts`](../../src/server/agents/podologieFacts.ts) (`costs`
  block per locale) and mirrors the public `/leistungen#kosten` page.
- guess whether a private health insurer (PKV) will reimburse a given treatment — that depends on the individual tariff; the agent refers
  the patient back to their PKV.
- book or confirm appointments — it points at the phone number on `/kontakt#kontaktdaten` (the dedicated contact-form section returns once
  online booking ships)

The system prompt is grounded in [`podologieFacts.ts`](../../src/server/agents/podologieFacts.ts) — a single TS constant that mirrors the
"Practice details" section of [`docs/project.md`](../project.md). When any of those details change, update the constant **and** the project
brief together.

## GraphQL surface

Visitor chat writes hang directly off `Mutation` — there is no parent guard, and no `kind` arg. The resolver layer always injects
`chatKind = 'visitorAssistant'` for these calls, so the surface is implicit in the access path:

- `Mutation.chatMessageCreate(...)` — start or append to a visitor chat.
- `Mutation.chatInputCollectionRespond(...)` — answer (or skip) an assistant input collection.
- `Mutation.chatToolApprovalRespond(...)` — respond to a tool approval. Wired today even though the visitor agent has no approval-gated
  tools; once one lands the surface is already in place.

See [Chat — Surface is implicit in the access path](../architecture/chat.md#surface-is-implicit-in-the-access-path).

Visitor reads use two public fields:

- `Session.visitorChats: [Chat!]!` — the requesting session's visitor chats, most-recent first. Filtered structurally by
  `requestingSession.sessionId` inside [`chatsFindBySession`](../../src/server/queries/chatsFindBySession.ts), so a session can only ever
  list its own. The list is metadata-only (`messages` is empty); pick a chat to materialize its transcript.
- `Query.chat(chatId: ID!): Chat!` — single-chat read shared with the admin surface. Per-chat ownership is enforced inside `chatFindOne` via
  `guardChatRead` (visitor chats key on `sessionId`, admin chats on `ownerUserId`). Visitors and admins both reach this resolver — the
  guard, not the access path, distinguishes them.

## Persistence and authorization

A visitor's chat is owned by their session: the `chats` row carries `kind = 'visitorAssistant'` and
`sessionId = requestingSession.sessionId` (no `ownerUserId`). The session cookie is the only capability — `guardChatRead` / `guardChatWrite`
reject any other session that knows the chat id. `ON DELETE SET NULL` on the `sessionId` FK keeps the row intact if the session is later
swept; the chat just becomes unreachable.

Visitor user-message rows land with `authorUserId = null` (anonymous), and `ChatMessageUser.author` resolves to `null` over GraphQL.

`chats.title` is populated post-turn by [`chatTitleGenerate`](../../src/server/commands/chatTitleGenerate.ts) — see
[Chat Persistence](../architecture/chat-persistence.md). The visitor empty-state list renders the title; rows whose title is still empty
(in-flight first turns, pre-feature rows) fall back to "Ohne Titel" / "Untitled" client-side.

## Tools

Today the agent's tool set is limited to `promptUserForInput` — for follow-up structured questions (e.g. "for which Symptom?"). Outbound
side-effects (sending an appointment-request email, etc.) will land later as approval-gated tools that reuse the same machinery
`agentAdminAssistant` uses; they belong in this agent's `tools` map without any new transport plumbing.

## Rate limiting

The visitor surface has no sign-in, so unbounded LLM spend is a real risk — a scraper or curious user could pump arbitrary user messages
through the assistant and spin up an LLM turn (and its tool calls) on every send. The cap is **10 user messages per visitor over a rolling
24h window**.

The bucket is keyed on the union of two predicates: `(this session_id) OR (any session sharing this ipHash)`. Both are evaluated server-side
in one query — see [`visitorChatQuotaFindOne`](../../src/server/queries/visitorChatQuotaFindOne.ts). Counting only sessions would let the
limit be reset by clearing cookies; counting only IPs would over-block households or office NATs. The OR'd predicate is the cheapest shape
that resists both — and a row that satisfies both predicates only counts once, so household members who already share an IP don't burn each
other's slots twice.

`Sessions.ipHash` carries SHA-256 of `<VISITOR_IP_HASH_SALT>:<x-forwarded-for first hop or x-real-ip>`. The salt is a per-deploy required
env var ([infrastructure.md](../infrastructure.md)). Hashing means a DB leak does not expose visitor IPs and two deploys cannot be
cross-correlated. Requests that arrive without a proxy-set IP (local dev) leave the column null and fall back to the session bucket alone —
the IP arm of the OR is suppressed for that request.

Enforcement happens at the top of [`chatMessageCreate`](../../src/server/commands/chatMessageCreate.ts) on the visitor branch, before any DB
writes. Over-quota sends return `null` from the mutation — the same path as any other failure. The user-facing signal is the
`Session.visitorChatQuota` snapshot the sheet renders; the disabled Send button is what stops sends in normal flow, and a stale UI falls
back to the existing "try again later" toast.

The sheet renders a small status row above the composer once the visitor has sent at least one message:

- Under the cap: `"X / 10 Nachrichten heute · zurückgesetzt in Yh"` (translated for de/en/ru/ar). `Y` is the time until the oldest in-window
  message ages out, formatted with `formatDistanceToNow` so it tracks the user's locale.
- At the cap: `"Tageslimit erreicht (10 / 10). Neue Nachricht in Yh möglich."` and the composer is disabled.

Constants live in [`src/server/chat/visitorChatLimits.ts`](../../src/server/chat/visitorChatLimits.ts) (`VISITOR_CHAT_DAILY_LIMIT`,
`VISITOR_CHAT_WINDOW_MS`); the GraphQL surface is `Session.visitorChatQuota: VisitorChatQuota!` with `{ used, limit, resetsAt }`. Admin
chats are out of scope — the bucket key would have to be different (admins are signed in, IP isn't a useful identity), and admin LLM spend
is governed by the OTP gate instead.

## Surface (UI)

The visitor widget is a single right-side `Sheet` overlay rendered once at the locale layout (`src/routes/{-$locale}.tsx`). Two entry points
drive it:

- A floating round button (`MessageCircleIcon`) at the bottom-right corner of every public page —
  [`VisitorChatLauncher`](../../src/web/chat/VisitorChatLauncher.tsx). Not reachable under `/admin/*` — the locale layout doesn't mount the
  visitor-chat surfaces there at all, see [Admin Chrome](../architecture/admin-chrome.md). Hidden while the sheet is open so the launcher
  doesn't sit underneath the slide-in animation.
- The home page's "Fragen?" section (`src/routes/{-$locale}/index.tsx`) hosts a small assistant card: a sparkle avatar + "available now"
  status, a faux composer (a real `<textarea>` with a brand-styled Send button), and the four canned questions as chip-style buttons below.
  The composer's submit handler and each chip both fire `openWithMessage()` on the visitor-chat context — opening the sheet and dispatching
  the question as the first user turn through the same provider funnel. Below the card sits a single inline footer: the practice phone
  number with call-hours, then the small "no medical advice" disclaimer.

State that survives the sheet's open/close cycle within a single page-load is owned by
[`VisitorChatProvider`](../../src/web/chat/VisitorChatProvider.tsx): the active `chatId`, page-query rows for a resumed chat
(`loadedMessages`), and the `useChatLiveUpdates` handle keyed against `chatId`. The `live.listener` element renders inside the provider —
above the sheet — so the SSE subscription stays alive even when the sheet is closed mid-turn. The transcript shown in the sheet is
`mergeTranscriptMessages(loadedMessages, live.appendedMessages)` — for a fresh chat `loadedMessages` is empty and the merge degrades to
"subscription buffer is the transcript", same as before this feature landed.

A returning visitor on the same session cookie can resume any previous chat: the empty-state inside the sheet renders a list of
`Session.visitorChats` rows (title + relative time), and clicking one fires `loadChat(chatId)` on the provider — that fetches
`Query.chat(chatId)` and seeds `loadedMessages`. A hard reload is fine: the list query refires on next sheet open and the conversations are
still there. Cleaning the slate without leaving the sheet is the "new chat" button (bottom-left of the composer): it nulls `chatId` so the
next send creates a fresh `chats` row; the previous chat reappears in the empty-state list because the session still owns it.

The composer ([`VisitorChatComposer`](../../src/web/chat/VisitorChatComposer.tsx)) wires the dumb
[`<MessageComposer />`](../../src/web/components/MessageComposer.tsx) shell to the provider's `sendMessage` funnel — so the "click suggested
question" path and the "type and press Enter" path go through the same code. The shell's `addonStart` slot hosts the new-chat button
(`MessageSquarePlusIcon`) once `chatId` is defined; before the first send the slot stays empty (nothing to "new" from). Attachments and the
auto/manual approval-mode selector are deliberately disabled: visitors have no per-session anonymous file ownership today, and the visitor
agent has no approval-gated tools.

The transcript view inside the sheet duplicates the stick-to-bottom + jump-to-latest behaviour of the admin route's `ChatTranscript`
(`src/routes/{-$locale}/admin/chat.tsx`). Extracting a single shared `<ChatTranscript />` is a follow-up once both surfaces have proven they
really converge — see the same note in [Chat Admin](./chat-admin.md).

On `sm` and up the sheet header carries an expand toggle (Lucide `Maximize2`/`Minimize2`) next to the close button — desktop visitors can
flip the sheet to full-screen for a longer transcript and back. The toggle is hidden under `sm` (the sheet is already full-width on phones)
and resets to the default size every time the sheet closes. When expanded the sheet itself spans the viewport, but the inner column (header
content, transcript, composer) is capped at `max-w-3xl` and centered so prose stays at a comfortable reading width — the header's border-b
still runs the full width of the sheet so the chrome reads as a single surface.

On phones the sheet's height + top track `window.visualViewport` while it is open
([`useVisualViewport`](../../src/web/hooks/useVisualViewport.ts)). The default `inset-y-0 h-full` sizing is against the layout viewport,
which on iOS Safari does not shrink when the soft keyboard appears — so without this override the browser auto-scrolls the focused textarea
into view and drags the header off the top. Driving the sheet from the visual viewport keeps the header pinned to the top of the visible
area, lets the transcript shrink in the middle, and parks the composer flush above the keyboard.

Two further mobile-keyboard tweaks fight for the same vertical space: the "not medical advice" disclaimer below the title is hidden under
`sm` and surfaced via a small `InfoIcon` popover next to the title — the `<SheetDescription>` itself stays mounted with `sr-only` so the
sheet's `aria-describedby` link still resolves. And the visitor composer asks `<MessageComposer>` for `minRows={2}` rather than relying on
the default, keeping the empty-state footprint tight on mobile where every row is space the keyboard is already squeezing; shift+Enter still
grows it past that floor.

## Implementation pointers

| Concern                                   | Where                                                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Agent factory                             | [`src/server/agents/agentVisitorAssistant.ts`](../../src/server/agents/agentVisitorAssistant.ts)                            |
| Practice facts (system-prompt grounding)  | [`src/server/agents/podologieFacts.ts`](../../src/server/agents/podologieFacts.ts)                                          |
| Agent dispatch                            | [`src/server/commands/chatAssistantTurnRun.ts`](../../src/server/commands/chatAssistantTurnRun.ts) (`chatKind` switch)      |
| Public mutation wiring                    | `Mutation.chatMessageCreate` etc. in [`src/server/graphql/resolversCreate.ts`](../../src/server/graphql/resolversCreate.ts) |
| Per-chat authorization                    | [`src/server/guards/guardChatWrite.ts`](../../src/server/guards/guardChatWrite.ts)                                          |
| Schema                                    | `Chat.kind: ChatKind!` in [`src/server/graphql/schema.graphqls`](../../src/server/graphql/schema.graphqls)                  |
| Visitor chat list query                   | [`src/server/queries/chatsFindBySession.ts`](../../src/server/queries/chatsFindBySession.ts) (`Session.visitorChats`)       |
| Single-chat read                          | [`src/server/queries/chatFindOne.ts`](../../src/server/queries/chatFindOne.ts) (shared with `Session.admin.chat`)           |
| Title generation (post-turn)              | [`src/server/commands/chatTitleGenerate.ts`](../../src/server/commands/chatTitleGenerate.ts)                                |
| Rate-limit constants                      | [`src/server/chat/visitorChatLimits.ts`](../../src/server/chat/visitorChatLimits.ts)                                        |
| Rate-limit query                          | [`src/server/queries/visitorChatQuotaFindOne.ts`](../../src/server/queries/visitorChatQuotaFindOne.ts)                      |
| Client IP extraction                      | [`src/server/utils/clientIpFromRequest.ts`](../../src/server/utils/clientIpFromRequest.ts)                                  |
| IP hashing on session upsert              | [`src/server/utils/sessionUpsert.ts`](../../src/server/utils/sessionUpsert.ts) (`Sessions.ipHash`)                          |
| Client operations                         | [`src/web/chat/VisitorChat.graphql`](../../src/web/chat/VisitorChat.graphql)                                                |
| Provider (open/close + per-session state) | [`src/web/chat/VisitorChatProvider.tsx`](../../src/web/chat/VisitorChatProvider.tsx)                                        |
| Floating launcher                         | [`src/web/chat/VisitorChatLauncher.tsx`](../../src/web/chat/VisitorChatLauncher.tsx)                                        |
| Sheet overlay + transcript                | [`src/web/chat/VisitorChatSheet.tsx`](../../src/web/chat/VisitorChatSheet.tsx)                                              |
| Composer                                  | [`src/web/chat/VisitorChatComposer.tsx`](../../src/web/chat/VisitorChatComposer.tsx)                                        |
| Mounted in                                | [`src/routes/{-$locale}.tsx`](../../src/routes/%7B-%24locale%7D.tsx) (`LocaleLayout`)                                       |
