import React, { useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlankingCharacters } from '../HeroDesktop/FlankingCharacters';
import { CyberBackground } from '../canvas/CyberBackground';

export function HeroCyber() {
  const { openModal, copyCfxIP, playSound } = useApp();

  const fivemRef = useRef<HTMLAnchorElement>(null);
  const discordRef = useRef<HTMLAnchorElement>(null);

  const handlePointerMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, ref: React.RefObject<HTMLAnchorElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const handleFivemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    copyCfxIP();
    playSound('click');
    setTimeout(() => {
      window.location.href = 'fivem://connect/cfx.re/join/globalarena';
    }, 280);
  };

  const handleTiendaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    playSound('click');
    const storeEl = document.getElementById('store');
    if (storeEl) {
      storeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/store';
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-70px)] w-full overflow-hidden select-none"
      style={{
        paddingTop: 'clamp(90px, 14vh, 130px)',
        paddingBottom: 'clamp(40px, 6vh, 60px)',
        background: 'radial-gradient(circle at 50% 18%, rgba(255, 82, 103, 0.16), transparent 30%), radial-gradient(circle at 12% 80%, rgba(121, 217, 255, 0.1), transparent 28%), #070b14'
      }}
    >
      {/* Background Cyber Layers */}
      <CyberBackground />

      {/* Flanking GTA Characters (Lucia & Jason on left, Mafia Boss on right) */}
      <FlankingCharacters />

      {/* Central Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[34rem] flex-col items-center text-center sm:max-w-[42rem] lg:max-w-[50rem] px-4">
        {/* Massive White Headline matching user screenshot */}
        <div className="flex flex-col items-center">
          <h1 className="text-white text-center flex flex-col items-center leading-none">
            <span
              className="block font-black uppercase text-white drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)]"
              style={{
                fontFamily: 'var(--font-brand), "Syne", "Archivo", sans-serif',
                fontSize: 'clamp(3.8rem, 8.8vw, 7.6rem)',
                lineHeight: '0.88',
                letterSpacing: '-0.03em'
              }}
            >
              GLOBAL
            </span>
            <span
              className="block font-black uppercase text-white drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)] mt-1"
              style={{
                fontFamily: 'var(--font-brand), "Syne", "Archivo", sans-serif',
                fontSize: 'clamp(3.8rem, 8.8vw, 7.6rem)',
                lineHeight: '0.88',
                letterSpacing: '-0.03em'
              }}
            >
              ARENA
            </span>

            {/* PVP competitivo */}
            <span
              className="mt-4 flex items-center justify-center gap-2 font-black text-white tracking-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
                lineHeight: '1'
              }}
            >
              <span className="font-extrabold uppercase">PVP</span>
              <span
                className="italic font-normal text-white"
                style={{
                  fontFamily: 'var(--font-serif), "Instrument Serif", Georgia, serif',
                  fontSize: '1.15em'
                }}
              >
                competitivo
              </span>
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="mt-5 max-w-[34rem] text-[15px] sm:text-[16px] leading-relaxed text-[#e8f0fc]/85 font-normal">
            Combate por bandas, ranking por jugador y partidas todos los días. Entra con GTA V y FiveM, sin pagar nada, y pelea por el primer puesto.
          </p>
        </div>

        {/* Action Cards (FiveM + Discord) with Exact Edge Run & Glow */}
        <div className="mt-8 w-full max-w-[32rem] sm:max-w-[44rem]">
          <div className="grid w-full gap-3.5 sm:grid-cols-2">
            {/* FIVEM CARD */}
            <a
              ref={fivemRef}
              href="fivem://connect/cfx.re/join/globalarena"
              onClick={handleFivemClick}
              onMouseEnter={(e) => handlePointerMove(e, fivemRef)}
              onMouseMove={(e) => handlePointerMove(e, fivemRef)}
              style={{ '--run-color': '#FF6B7A' } as React.CSSProperties}
              className="edge-run edge-cursor group relative flex h-full w-full items-center gap-3.5 overflow-hidden rounded-2xl px-4 py-4 sm:gap-4 sm:px-5 bg-[linear-gradient(165deg,rgba(255,107,122,0.12)_0%,rgba(255,107,122,0.04)_45%,rgba(5,13,26,0.65)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 ease-[var(--ease-swift)] hover:bg-[rgba(229,56,77,0.15)] hover:border-[#FF6B7A]/40 active:scale-[0.99] border border-white/10"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors duration-300 group-hover:bg-white/[0.14] border border-white/10">
                <img
                  src="/assets/img/logos/fivem.png"
                  alt="FiveM"
                  className="h-7 w-7 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    const next = e.currentTarget.nextElementSibling as HTMLElement;
                    if (next) next.style.display = 'block';
                  }}
                />
                <svg className="hidden h-7 w-7" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 20H8.5L12 13L15.5 20H21L12 2Z" fill="#ef4444" />
                  <path d="M12 6.5L7.2 16.5H10.2L12 13L13.8 16.5H16.8L12 6.5Z" fill="#ffffff" opacity="0.9" />
                </svg>
              </span>
              <span className="relative min-w-0 flex-1 text-left">
                <span className="block font-mono text-[9.5px] font-semibold tracking-[0.2em] text-[#e8f0fc]/60 uppercase">
                  FIVEM · GLOBAL ARENA
                </span>
                <span className="mt-0.5 block truncate text-[15px] leading-tight font-bold text-white">
                  Conéctate al servidor
                </span>
                <span className="mt-1 block text-[11px] leading-tight">
                  <span className="relative mr-1.5 inline-flex h-1.5 w-1.5 align-middle">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span data-numeric className="font-semibold text-white">0</span>
                  <span className="text-[#e8f0fc]/60"> de 5 jugando</span>
                </span>
              </span>
              <ArrowRight className="relative h-4 w-4 shrink-0 text-[#e8f0fc]/50 transition-all duration-300 ease-[var(--ease-swift)] group-hover:translate-x-1 group-hover:text-white" />
            </a>

            {/* DISCORD CARD */}
            <a
              ref={discordRef}
              href="https://discord.gg/globalarena"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              onMouseEnter={(e) => handlePointerMove(e, discordRef)}
              onMouseMove={(e) => handlePointerMove(e, discordRef)}
              style={{ '--run-color': '#FF6B7A' } as React.CSSProperties}
              className="edge-run edge-cursor edge-run-delayed group relative flex h-full w-full items-center gap-3.5 overflow-hidden rounded-2xl px-4 py-4 sm:gap-4 sm:px-5 bg-[linear-gradient(165deg,rgba(255,107,122,0.12)_0%,rgba(255,107,122,0.04)_45%,rgba(5,13,26,0.65)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 ease-[var(--ease-swift)] hover:bg-[rgba(229,56,77,0.15)] hover:border-[#FF6B7A]/40 active:scale-[0.99] border border-white/10"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors duration-300 group-hover:bg-white/[0.14] border border-white/10">
                <svg className="h-6 w-6 text-[#ff6b7a]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </span>
              <span className="relative min-w-0 flex-1 text-left">
                <span className="block font-mono text-[9.5px] font-semibold tracking-[0.2em] text-[#e8f0fc]/60 uppercase">
                  DISCORD
                </span>
                <span className="mt-0.5 block truncate text-[15px] leading-tight font-bold text-white">
                  Entra al Discord
                </span>
                <span className="mt-1 block text-[11px] leading-tight">
                  <span className="relative mr-1.5 inline-flex h-1.5 w-1.5 align-middle">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span data-numeric className="font-semibold text-white">49</span>
                  <span className="text-[#e8f0fc]/60"> en línea · 724 miembros</span>
                </span>
              </span>
              <ArrowRight className="relative h-4 w-4 shrink-0 text-[#e8f0fc]/50 transition-all duration-300 ease-[var(--ease-swift)] group-hover:translate-x-1 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <nav
          aria-label="Atajos"
          className="mt-7 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2"
        >
          <span className="flex items-center">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                openModal('como-entrar');
              }}
              className="group inline-flex cursor-pointer items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#e8f0fc]/70 transition-colors duration-200 hover:text-white"
            >
              Cómo entrar
              <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 ease-[var(--ease-swift)] group-hover:translate-x-0.5 group-hover:opacity-100 text-[#FF6B7A]" />
            </button>
          </span>

          <span className="hidden h-3 w-px bg-white/20 sm:block mx-1" aria-hidden="true" />

          <span className="flex items-center">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                openModal('modos');
              }}
              className="group inline-flex cursor-pointer items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#e8f0fc]/70 transition-colors duration-200 hover:text-white"
            >
              Modos de juego
              <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 ease-[var(--ease-swift)] group-hover:translate-x-0.5 group-hover:opacity-100 text-[#FF6B7A]" />
            </button>
          </span>

          <span className="hidden h-3 w-px bg-white/20 sm:block mx-1" aria-hidden="true" />

          <span className="flex items-center">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                openModal('ranking');
              }}
              className="group inline-flex cursor-pointer items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#e8f0fc]/70 transition-colors duration-200 hover:text-white"
            >
              Ranking
              <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 ease-[var(--ease-swift)] group-hover:translate-x-0.5 group-hover:opacity-100 text-[#FF6B7A]" />
            </button>
          </span>

          <span className="hidden h-3 w-px bg-white/20 sm:block mx-1" aria-hidden="true" />

          <span className="flex items-center">
            <button
              type="button"
              onClick={handleTiendaClick}
              className="group inline-flex cursor-pointer items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#e8f0fc]/70 transition-colors duration-200 hover:text-white"
            >
              Tienda
              <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 ease-[var(--ease-swift)] group-hover:translate-x-0.5 group-hover:opacity-100 text-[#FF6B7A]" />
            </button>
          </span>
        </nav>
      </div>
    </section>
  );
}
