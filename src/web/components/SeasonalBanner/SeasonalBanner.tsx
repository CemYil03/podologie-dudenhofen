import { FlowerIcon, HeartIcon, SnowflakeIcon, SparklesIcon, SunIcon, TreesIcon, WheatIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Locale } from '../../utils/locale';
import { seasonalNow } from '../seasonalNow';
import { seasonalBannerResolve } from './seasonalBannerResolve';
import { SEASONAL_BANNER_CONTENT } from './seasonalContent';
import type { SeasonalIcon } from './seasonalContent';

// Date-driven seasonal banner. Renders nothing during the deliberate gaps
// (mid-March, late October/November, etc.) — see `seasonalBannerResolve`.
//
// Suppressed when an active vacation banner is already showing on the same
// page; the home page passes that decision in via `isSuppressed` so we
// don't run the resolver hook conditionally and don't break SSR/CSR
// markup parity.
//
// Dismissal is sessionStorage-scoped (per-tab). Vacation banners use the
// same shape but are not dismissible.

const DISMISS_KEY_PREFIX = 'seasonal-banner-dismissed:';

export function SeasonalBanner({ locale, isSuppressed = false }: { locale: Locale; isSuppressed?: boolean }) {
    const [now, setNow] = useState<Date | null>(null);
    const [isDismissed, setIsDismissed] = useState(false);

    // Defer date resolution to the client so the SSR HTML never embeds a
    // banner the client would then have to suppress. The brief flicker —
    // banner appears one paint after hydration — is preferable to a
    // hydration-mismatch warning when the server's clock is in a different
    // window than the user's.
    useEffect(() => {
        setNow(seasonalNow());
    }, []);

    const kind = !isSuppressed && now ? seasonalBannerResolve(now) : null;

    useEffect(() => {
        if (!kind) return;
        // The `?seasonalDate=...` preview override also bypasses the
        // sessionStorage dismissal — so a developer iterating on copy
        // doesn't keep seeing an empty page after one accidental click.
        const isPreview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('seasonalDate');
        if (isPreview) {
            setIsDismissed(false);
            return;
        }
        const dismissed = sessionStorage.getItem(`${DISMISS_KEY_PREFIX}${kind}`) === 'true';
        setIsDismissed(dismissed);
    }, [kind]);

    if (!kind || isDismissed) return null;

    const content = SEASONAL_BANNER_CONTENT[kind];
    const { icon, copy } = content;
    const localized = copy[locale];
    const headline = localized.headline;
    const body = localized.body;
    const Icon = ICONS[icon];

    function handleDismiss() {
        sessionStorage.setItem(`${DISMISS_KEY_PREFIX}${kind}`, 'true');
        setIsDismissed(true);
    }

    return (
        <aside aria-live="polite" className="border-b border-aubergine/10 bg-cream">
            <div className="mx-auto flex max-w-5xl items-start gap-3 px-6 py-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-aubergine" aria-hidden />
                <div className="flex-1 text-sm">
                    <p className="font-medium text-aubergine-dark">{headline}</p>
                    <p className="mt-0.5 text-(--color-brand-charcoal-2)">{body}</p>
                </div>
                <button
                    type="button"
                    onClick={handleDismiss}
                    className="-m-1 rounded p-1 text-(--color-brand-charcoal-3) transition-colors hover:bg-aubergine/5 hover:text-aubergine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40 cursor-pointer"
                    aria-label={DISMISS_LABEL[locale]}
                >
                    <XIcon className="size-4" aria-hidden />
                </button>
            </div>
        </aside>
    );
}

const ICONS: Record<SeasonalIcon, typeof SnowflakeIcon> = {
    snowflake: SnowflakeIcon,
    pine: TreesIcon,
    sparkles: SparklesIcon,
    flower: FlowerIcon,
    heart: HeartIcon,
    sun: SunIcon,
    wheat: WheatIcon,
};

const DISMISS_LABEL: Record<Locale, string> = {
    de: 'Hinweis schließen',
    en: 'Dismiss',
    ru: 'Закрыть',
    ar: 'إغلاق',
};
