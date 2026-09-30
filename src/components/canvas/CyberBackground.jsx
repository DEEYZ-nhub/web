import React from 'react';

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Background Drift Image (bg2.png: night palm trees with city glow) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/img/bg2.png"
          alt=""
          fetchPriority="high"
          className="animate-drift h-full w-full object-cover object-center"
        />
        {/* Dark night atmosphere overlay gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,26,0.70)_0%,rgba(5,13,26,0.58)_45%,rgba(5,13,26,0.94)_85%,var(--color-canvas)_100%)]" />
        <div className="absolute inset-0 bg-[rgba(5,13,26,0.40)]" />
      </div>

      {/* Topographic Lines Overlay (bg3.png with screen blend mode and tex-lines) */}
      <div className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen">
        <img
          src="/assets/img/bg3.png"
          alt=""
          className="tex-lines h-full w-full object-cover object-center"
        />
      </div>

      {/* Central Blue Aura Glow */}
      <div className="aura pointer-events-none absolute inset-0 z-[1]" />
    </div>
  );
}
