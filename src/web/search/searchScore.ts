import { defaultFilter } from 'cmdk';
import type { SearchEntry } from './searchIndex';
import { searchEntryHaystack } from './searchIndex';
import type { Locale } from '../utils/locale';

// Field-aware ranking for site search. cmdk's default scorer treats every
// character of an item's value identically — a long description's fuzzy match
// can outrank an entry literally titled with the query. This helper expresses
// what users actually expect: title and curated keywords beat description
// matches, exact hits beat prefix hits, and a fuzzy fallback still surfaces
// near-misses without ever beating a literal hit.
//
// Returns a score in [0, 1]. cmdk uses any value > 0 as "include" and sorts
// items within a group, then groups, by descending score.

const TIER_TITLE_EXACT = 1.0;
const TIER_KEYWORD_EXACT = 0.95;
const TIER_TITLE_PREFIX = 0.9;
const TIER_TITLE_WORD_PREFIX = 0.85;
const TIER_KEYWORD_PREFIX = 0.75;
const TIER_TITLE_CONTAINS = 0.6;
const TIER_KEYWORD_CONTAINS = 0.5;
const TIER_DESCRIPTION_CONTAINS = 0.3;
const FUZZY_CEILING = 0.25;

export function searchEntryScore(entry: SearchEntry, query: string, locale: Locale): number {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return TIER_TITLE_EXACT; // empty query → keep everything visible

    const title = entry.title[locale].toLowerCase();
    const description = entry.description[locale].toLowerCase();
    const keywords = (entry.keywords?.[locale] ?? []).map((k) => k.toLowerCase());

    if (title === q) return TIER_TITLE_EXACT;
    if (keywords.includes(q)) return TIER_KEYWORD_EXACT;
    if (title.startsWith(q)) return TIER_TITLE_PREFIX;
    if (titleWordStartsWith(title, q)) return TIER_TITLE_WORD_PREFIX;
    if (keywords.some((k) => k.startsWith(q))) return TIER_KEYWORD_PREFIX;
    if (title.includes(q)) return TIER_TITLE_CONTAINS;
    if (keywords.some((k) => k.includes(q))) return TIER_KEYWORD_CONTAINS;
    if (description.includes(q)) return TIER_DESCRIPTION_CONTAINS;

    // Fuzzy fallback for typos. Capped well below any literal hit so a
    // near-miss can never outrank a real one.
    const fuzzy = defaultFilter(searchEntryHaystack(entry, locale), q);
    return fuzzy > 0 ? fuzzy * FUZZY_CEILING : 0;
}

function titleWordStartsWith(title: string, query: string): boolean {
    for (const word of title.split(/[\s,;:]+/)) {
        if (word.startsWith(query)) return true;
    }
    return false;
}
