import { Link, useLocation } from '@tanstack/react-router';
import { MenuIcon, PhoneIcon, SearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { useGlobalSearchShortcut } from '../hooks/useGlobalSearchShortcut';
import { useLocale } from '../hooks/useLocale';
import { PRACTICE } from '../practice';
import { cn } from '../utils/cn';
import { Button } from './base/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './base/sheet';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SiteSearch } from './SiteSearch';

type NavItem = {
    to: '/{-$locale}/praxis' | '/{-$locale}/leistungen' | '/{-$locale}/qualifikation' | '/{-$locale}/karriere' | '/{-$locale}/kontakt';
    label: { de: string; en: string; ru: string; ar: string };
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
    { to: '/{-$locale}/praxis', label: { de: 'Praxis', en: 'Practice', ru: 'Практика', ar: 'العيادة' } },
    { to: '/{-$locale}/leistungen', label: { de: 'Leistungen', en: 'Services', ru: 'Услуги', ar: 'الخدمات' } },
    { to: '/{-$locale}/qualifikation', label: { de: 'Qualifikation', en: 'Credentials', ru: 'Квалификация', ar: 'المؤهلات' } },
    { to: '/{-$locale}/karriere', label: { de: 'Karriere', en: 'Careers', ru: 'Карьера', ar: 'الوظائف' } },
    { to: '/{-$locale}/kontakt', label: { de: 'Kontakt', en: 'Contact', ru: 'Контакт', ar: 'اتصل بنا' } },
];

export function SiteHeader() {
    const locale = useLocale();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const openSearch = useCallback(() => setSearchOpen(true), []);
    useGlobalSearchShortcut(openSearch);

    return (
        <header className="sticky top-0 z-50 border-b border-aubergine/10 bg-cream/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-6 md:py-4">
                <Link
                    to="/{-$locale}"
                    className="min-w-0 truncate font-serif text-base font-semibold tracking-tight whitespace-nowrap text-aubergine-dark md:text-lg"
                >
                    {PRACTICE.name}
                </Link>

                {/* Desktop nav */}
                <nav
                    aria-label={{ de: 'Hauptnavigation', en: 'Main navigation', ru: 'Основная навигация', ar: 'التنقل الرئيسي' }[locale]}
                    className="hidden items-center gap-1 lg:flex"
                >
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname.endsWith(item.to.replace('/{-$locale}', ''));
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={cn(
                                    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-aubergine/10 text-aubergine-dark'
                                        : 'text-(--color-brand-charcoal-2) hover:bg-aubergine/5 hover:text-aubergine',
                                )}
                            >
                                {item.label[locale]}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
                    <button
                        type="button"
                        onClick={openSearch}
                        aria-label={{ de: 'Seite durchsuchen', en: 'Search the site', ru: 'Поиск по сайту', ar: 'البحث في الموقع' }[locale]}
                        className="inline-flex items-center gap-2 rounded-full border border-aubergine/20 px-2.5 py-1.5 text-sm font-medium text-aubergine transition-colors hover:bg-aubergine hover:text-cream focus-visible:ring-2 focus-visible:ring-aubergine/40 focus-visible:outline-none md:px-3"
                    >
                        <SearchIcon className="size-4" aria-hidden />
                        <span className="hidden md:inline">{{ de: 'Suchen', en: 'Search', ru: 'Поиск', ar: 'بحث' }[locale]}</span>
                    </button>
                    <a
                        href={`tel:${PRACTICE.phone}`}
                        className="hidden items-center gap-2 rounded-full border border-aubergine/20 px-3 py-1.5 text-sm font-medium text-aubergine transition-colors hover:bg-aubergine hover:text-cream md:inline-flex"
                        aria-label={
                            { de: 'Praxis anrufen', en: 'Call the practice', ru: 'Позвонить в практику', ar: 'الاتصال بالعيادة' }[locale]
                        }
                    >
                        <PhoneIcon className="size-4" aria-hidden />
                        <span>{formatPhoneNumber(PRACTICE.phone)}</span>
                    </a>
                    <LanguageSwitcher />

                    {/* Mobile trigger */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                aria-label={{ de: 'Menü öffnen', en: 'Open menu', ru: 'Открыть меню', ar: 'فتح القائمة' }[locale]}
                            >
                                <MenuIcon className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-cream">
                            <SheetHeader>
                                <SheetTitle className="font-serif text-aubergine-dark">
                                    {{ de: 'Navigation', en: 'Navigation', ru: 'Навигация', ar: 'التنقل' }[locale]}
                                </SheetTitle>
                            </SheetHeader>
                            <nav
                                aria-label={
                                    { de: 'Hauptnavigation', en: 'Main navigation', ru: 'Основная навигация', ar: 'التنقل الرئيسي' }[locale]
                                }
                                className="flex flex-col gap-1 px-4"
                            >
                                <SheetClose asChild>
                                    <button
                                        type="button"
                                        onClick={openSearch}
                                        className="flex items-center gap-2 rounded-md px-3 py-3 text-left text-base font-medium text-aubergine-dark hover:bg-aubergine/10"
                                    >
                                        <SearchIcon className="size-4" aria-hidden />
                                        {{ de: 'Suchen', en: 'Search', ru: 'Поиск', ar: 'بحث' }[locale]}
                                    </button>
                                </SheetClose>
                                {NAV_ITEMS.map((item) => (
                                    <SheetClose asChild key={item.to}>
                                        <Link
                                            to={item.to}
                                            className="rounded-md px-3 py-3 text-base font-medium text-aubergine-dark hover:bg-aubergine/10"
                                        >
                                            {item.label[locale]}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                            <div className="mt-auto border-t border-aubergine/10 p-4">
                                <a
                                    href={`tel:${PRACTICE.phone}`}
                                    className="flex items-center justify-center gap-2 rounded-full bg-aubergine px-4 py-3 text-sm font-medium text-cream"
                                >
                                    <PhoneIcon className="size-4" aria-hidden />
                                    <span>{formatPhoneNumber(PRACTICE.phone)}</span>
                                </a>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </header>
    );
}
