import * as React from 'react';
import { format } from 'date-fns';
import type { Locale as DateFnsLocale } from 'date-fns/locale';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '../../utils/cn';

type DatePickerProps = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    formatStr?: string;
    locale?: DateFnsLocale;
    className?: string;
    disabled?: boolean;
    align?: React.ComponentProps<typeof PopoverContent>['align'];
};

function DatePicker({
    value,
    onChange,
    placeholder = 'Pick a date',
    formatStr = 'PPP',
    locale,
    className,
    disabled,
    align = 'start',
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(value);
    const isControlled = onChange !== undefined;
    const date = isControlled ? value : internalDate;

    const handleSelect = (next: Date | undefined) => {
        if (!isControlled) setInternalDate(next);
        onChange?.(next);
        if (next) setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    disabled={disabled}
                    className={cn('w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground', className)}
                >
                    {date ? format(date, formatStr, locale ? { locale } : undefined) : <span>{placeholder}</span>}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align={align}>
                <Calendar mode="single" selected={date} onSelect={handleSelect} defaultMonth={date} locale={locale} />
            </PopoverContent>
        </Popover>
    );
}

export { DatePicker };
export type { DatePickerProps };
