import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trophy, CreditCard, Terminal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Navbar() {
  const { openModal, playSound, copyCfxIP, activeTab, setActiveTab } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab, modalId) => {
    setActiveTab(tab);
    playSound('click');
    if (modalId) {
      openModal(modalId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'inicio', label: 'Inicio', modal: null },
    { id: 'ranking', label: 'Ranking', modal: 'ranking' },
    { id: 'cambios', label: 'Cambios', modal: 'cambios' },
    { id: 'comunidad', label: 'Comunidad', modal: null },
    { id: 'soporte', label: 'Soporte', modal: 'soporte' },
    { id: 'tienda', label: 'Tienda', modal: null }
  ];

  return (
    <header
      className="fixed-navbar"
      style={{
        backgroundColor: scrolled ? 'rgba(5, 13, 26, 0.96)' : 'rgba(5, 13, 26, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 107, 122, 0.16)',
        boxShadow: scrolled
          ? '0 12px 36px -8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(229, 56, 77, 0.08)'
          : '0 8px 30px -10px rgba(0, 0, 0, 0.75)',
        transition: 'all 0.25s ease'
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Left: GLOBAL ARENA BRAND EMBLEM + DIVIDER + LINKS */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('inicio', null);
              }}
              className="group inline-flex items-center cursor-pointer select-none py-1 shrink-0"
              title="GLOBAL ARENA"
            >
              <img
                src="/assets/img/global-arena-logo.png"
                alt="GLOBAL ARENA"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_16px_rgba(229,56,77,0.35)]"
                loading="eager"
              />
            </a>

            <span className="hidden md:block h-5 w-px bg-[var(--color-line-strong)] shrink-0" />

            <nav aria-label="Principal" className="flex items-center gap-1 shrink-0">
              {navLinks.map(({ id, label, modal }) => {
                const isActive = activeTab === id || ((id === 'comunidad' || id === 'equipo') && (activeTab === 'comunidad' || activeTab === 'equipo' || activeTab === 'postulaciones'));

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleNavClick(id, modal)}
                    className={`group relative inline-flex cursor-pointer items-center rounded-[8px] px-3 sm:px-3.5 py-1.5 [font-family:var(--font-display)] text-[13.5px] sm:text-[14.5px] font-semibold transition-colors duration-200 shrink-0 ${
                      isActive ? 'text-white' : 'text-[var(--color-ink-low)] hover:text-white'
                    }`}
                    style={{ fontVariationSettings: '"wdth" 104' }}
                  >
                    {/* Active Pill Frame (Exact match to reference screenshot) */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-[8px] bg-white/[0.08] border border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_2px_10px_rgba(0,0,0,0.35)]"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                      />
                    )}

                    {/* Translucent Hover Pill (for inactive tabs) */}
                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-[8px] bg-white/[0.05] opacity-0 transition-opacity duration-200 ease-[var(--ease-swift)] group-hover:opacity-100"
                      />
                    )}

                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: EXACT STATUS PILL + USER PROFILE */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Status pill: [ • ONLINE 149/300 ] */}
            <div
              className="hidden sm:inline-flex cursor-pointer items-center gap-2.5 rounded-[8px] px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] transition-colors duration-200 hover:bg-white/[0.06] shrink-0"
              onClick={copyCfxIP}
              role="button"
              tabIndex={0}
              title="Copiar IP de FiveM"
              onKeyDown={(e) => e.key === 'Enter' && copyCfxIP()}
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="[font-family:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-ink-low)]">
                Online
              </span>
              <span data-numeric className="text-sm font-bold text-white">
                149<span className="font-normal text-[var(--color-ink-dim)]">/300</span>
              </span>
            </div>

            {/* User profile: [ avatar e2f2ke7gx ] */}
            <div ref={userMenuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setUserMenuOpen((prev) => !prev);
                }}
                className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-inner)] py-1.5 pr-3 pl-1.5 text-sm transition-colors duration-200 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5384d] shrink-0"
                  tabIndex={0}
                  title="Perfil e2f2ke7gx"
                >
                  <img
                    src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=globalfighter&backgroundColor=281418"
                    alt="Avatar"
                    className="h-7 w-7 rounded-[8px] ring-1 ring-white/15 object-cover"
                  />
                  <span className="font-semibold text-[var(--color-ink)]">e2f2ke7gx</span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="glass absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-[var(--radius-card)] p-1 z-[70] shadow-[var(--shadow-panel)]"
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <div className="border-b border-[var(--color-line)] p-2.5">
                        <div className="flex items-center justify-between">
                          <strong className="text-white text-sm font-semibold">e2f2ke7gx</strong>
                          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 font-mono">
                            VERIFICADO
                          </span>
                        </div>
                        <span className="text-[11px] text-[var(--color-ink-low)] font-mono">ID: #4208</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 border-b border-[var(--color-line)] p-2 text-center text-xs">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-[var(--color-ink-dim)] uppercase font-mono">K/D</span>
                          <strong className="text-white font-bold">2.84</strong>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] text-[var(--color-ink-dim)] uppercase font-mono">ELO</span>
                          <strong className="text-[#f0c040] font-bold">2,110</strong>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] text-[var(--color-ink-dim)] uppercase font-mono">BANDA</span>
                          <strong className="text-[#ff6b7a] font-bold">Vagos #1</strong>
                        </div>
                      </div>

                      <div className="p-1 space-y-0.5">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-xs text-[var(--color-ink)] transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
                          onClick={() => {
                            setUserMenuOpen(false);
                            openModal('ranking');
                          }}
                        >
                          <Trophy size={14} className="text-[var(--color-brand-soft)]" />
                          <span>Ver Mi Posición en Ranking</span>
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-xs text-[var(--color-ink)] transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setActiveTab('tienda');
                          }}
                        >
                          <CreditCard size={14} className="text-[var(--color-brand-soft)]" />
                          <span>Gestionar Rango VIP</span>
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2.5 rounded-[6px] px-3 py-2 text-xs text-[var(--color-ink)] transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer"
                          onClick={() => {
                            setUserMenuOpen(false);
                            copyCfxIP();
                          }}
                        >
                          <Terminal size={14} className="text-[var(--color-brand-soft)]" />
                          <span>Copiar Comando F8</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
}
