import type { ParticleRuntime, SeasonalEffectImpl } from './effectTypes';

interface LeafParticle {
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

const LEAF_DENSITY_TARGET = 16;

const LEAF_COLORS = [
    'rgba(196, 122, 64, 0.55)', // burnt orange
    'rgba(176, 92, 38, 0.55)', // rust
    'rgba(214, 167, 89, 0.55)', // ochre
    'rgba(132, 84, 50, 0.50)', // walnut
];

export const effectLeaves: SeasonalEffectImpl<LeafParticle> = {
    init(runtime) {
        const count = Math.round(LEAF_DENSITY_TARGET * runtime.density);
        return Array.from({ length: count }, () => spawnAtRandomY(runtime));
    },

    step(p, _runtime, deltaSeconds) {
        p.swayPhase += deltaSeconds * 1.5;
        p.x += (p.speedX + Math.sin(p.swayPhase) * 22) * deltaSeconds;
        p.y += p.speedY * deltaSeconds;
        p.rotation += p.rotationSpeed * deltaSeconds;
    },

    isExpired(p, runtime) {
        return p.y - p.size > runtime.height || p.x < -30 || p.x > runtime.width + 30;
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
        // Stylised maple-ish leaf — a vertical oval with a small triangular
        // tail. Simple enough to read at any size.
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, p.size);
        ctx.lineTo(-1, p.size + p.size * 0.5);
        ctx.lineTo(1, p.size + p.size * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    },
};

function spawnAtRandomY(runtime: ParticleRuntime): LeafParticle {
    const size = 5 + Math.random() * 4;
    return {
        x: Math.random() * runtime.width,
        y: Math.random() * runtime.height,
        size,
        speedY: 30 + Math.random() * 22,
        speedX: -10 + Math.random() * 6,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.8 + Math.random() * 1.6,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]!,
    };
}
