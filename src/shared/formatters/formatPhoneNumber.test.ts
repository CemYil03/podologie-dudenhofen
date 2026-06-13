import { describe, it, expect } from 'vitest';
import { formatPhoneNumber } from './formatPhoneNumber';

describe('formatPhoneNumber', () => {
    it('formats a German E.164 number with a 4-digit area code', () => {
        // Arrange
        const raw = '+496232621064';

        // Act
        const result = formatPhoneNumber(raw);

        // Assert
        expect(result).toBe('+49 6232 621064');
    });

    it('strips whitespace, parentheses, dots and hyphens before formatting', () => {
        // Arrange
        const raw = '+49 (6232) 621-064';

        // Act
        const result = formatPhoneNumber(raw);

        // Assert
        expect(result).toBe('+49 6232 621064');
    });

    it('groups a non-German country code as a single national block', () => {
        // Arrange
        const raw = '+12025550123';

        // Act
        const result = formatPhoneNumber(raw);

        // Assert
        expect(result).toBe('+1 2025550123');
    });

    it('returns the input verbatim when it is not valid E.164', () => {
        // Arrange
        const raw = '0049 6232 621064';

        // Act
        const result = formatPhoneNumber(raw);

        // Assert
        expect(result).toBe('0049 6232 621064');
    });
});
