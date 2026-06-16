import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useMutation, useQuery } from 'urql';
import { Button } from '../../../web/components/base/button';
import { DateRangePicker } from '../../../web/components/base/date-range-picker';
import { Textarea } from '../../../web/components/base/textarea';
import {
    VacationCreateDocument,
    VacationDeleteDocument,
    VacationsAdminPageDocument,
    VacationUpdateDocument,
} from '../../../web/graphql/generated';
import type { GqlCVacationsAdminPageQuery } from '../../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../../web/graphql/routeLoaderGraphqlClient';
import { seoMeta } from '../../../web/seo/seoMeta';
import { webPageUrlGet } from '../../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../../web/utils/locale';

// Admin manager for practice vacation periods. Drives the public
// `<VacationBanner />` on the home page — see `docs/features/vacations.md`.
// Authorization runs server-side at `Admin.vacations` / `AdminMutation.vacation*`
// via `guardAdmin`; this route is a thin form over those mutations.

export const Route = createFileRoute('/{-$locale}/admin/vacations')({
    loader: () => routeLoaderGraphqlClient(VacationsAdminPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Urlaub verwalten', en: 'Manage vacations', ru: 'Управление отпусками', ar: 'إدارة الإجازات' }[locale],
            description: {
                de: 'Praxisurlaub planen.',
                en: 'Plan practice vacations.',
                ru: 'Планирование отпуска практики.',
                ar: 'تخطيط إجازات العيادة.',
            }[locale],
            path: '/admin/vacations',
            locale,
            webPageUrl: webPageUrlGet(),
            // Admin-only surface — keep it out of the index and the sitemap.
            noindex: true,
        });
    },
    component: VacationsAdmin,
});

type Vacation = GqlCVacationsAdminPageQuery['currentSession']['admin']['vacations'][number];

