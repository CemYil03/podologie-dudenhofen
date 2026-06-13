/**
 * Format an E.164 phone number for display.
 *
 * Phone numbers are stored and passed around in raw E.164 form
 * (`+<countryCode><nationalNumber>`, digits only after the `+`). That same
 * value is a valid `tel:` URI per RFC 3966 — there is no need to keep a
 * separate "machine" representation. This function turns the raw value into
 * the human-readable form for rendering.
 *
 * Whitespace, parentheses, dots, and hyphens in the input are stripped before
 * parsing, so values copied from the wild still work. An input that doesn't
 * match E.164 is returned verbatim so a malformed number is visible rather
 * than silently dropped.
 *
 * Country codes cannot be disambiguated from prefix length alone (`+1` US vs
 * `+12` is ambiguous without context), so we keep a small table of codes the
 * site actually uses and fall back to the longest plausible prefix. When a
 * new country shows up, add it here rather than tweaking the heuristic.
 *
 * For German numbers (`+49`) the national portion is split into a 4-digit
 * area code and the subscriber number — this matches the local geographic
 * pattern (e.g. `+49 6232 621064` for Dudenhofen). Major-city numbers use
 * shorter area codes (Berlin `30`, Munich `89`, Hamburg `40`, …); when one of
 * those is added the heuristic should be revisited.
 */
const COUNTRY_CODES = ['49', '1'] as const;

export function formatPhoneNumber(raw: string): string {
    const cleaned = raw.replace(/[\s().-]/g, '');
    if (!/^\+\d+$/.test(cleaned)) return raw;

    const digits = cleaned.slice(1);
    const countryCode = COUNTRY_CODES.find((code) => digits.startsWith(code));
    if (!countryCode) return raw;

    const nationalNumber = digits.slice(countryCode.length);
    if (nationalNumber.length === 0) return raw;

    if (countryCode === '49' && nationalNumber.length > 4) {
        const areaCode = nationalNumber.slice(0, 4);
        const subscriber = nationalNumber.slice(4);
        return `+${countryCode} ${areaCode} ${subscriber}`;
    }

    return `+${countryCode} ${nationalNumber}`;
}
