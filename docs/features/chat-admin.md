# Admin AI Chat

The practice owner's chat surface, mounted at `/admin/chat`. Builds on the shared chat foundation — see [Chat](../architecture/chat.md),
[Chat Persistence](../architecture/chat-persistence.md), and [Authorization](../architecture/authorization.md). This doc only documents
what's specific to this surface.

## User Behavior

The practice owner opens `/admin/chat`, types a message, and receives a streaming response from the assistant. With no `?chatId` in the URL,
the first send creates a new chat and navigates to `/admin/chat?chatId={id}`. Subsequent sends are appended to that chat. The transcript
renders the full message history grouped by date, using the shared `<ChatMessage />` component for every variant of the message union.

The composer:

- Auto-grows up to a few lines (`<InputGroupTextarea />` with `field-sizing-content`) inside an `<InputGroup>` whose `block-end` addon hosts
  the Send button. The presentational shell — textarea, Send button, Enter-to-send, busy/disabled wiring, and a slot for feature-specific
  addon content — lives in the decoupled `<MessageComposer />` component (`src/web/components/MessageComposer.tsx`); the admin route's
  `ChatComposer` owns the draft state, the create mutation, the streaming preview, and the tool-call mode selector that plugs into the
  shell's `addonStart` slot.
- Exposes a tool-call mode selector (`auto` / `manual`) at the bottom-left of the addon, which controls
  `ChatAssistantOptions.requireToolCallApprovals` on the create mutation. `auto` lets the assistant invoke tools directly; `manual` makes
  each call surface an approval message in the transcript first. Approval flow itself is documented in [Chat](../architecture/chat.md).
- Sends on `Enter`; `Shift+Enter` inserts a newline. Disables itself while a response is streaming and shows an inline spinner. Restores the
  draft if the mutation errors. Returns focus to the textarea as soon as the per-turn lock lifts.
