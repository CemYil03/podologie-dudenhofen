import * as React from 'react';
import { format } from 'date-fns';
import type { Locale as DateFnsLocale } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '../../utils/cn';

type DateRangePickerProps = {
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
    formatStr?: string;
    locale?: DateFnsLocale;
    numberOfMonths?: number;
    className?: string;
    disabled?: boolean;
    align?: React.ComponentProps<typeof PopoverContent>['align'];
};

function DateRangePicker({
    value,
    onChange,
    placeholder = 'Pick a date',
    formatStr = 'LLL dd, y',
    locale,
    numberOfMonths = 2,
    className,
    disabled,
    align = 'start',
}: DateRangePickerProps) {
    const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(value);
    const isControlled = onChange !== undefined;
    const range = isControlled ? value : internalRange;

    const handleSelect = (next: DateRange | undefined) => {
        if (!isControlled) setInternalRange(next);
        onChange?.(next);
    };

    const formatOptions = locale ? { locale } : undefined;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!range?.from}
                    disabled={disabled}
                    className={cn('justify-start px-2.5 text-left font-normal data-[empty=true]:text-muted-foreground', className)}
                >
                    <CalendarIcon />
                    {range?.from ? (
                        range.to ? (
                            <>
                                {format(range.from, formatStr, formatOptions)} – {format(range.to, formatStr, formatOptions)}
                            </>
                        ) : (
                            format(range.from, formatStr, formatOptions)
                        )
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align={align}>
                <Calendar
                    mode="range"
                    defaultMonth={range?.from}
                    selected={range}
                    onSelect={handleSelect}
                    numberOfMonths={numberOfMonths}
                    locale={locale}
                />
            </PopoverContent>
        </Popover>
    );
}

export { DateRangePicker };
export type { DateRangePickerProps };
