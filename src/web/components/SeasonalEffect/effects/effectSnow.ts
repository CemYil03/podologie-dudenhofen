import type { ParticleRuntime, SeasonalEffectImpl } from './effectTypes';

interface SnowParticle {
    x: number;
    y: number;
    radius: number;
    speedY: number;
    speedX: number;
    swayPhase: number;
    swayAmplitude: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
    sprite: HTMLCanvasElement;
}

const SNOW_DENSITY_TARGET = 22;

// Six-fold dendritic flakes at a handful of pre-baked sizes and shapes —
// drawn once per page load to offscreen canvases, then blitted per frame
// with a rotation. This keeps the per-frame cost on par with the old
// circle-based draw while looking like an actual snowflake.
const SPRITE_VARIANT_COUNT = 5;
let spritePool: HTMLCanvasElement[] | null = null;

export const effectSnow: SeasonalEffectImpl<SnowParticle> = {
    init(runtime) {
        if (!spritePool) {
            spritePool = Array.from({ length: SPRITE_VARIANT_COUNT }, () => buildSnowflakeSprite());
        }
        const count = Math.round(SNOW_DENSITY_TARGET * runtime.density);
        return Array.from({ length: count }, () => spawnAtRandomY(runtime));
    },

    step(p, _runtime, deltaSeconds) {
        p.swayPhase += deltaSeconds * 0.6;
        p.x += (p.speedX + Math.sin(p.swayPhase) * p.swayAmplitude) * deltaSeconds;
        p.y += p.speedY * deltaSeconds;
        p.rotation += p.rotationSpeed * deltaSeconds;
    },

    isExpired(p, runtime) {
        return p.y - p.radius > runtime.height || p.x < -10 || p.x > runtime.width + 10;
    },

    spawn(runtime) {
        const p = spawnAtRandomY(runtime);
        p.y = -10;
        return p;
    },

    draw(ctx, p) {
        // The sprite is drawn at `2 * p.radius` so the flake's tip-to-tip
        // span matches the previous circle's diameter — keeps motion and
        // density tuning unchanged.
        const size = p.radius * 2;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(p.sprite, -size, -size, size * 2, size * 2);
        ctx.restore();
    },
};

function spawnAtRandomY(runtime: ParticleRuntime): SnowParticle {
    const radius = 3 + Math.random() * 4;
    const pool = spritePool ?? [];
    return {
        x: Math.random() * runtime.width,
        y: Math.random() * runtime.height,
        radius,
        // Larger flakes fall faster, parallax-style.
        speedY: 12 + radius * 5,
        speedX: -4 + Math.random() * 8,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmplitude: 6 + Math.random() * 8,
        // Cool blue-gray on the practice's cream background — pure white at
        // low opacity is invisible on `bg-cream`. The slight tint reads as
        // winter without looking out of place against the warm palette.
        opacity: 0.55 + Math.random() * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.4 + Math.random() * 0.8,
        sprite: pool[Math.floor(Math.random() * pool.length)] ?? buildSnowflakeSprite(),
    };
}

// --- Sprite generator -------------------------------------------------------
//
// Each sprite is a single white-on-transparent dendritic flake at a generous
// resolution; the draw step scales it down. Drawing once and blitting many
// times means the line work can be richer than would be sensible per-frame.

const SPRITE_SIZE = 64; // pixels (unscaled). Drawn at 2 * radius in `draw`.

function buildSnowflakeSprite(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = SPRITE_SIZE;
    canvas.height = SPRITE_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const center = SPRITE_SIZE / 2;
    const armLength = center - 4;

    // Slight tint matching the original blue-gray, but lighter — opacity is
    // controlled per-particle in `draw`.
    ctx.strokeStyle = 'rgba(140, 170, 200, 0.95)';
    ctx.fillStyle = 'rgba(140, 170, 200, 0.95)';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.translate(center, center);

    // Per-sprite randomisation — branches are at the same fractions on every
    // arm of one flake (six-fold symmetry) but differ between sprites.
    const branches = [
        { at: 0.32 + Math.random() * 0.08, length: 0.18 + Math.random() * 0.08 },
        { at: 0.55 + Math.random() * 0.1, length: 0.14 + Math.random() * 0.08 },
        { at: 0.78 + Math.random() * 0.06, length: 0.08 + Math.random() * 0.05 },
    ];
    const mainWidth = 1.4 + Math.random() * 0.6;
    const branchWidth = mainWidth * 0.75;

    for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        drawArm(ctx, armLength, mainWidth, branchWidth, branches);
        ctx.restore();
    }

    // Center hub — a small filled hex reads as a crystal core.
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const r = 2.5;
        if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();

    return canvas;
}

function drawArm(
    ctx: CanvasRenderingContext2D,
    armLength: number,
    mainWidth: number,
    branchWidth: number,
    branches: ReadonlyArray<{ at: number; length: number }>,
) {
    // Main spoke.
    ctx.lineWidth = mainWidth;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(armLength, 0);
    ctx.stroke();

    // Side branches at ~60° to the spoke, mirrored above and below.
    ctx.lineWidth = branchWidth;
    for (const branch of branches) {
        const fromX = armLength * branch.at;
        const len = armLength * branch.length;
        const dx = len * Math.cos(Math.PI / 3);
        const dy = len * Math.sin(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(fromX, 0);
        ctx.lineTo(fromX + dx, dy);
        ctx.moveTo(fromX, 0);
        ctx.lineTo(fromX + dx, -dy);
        ctx.stroke();
    }

    // Small tip flourish — tiny side-spurs near the end give the flake
    // its characteristic frostiness.
    const tipAt = armLength * 0.92;
    const tipLen = armLength * 0.05;
    const tdx = tipLen * Math.cos(Math.PI / 3);
    const tdy = tipLen * Math.sin(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(tipAt, 0);
    ctx.lineTo(tipAt + tdx, tdy);
    ctx.moveTo(tipAt, 0);
    ctx.lineTo(tipAt + tdx, -tdy);
    ctx.stroke();
}
