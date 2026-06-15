import { XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { seasonalNow } from '../seasonalNow';
import { effectConfetti } from './effects/effectConfetti';
import { effectFireworksSpark, fireworkBurst } from './effects/effectFireworks';
import type { SparkParticle } from './effects/effectFireworks';
import { effectLeaves } from './effects/effectLeaves';
import { effectPetals } from './effects/effectPetals';
import { effectSnow } from './effects/effectSnow';
import type { ParticleRuntime, SeasonalEffectImpl } from './effects/effectTypes';
import { seasonalEffectResolve } from './seasonalEffectResolve';
import type { SeasonalEffectKind } from './seasonalEffectResolve';

// Seasonal canvas animation that renders behind the page content. Mounted
// once on the home page (see `src/routes/{-$locale}/index.tsx`); decides
// what to render purely from the client-side date.
//
// Hard rules — see `docs/features/seasonal-effects.md`:
//
// - Disabled entirely under `prefers-reduced-motion` (medical site —
//   vestibular safety is non-negotiable).
// - Paused while the tab is hidden (battery + avoids the burst-back surprise).
// - Dismiss button persists in `localStorage` — once a patient turns it off
//   it stays off across visits.
// - Particle counts are tuned in each effect module; this component scales
//   the density factor down on small viewports.

const DISMISS_KEY = 'seasonal-effect-dismissed';

const DISMISS_LABEL: Record<string, string> = {
    de: 'Animation ausblenden',
    en: 'Hide animation',
    ru: 'Скрыть анимацию',
    ar: 'إخفاء الرسوم المتحركة',
};

export function SeasonalEffect({ locale = 'de' }: { locale?: string } = {}) {
    const [kind, setKind] = useState<SeasonalEffectKind | null>(null);
    const [isDismissed, setIsDismissed] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Resolve the effect kind on the client so the SSR HTML never embeds
    // animation that the client would then need to suppress under
    // `prefers-reduced-motion` or `localStorage`.
    //
    // The `?seasonalDate=...` URL override (read by `seasonalNow`) is also
    // a preview-mode signal: when present, we bypass both the
    // `localStorage` dismissal and the `prefers-reduced-motion` gate so
    // developers can actually see what they came to see. Production
    // visitors never have these params in their URLs.
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const isPreview = new URLSearchParams(window.location.search).has('seasonalDate');

        if (!isPreview) {
            const dismissed = localStorage.getItem(DISMISS_KEY) === 'true';
            if (dismissed) {
                setIsDismissed(true);
                return;
            }
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduced) return;
        }

        setKind(seasonalEffectResolve(seasonalNow()));
    }, []);

    useEffect(() => {
        if (!kind || isDismissed) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        return runEffect(canvas, kind);
    }, [kind, isDismissed]);

    function handleDismiss() {
        localStorage.setItem(DISMISS_KEY, 'true');
        setIsDismissed(true);
    }

    if (!kind || isDismissed) return null;

    return (
        <>
            <canvas
                ref={canvasRef}
                aria-hidden
                className="pointer-events-none fixed inset-0 z-0"
                // The canvas paints behind everything; explicit zero opacity
                // before the loop kicks in keeps the first paint quiet.
                style={{ opacity: 1 }}
            />
            <button
                type="button"
                onClick={handleDismiss}
                aria-label={DISMISS_LABEL[locale] ?? DISMISS_LABEL.de}
                className="fixed right-4 bottom-4 z-30 rounded-full border border-aubergine/15 bg-cream/80 p-2 text-(--color-brand-charcoal-3) shadow-sm backdrop-blur transition-all hover:bg-cream hover:text-aubergine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aubergine/40"
            >
                <XIcon className="size-4" aria-hidden />
            </button>
        </>
    );
}

// --- Runtime ----------------------------------------------------------------
//
// Rendered as plain functions rather than a class — the React component just
// hands us the canvas and gets a cleanup function back.

