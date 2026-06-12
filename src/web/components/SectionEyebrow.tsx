import * as React from 'react';
import { cn } from '../utils/cn';

/**
 * The canonical section header pattern: a small uppercase sage label in the
 * mono face, paired with a thin horizontal rule. See docs/style/patterns.md.
 *
 * Use one per major section. The label is letter-spaced and rendered in
 * uppercase regardless of the input casing.
 */
export function SectionEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-sage">{children}</span>
            <span aria-hidden className="h-px flex-1 bg-sage/40" />
        </div>
    );
}
