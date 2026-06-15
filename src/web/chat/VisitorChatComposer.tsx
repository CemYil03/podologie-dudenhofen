import { MessageSquarePlusIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { MessageComposer } from '../components/MessageComposer';
import { InputGroupButton } from '../components/base/input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/base/tooltip';
import { useLocale } from '../hooks/useLocale';
import { useVisitorChat } from './VisitorChatProvider';

// Visitor-surface composer. Wires the dumb `<MessageComposer />` shell to the
// visitor chat provider's `sendMessage` funnel. No attachments and no tool-call
// approval selector — the visitor agent's tool surface is limited to
// `promptUserForInput`, so neither addon would have anything to do. The
// composer's `addonStart` slot hosts a "new chat" button once a chat is
// active; before the first send it stays empty (nothing to "new" from). See
// `docs/features/chat-visitor.md`.

interface VisitorChatComposerProps {
    placeholder?: string;
}

export function VisitorChatComposer({ placeholder }: VisitorChatComposerProps) {
    const locale = useLocale();
    const { sendMessage, live, chatId, resetChat } = useVisitorChat();
    const [draft, setDraft] = useState('');

    const submit = useCallback(async () => {
        const message = draft.trim();
        if (!message) return;
        setDraft('');
        // The provider owns generationId + chatId; on transport failure it
        // calls `live.endTurn()` itself, but it does not restore the draft —
        // the user will retype. Keep that simple-minded behaviour here too:
        // the visitor surface is a low-stakes assistant, not the admin
        // surface where draft-loss matters.
        await sendMessage(message);
    }, [draft, sendMessage]);

    return (
        <MessageComposer
            value={draft}
            onValueChange={setDraft}
            onSubmit={() => void submit()}
            disabled={live.isGenerating}
            busy={live.isGenerating}
            placeholder={placeholder}
            // Single-row default — visitor messages are short, and on iOS Safari
            // every row of the textarea is space the soft keyboard already
            // squeezes. The textarea still grows on shift+Enter via the user
            // agent's auto-grow.
            rows={3}
            sendLabel={{ de: 'Senden', en: 'Send', ru: 'Отправить', ar: 'إرسال' }[locale]}
            addonStart={
                chatId ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                // Disabled mid-stream — resetting state while a turn
                                // is publishing would leave the subscription pointed
                                // at a chat the user can no longer see. Once the
                                // turn ends the button comes back.
                                disabled={live.isGenerating}
                                aria-label={
                                    { de: 'Neuen Chat starten', en: 'Start new chat', ru: 'Начать новый чат', ar: 'بدء محادثة جديدة' }[
                                        locale
                                    ]
                                }
                                onClick={() => resetChat()}
                            >
                                <MessageSquarePlusIcon />
                            </InputGroupButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ de: 'Neuen Chat starten', en: 'Start new chat', ru: 'Начать новый чат', ar: 'بدء محادثة جديدة' }[locale]}
                        </TooltipContent>
                    </Tooltip>
                ) : null
            }
        />
    );
}