function runEffect(canvas: HTMLCanvasElement, kind: SeasonalEffectKind): () => void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};

    let runtime: ParticleRuntime = { width: 0, height: 0, density: deviceDensity() };
    let dpr = window.devicePixelRatio || 1;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        runtime = { ...runtime, width: window.innerWidth, height: window.innerHeight, density: deviceDensity() };
        canvas.width = runtime.width * dpr;
        canvas.height = runtime.height * dpr;
        canvas.style.width = `${runtime.width}px`;
        canvas.style.height = `${runtime.height}px`;
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    if (kind === 'fireworks') {
        return runFireworks(ctx, runtime, resize);
    }

    return runStandardEffect(ctx, runtime, resize, effectFor(kind));
}

function effectFor(kind: SeasonalEffectKind): SeasonalEffectImpl<unknown> {
    switch (kind) {
        case 'snow':
            return effectSnow as SeasonalEffectImpl<unknown>;
        case 'petals':
            return effectPetals as SeasonalEffectImpl<unknown>;
        case 'leaves':
            return effectLeaves as SeasonalEffectImpl<unknown>;
        case 'confetti':
            return effectConfetti as SeasonalEffectImpl<unknown>;
        case 'fireworks':
            // handled separately
            return effectFireworksSpark as unknown as SeasonalEffectImpl<unknown>;
    }
}

function runStandardEffect(
    ctx: CanvasRenderingContext2D,
    runtime: ParticleRuntime,
    resize: () => void,
    effect: SeasonalEffectImpl<unknown>,
): () => void {
    let particles = effect.init(runtime);
    let lastTime = performance.now();
    let frame = 0;

    function loop(now: number) {
        const deltaSeconds = Math.min(0.1, (now - lastTime) / 1000);
        lastTime = now;

        ctx.clearRect(0, 0, runtime.width, runtime.height);
        for (const p of particles) {
            effect.step(p, runtime, deltaSeconds);
            effect.draw(ctx, p);
        }

        // Respawn expired particles in place — keeps the array stable.
        for (let i = 0; i < particles.length; i++) {
            if (effect.isExpired(particles[i], runtime)) {
                particles[i] = effect.spawn(runtime);
            }
        }

        frame = requestAnimationFrame(loop);
    }

    function onVisibility() {
        if (document.hidden) {
            cancelAnimationFrame(frame);
        } else {
            lastTime = performance.now();
            frame = requestAnimationFrame(loop);
        }
    }

    function onResize() {
        resize();
        particles = effect.init(runtime);
    }

    frame = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    return () => {
        cancelAnimationFrame(frame);
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('resize', onResize);
    };
}

function runFireworks(ctx: CanvasRenderingContext2D, runtime: ParticleRuntime, resize: () => void): () => void {
    let sparks: SparkParticle[] = [];
    let nextBurstAt = performance.now() + 600;
    let lastTime = performance.now();
    let frame = 0;

    function scheduleNextBurst(now: number) {
        nextBurstAt = now + 1200 + Math.random() * 2400;
    }

    function loop(now: number) {
        const deltaSeconds = Math.min(0.1, (now - lastTime) / 1000);
        lastTime = now;

        if (now >= nextBurstAt) {
            const originX = runtime.width * (0.15 + Math.random() * 0.7);
            const originY = runtime.height * (0.2 + Math.random() * 0.3);
            sparks.push(...fireworkBurst(originX, originY));
            scheduleNextBurst(now);
        }

        ctx.clearRect(0, 0, runtime.width, runtime.height);
        for (const p of sparks) {
            effectFireworksSpark.step(p, runtime, deltaSeconds);
            effectFireworksSpark.draw(ctx, p);
        }
        sparks = sparks.filter((p) => !effectFireworksSpark.isExpired(p, runtime));

        frame = requestAnimationFrame(loop);
    }

    function onVisibility() {
        if (document.hidden) {
            cancelAnimationFrame(frame);
        } else {
            lastTime = performance.now();
            scheduleNextBurst(lastTime);
            frame = requestAnimationFrame(loop);
        }
    }

    function onResize() {
        resize();
    }

    frame = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    return () => {
        cancelAnimationFrame(frame);
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('resize', onResize);
    };
}

function deviceDensity(): number {
    if (typeof window === 'undefined') return 1;
    return window.innerWidth < 768 ? 0.5 : 1;
}
