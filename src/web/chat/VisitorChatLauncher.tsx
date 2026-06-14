import { useLocation } from '@tanstack/react-router';
import { MessageCircleIcon } from 'lucide-react';
import { useLocale } from '../hooks/useLocale';
import { useVisitorChat } from './VisitorChatProvider';

// Floating round button at the bottom-right of every public page (bottom-left
// in RTL via the `end-6` logical utility). Hidden under `/admin/*` — the admin
// chat owns its own surface and the visitor widget would just compete with it.
// See `docs/features/chat-visitor.md`.

export function VisitorChatLauncher() {
    const { isOpen, setOpen } = useVisitorChat();
    const location = useLocation();
    const locale = useLocale();
    if (location.pathname.includes('/admin/')) return null;
    // While the sheet is open the floating button would sit underneath its
    // overlay anyway; hiding it explicitly avoids a momentary "stacked button"
    // glimpse during the slide-in animation.
    if (isOpen) return null;

    return (
        <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={
                {
                    de: 'Assistent öffnen',
                    en: 'Open assistant',
                    ru: 'Открыть ассистента',
                    ar: 'فتح المساعد',
                }[locale]
            }
            className="fixed bottom-4 inset-e-4 sm:bottom-6 sm:inset-e-6 z-40 flex size-14 items-center justify-center rounded-full bg-aubergine text-cream shadow-lg transition-transform duration-150 ease-out hover:bg-aubergine-dark hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
            <MessageCircleIcon className="size-6" aria-hidden />
        </button>
    );
}
