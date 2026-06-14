import * as React from 'react';
import { cn } from '../utils/cn';

/**
 * Fades + lifts its children once when they enter the viewport. See
 * docs/style/motion.md for the rationale and the reduced-motion contract.
 *
 * SSR renders the hidden state. On hydration, in-view elements reveal
 * immediately (the observer fires synchronously); below-the-fold elements
 * reveal as the visitor scrolls. Once revealed, the observer disconnects —
 * scrolling back never re-plays the animation.
 *
 * If the visitor has `prefers-reduced-motion: reduce`, or has JS disabled
 * (see the `@media (scripting: none)` rule in src/styles.css), the content
 * is shown immediately with no transform.
 */
export function Reveal({
    children,
    delayMs = 0,
    as: As = 'div',
    className,
}: {
    children: React.ReactNode;
    delayMs?: number;
    as?: React.ElementType;
    className?: string;
}) {
    const ref = React.useRef<HTMLElement>(null);
    const [revealed, setRevealed] = React.useState(false);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setRevealed(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setRevealed(true);
                        observer.disconnect();
                        break;
                    }
                }
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <As
            ref={ref}
            data-reveal=""
            data-revealed={revealed ? '' : undefined}
            style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
            className={cn(
                'translate-y-2 opacity-0 transition-[opacity,transform] duration-500 ease-out',
                'data-[revealed]:translate-y-0 data-[revealed]:opacity-100',
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
                className,
            )}
        >
            {children}
        </As>
    );
}