- Accepts file attachments via a paperclip icon-button left of Send and via drag-and-drop onto the composer. Attached files render as a
  horizontal row of preview tiles inside the input group above the typed text. The full upload → persist → render → replay path is
  documented in [Chat Persistence — Attachments](../architecture/chat-persistence.md#attachments).

While the assistant is generating, every event of the turn arrives over a single chat-scoped subscription (`chatUpdates`): the user's
message lands as soon as the server commits it, every tool call / approval / input collection lands as soon as it persists, and the
assistant's text streams in at the **bottom of the transcript** through [Streamdown](https://streamdown.ai). The streaming row's
`chatMessageId` is pre-allocated by the server so the persisted swap-in is a true no-op — see
[Chat — Live updates](../architecture/chat.md#live-updates-flow-through-one-chat-scoped-subscription).

The transcript stays pinned to the bottom on initial render and as new content streams in. If the user scrolls up while a turn is in flight,
auto-follow stops and a floating "Jump to latest" pill appears at the bottom-center of the scroll area; clicking it smooth-scrolls back to
the tail and re-attaches the auto-follow. Implemented in `ChatTranscript` (`src/routes/{-$locale}/admin/chat.tsx`); the visitor sheet
(`src/web/chat/VisitorChatSheet.tsx`) duplicates the same stick-to-bottom + jump-to-latest algorithm — extracting a single shared
`<ChatTranscript />` is a follow-up once both surfaces have proven they really converge.

## Authorization

Admin chats live behind `Mutation.admin` (writes) and `Session.admin` (reads), both gated by `guardAdmin` / `guardAdminMutation`. Today the
guard hardcodes a deny — there is no admin sign-in flow yet — so the route loads but every page query and mutation throws until the real
guard lands. The hard fail is intentional and surfaces cleanly: the page query rejects, `<ChatPage />` renders its "Failed to load chat"
branch, and no row is ever written. Once OTP ships, the guard accepts admin sessions and the chat surface lights up.

The `chatKind` for admin writes is implicit in the access path: `Mutation.admin.chatMessageCreate` always injects `'adminAssistant'` into
the shared command. There is no `kind` arg on the SDL — the surface is the path. See
[Chat — Surface is implicit in the access path](../architecture/chat.md#surface-is-implicit-in-the-access-path).

## Implementation

| Concern                      | Where                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| Route                        | `src/routes/{-$locale}/admin/chat.tsx`                                                                    |
| Operations                   | `src/routes/{-$locale}/admin/ChatPage.graphql`                                                            |
| Live-update hook             | `src/web/chat/useChatLiveUpdates.tsx`                                                                     |
| Composer                     | `src/web/chat/ChatComposer.tsx`                                                                           |
| Transcript helpers           | `src/web/chat/chatTranscript.ts`                                                                          |
| Slot-kind registry           | `src/web/chat/chatAssistantInputKinds.ts`                                                                 |
| Per-message rendering        | `src/web/components/chat-message/` (existing, see [Chat](../architecture/chat.md))                        |
| Markdown renderer            | `src/web/components/AssistantMarkdown.tsx`                                                                |
| Server reads                 | `src/server/queries/chatFindOne.ts` (mounted on `Admin.chat`)                                             |
| Server writes (admin)        | `Mutation.admin.chatMessageCreate` etc. → `src/server/commands/chatMessageCreate.ts` (`'adminAssistant'`) |
| Admin guard                  | `src/server/guards/guardAdmin.ts` (hardcoded deny)                                                        |
| Per-chat ownership           | `src/server/guards/guardChatWrite.ts`                                                                     |
| Per-message commit + publish | `src/server/commands/chatMessageAppend.ts`                                                                |
| Approval-gated tool          | `src/server/agents/toolWriteToConsole.ts`                                                                 |
| Shared assistant turn        | `src/server/commands/chatAssistantTurnRun.ts` (`chatAssistantTurnRunDetached`)                            |

The route hosts these operations against the admin path:

1. **`ChatPage` query** — `currentSession { admin { chat(chatId) { ... } } }`. Pulls the chat and every message via the shared
   `ChatMessageFields` fragment. Loaded once on mount; the subscription extends the transcript from there.
2. **`ChatMessageCreate` / `ChatInputCollectionRespond` / `ChatToolApprovalRespond` mutations** — all under `mutation { admin { ... } }`.
   `assistantOptions` is built inline on each call to dodge the typescript-operations duplicate-emission collision documented in
   `docs/architecture/api-layer.md`.
3. **`ChatUpdates` subscription** — single live channel keyed by a per-turn `generationId`. Foundation rules (pre-allocated message ids,
   `TurnEnded` for teardown, `chatUpdates:${generationId}` channel) are documented in
   [Chat — Live updates](../architecture/chat.md#live-updates-flow-through-one-chat-scoped-subscription).

The transcript renders from a single client-side store: the initial query's flat messages plus the subscription's appended buffer (deduped
by `chatMessageId`), grouped client-side by ISO date. Streaming text rows render at the tail through the same `<AssistantMarkdown />` path
the persisted `ChatMessageAssistantText` view uses.

### Local UI rules

These are choices the route makes on top of the shared union; the union itself, the user-input flow, the form-vs-step-through rendering, the
latest-collection-only rule, the date-scalar lift, and the tool-approval flow are all documented in [Chat](../architecture/chat.md). The
admin route opts into the shared rules without diverging.

- Assistant text messages render free-floating — no chat bubble, no avatar — directly on the page background. A timestamp and a Copy button
  sit on a single row beneath the body; the Copy button writes the raw markdown body to the clipboard and flashes a check for ~1.5 s.
- User messages keep the right-aligned bubble. Input-collection cards (interactive form, answered summary, or skipped state) render
  free-floating without an avatar.
- Tool-call pills and approval cards both render a small braces icon-button labelled "Show arguments" via tooltip. Clicking it opens a
  dialog with the call's arguments JSON-pretty-printed.
- The composer is **not** locked while a collection is on screen — typing a free-text message synthesizes a `skipped` userInput row
  server-side. Documented in [Chat — Pivoting away from an open collection](../architecture/chat.md).
- Attachment preview-tile lifecycle (`uploading | uploaded | error`), the in-bubble tile grid (capped at 4 squares with a `+{N − 3}`
  overflow), and the preview dialog are documented in [Chat Persistence — Attachments](../architecture/chat-persistence.md#attachments).

## Future Work

The current minimum doesn't yet implement:

- **Real admin sign-in.** `guardAdmin` is hardcoded deny; the route loads but every server call throws. Lands with the OTP flow.
- **Chat list / sidebar.** New chats are reachable only via the `?chatId` URL.
- **Multi-tab / multi-device sync.** The `chatUpdates` subscription is keyed by the per-turn `generationId`, so a chat opened in a second
  tab doesn't see live updates from a turn started in the first tab. A chat-level subscription with real authorization replaces or augments
  the generationId-keyed one once admin sessions exist.
