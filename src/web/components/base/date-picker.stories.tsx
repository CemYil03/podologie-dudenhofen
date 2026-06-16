import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './date-picker';

const meta = {
    title: 'Base/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <DatePicker />,
};

export const WithInitialValue: Story = {
    render: () => <DatePicker value={new Date()} />,
};

export const Controlled: Story = {
    render: () => {
        const [date, setDate] = React.useState<Date | undefined>();
        return (
            <div className="flex flex-col gap-2">
                <DatePicker value={date} onChange={setDate} />
                <p className="text-sm text-muted-foreground">Selected: {date ? date.toDateString() : 'none'}</p>
            </div>
        );
    },
};

export const CustomPlaceholder: Story = {
    render: () => <DatePicker placeholder="Select appointment date" />,
};

export const Disabled: Story = {
    render: () => <DatePicker disabled />,
};
