import type { ParticleRuntime, SeasonalEffectImpl } from './effectTypes';

// Confetti for Fasching. Slow drift downward with sway + rotation, mixed
// brand-friendly hues. Smaller pool than petals — confetti is a wink, not
// a snowstorm.

interface ConfettiParticle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    swayPhase: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
}

const CONFETTI_DENSITY_TARGET = 14;

const CONFETTI_COLORS = [
    'rgba(216, 167, 99, 0.7)', // gold
    'rgba(166, 75, 100, 0.7)', // wine
    'rgba(100, 64, 109, 0.7)', // aubergine
    'rgba(214, 105, 132, 0.7)', // pink
    'rgba(80, 132, 134, 0.7)', // teal
];

export const effectConfetti: SeasonalEffectImpl<ConfettiParticle> = {
    init(runtime) {
        const count = Math.round(CONFETTI_DENSITY_TARGET * runtime.density);
        return Array.from({ length: count }, () => spawnAtRandomY(runtime));
    },

    step(p, _runtime, deltaSeconds) {
        p.swayPhase += deltaSeconds * 1.4;
        p.x += (p.speedX + Math.sin(p.swayPhase) * 18) * deltaSeconds;
        p.y += p.speedY * deltaSeconds;
        p.rotation += p.rotationSpeed * deltaSeconds;
    },

    isExpired(p, runtime) {
        return p.y - p.size > runtime.height || p.x < -20 || p.x > runtime.width + 20;
    },

    spawn(runtime) {
        const p = spawnAtRandomY(runtime);
        p.y = -10;
        return p;
    },

    draw(ctx, p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
    },
};

function spawnAtRandomY(runtime: ParticleRuntime): ConfettiParticle {
    const size = 4 + Math.random() * 4;
    return {
        x: Math.random() * runtime.width,
        y: Math.random() * runtime.height,
        size,
        speedY: 28 + Math.random() * 22,
        speedX: -10 + Math.random() * 8,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -1.4 + Math.random() * 2.8,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!,
    };
}
