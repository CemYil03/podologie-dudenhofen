import type { ParticleRuntime, SeasonalEffectImpl } from './effectTypes';

interface PetalParticle {
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

const PETAL_DENSITY_TARGET = 18;

const PETAL_COLORS = [
    'rgba(248, 207, 215, 0.55)', // soft blossom pink
    'rgba(255, 232, 222, 0.55)', // cream-blush
    'rgba(244, 188, 195, 0.55)', // warmer pink
];

export const effectPetals: SeasonalEffectImpl<PetalParticle> = {
    init(runtime) {
        const count = Math.round(PETAL_DENSITY_TARGET * runtime.density);
        return Array.from({ length: count }, () => spawnAtRandomY(runtime));
    },

    step(p, _runtime, deltaSeconds) {
        p.swayPhase += deltaSeconds * 1.2;
        p.x += (p.speedX + Math.sin(p.swayPhase) * 14) * deltaSeconds;
        p.y += p.speedY * deltaSeconds;
        p.rotation += p.rotationSpeed * deltaSeconds;
    },

    isExpired(p, runtime) {
        return p.y - p.size > runtime.height || p.x < -20 || p.x > runtime.width + 20;
    },

    spawn(runtime) {
        const p = spawnAtRandomY(runtime);
        p.y = -20;
        return p;
    },

    draw(ctx, p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        // Simple oval petal — two arcs sharing endpoints.
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },
};

function spawnAtRandomY(runtime: ParticleRuntime): PetalParticle {
    const size = 4 + Math.random() * 4;
    return {
        x: Math.random() * runtime.width,
        y: Math.random() * runtime.height,
        size,
        speedY: 24 + Math.random() * 18,
        speedX: -8 + Math.random() * 4,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.6 + Math.random() * 1.2,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]!,
    };
}
