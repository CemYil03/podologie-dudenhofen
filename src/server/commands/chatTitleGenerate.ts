import { generateText } from 'ai';
import { eq } from 'drizzle-orm';
import { chats } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import { chatMessageRowsLoad } from '../queries/chatMessageRowsLoad';

// Generates a short title for a chat from its current contents and writes
// it to `chats.title`. Called after the first assistant turn finishes — see
// `chatAssistantTurnRunDetached` in `chatAssistantTurnRun.ts`. Best-effort:
// every failure mode (the LLM call, the row load, the DB update) routes to
// `serverRuntime.log` and never throws into the caller. The title column
// stays `''` on failure and the next turn will retry.
//
// The title surface is the visitor-side empty-state list (and the future
// admin chat-list), so the constraints are visual: ≤6 words, no quotes, no
// trailing punctuation, in the user's language. We post-process the LLM
// output rather than trusting the model to obey those constraints — Gemini
// 2.5 Flash regularly returns "Title: ..." or wraps in quotes.

const TITLE_MAX_CHARS = 60;
const TITLE_MAX_WORDS = 6;

const TITLE_INSTRUCTIONS = [
    'Summarize the following conversation as a short title.',
    'Rules:',
    `- At most ${TITLE_MAX_WORDS} words.`,
    `- At most ${TITLE_MAX_CHARS} characters.`,
    '- No surrounding quotes, no trailing punctuation, no leading "Title:" prefix.',
    "- In the conversation's primary language (German if the user wrote German, English if English).",
    '- Capture the topic, not the greeting. Skip filler like "Frage zu …" / "Question about …".',
    'Output the title and nothing else.',
].join('\n');

export async function chatTitleGenerate(chatId: string, serverRuntime: ServerRuntime): Promise<void> {
    try {
        const rows = await chatMessageRowsLoad(serverRuntime.db, chatId);
        const transcript = transcriptForTitle(rows);
        if (!transcript) return;

        const { text } = await generateText({
            model: serverRuntime.ai.chatTitleModel(),
            system: TITLE_INSTRUCTIONS,
            prompt: transcript,
        });
        const title = sanitizeTitle(text);
        if (!title) return;

        await serverRuntime.db.update(chats).set({ title }).where(eq(chats.chatId, chatId));
    } catch (error) {
        serverRuntime.log.error(error, null);
    }
}

// Plain-text linearization of the message rows. Title generation only needs
// the user/assistant text exchanges — tool calls, approval rounds, and
// input-collection slots are skipped. We could load these straight from the
// DB with a narrower projection, but `chatMessageRowsLoad` is already used by
// the turn runner and is cached / co-located.
function transcriptForTitle(
    rows: ReadonlyArray<{ spine: { kind: string }; user?: { body: string }; assistantText?: { body: string } }>,
): string {
    const parts: string[] = [];
    for (const row of rows) {
        if (row.spine.kind === 'user' && row.user) {
            parts.push(`User: ${row.user.body}`);
        } else if (row.spine.kind === 'assistantText' && row.assistantText) {
            parts.push(`Assistant: ${row.assistantText.body}`);
        }
    }
    return parts.join('\n\n');
}

// Strip wrapping quotes, leading "Title:" preambles, trailing punctuation,
// and clamp to the word/char budget. Returns an empty string when there's
// nothing usable left — caller falls back to leaving `title` empty.
function sanitizeTitle(raw: string): string {
    let text = raw.trim();
    // Some models prefix the response despite explicit instructions.
    text = text.replace(/^title\s*[:\-–]\s*/i, '');
    // Strip a single layer of wrapping quotes / brackets.
    text = text.replace(/^["'“”‘’«»[(](.*)["'“”‘’«»\])]$/u, '$1').trim();
    // Collapse internal whitespace.
    text = text.replace(/\s+/g, ' ');
    // Trailing punctuation — keep `?` because a question makes a fine title.
    text = text.replace(/[.,;:!\-–—]+$/u, '').trim();
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > TITLE_MAX_WORDS) {
        text = words.slice(0, TITLE_MAX_WORDS).join(' ');
    }
    if (text.length > TITLE_MAX_CHARS) {
        text = text.slice(0, TITLE_MAX_CHARS).trimEnd();
    }
    return text;
}
