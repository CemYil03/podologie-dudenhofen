import { useEffect } from 'react';

// Listens for Cmd/Ctrl+K and invokes the callback. Stops the browser's
// default focus-on-location-bar shortcut.
export function useGlobalSearchShortcut(onTrigger: () => void) {
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                onTrigger();
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onTrigger]);
}