function VacationsAdmin() {
    const [{ data, fetching, error }, refetch] = useQuery({
        query: VacationsAdminPageDocument,
        requestPolicy: 'cache-and-network',
    });

    const vacations = data?.currentSession.admin.vacations ?? [];

    return (
        <main className="mx-auto w-full max-w-3xl p-6">
            <header className="mb-8">
                <h1 className="font-serif text-3xl text-aubergine">Urlaub verwalten</h1>
                <p className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                    Geplante Praxisurlaube. Aktive und in den nächsten 7 Tagen beginnende Zeiträume erscheinen automatisch oben auf der
                    Startseite.
                </p>
            </header>

            <NewVacationForm onCreated={() => refetch({ requestPolicy: 'network-only' })} />

            {error ? (
                <p className="mt-8 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    {error.message}
                </p>
            ) : null}

            <section className="mt-10 space-y-3">
                <h2 className="font-serif text-xl text-aubergine">Geplante Zeiträume</h2>
                {fetching && vacations.length === 0 ? (
                    <p className="text-sm text-(--color-brand-charcoal-3)">Lade…</p>
                ) : vacations.length === 0 ? (
                    <p className="text-sm text-(--color-brand-charcoal-3)">Keine Einträge.</p>
                ) : (
                    <ul className="divide-y divide-(--color-brand-charcoal-1)/30 rounded-md border border-(--color-brand-charcoal-1)/30">
                        {vacations.map((vacation) => (
                            <VacationRow
                                key={vacation.vacationId}
                                vacation={vacation}
                                onChanged={() => refetch({ requestPolicy: 'network-only' })}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

function NewVacationForm({ onCreated }: { onCreated: () => void }) {
    const [startsOn, setStartsOn] = useState('');
    const [endsOn, setEndsOn] = useState('');
    const [note, setNote] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [, createVacation] = useMutation(VacationCreateDocument);

    const isValid = startsOn !== '' && endsOn !== '' && startsOn <= endsOn;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!isValid) return;
        setErrorMessage(null);
        const result = await createVacation({ input: { startsOn, endsOn, note: note.trim() === '' ? null : note.trim() } });
        if (result.error) {
            setErrorMessage(translateMutationError(result.error.message));
            return;
        }
        setStartsOn('');
        setEndsOn('');
        setNote('');
        onCreated();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-md border border-(--color-brand-charcoal-1)/30 p-5">
            <h2 className="font-serif text-xl text-aubergine">Neuer Urlaub</h2>
            <label className="block">
                <span className="mb-1 block text-sm">Zeitraum</span>
                <DateRangePicker
                    value={isoRangeToDateRange(startsOn, endsOn)}
                    onChange={(next) => {
                        setStartsOn(dateToIso(next?.from));
                        setEndsOn(dateToIso(next?.to));
                    }}
                    placeholder="Zeitraum wählen"
                    locale={de}
                    className="w-full"
                />
            </label>
            <label className="block">
                <span className="mb-1 block text-sm">Hinweis (optional, nur deutsch)</span>
                <Textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="z. B. Notfälle bitte an Praxis XY, Tel. …"
                    minRows={2}
                />
            </label>
            {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            <div>
                <Button type="submit" variant="brand" disabled={!isValid}>
                    Hinzufügen
                </Button>
            </div>
        </form>
    );
}

function VacationRow({ vacation, onChanged }: { vacation: Vacation; onChanged: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [startsOn, setStartsOn] = useState(vacation.startsOn);
    const [endsOn, setEndsOn] = useState(vacation.endsOn);
    const [note, setNote] = useState(vacation.note ?? '');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [, updateVacation] = useMutation(VacationUpdateDocument);
    const [, deleteVacation] = useMutation(VacationDeleteDocument);

    // The list refetch hands us a fresh row reference; resync the local form
    // state when that happens (and after a successful save).
    useEffect(() => {
        setStartsOn(vacation.startsOn);
        setEndsOn(vacation.endsOn);
        setNote(vacation.note ?? '');
    }, [vacation.startsOn, vacation.endsOn, vacation.note]);

    const status = useMemo(() => vacationStatusLabel(vacation), [vacation]);

    async function handleSave() {
        if (startsOn > endsOn) {
            setErrorMessage('Beginn muss vor oder am Ende liegen.');
            return;
        }
        setErrorMessage(null);
        const result = await updateVacation({
            vacationId: vacation.vacationId,
            input: { startsOn, endsOn, note: note.trim() === '' ? null : note.trim() },
        });
        if (result.error) {
            setErrorMessage(translateMutationError(result.error.message));
            return;
        }
        setIsEditing(false);
        onChanged();
    }

    async function handleDelete() {
        if (!window.confirm('Diesen Urlaubseintrag wirklich löschen?')) return;
        const result = await deleteVacation({ vacationId: vacation.vacationId });
        if (result.error) {
            setErrorMessage(translateMutationError(result.error.message));
            return;
        }
        onChanged();
    }

    if (isEditing) {
        return (
            <li className="space-y-3 p-4">
                <label className="block">
                    <span className="mb-1 block text-sm">Zeitraum</span>
                    <DateRangePicker
                        value={isoRangeToDateRange(startsOn, endsOn)}
                        onChange={(next) => {
                            setStartsOn(dateToIso(next?.from));
                            setEndsOn(dateToIso(next?.to));
                        }}
                        placeholder="Zeitraum wählen"
                        locale={de}
                        className="w-full"
                    />
                </label>
                <label className="block">
                    <span className="mb-1 block text-sm">Hinweis</span>
                    <Textarea value={note} onChange={(event) => setNote(event.target.value)} minRows={2} />
                </label>
                {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
                <div className="flex gap-2">
                    <Button type="button" variant="brand" size="sm" onClick={handleSave}>
                        Speichern
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                        Abbrechen
                    </Button>
                </div>
            </li>
        );
    }

    return (
        <li className="flex items-start justify-between gap-4 p-4">
            <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                    <span className="font-medium text-aubergine">
                        {formatGermanDate(vacation.startsOn)} – {formatGermanDate(vacation.endsOn)}
                    </span>
                    <span className="text-xs text-(--color-brand-charcoal-3)">{status}</span>
                </div>
                {vacation.note ? <p className="mt-1 text-sm text-(--color-brand-charcoal-3)">{vacation.note}</p> : null}
                {errorMessage ? <p className="mt-2 text-sm text-destructive">{errorMessage}</p> : null}
            </div>
            <div className="flex shrink-0 gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    Bearbeiten
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={handleDelete} aria-label="Löschen">
                    <Trash2Icon />
                </Button>
            </div>
        </li>
    );
}

function vacationStatusLabel(vacation: Vacation): string {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin' }).format(new Date());
    if (vacation.endsOn < today) return 'vergangen';
    if (vacation.startsOn <= today) return 'aktiv';
    return 'geplant';
}

// Vacation dates travel as `yyyy-MM-dd` strings. Parse at noon to keep the
// `Date` clear of any timezone-induced day shift before re-serializing.
function isoToDate(iso: string): Date | undefined {
    if (iso === '') return undefined;
    return new Date(`${iso}T12:00:00`);
}

function isoRangeToDateRange(startsOn: string, endsOn: string): DateRange | undefined {
    const from = isoToDate(startsOn);
    if (!from) return undefined;
    return { from, to: isoToDate(endsOn) };
}

function dateToIso(date: Date | undefined): string {
    return date ? format(date, 'yyyy-MM-dd') : '';
}

function formatGermanDate(iso: string): string {
    return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${iso}T00:00:00`));
}

function translateMutationError(message: string): string {
    if (/overlaps an existing scheduled period/i.test(message)) {
        return 'Dieser Zeitraum überschneidet sich mit einem anderen Eintrag.';
    }
    if (/startsOn must be on or before endsOn/i.test(message)) {
        return 'Beginn muss vor oder am Ende liegen.';
    }
    if (/Unauthorized/i.test(message)) {
        return 'Nicht berechtigt — bitte anmelden.';
    }
    return message;
}
