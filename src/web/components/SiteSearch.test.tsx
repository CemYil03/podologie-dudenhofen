import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SiteSearch } from './SiteSearch';

const navigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
    useNavigate: () => navigate,
}));

vi.mock('../hooks/useLocale', () => ({
    useLocale: () => 'de',
}));

vi.mock('../hooks/use-mobile', () => ({
    useIsMobile: () => false,
}));

describe('SiteSearch', () => {
    it('matches "Pilzinfektionen" and routes to the correct leaf via path + hash', async () => {
        // Arrange
        navigate.mockClear();
        const onOpenChange = vi.fn();
        render(<SiteSearch open={true} onOpenChange={onOpenChange} />);
        const input = screen.getByRole('combobox');

        // Act — type the query and confirm Pilzbehandlung is the first surfaced option
        fireEvent.change(input, { target: { value: 'Pilzinfektionen' } });
        const firstOption = await waitFor(() => {
            const options = screen.getAllByRole('option');
            if (options.length === 0) throw new Error('no options surfaced yet');
            return options[0]!;
        });
        expect(firstOption.textContent).toContain('Pilzbehandlung');
        fireEvent.click(firstOption);

        // Assert
        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(navigate).toHaveBeenCalledTimes(1);
        const navArgs = navigate.mock.calls[0]![0];
        // The path must NOT have an embedded hash; the hash flows via the dedicated option
        // so TanStack Router can scroll the target into view.
        expect(navArgs.to).toBe('/leistungen');
        expect(navArgs.hash).toBe('service-haut-pilzbehandlung');
        expect(navArgs.hashScrollIntoView).toBeDefined();
    });

    it('ranks "Anfahrt" as the first surfaced option', async () => {
        // Arrange
        navigate.mockClear();
        render(<SiteSearch open={true} onOpenChange={() => {}} />);

        // Act
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Anfahrt' } });

        // Assert
        const firstOption = await waitFor(() => {
            const options = screen.getAllByRole('option');
            if (options.length === 0) throw new Error('no options surfaced yet');
            return options[0]!;
        });
        expect(firstOption.textContent).toContain('Anfahrt');
    });

    it('renders nothing-found state for a clearly absent query', async () => {
        // Arrange
        navigate.mockClear();
        render(<SiteSearch open={true} onOpenChange={() => {}} />);

        // Act
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'wholly absent search query' } });

        // Assert
        const empty = await screen.findByText('Keine Treffer.');
        expect(empty).toBeTruthy();
        expect(navigate).not.toHaveBeenCalled();
    });
});
