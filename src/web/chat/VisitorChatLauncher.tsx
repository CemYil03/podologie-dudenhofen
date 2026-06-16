import { MessageCircleIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/base/tooltip';
import { useLocale } from '../hooks/useLocale';
import { useVisitorChat } from './VisitorChatProvider';

// Floating round button at the bottom-right of every public page (bottom-left
// in RTL via the `end-6` logical utility). Not reachable under `/admin/*` —
// `LocaleLayout` does not mount `VisitorChatProvider` there, so the launcher
// never renders on those routes (see `docs/architecture/admin-chrome.md`).
// See `docs/features/chat-visitor.md`.

const OPEN_LABEL: Record<string, string> = {
    de: 'Assistent öffnen',
    en: 'Open assistant',
    ru: 'Открыть ассистента',
    ar: 'فتح المساعد',
};

export function VisitorChatLauncher() {
    const { isOpen, setOpen } = useVisitorChat();
    const locale = useLocale();
    // While the sheet is open the floating button would sit underneath its
    // overlay anyway; hiding it explicitly avoids a momentary "stacked button"
    // glimpse during the slide-in animation.
    if (isOpen) return null;

    const label = OPEN_LABEL[locale] ?? OPEN_LABEL.de;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={label}
                    className="fixed bottom-4 inset-e-4 sm:bottom-6 sm:inset-e-6 z-40 flex size-14 cursor-pointer items-center justify-center rounded-full bg-aubergine text-cream shadow-lg transition-transform duration-150 ease-out hover:bg-aubergine-dark hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                    <MessageCircleIcon className="size-6" aria-hidden />
                </button>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={6}>
                {label}
            </TooltipContent>
        </Tooltip>
    );
}
