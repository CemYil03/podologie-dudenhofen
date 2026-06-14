import { useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo, useRef } from 'react';
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from './base/command';
import { useIsMobile } from '../hooks/use-mobile';
import { useLocale } from '../hooks/useLocale';
import { SEARCH_TARGET_REVEAL_EVENT } from '../hooks/useSearchTargetHighlight';
import { searchEntryPathname } from '../search/searchEntryPathname';
import { SEARCH_INDEX, SEARCH_PAGE_LABELS } from '../search/searchIndex';
import type { SearchEntry } from '../search/searchIndex';
import { searchEntryScore } from '../search/searchScore';
import type { Locale } from '../utils/locale';

const PLACEHOLDER: Record<Locale, string> = {
    de: 'Suchen Sie eine Seite, einen Abschnitt oder ein Stichwort…',
    en: 'Search a page, section or keyword…',
};

const PLACEHOLDER_MOBILE: Record<Locale, string> = {
    de: 'Seite oder Stichwort suchen…',
    en: 'Search page or keyword…',
};

const EMPTY: Record<Locale, string> = {
    de: 'Keine Treffer.',
    en: 'No results.',
};

const TITLE: Record<Locale, string> = {
    de: 'Seitensuche',
    en: 'Site search',
};

const DESCRIPTION: Record<Locale, string> = {
    de: 'Durchsuchen Sie alle Seiten und Abschnitte dieser Webseite.',
    en: 'Search every page and section on this site.',
};

type SiteSearchProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
    const locale = useLocale();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const listRef = useRef<HTMLDivElement | null>(null);

    // The list is rendered flat (no per-page CommandGroup). cmdk 1.1.1 sorts
    // items by score within a group, but only sorts groups by score via a
    // selector that does not match how page-keyed groups are tagged here, so
    // grouping the list would freeze the page order regardless of relevance.
    // Each item shows its page name as a small inline chip instead.
    const entriesByValue = useMemo(() => {
        const map = new Map<string, SearchEntry>();
        for (const entry of SEARCH_INDEX) map.set(entryValue(entry), entry);
        return map;
    }, []);

    const filter = useCallback(
        (value: string, search: string) => {
            const entry = entriesByValue.get(value);
            if (!entry) return 0;
            return searchEntryScore(entry, search, locale);
        },
        [entriesByValue, locale],
    );

    // cmdk re-sorts the list on every keystroke by `appendChild`-ing each item
    // and then calls `scrollIntoView({ block: 'nearest' })` on the auto-selected
    // item. Both nudge the scroll container downward — across many keystrokes
    // the visible top drifts away from the highest-scoring result. Snap the
    // list back to the top whenever the query changes so the best match is
    // always in view.
    const onInputValueChange = useCallback(() => {
        const list = listRef.current;
        if (list) list.scrollTop = 0;
    }, []);

    function onSelect(entry: SearchEntry) {
        const to = searchEntryPathname(entry.path, locale);
        const hash = entry.sectionId ?? undefined;
        onOpenChange(false);
        // `to` carries the path only — never an embedded `#…`. The hash flows
        // through the dedicated option so TanStack Router can call
        // scrollIntoView() on the matching element after navigation commits.
        navigate({ to, hash, hashScrollIntoView: { behavior: 'smooth', block: 'start' } });
        // Re-trigger the gold pulse even when the visitor selects the same
        // entry twice — the hash is unchanged then, so
        // `useSearchTargetHighlight`'s hash-effect alone would not re-run. The
        // hook listens for this event and re-arms its highlight.
        if (hash) {
            window.dispatchEvent(new CustomEvent(SEARCH_TARGET_REVEAL_EVENT, { detail: { hash } }));
        }
    }

    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
            title={TITLE[locale]}
            description={DESCRIPTION[locale]}
            showCloseButton={false}
            commandProps={{ filter }}
        >
            <CommandInput placeholder={(isMobile ? PLACEHOLDER_MOBILE : PLACEHOLDER)[locale]} onValueChange={onInputValueChange} />
            <CommandList ref={listRef}>
                <CommandEmpty>{EMPTY[locale]}</CommandEmpty>
                {SEARCH_INDEX.map((entry) => (
                    <CommandItem key={entryValue(entry)} value={entryValue(entry)} onSelect={() => onSelect(entry)}>
                        <div className="flex w-full items-start justify-between gap-3">
                            <div className="flex flex-col gap-0.5">
                                <span className="font-medium text-aubergine-dark">{entry.title[locale]}</span>
                                <span className="text-xs text-(--color-brand-charcoal-3)">{entry.description[locale]}</span>
                            </div>
                            <span className="shrink-0 rounded bg-cream px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-(--color-brand-charcoal-3)">
                                {SEARCH_PAGE_LABELS[entry.path][locale]}
                            </span>
                        </div>
                    </CommandItem>
                ))}
            </CommandList>
        </CommandDialog>
    );
}

// Stable lowercase key — also serves as the cmdk `value` for each item, so the
// custom filter can look the entry up by it. cmdk lowercases values internally,
// so we lowercase up front to keep the lookup consistent.
function entryValue(entry: SearchEntry): string {
    return `${entry.path}#${entry.sectionId ?? ''}`.toLowerCase();
}
