// Shared particle interface for the seasonal effects. Each effect implements
// `init` (build the initial particle pool), `step` (advance one frame's
// motion) and `draw` (paint to the canvas). The runtime in `SeasonalEffect`
// owns the canvas, RAF loop, and respawn — every effect just describes its
// own particles.

export interface ParticleRuntime {
    width: number;
    height: number;
    /** Density factor 0..1 — `SeasonalEffect` lowers this on small viewports. */
    density: number;
}

export interface SeasonalEffectImpl<TParticle> {
    init: (runtime: ParticleRuntime) => TParticle[];
    /** Returns the particle in-place for chainability; mutate `p` directly. */
    step: (p: TParticle, runtime: ParticleRuntime, deltaSeconds: number) => void;
    /** True when the particle has drifted off-screen and should respawn. */
    isExpired: (p: TParticle, runtime: ParticleRuntime) => boolean;
    spawn: (runtime: ParticleRuntime) => TParticle;
    draw: (ctx: CanvasRenderingContext2D, p: TParticle) => void;
}
