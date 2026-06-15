import * as React from 'react';
import { cn } from '../../utils/cn';

// `field-sizing: content` makes the textarea auto-grow with its content. In
// that mode the native `rows` attribute becomes the minimum visible rows, and
// growth is unbounded unless capped with `max-height`. The two props below
// expose those ends explicitly so callers don't have to reason about it:
//   - minRows → floor; rendered while the textarea is empty/short
//   - maxRows → ceiling; once content exceeds this height, the textarea
//     scrolls internally instead of growing further
// The box-sizing math (`maxRows * 1lh + py + border`) keeps the cap accurate
// regardless of the surrounding font-size, since `1lh` resolves to the
// element's own computed line-height.
interface TextareaProps extends Omit<React.ComponentProps<'textarea'>, 'rows'> {
    /** Minimum visible rows when empty/short. Defaults to 3. */
    minRows?: number;
    /** Maximum visible rows before the textarea starts scrolling. Unbounded by default. */
    maxRows?: number;
}

function Textarea({ className, minRows = 3, maxRows, style, ...props }: TextareaProps) {
    const maxHeight = maxRows !== undefined ? `calc(${maxRows} * 1lh + 1rem + 2px)` : undefined;
    return (
        <textarea
            data-slot="textarea"
            rows={minRows}
            style={maxHeight ? { ...style, maxHeight } : style}
            className={cn(
                'flex field-sizing-content w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm',
                maxRows !== undefined && 'overflow-y-auto',
                className,
            )}
            {...props}
        />
    );
}

export { Textarea };
export type { TextareaProps };
