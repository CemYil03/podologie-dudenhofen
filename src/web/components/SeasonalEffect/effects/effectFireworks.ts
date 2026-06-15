import type { SeasonalEffectImpl } from './effectTypes';

// Fireworks during the New Year's Eve window. Bursts spawn at random
// intervals from random origins; the runtime treats each *spark* as a
// particle, which lets the same `SeasonalEffectImpl` interface cover an
// emitter-style effect without bespoke runtime code.
//
// The trick: when the active particle count drops below the density
// target, the runtime asks for a new particle via `spawn()`. Instead of
// returning one spark, we return a "burst seed" — a particle with TTL=0
// that immediately expires next frame, AND in `step` it injects the rest
// of its burst into a side-channel array. We avoid that by writing the
// runtime to support a one-time-cost burst: `spawn()` returns the first
// spark and a global `pendingBursts` queue is drained by SeasonalEffect.
//
// To keep that contained, we expose a small `burst()` helper here and
// have `SeasonalEffect` know about fireworks specifically: when the kind
// is fireworks, instead of using density-based respawn, it ticks an
// emitter. See `SeasonalEffect.tsx`.

export interface SparkParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    age: number;
    life: number;
    color: string;
    size: number;
}

const FIREWORK_COLORS = [
    'rgba(255, 209, 102, 1)', // gold
    'rgba(247, 132, 174, 1)', // pink
    'rgba(124, 184, 255, 1)', // sky
    'rgba(173, 232, 172, 1)', // mint
    'rgba(255, 168, 134, 1)', // coral
];

const GRAVITY = 50;

export function fireworkBurst(originX: number, originY: number): SparkParticle[] {
    const sparks: SparkParticle[] = [];
    const sparkCount = 28 + Math.floor(Math.random() * 20);
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]!;
    const speedBase = 80 + Math.random() * 50;
    for (let i = 0; i < sparkCount; i++) {
        const angle = (i / sparkCount) * Math.PI * 2 + Math.random() * 0.2;
        const speed = speedBase * (0.6 + Math.random() * 0.6);
        sparks.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            age: 0,
            life: 1.2 + Math.random() * 0.6,
            color,
            size: 1.4 + Math.random() * 1.2,
        });
    }
    return sparks;
}

export const effectFireworksSpark: SeasonalEffectImpl<SparkParticle> = {
    // Fireworks doesn't use the standard `init` path; SeasonalEffect drives
    // bursts directly. Returning [] keeps the runtime quiet at startup.
    init() {
        return [];
    },

    step(p, _runtime, deltaSeconds) {
        p.vy += GRAVITY * deltaSeconds;
        p.x += p.vx * deltaSeconds;
        p.y += p.vy * deltaSeconds;
        p.age += deltaSeconds;
    },

    isExpired(p, runtime) {
        return p.age >= p.life || p.y > runtime.height + 20;
    },

    spawn(runtime) {
        // Used only to satisfy the interface — fireworks bursts seed
        // themselves through `fireworkBurst`. Return a dead spark so any
        // accidental call disappears next frame.
        return {
            x: runtime.width / 2,
            y: -100,
            vx: 0,
            vy: 0,
            age: 999,
            life: 0,
            color: 'rgba(0,0,0,0)',
            size: 1,
        };
    },

    draw(ctx, p) {
        const remaining = Math.max(0, 1 - p.age / p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('1)', `${remaining.toFixed(3)})`);
        ctx.fill();
    },
};
