import React from 'react';

export function FlankingCharacters() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 2
      }}
      className="hidden sm:block"
    >
      {/* LEFT CHARACTER: Lucia & Jason (Guaranteed strictly on the left) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <img
          src="/assets/img/char-left-portrait.png"
          onError={(e) => {
            e.currentTarget.src = '/assets/img/foto-izquierda.png';
          }}
          alt=""
          aria-hidden="true"
          loading="eager"
          style={{
            height: 'clamp(380px, 66vh, 620px)',
            width: 'auto',
            maxWidth: '36vw',
            objectFit: 'contain',
            objectPosition: 'bottom left',
            maskImage: 'linear-gradient(to top, transparent 0%, #000 12%, #000 90%, transparent 100%), linear-gradient(to right, #000 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, #000 12%, #000 90%, transparent 100%), linear-gradient(to right, #000 72%, transparent 100%)',
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9))'
          }}
        />
      </div>

      {/* RIGHT CHARACTER: Mafia Boss (Guaranteed strictly on the right) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <img
          src="/assets/img/char-right-portrait.png"
          onError={(e) => {
            e.currentTarget.src = '/assets/img/foto-derecha.png';
          }}
          alt=""
          aria-hidden="true"
          loading="eager"
          style={{
            height: 'clamp(380px, 66vh, 620px)',
            width: 'auto',
            maxWidth: '34vw',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            maskImage: 'linear-gradient(to top, transparent 0%, #000 12%, #000 90%, transparent 100%), linear-gradient(to left, #000 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, #000 12%, #000 90%, transparent 100%), linear-gradient(to left, #000 72%, transparent 100%)',
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9))'
          }}
        />
      </div>

      {/* Center Vignette Shade - Keeps center text & cards completely clear */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 82% at 50% 48%, rgba(5,13,26,0.95) 0%, rgba(5,13,26,0.65) 50%, rgba(5,13,26,0.15) 75%, transparent 100%)'
        }}
      />
    </div>
  );
}
