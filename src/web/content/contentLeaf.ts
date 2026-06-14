import type { LucideIcon } from 'lucide-react';
import type { Locale } from '../utils/locale';

export type LocaleString = Record<Locale, string>;

/**
 * A single searchable card on a page. The `id` doubles as the DOM element id
 * (so URL fragments scroll directly to it and the `:target` highlight fires)
 * and as the `sectionId` of the auto-derived search index entry. See
 * docs/architecture/page-content-modules.md.
 */
export type ContentLeaf = {
    id: string;
    icon?: LucideIcon;
    heading: LocaleString;
    body: LocaleString;
    keywords?: Record<Locale, ReadonlyArray<string>>;
};
