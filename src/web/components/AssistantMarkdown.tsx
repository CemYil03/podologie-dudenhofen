import { Streamdown } from 'streamdown';
import { code } from '@streamdown/code';
import { cn } from '../utils/cn';

// Shared markdown renderer for assistant messages — used both for the
// streaming preview during a turn and for the persisted `ChatMessageAssistantText`
// row that swaps into its slot at end-of-stream. Centralizing the Streamdown
// config (plugins, table/code/mermaid controls, parseIncompleteMarkdown) means
// the swap can never produce a visible reflow even when the assistant emitted
// a code or table block mid-stream.

export function AssistantMarkdown({ text, className, streaming = false }: { text: string; className?: string; streaming?: boolean }) {
    if (streaming && !text) {
        return <span className={cn('text-sm italic leading-relaxed text-(--color-brand-charcoal-3)', className)}>Thinking…</span>;
    }
    return (
        <Streamdown
            plugins={{ code }}
            controls={{
                table: { copy: false, download: false, fullscreen: false },
                code: { copy: true, download: false },
                mermaid: { download: false, copy: true, fullscreen: true, panZoom: true },
            }}
            // Streamdown ships an "Open external link?" confirmation modal by
            // default. Our assistant only emits links into the practice's own
            // pages (relative paths from `PODOLOGIE_FACTS.pageAnchors`), so the
            // safety prompt is pure friction — disable it.
            linkSafety={{ enabled: false }}
            parseIncompleteMarkdown
            className={cn('text-sm leading-relaxed text-charcoal wrap-break-word *:first:mt-0 *:last:mb-0', className)}
        >
            {text}
        </Streamdown>
    );
}
