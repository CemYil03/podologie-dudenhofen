import { Link, useLocation } from '@tanstack/react-router';
import { MenuIcon, PhoneIcon } from 'lucide-react';
import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { PRACTICE } from '../practice';
import { cn } from '../utils/cn';
import { Button } from './base/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './base/sheet';
import { LanguageSwitcher } from './LanguageSwitcher';

type NavItem = {
    to: '/{-$locale}/praxis' | '/{-$locale}/leistungen' | '/{-$locale}/qualifikation' | '/{-$locale}/karriere' | '/{-$locale}/kontakt';
    label: { de: string; en: string };
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
    { to: '/{-$locale}/praxis', label: { de: 'Praxis', en: 'Practice' } },
    { to: '/{-$locale}/leistungen', label: { de: 'Leistungen', en: 'Services' } },
    { to: '/{-$locale}/qualifikation', label: { de: 'Qualifikation', en: 'Credentials' } },
    { to: '/{-$locale}/karriere', label: { de: 'Karriere', en: 'Careers' } },
    { to: '/{-$locale}/kontakt', label: { de: 'Kontakt', en: 'Contact' } },
];

export function SiteHeader() {
    const locale = useLocale();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-aubergine/10 bg-cream/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
                <Link to="/{-$locale}" className="font-serif text-lg font-semibold tracking-tight text-aubergine-dark">
                    {PRACTICE.name}
                </Link>

                {/* Desktop nav */}
                <nav aria-label={{ de: 'Hauptnavigation', en: 'Main navigation' }[locale]} className="hidden items-center gap-1 lg:flex">
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

                <div className="flex items-center gap-2">
                    <a
                        href={`tel:${PRACTICE.phone.tel}`}
                        className="hidden items-center gap-2 rounded-full border border-aubergine/20 px-3 py-1.5 text-sm font-medium text-aubergine transition-colors hover:bg-aubergine hover:text-cream md:inline-flex"
                        aria-label={{ de: 'Praxis anrufen', en: 'Call the practice' }[locale]}
                    >
                        <PhoneIcon className="size-4" aria-hidden />
                        <span>{PRACTICE.phone.human}</span>
                    </a>
                    <LanguageSwitcher />

                    {/* Mobile trigger */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                aria-label={{ de: 'Menü öffnen', en: 'Open menu' }[locale]}
                            >
                                <MenuIcon className="size-5" />
                            </Button>
                        </SheetTrigger>
                        {/*
                         * iOS Safari quirk: with the dynamic toolbar, `inset-y-0 h-full`
                         * can leave a strip of body background visible below the sheet.
                         * `h-[100dvh]` pins the sheet to the dynamic viewport so its
                         * cream background covers the full screen, and we pad the inner
                         * content with `env(safe-area-inset-bottom)` so the call CTA
                         * stays clear of the home indicator.
                         */}
                        <SheetContent side="right" className="h-[100dvh] bg-cream pb-[env(safe-area-inset-bottom)]">
                            <SheetHeader>
                                <SheetTitle className="font-serif text-aubergine-dark">
                                    {{ de: 'Navigation', en: 'Navigation' }[locale]}
                                </SheetTitle>
                            </SheetHeader>
                            <nav aria-label={{ de: 'Hauptnavigation', en: 'Main navigation' }[locale]} className="flex flex-col gap-1 px-4">
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
                                    href={`tel:${PRACTICE.phone.tel}`}
                                    className="flex items-center justify-center gap-2 rounded-full bg-aubergine px-4 py-3 text-sm font-medium text-cream"
                                >
                                    <PhoneIcon className="size-4" aria-hidden />
                                    <span>{PRACTICE.phone.human}</span>
                                </a>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
