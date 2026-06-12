import { Link } from '@tanstack/react-router';
import { LanguageSwitcher } from './LanguageSwitcher';

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-aubergine/10 bg-cream/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <Link to="/{-$locale}" className="font-serif text-lg font-semibold text-aubergine-dark tracking-tight">
                    Podologie Dudenhofen
                </Link>
                <LanguageSwitcher />
            </div>
        </header>
    );
}
