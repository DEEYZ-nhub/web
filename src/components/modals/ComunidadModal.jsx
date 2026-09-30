import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Crown, 
  Code2, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  Flame,
  Radio,
  Gamepad2,
  Sword,
  Tv,
  Newspaper,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TEAM_MEMBERS } from '../../data/serverData';

export function ComunidadModal({ initialTab = 'comunidad' }) {
  const { playSound, showToast, closeModal, openModal } = useApp();
  const [activeView, setActiveView] = useState(initialTab === 'postular' ? 'postular' : initialTab === 'roster' ? 'roster' : 'comunidad');
  const [copiedId, setCopiedId] = useState(null);

  // Form states for Postulaciones
  const [nick, setNick] = useState('');
  const [role, setRole] = useState('moderador');
  const [hours, setHours] = useState('15-20');
  const [exp, setExp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyDiscord = (discord, id) => {
    navigator.clipboard.writeText(discord);
    playSound('click');
    setCopiedId(id);
    showToast('Discord Copiado', `@${discord} copiado al portapapeles.`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleDiscordJoin = () => {
    playSound('success');
    showToast('Discord Oficial', 'Redirigiendo a discord.gg/globalarena...');
    window.open('https://discord.gg/globalarena', '_blank', 'noopener,noreferrer');
  };

  const handleCardAction = (type, title) => {
    playSound('click');
    switch (type) {
      case 'discord':
        handleDiscordJoin();
        break;
      case 'noticias':
        openModal('cambios');
        break;
      case 'clanes':
        showToast('Clanes y Facciones', 'Explorando clanes y reclutamiento competitivo en Discord.');
        break;
      case 'creadores':
        showToast('Creadores de Contenido', 'Canal oficial de directos, clips y creadores verificados.');
        break;
      case 'juegos':
        showToast('Canales de Juegos', 'Canales activos de FPS, Battle Royale y modo Arena.');
        break;
      case 'desarrollo':
        showToast('Desarrollo & Herramientas', 'Devlogs, guías de rendimiento y recursos de FiveM.');
        break;
      case 'contenido':
        showToast('Contenido Comunitario', 'Videos, montajes destacados y mejores jugadas del mes.');
        break;
      default:
        showToast(title, 'Abriendo canal de la comunidad...');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nick || !exp) return;

    playSound('success');
    setSubmitted(true);
    showToast('Postulación Registrada', `Gracias ${nick}. El equipo directivo revisará tu postulación en menos de 48h.`);

    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const getRoleIcon = (tag) => {
    switch (tag.toLowerCase()) {
      case 'owner':
        return <Crown size={14} className="text-[#e5384d]" />;
      case 'lead dev':
      case 'desarrollador':
        return <Code2 size={14} className="text-[#38bdf8]" />;
      case 'head admin':
        return <Shield size={14} className="text-[#f59e0b]" />;
      case 'mod lead':
        return <Shield size={14} className="text-[#10b981]" />;
      case 'eventos':
        return <Sparkles size={14} className="text-[#a855f7]" />;
      default:
        return <Users size={14} className="text-white/70" />;
    }
  };

  return (
    <div className="modal-inner modal-wide text-white select-none">
      {/* View Switcher Bar (Discreet & Premium in Top Navigation) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playSound('click');
              setActiveView('comunidad');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'comunidad'
                ? 'bg-[#e5384d] text-white shadow-[0_0_16px_rgba(229,56,77,0.45)]'
                : 'bg-white/5 text-[var(--color-ink-low)] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Compass size={13} />
            <span>Comunidad Hub</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              setActiveView('roster');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'roster'
                ? 'bg-[#e5384d] text-white shadow-[0_0_16px_rgba(229,56,77,0.45)]'
                : 'bg-white/5 text-[var(--color-ink-low)] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Users size={13} />
            <span>Staff del Equipo</span>
            <span className="ml-0.5 text-[10px] px-1.5 py-0.2 rounded-md bg-black/40 font-mono">
              {TEAM_MEMBERS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              setActiveView('postular');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'postular'
                ? 'bg-[#e5384d] text-white shadow-[0_0_16px_rgba(229,56,77,0.45)]'
                : 'bg-white/5 text-[var(--color-ink-low)] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Send size={13} />
            <span>Postulaciones</span>
            <span className="ml-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-semibold">
              ABIERTO
            </span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>GLOBAL HUB V2.4</span>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: COMUNIDAD HUB (1:1 FIDELITY REPLICA OF THE TARGET DESIGN)
         ========================================================================= */}
      {activeView === 'comunidad' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Hero Section */}
          <div className="space-y-4">
            {/* Tagline */}
            <span className="block text-[11px] font-mono font-bold tracking-[0.25em] text-[#e5384d] uppercase">
              NEXUS COMMUNITY
            </span>

            {/* Giant Italic Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tighter uppercase text-white leading-none [font-family:var(--font-display)]">
              COMUNIDAD
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg sm:text-2xl font-medium text-white/90 tracking-normal">
              El lugar donde los jugadores se encuentran
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Comparte tu pasión, conoce a otros miembros, participa en eventos y forma parte de una comunidad que vive el mismo juego que tú.
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-8 sm:gap-12 pt-3">
              {/* Stat 1: Activos */}
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-9 bg-[#e5384d] rounded-full self-stretch" />
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none [font-family:var(--font-display)]">
                    1.428
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.16em] text-neutral-400 uppercase mt-1">
                    MIEMBROS ACTIVOS
                  </span>
                </div>
              </div>

              {/* Stat 2: Mensajes */}
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-9 bg-[#e5384d] rounded-full self-stretch" />
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none [font-family:var(--font-display)]">
                    32.617
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.16em] text-neutral-400 uppercase mt-1">
                    MENSAJES TOTALES
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Divider & Explora Header */}
          <div className="pt-2">
            <span className="block text-[11px] font-mono font-bold tracking-[0.2em] text-[#e5384d] uppercase mb-1">
              EXPLORA
            </span>
            <div className="flex items-center">
              <h3 className="text-xl sm:text-2xl text-white tracking-wide">
                <span className="font-black italic uppercase [font-family:var(--font-display)]">NAVEGA</span>{' '}
                <span className="font-normal text-white/80">por dónde entrar</span>
              </h3>
              <div className="flex-1 h-[1px] bg-white/10 ml-5 hidden sm:block" />
            </div>
          </div>

          {/* ================= CARDS GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4">
            {/* ---------------- CARD 01: JUEGOS (Large 7/12 cols) ---------------- */}
            <div 
              onClick={() => handleCardAction('juegos', 'Juegos')}
              className="group relative md:col-span-3 lg:col-span-7 rounded-2xl border border-white/10 bg-[#0d070a] p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-[#120a0f] cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* Background ambient texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(ellipse at bottom, rgba(13,7,10,0.4) 0%, rgba(13,7,10,0.95) 90%), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d070a] via-transparent to-black/40 pointer-events-none" />

              {/* Card Top Row: Number 01 + Hexagon Badges */}
              <div className="relative z-10 flex items-start justify-between">
                {/* Outlined Stylized 01 */}
                <span 
                  className="text-3xl font-black italic select-none"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)',
                    color: 'transparent',
                    fontFamily: 'var(--font-display), sans-serif'
                  }}
                >
                  01
                </span>

                {/* 3 Hexagonal Badges: FPS, BR, MOBA */}
                <div className="flex items-center gap-3">
                  {/* Badge 1: FPS */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-11 h-9 flex items-center justify-center">
                      <svg viewBox="0 0 42 38" className="w-full h-full drop-shadow-[0_0_8px_rgba(229,56,77,0.3)]">
                        <polygon 
                          points="21 1, 39 10.5, 39 27.5, 21 37, 3 27.5, 3 10.5" 
                          fill="#3a0b12" 
                          stroke="#e5384d" 
                          strokeWidth="1.5" 
                        />
                      </svg>
                      <span className="absolute text-[11px] font-black italic text-white tracking-wider">
                        FPS
                      </span>
                    </div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-neutral-400 uppercase mt-1">
                      FPS
                    </span>
                  </div>

                  {/* Badge 2: BR */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-11 h-9 flex items-center justify-center">
                      <svg viewBox="0 0 42 38" className="w-full h-full drop-shadow-[0_0_8px_rgba(229,56,77,0.3)]">
                        <polygon 
                          points="21 1, 39 10.5, 39 27.5, 21 37, 3 27.5, 3 10.5" 
                          fill="#3a0b12" 
                          stroke="#e5384d" 
                          strokeWidth="1.5" 
                        />
                      </svg>
                      <span className="absolute text-[11px] font-black italic text-white tracking-wider">
                        BR
                      </span>
                    </div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-neutral-400 uppercase mt-1">
                      BATTLE ROYALE
                    </span>
                  </div>

                  {/* Badge 3: MOBA */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-11 h-9 flex items-center justify-center">
                      <svg viewBox="0 0 42 38" className="w-full h-full drop-shadow-[0_0_8px_rgba(229,56,77,0.3)]">
                        <polygon 
                          points="21 1, 39 10.5, 39 27.5, 21 37, 3 27.5, 3 10.5" 
                          fill="#3a0b12" 
                          stroke="#e5384d" 
                          strokeWidth="1.5" 
                        />
                      </svg>
                      <span className="absolute text-[10px] font-black italic text-white tracking-wider">
                        MOBA
                      </span>
                    </div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-neutral-400 uppercase mt-1">
                      MOBA
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Content */}
              <div className="relative z-10 pt-6">
                <h4 className="text-2xl sm:text-3xl font-black italic tracking-wide uppercase text-white leading-tight [font-family:var(--font-display)]">
                  JUEGOS
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-400 max-w-lg mt-2 leading-relaxed">
                  Encuentra tu juego favorito, habla de estrategias, comparte guías y mantente al día con las novedades.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#ff6b7a] transition-colors">
                  <span className="text-[#e5384d] font-black mr-2 text-sm leading-none transition-transform group-hover:translate-x-0.5">❯</span>
                  <span>VER CANALES</span>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 02: CREADORES (5/12 cols) ---------------- */}
            <div 
              onClick={() => handleCardAction('creadores', 'Creadores')}
              className="group relative md:col-span-3 lg:col-span-5 rounded-2xl border border-white/10 bg-[#0d070a] p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-[#120a0f] cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* Background ambient red crowd lighting */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 80% 20%, rgba(229,56,77,0.35) 0%, rgba(13,7,10,0.92) 80%), url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d070a] via-transparent to-black/30 pointer-events-none" />

              {/* Number 02 */}
              <div className="relative z-10 flex items-start justify-between">
                <span 
                  className="text-3xl font-black italic select-none"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)',
                    color: 'transparent',
                    fontFamily: 'var(--font-display), sans-serif'
                  }}
                >
                  02
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-6">
                <h4 className="text-2xl sm:text-3xl font-black italic tracking-wide uppercase text-white leading-tight [font-family:var(--font-display)]">
                  CREADORES
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-400 mt-2 leading-relaxed">
                  Sigue a tus streamers y creadores preferidos, comenta sus publicaciones y sé parte de su comunidad.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#ff6b7a] transition-colors">
                  <span className="text-[#e5384d] font-black mr-2 text-sm leading-none transition-transform group-hover:translate-x-0.5">❯</span>
                  <span>VER CANALES</span>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 03: CLANES (4/12 cols) ---------------- */}
            <div 
              onClick={() => handleCardAction('clanes', 'Clanes')}
              className="group relative md:col-span-1 lg:col-span-4 rounded-2xl border border-white/10 bg-[#0d070a] p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-[#120a0f] cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* Background ambient tactical operators */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(13,7,10,0.3) 0%, rgba(13,7,10,0.92) 85%), url('/assets/img/packs/clan-vip.png')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d070a] via-transparent to-black/30 pointer-events-none" />

              {/* Number 03 */}
              <div className="relative z-10">
                <span 
                  className="text-3xl font-black italic select-none"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)',
                    color: 'transparent',
                    fontFamily: 'var(--font-display), sans-serif'
                  }}
                >
                  03
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-6">
                <h4 className="text-2xl sm:text-3xl font-black italic tracking-wide uppercase text-white leading-tight [font-family:var(--font-display)]">
                  CLANES
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-400 mt-2 leading-relaxed">
                  Forma o únete a un clan, encuentra tu equipo y participa en torneos y actividades especiales.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#ff6b7a] transition-colors">
                  <span className="text-[#e5384d] font-black mr-2 text-sm leading-none transition-transform group-hover:translate-x-0.5">❯</span>
                  <span>VER CLANES</span>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 04: DESARROLLO (4/12 cols) ---------------- */}
            <div 
              onClick={() => handleCardAction('desarrollo', 'Desarrollo')}
              className="group relative md:col-span-1 lg:col-span-4 rounded-2xl border border-white/10 bg-[#0d070a] p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-[#120a0f] cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* CS2 / Tactical Watermark */}
              <div className="absolute right-4 top-2 text-5xl sm:text-6xl font-black italic text-white/[0.04] select-none pointer-events-none [font-family:var(--font-display)]">
                CS2
              </div>
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 60% 40%, rgba(13,7,10,0.2) 0%, rgba(13,7,10,0.92) 85%), url('https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d070a] via-transparent to-black/30 pointer-events-none" />

              {/* Number 04 */}
              <div className="relative z-10">
                <span 
                  className="text-3xl font-black italic select-none"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)',
                    color: 'transparent',
                    fontFamily: 'var(--font-display), sans-serif'
                  }}
                >
                  04
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-6">
                <h4 className="text-2xl sm:text-3xl font-black italic tracking-wide uppercase text-white leading-tight [font-family:var(--font-display)]">
                  DESARROLLO
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-400 mt-2 leading-relaxed">
                  Aprende, comparte y mejora tus habilidades con tutoriales, herramientas y recursos.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#ff6b7a] transition-colors">
                  <span className="text-[#e5384d] font-black mr-2 text-sm leading-none transition-transform group-hover:translate-x-0.5">❯</span>
                  <span>VER CANALES</span>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 05: NOVEDADES (4/12 cols) ---------------- */}
            <div 
              onClick={() => handleCardAction('noticias', 'Novedades')}
              className="group relative md:col-span-1 lg:col-span-4 rounded-2xl border border-white/10 bg-[#0d070a] p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-[#120a0f] cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* Background ambient red stage/news lights */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 30%, rgba(229,56,77,0.25) 0%, rgba(13,7,10,0.92) 85%), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d070a] via-transparent to-black/30 pointer-events-none" />

              {/* Number 05 */}
              <div className="relative z-10">
                <span 
                  className="text-3xl font-black italic select-none"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)',
                    color: 'transparent',
                    fontFamily: 'var(--font-display), sans-serif'
                  }}
                >
                  05
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-6">
                <h4 className="text-2xl sm:text-3xl font-black italic tracking-wide uppercase text-white leading-tight [font-family:var(--font-display)]">
                  NOVEDADES
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-400 mt-2 leading-relaxed">
                  Mantente informado sobre actualizaciones, parches, eventos y todo lo nuevo en la comunidad.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#ff6b7a] transition-colors">
                  <span className="text-[#e5384d] font-black mr-2 text-sm leading-none transition-transform group-hover:translate-x-0.5">❯</span>
                  <span>VER NOTICIAS</span>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 06: CONTENIDO (4/12 cols) ---------------- */}
            <div 
              onClick={() => handleCardAction('contenido', 'Contenido')}
              className="group relative md:col-span-3 lg:col-span-5 rounded-2xl border border-white/10 bg-[#0d070a] p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-[#120a0f] cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* Background ambient streaming setup / battlestation */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(13,7,10,0.3) 0%, rgba(13,7,10,0.92) 85%), url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d070a] via-transparent to-black/30 pointer-events-none" />

              {/* Number 06 */}
              <div className="relative z-10">
                <span 
                  className="text-3xl font-black italic select-none"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)',
                    color: 'transparent',
                    fontFamily: 'var(--font-display), sans-serif'
                  }}
                >
                  06
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-6">
                <h4 className="text-2xl sm:text-3xl font-black italic tracking-wide uppercase text-white leading-tight [font-family:var(--font-display)]">
                  CONTENIDO
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-400 mt-2 leading-relaxed">
                  Mira videos, comparte tus momentos, descubre nuevas experiencias y disfruta del talento de la comunidad.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#ff6b7a] transition-colors">
                  <span className="text-[#e5384d] font-black mr-2 text-sm leading-none transition-transform group-hover:translate-x-0.5">❯</span>
                  <span>VER PUBLICACIONES</span>
                </div>
              </div>
            </div>

            {/* ---------------- CARD 07: DISCORD (Large Crimson 7/12 cols) ---------------- */}
            <div 
              onClick={() => handleCardAction('discord', 'Discord')}
              className="group relative md:col-span-3 lg:col-span-7 rounded-2xl border border-[#e5384d]/50 bg-gradient-to-r from-[#220a10] via-[#14060a] to-[#0d0306] p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-[#ff4d61] hover:shadow-[0_0_35px_rgba(229,56,77,0.22)] cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              {/* Massive Discord Watermark Silhouette */}
              <div className="absolute right-2 -bottom-4 sm:right-6 sm:bottom-0 w-36 sm:w-56 h-auto pointer-events-none select-none text-[#e5384d]/15 group-hover:text-[#e5384d]/25 transition-colors duration-500">
                <svg viewBox="0 0 127.14 96.36" className="w-full h-full fill-current">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
              </div>

              {/* Number 07 */}
              <div className="relative z-10">
                <span 
                  className="text-3xl font-black italic select-none"
                  style={{
                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)',
                    color: 'transparent',
                    fontFamily: 'var(--font-display), sans-serif'
                  }}
                >
                  07
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-6">
                <h4 className="text-2xl sm:text-3xl font-black italic tracking-wide uppercase text-white leading-tight [font-family:var(--font-display)]">
                  DISCORD
                </h4>
                <p className="text-xs sm:text-[13px] text-neutral-300 max-w-md mt-2 leading-relaxed">
                  Únete a nuestro servidor, habla con otros miembros, participa en chats y accede a beneficios exclusivos.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold tracking-wider uppercase text-white group-hover:text-[#ff6b7a] transition-colors">
                  <span className="text-[#e5384d] font-black mr-2 text-sm leading-none transition-transform group-hover:translate-x-0.5">❯</span>
                  <span>UNIRSE AL SERVIDOR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: STAFF & ROSTER DEL EQUIPO (PRESERVED)
         ========================================================================= */}
      {activeView === 'roster' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex flex-col gap-1">
            <span className="modal-kicker">STAFF OFICIAL · ROSTER COMPETITIVO</span>
            <div className="flex items-center gap-3">
              <h2 className="modal-title">Equipo de Global Arena</h2>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#e5384d]/15 text-[#ff6b7a] border border-[#e5384d]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5384d] animate-pulse" />
                TEAM & STAFF
              </span>
            </div>
            <p className="text-xs text-[var(--color-ink-low)] max-w-2xl mt-0.5">
              Conoce a los administradores, desarrolladores y moderadores que mantienen el servidor seguro y balanceado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05] group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-13 w-13 rounded-xl object-cover ring-1 ring-white/15 group-hover:ring-[#e5384d]/50 transition-all"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0d070b] ring-1 ring-white/10">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{member.name}</h4>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-white/10 text-white/90">
                        {getRoleIcon(member.role)}
                        {member.role}
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--color-ink-low)] truncate mt-0.5">
                      {member.responsibility}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-[var(--color-ink-dim)]">
                      <button
                        type="button"
                        onClick={() => handleCopyDiscord(member.discord, member.id)}
                        className="inline-flex items-center gap-1 text-[var(--color-brand-soft)] hover:underline cursor-pointer"
                      >
                        {copiedId === member.id ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                        <span>@{member.discord}</span>
                      </button>
                      <span>•</span>
                      <span>{member.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: POSTULACIONES AL EQUIPO (PRESERVED)
         ========================================================================= */}
      {activeView === 'postular' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex flex-col gap-1">
            <span className="modal-kicker">POSTULACIONES ABIERTAS</span>
            <h2 className="modal-title">Unirse al Equipo Oficial</h2>
            <p className="text-xs text-[var(--color-ink-low)] max-w-2xl mt-0.5">
              Buscamos personas comprometidas para unirse al <strong>Staff Oficial</strong> de Global Arena. Evaluamos conocimiento en FiveM, criterio de moderación y disponibilidad horaria.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-3">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
              <h3 className="text-white text-lg font-bold">¡Solicitud de Equipo Enviada!</h3>
              <p className="text-xs text-[var(--color-ink-low)] max-w-md mx-auto">
                Tu postulación ha sido registrada con éxito. Un administrador se comunicará contigo vía Discord si cumples con el perfil requerido.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[var(--color-ink-low)] uppercase mb-1.5">
                    Discord Tag o Nickname *
                  </label>
                  <input
                    type="text"
                    required
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                    placeholder="ej. TuDiscord#0000 o usuario"
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#e5384d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[var(--color-ink-low)] uppercase mb-1.5">
                    Puesto de Interés
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl bg-[#140b10] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:border-[#e5384d] focus:outline-none"
                  >
                    <option value="moderador">Moderador In-Game</option>
                    <option value="soporte">Agente de Soporte Discord</option>
                    <option value="eventos">Coordinador de Eventos</option>
                    <option value="desarrollador">Desarrollador / Scripting FiveM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--color-ink-low)] uppercase mb-1.5">
                  Disponibilidad Semanal (Horas)
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {['10-15 hrs', '15-25 hrs', '25+ hrs'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setHours(opt)}
                      className={`py-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                        hours === opt
                          ? 'border-[#e5384d] bg-[#e5384d]/20 text-white'
                          : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[var(--color-ink-low)] uppercase mb-1.5">
                  Experiencia Previa y Motivación *
                </label>
                <textarea
                  required
                  rows={4}
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="Detalla tu experiencia en otros servidores, horas de juego en PVP / FiveM y qué valores aportarías..."
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#e5384d] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveView('comunidad')}
                  className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Volver a Comunidad Hub
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#e5384d] text-white text-xs font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(229,56,77,0.4)] hover:bg-[#ff4d61] cursor-pointer"
                >
                  Enviar Postulación
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
