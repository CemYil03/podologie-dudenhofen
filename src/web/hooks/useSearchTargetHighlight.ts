import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

/**
 * Custom event the site-search dialog dispatches after `navigate()` so the
 * highlight re-fires when the visitor selects the same leaf card twice in a
 * row — that case keeps `location.hash` identical, so the hook's
 * hash-change effect alone would miss it.
 */
export const SEARCH_TARGET_REVEAL_EVENT = 'search-target-reveal';

/**
 * Drives the gold-pulse highlight on a leaf card the visitor reached via the
 * site-search dialog (or any URL that points at a `.search-target` id).
 *
 * Why this exists instead of a plain CSS `:target` rule:
 *
 * 1. **Pulse timing.** The cards sit inside `<Reveal>` (opacity-0 → opacity-1
 *    once they intersect the viewport) and the router `hashScrollIntoView`s
 *    with `behavior: 'smooth'`. A pure CSS `:target` animation fires the
 *    moment the hash flips — while the card is still below the fold and
 *    faded out — so the 1.5 s pulse plays out invisibly on SPA navigation.
 *    Hard reloads happen to work because the browser jumps to the hash
 *    instantly with no smooth scroll. The hook waits (via IntersectionObserver)
 *    until the card is actually on screen before flipping
 *    `data-search-target-active`, which drives the keyframes.
 * 2. **Outline persistence on same-page hash change.** Browsers do not
 *    reliably re-evaluate `:target` when the URL hash changes via
 *    `history.pushState` (Chrome and Firefox both leave it stuck on the
 *    previous element). Searching twice while staying on the same page kept
 *    the gold ring on the first match. The hook drives the outline through
 *    `data-search-target-current` instead, set on the matched element and
 *    cleared off the previous one whenever the hash changes.
 */
export function useSearchTargetHighlight() {
    const hash = useLocation({ select: (l) => l.hash });

    useEffect(() => {
        if (typeof document === 'undefined') return;

        let pulseTimeout: number | undefined;
        let observer: IntersectionObserver | undefined;
        let waitFrame: number | undefined;
        // The element the *outline* sits on — set the moment the hash matches a
        // `.search-target`, cleared as soon as the hash points elsewhere.
        let currentEl: HTMLElement | undefined;
        // The element the *pulse* is running on — usually the same as
        // `currentEl`, but tracked separately so cleanup can find it even if
        // the hash flips mid-animation.
        let activeEl: HTMLElement | undefined;

        function clearActive() {
            if (pulseTimeout !== undefined) {
                window.clearTimeout(pulseTimeout);
                pulseTimeout = undefined;
            }
            observer?.disconnect();
            observer = undefined;
            activeEl?.removeAttribute('data-search-target-active');
            activeEl = undefined;
        }

        function clearCurrent() {
            currentEl?.removeAttribute('data-search-target-current');
            currentEl = undefined;
        }

        function clearWait() {
            if (waitFrame !== undefined) {
                cancelAnimationFrame(waitFrame);
                waitFrame = undefined;
            }
        }

        function applyHighlight(el: HTMLElement) {
            // Outline: move it onto the new element immediately. This is what
            // `:target` used to do — but `:target` doesn't update on
            // pushState-driven hash changes in current browsers, so the
            // previous match would keep its ring.
            if (currentEl && currentEl !== el) clearCurrent();
            currentEl = el;
            el.setAttribute('data-search-target-current', '');

            // Pulse: tear down any in-flight animation and rearm. Wait until
            // the target enters the viewport — the smooth scroll started by
            // `hashScrollIntoView` needs ~300–600 ms and the <Reveal> wrapper
            // needs to fade the card in. IntersectionObserver fires once with
            // the current state on observe(), so a not-yet-visible element
            // gets a pending entry we can wait on.
            clearActive();
            activeEl = el;
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            observer?.disconnect();
                            observer = undefined;
                            // Force-restart the animation if the attribute is
                            // already present from a previous trigger on the
                            // same element. Reading offsetWidth flushes
                            // pending style changes so re-adding the attribute
                            // restarts the keyframes.
                            el.removeAttribute('data-search-target-active');
                            void el.offsetWidth;
                            el.setAttribute('data-search-target-active', '');
                            pulseTimeout = window.setTimeout(() => {
                                el.removeAttribute('data-search-target-active');
                                if (activeEl === el) activeEl = undefined;
                            }, 1500);
                            break;
                        }
                    }
                },
                { threshold: 0.25 },
            );
            observer.observe(el);
        }

        function trigger(rawId: string) {
            clearWait();
            if (!rawId) {
                clearActive();
                clearCurrent();
                return;
            }
            // Strip a leading '#' if the router ever decides to include it; today
            // it does not, but the `location.hash` contract is ambiguous enough
            // across libraries that we normalize here.
            const id = rawId.startsWith('#') ? rawId.slice(1) : rawId;

            // The element may not be in the DOM yet — when the visitor selects
            // a result that lives on another page, this effect runs before the
            // new route component has mounted. Poll across animation frames
            // (~2 s budget at 60 fps) until either the target appears or we
            // give up. The hash-change effect fires synchronously on
            // `navigate()`, so without this wait the initial highlight is lost
            // for cross-page hits.
            const deadline = 120;
            let attempts = 0;

            const tryFind = () => {
                const el = document.getElementById(id);
                if (el && el.classList.contains('search-target')) {
                    waitFrame = undefined;
                    applyHighlight(el);
                    return;
                }
                if (attempts++ >= deadline) {
                    waitFrame = undefined;
                    // Element never appeared — make sure stale highlights from
                    // the previous match are gone.
                    clearActive();
                    clearCurrent();
                    return;
                }
                waitFrame = requestAnimationFrame(tryFind);
            };

            tryFind();
        }

        function onCustom(event: Event) {
            const detail = (event as CustomEvent<{ hash?: string }>).detail;
            if (detail.hash) trigger(detail.hash);
        }

        trigger(hash);
        window.addEventListener(SEARCH_TARGET_REVEAL_EVENT, onCustom);
        return () => {
            window.removeEventListener(SEARCH_TARGET_REVEAL_EVENT, onCustom);
            clearWait();
            clearActive();
            clearCurrent();
        };
    }, [hash]);
}
