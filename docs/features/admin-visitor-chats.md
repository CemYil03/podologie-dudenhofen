# Admin Visitor-Chat Review

A read-only surface mounted at `/admin/visitor-chats`. Lets the practice owner review every conversation visitors had with the public
visitor assistant — the goal is to understand what people actually ask so the visitor agent's system prompt and tool surface can evolve with
real demand. See [Chat Admin](./chat-admin.md) for the practice owner's own chat surface and [Chat Visitor](./chat-visitor.md) for the
public-facing visitor assistant.

## User Behavior

The practice owner opens `/admin` (the admin landing page) and follows the **Besucher-Chats** card to `/admin/visitor-chats`. The page
renders a flat list of every visitor-assistant chat across every session, sorted by `lastModifiedAt` descending. Each row shows the chat's
title (assigned by the assistant on the first turn) and the last-modified timestamp.

Clicking a row navigates to the same route with a `?chatId={id}` parameter and replaces the list with the chat's transcript: messages
grouped by date, rendered through the same `<ChatMessage />` component the live admin and visitor surfaces use. There is no composer, no
live-update subscription, and no interactive collection or approval handler — the visitor's conversation is closed from the admin's point of
view, and the viewer renders it verbatim. A "Zur Liste" affordance at the top of the detail view clears the search param to return to the
list.

## Authorization

Both `Admin.visitorChats` and `Admin.visitorChat(chatId)` hang off the `Admin` parent type, so they share the parent `guardAdmin` check on
`Session.admin`. There is no per-row predicate on the list query — the admin's review surface is cross-session by definition. The
single-chat resolver does NOT call `guardChatRead` (which is session-scoped and would reject every cross-session read), but it pins the
query to `kind = 'visitorAssistant'` so this entry point can never be aimed at another admin's chat.

This is the deliberate split with the public surface: the public `Query.chat` runs `chatFindOne` → `guardChatRead`, where a visitor can only
ever see the chat their own session owns. The admin viewer runs `visitorChatFindOne`, which trusts `guardAdmin` for who-can-read and bounds
the surface to visitor chats only.

## Implementation

| Concern               | Where                                                                              |
| --------------------- | ---------------------------------------------------------------------------------- |
| Route                 | `src/routes/{-$locale}/admin/visitor-chats.tsx`                                    |
| Operations            | `src/routes/{-$locale}/admin/VisitorChatsAdminPage.graphql`                        |
| List query            | `Admin.visitorChats` → `src/server/queries/visitorChatsFindAll.ts`                 |
| Single-chat query     | `Admin.visitorChat(chatId)` → `src/server/queries/visitorChatFindOne.ts`           |
| Resolver wiring       | `src/server/graphql/resolversCreate.ts` (`Admin` resolver)                         |
| Parent guard          | `src/server/guards/guardAdmin.ts`                                                  |
| Per-message rendering | `src/web/components/chat-message/` (existing, see [Chat](../architecture/chat.md)) |

The list query reuses the existing `Chats_kind_idx` to scan visitor-assistant rows in `lastModifiedAt` descending order, capped at a hard
limit (`VISITOR_CHATS_HARD_LIMIT = 200`). Pagination lands when the practice accumulates more visitor traffic than fits comfortably on one
page. The single-chat query reuses `chatMessageRowsLoad` — the same loader the public `chatFindOne` and the admin chat read use — so the
transcript shape is identical to what the live surfaces render.

The transcript itself reuses `groupMessagesByDate` and `findUserInputByCollectionId` from `src/web/chat/chatTranscript.ts` so the date
separators and collection/userInput folding match the admin chat surface verbatim. `isInteractiveCollection` is left at its default (false)
on every row — a still-open collection from a visitor session must never render as a fillable form in the admin viewer.

## Future Work

- **Pagination.** Today the list is hard-capped at 200; once the practice accumulates more visitor traffic the page needs cursor-based
  pagination. The `Chats_kind_idx` covers `lastModifiedAt`-keyed cursor reads as-is.
- **Search and filtering.** Filtering by date range, by quota-exceeded sessions, or by tool calls made would let the admin focus reviews on
  signal rather than volume.
- **Tagging / annotations.** Letting the admin tag a chat ("genuine inquiry", "spam", "missing FAQ") would feed back into prompt-tuning.
