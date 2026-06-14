import { useLocation, useNavigate } from '@tanstack/react-router';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { DEFAULT_LOCALE, LOCALES } from '../utils/locale';
import type { Locale } from '../utils/locale';
import { useLocale } from '../hooks/useLocale';
import { cn } from '../utils/cn';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './base/dropdown-menu';

// The language is shown in its own language ("Deutsch", "English", "Русский",
// "العربية") so a visitor who landed in the wrong locale can find their way
// back without having to read the current one.
const LOCALE_NATIVE_NAME: Record<Locale, string> = {
    de: 'Deutsch',
    en: 'English',
    ru: 'Русский',
    ar: 'العربية',
};

const TRIGGER_ARIA_LABEL: Record<Locale, string> = {
    de: 'Sprache wechseln',
    en: 'Change language',
    ru: 'Сменить язык',
    ar: 'تغيير اللغة',
};

function setLocaleCookie(locale: Locale) {
    document.cookie = `locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function buildLocalePath(pathname: string, currentLocale: Locale, targetLocale: Locale): string {
    const pathWithoutLocale = currentLocale !== DEFAULT_LOCALE ? pathname.replace(`/${currentLocale}`, '') || '/' : pathname;
    if (targetLocale === DEFAULT_LOCALE) return pathWithoutLocale;
    return `/${targetLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
}

export function LanguageSwitcher() {
    const currentLocale = useLocale();
    const location = useLocation();
    const navigate = useNavigate();

    function switchTo(locale: Locale) {
        setLocaleCookie(locale);
        navigate({ to: buildLocalePath(location.pathname, currentLocale, locale) });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label={TRIGGER_ARIA_LABEL[currentLocale]}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-aubergine/20 px-2.5 py-1.5 text-sm font-medium text-aubergine transition-colors hover:bg-aubergine hover:text-cream focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:outline-none md:px-3"
            >
                {/* Mobile: two-letter code only — no room for the full name. */}
                <span className="font-mono text-xs whitespace-nowrap uppercase tracking-wider md:hidden">{currentLocale}</span>
                {/* Desktop: native language name — collapsing to a code adds nothing once there's room. */}
                <span className="hidden whitespace-nowrap md:inline">{LOCALE_NATIVE_NAME[currentLocale]}</span>
                <ChevronDownIcon className="size-3.5 opacity-70" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36 border-aubergine/10 bg-cream">
                {LOCALES.map((locale) => {
                    const isActive = locale === currentLocale;
                    return (
                        <DropdownMenuItem
                            key={locale}
                            onSelect={() => switchTo(locale)}
                            className={cn('text-aubergine-dark focus:bg-aubergine/10 focus:text-aubergine-dark', isActive && 'font-medium')}
                        >
                            <span className="flex-1">{LOCALE_NATIVE_NAME[locale]}</span>
                            {isActive && <CheckIcon className="size-4 text-aubergine" aria-hidden />}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
