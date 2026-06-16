import * as React from 'react';
import { addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker } from './date-range-picker';

const meta = {
    title: 'Base/DateRangePicker',
    component: DateRangePicker,
    tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <DateRangePicker className="w-72" />,
};

export const WithInitialRange: Story = {
    render: () => {
        const today = new Date();
        return <DateRangePicker className="w-72" value={{ from: today, to: addDays(today, 7) }} />;
    },
};

export const Controlled: Story = {
    render: () => {
        const [range, setRange] = React.useState<DateRange | undefined>();
        return (
            <div className="flex flex-col gap-2">
                <DateRangePicker className="w-72" value={range} onChange={setRange} />
                <p className="text-sm text-muted-foreground">
                    {range?.from ? range.from.toDateString() : 'none'} → {range?.to ? range.to.toDateString() : 'none'}
                </p>
            </div>
        );
    },
};

export const GermanLocale: Story = {
    render: () => <DateRangePicker className="w-72" locale={de} placeholder="Zeitraum wählen" />,
};

export const SingleMonth: Story = {
    render: () => <DateRangePicker className="w-72" numberOfMonths={1} />,
};

export const Disabled: Story = {
    render: () => <DateRangePicker className="w-72" disabled />,
};
