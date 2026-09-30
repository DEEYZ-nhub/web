import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Copy, ShieldCheck, ArrowLeft, Flame, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const STORE_PRODUCTS = [
  {
    id: 'vip',
    name: 'VIP',
    displayName: 'VIP →',
    category: 'MEMBRESÍA',
    subtitle: 'El paquete de inicio definitivo para dominar la arena competitiva.',
    price: '15 USD',
    numericPrice: 15,
    tag: null,
    accentColor: '#ef4444',
    image: '/assets/img/packs/vip.png',
    // Staggered height & size
    wireHeight: 52,
    packWidth: 250,
    idleDuration: 4.4,
    idleRotateRange: [-1.2, 1.2, -1.2],
    shineDelay: '0s',
    includes: [
      'Rango VIP exclusivo en el servidor de FiveM',
      'Prioridad de cola Nivel 1 (Acceso rápido sin esperas)',
      'Acceso a garaje VIP con 3 vehículos deportivos exclusivos',
      'Color de chat personalizado y prefijo [VIP] visible',
      'Salario de facción y recompensas incrementadas un +25%',
      'Rol exclusivo y acceso a canal de sorteos en Discord'
    ],
    description: 'La membresía VIP es el paquete inicial de Global Arena. Diseñado para jugadores competitivos que buscan comodidad, acceso prioritario y ventajas de calidad de vida sin alterar el balance de combate. Las ventajas vigentes, la duración y el precio te los confirma el staff en el ticket.'
  },
  {
    id: 'clan-vip',
    name: 'CLAN VIP',
    displayName: 'CLAN VIP',
    category: 'FACCIÓN & GUERRA',
    subtitle: 'Registra tu banda oficial y domina el mapa con tu squad.',
    price: '30 USD',
    numericPrice: 30,
    tag: 'POPULAR',
    accentColor: '#dc2626',
    image: '/assets/img/packs/clan-vip.png',
    // Staggered height & size: HANGS HIGHER (short wire) & HERO SCALE
    wireHeight: 22,
    packWidth: 275,
    idleDuration: 3.8,
    idleRotateRange: [1, -1, 1],
    shineDelay: '1s',
    includes: [
      'Creación y registro oficial de banda en el ranking',
      'Territorio y base de facción asignada en el mapa',
      'Garaje exclusivo de banda (hasta 12 vehículos simultáneos)',
      'Frecuencia de radio privada encriptada dentro de FiveM',
      'Indumentaria de banda con colores y logos personalizados',
      'Categoría y canales de voz privados en nuestro Discord'
    ],
    description: 'La membresía CLAN VIP permite registrar tu escuadrón en la liga competitiva de Global Arena. Otorga territorio, frecuencia de radio encriptada y garaje faccionario completo. Las ventajas vigentes, la duración y el precio te los confirma el staff en el ticket.'
  },
  {
    id: 'tokens',
    name: 'TOKENS',
    displayName: 'TOKENS',
    category: 'ECONOMÍA & MONEDA',
    subtitle: '50.000 Tokens oficiales para ruletas, cajas y cosméticos.',
    price: '20 USD',
    numericPrice: 20,
    tag: null,
    accentColor: '#f59e0b',
    image: '/assets/img/packs/tokens.png',
    // Staggered height & size: HANGS LOWER (long wire) & COMPACT ("MÁS CHICO")
    wireHeight: 70,
    packWidth: 220,
    idleDuration: 4.8,
    idleRotateRange: [-1.5, 1.5, -1.5],
    shineDelay: '2s',
    includes: [
      '50.000 Global Tokens acreditados directamente a tu cuenta',
      'Canjeable en ruletas de armas, cajas de botín y armería',
      'Sin fecha de caducidad: se conservan entre temporadas',
      'Transferibles entre miembros autorizados de tu facción',
      'Bono adicional de +10% en recargas de temporada'
    ],
    description: 'Los Tokens Global son la divisa premium oficial del servidor para desbloquear cajas de armas exclusivas, skins personalizadas y ruletas especiales dentro de FiveM. La acreditación es inmediata tras validar tu ticket.'
  }
];

export function TiendaExpositor() {
  const { playSound, showToast } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('?pack=')) {
        const packId = hash.split('?pack=')[1];
        return STORE_PRODUCTS.find((p) => p.id === packId) || null;
      }
    }
    return null;
  });

  // Listen for browser back/forward or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('?pack=')) {
        const packId = hash.split('?pack=')[1];
        const found = STORE_PRODUCTS.find((p) => p.id === packId);
        setSelectedProduct(found || null);
      } else {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProduct = (prod) => {
    if (playSound) playSound('modal');
    setSelectedProduct(prod);
    if (typeof window !== 'undefined') {
      window.location.hash = `tienda?pack=${prod.id}`;
    }
  };

  const handleBackToStore = () => {
    if (playSound) playSound('click');
    setSelectedProduct(null);
    if (typeof window !== 'undefined') {
      window.location.hash = 'tienda';
    }
  };

  const handleBuyTicket = (prod) => {
    if (playSound) playSound('success');
    if (showToast) showToast(`Comprando ${prod.name}`, 'Abriendo ticket en Discord...');
    window.open('https://discord.gg/globalarena', '_blank');
  };

  const handleCopyLink = (prod) => {
    const url = `${window.location.origin}${window.location.pathname}#tienda?pack=${prod.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        if (playSound) playSound('success');
        if (showToast) showToast('Enlace Copiado', `Enlace a ${prod.name} copiado.`);
      })
      .catch(() => {
        if (playSound) playSound('click');
        if (showToast) showToast('Enlace Listo', url);
      });
  };

  return (
    <div
      className="relative w-full max-w-[1440px] mx-auto text-white select-none"
      style={{
        paddingLeft: 'clamp(16px, 3.5vw, 36px)',
        paddingRight: 'clamp(16px, 3.5vw, 36px)',
        paddingTop: '8px',
        paddingBottom: '32px'
      }}
    >
      {/* ADVANCED ATMOSPHERIC & KINETIC KEYFRAMES */}
      <style>{`
        @keyframes ambientAuraPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.96);
            opacity: 0.65;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.06);
            opacity: 0.95;
          }
        }

        @keyframes emberRise {
          0% {
            transform: translateY(0) translateX(0) scale(0.7);
            opacity: 0;
          }
          25% {
            opacity: 0.7;
          }
          75% {
            opacity: 0.55;
          }
          100% {
            transform: translateY(-160px) translateX(24px) scale(1.3);
            opacity: 0;
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {selectedProduct ? (
          /* =========================================================
             FULL-PAGE PRODUCT DETAIL VIEW (MATCHING USER SCREENSHOT)
             ========================================================= */
          <motion.div
            key="product-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full min-h-[600px] flex flex-col justify-start"
          >
            {/* Back Button: ← VOLVER A LA TIENDA */}
            <div style={{ marginBottom: '20px' }}>
              <button
                type="button"
                onClick={handleBackToStore}
                className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors cursor-pointer py-1"
                style={{ background: 'none', border: 'none' }}
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform duration-200 group-hover:-translate-x-1 text-[#ff4d61]"
                />
                <span>VOLVER A LA TIENDA</span>
              </button>
            </div>

            {/* Background Tactical Watermark Artwork */}
            <div
              className="pointer-events-none absolute -left-12 top-1/2 -translate-y-1/2 select-none opacity-[0.035] text-[160px] sm:text-[220px] font-black tracking-tighter uppercase -rotate-90 hidden md:block"
              style={{ fontFamily: 'var(--font-brand), "Syne", sans-serif' }}
            >
              GLOBAL
            </div>

            {/* TWO-COLUMN DETAIL ROW */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '56px',
                width: '100%',
                maxWidth: '1240px',
                margin: '0 auto',
                flexWrap: 'wrap'
              }}
            >
              {/* LEFT COLUMN: THE 3D PACK WITH CELLOPHANE GLOSS & PEDESTAL SPOTLIGHT */}
              <div
                style={{
                  flex: '0 0 440px',
                  maxWidth: '460px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  paddingTop: '20px'
                }}
              >
                {/* 1. Volumetric Ambient Red Glow behind the pack */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '440px',
                    height: '440px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(225, 29, 72, 0.42) 0%, rgba(225, 29, 72, 0.14) 42%, transparent 70%)',
                    filter: 'blur(45px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    animation: 'ambientAuraPulse 3s ease-in-out infinite'
                  }}
                />

                {/* 2. Secondary soft center highlight */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 80, 100, 0.28) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                />

                {/* 3. The 3D Pack Image floating with levitation physics */}
                <motion.div
                  initial={{ scale: 0.92, y: 18 }}
                  animate={{
                    scale: 1,
                    y: [0, -10, 0],
                    rotate: [-0.6, 0.6, -0.6]
                  }}
                  transition={{
                    scale: { type: 'spring', damping: 20, stiffness: 240 },
                    y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block'
                    }}
                  >
                    {/* Real 3D Pack Image */}
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{
                        width: '390px',
                        height: 'auto',
                        display: 'block',
                        userSelect: 'none',
                        filter:
                          'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 45px rgba(225, 29, 72, 0.55))'
                      }}
                    />
                  </div>
                </motion.div>

                {/* 4. Floor Pedestal Oval Spotlight / Reflection directly under the pack */}
                <motion.div
                  animate={{
                    scale: [0.95, 1.05, 0.95],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'relative',
                    marginTop: '-16px',
                    width: '320px',
                    height: '26px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, rgba(225, 29, 72, 0.5) 30%, rgba(0,0,0,0.85) 70%, transparent 100%)',
                    filter: 'blur(7px)',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                />
              </div>

              {/* RIGHT COLUMN: SPECS, PRICING, INCLUSIONS & PURCHASE CTA */}
              <div
                style={{
                  flex: '1 1 480px',
                  maxWidth: '600px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  zIndex: 2
                }}
              >
                {/* Category Mono Tag */}
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.25em',
                    color: '#ff4d61',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px'
                  }}
                >
                  {selectedProduct.category}
                </span>

                {/* Big Bold Product Title */}
                <h1
                  style={{
                    fontFamily: 'var(--font-brand), "Syne", sans-serif',
                    fontSize: '56px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    fontStyle: 'italic',
                    color: '#ffffff',
                    margin: '0 0 8px 0',
                    lineHeight: 1.05
                  }}
                >
                  {selectedProduct.name}
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.72)',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    margin: '0 0 24px 0'
                  }}
                >
                  {selectedProduct.subtitle}
                </p>

                {/* Thin Divider Line */}
                <div
                  style={{
                    height: '1px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    marginBottom: '24px'
                  }}
                />

                {/* PRECIO Section */}
                <div style={{ marginBottom: '24px' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.22em',
                      color: 'rgba(255, 255, 255, 0.45)',
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    PRECIO
                  </span>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '36px',
                      fontWeight: 900,
                      color: '#ffffff',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {selectedProduct.price}
                  </div>
                </div>

                {/* Action Buttons: COMPRAR (Red Pill) + COPIAR ENLACE */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '10px'
                  }}
                >
                  {/* COMPRAR Button */}
                  <button
                    type="button"
                    onClick={() => handleBuyTicket(selectedProduct)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px 34px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #e5384d 0%, #b91c1c 100%)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-brand), "Syne", sans-serif',
                      fontSize: '16px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      fontStyle: 'italic',
                      letterSpacing: '0.06em',
                      boxShadow: '0 0 25px rgba(229, 56, 77, 0.5)',
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Ticket size={18} strokeWidth={2.6} />
                    <span>COMPRAR</span>
                  </button>

                  {/* COPIAR ENLACE Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyLink(selectedProduct)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '13px 22px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Copy size={15} />
                    <span>COPIAR ENLACE</span>
                  </button>
                </div>

                {/* Disclaimer subtext */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.45)',
                    marginBottom: '32px'
                  }}
                >
                  <ShieldCheck size={14} color="rgba(255, 255, 255, 0.4)" style={{ flexShrink: 0 }} />
                  <span>Se abre el ticket en nuestro Discord. La web no cobra ni pide datos de pago.</span>
                </div>

                {/* QUÉ INCLUYE */}
                <div style={{ marginBottom: '28px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-brand), "Syne", sans-serif',
                      fontSize: '18px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      margin: '0 0 12px 0'
                    }}
                  >
                    QUÉ INCLUYE
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    {selectedProduct.includes.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: 1.45
                        }}
                      >
                        <span style={{ color: '#ef4444', fontSize: '10px', marginTop: '3px', flexShrink: 0 }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DESCRIPCIÓN */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-brand), "Syne", sans-serif',
                      fontSize: '18px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      margin: '0 0 10px 0'
                    }}
                  >
                    DESCRIPCIÓN
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {selectedProduct.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================
             SLEEK REALISTIC DISPLAY RACK (EXACTLY MATCHING USER IMAGE)
             ========================================================= */
          <motion.div
            key="rack-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Header: EXPOSITOR / TODO LO OFICIAL */}
            <div
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12"
              style={{
                position: 'relative',
                paddingBottom: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Subtle ambient red glow behind title */}
              <div
                style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '-20px',
                  width: '360px',
                  height: '140px',
                  background: 'radial-gradient(ellipse at center, rgba(229, 56, 77, 0.22) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Cyber badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(229, 56, 77, 0.12)',
                    border: '1px solid rgba(229, 56, 77, 0.32)',
                    boxShadow: '0 0 16px rgba(229, 56, 77, 0.18)',
                    marginBottom: '10px'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#ff4d61',
                      boxShadow: '0 0 8px #ff4d61'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.22em',
                      color: '#ff6b7a',
                      textTransform: 'uppercase'
                    }}
                  >
                    EXPOSITOR OFICIAL · FIVE M STORE
                  </span>
                </div>

                {/* Main Title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-brand), "Syne", sans-serif',
                    fontSize: 'clamp(32px, 5vw, 54px)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    fontStyle: 'italic',
                    lineHeight: 1.06,
                    margin: 0,
                    color: '#ffffff',
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  TODO LO{' '}
                  <span
                    style={{
                      fontStyle: 'normal',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #ffffff 0%, #ff6b7a 45%, #e5384d 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 24px rgba(229, 56, 77, 0.55))'
                    }}
                  >
                    OFICIAL
                  </span>
                </h2>
              </div>

              {/* Right info block with description & trust tags */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxWidth: '460px'
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(232, 240, 252, 0.75)',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 400
                  }}
                >
                  Lo que vende el servidor. Abre un producto, mira qué incluye y cómpralo por ticket en nuestro Discord.
                </p>

                {/* Trust mini-pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      color: 'rgba(255, 255, 255, 0.82)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    <ShieldCheck size={13} color="#34d399" />
                    <span>Compra Segura Discord</span>
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono, monospace)',
                      color: 'rgba(255, 255, 255, 0.82)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    <Zap size={13} color="#f59e0b" />
                    <span>Activación Directa Staff</span>
                  </span>
                </div>
              </div>
            </div>

            {/* RACK DISPLAY CONTAINER */}
            <div
              className="relative pt-6 pb-16 w-full overflow-x-auto overflow-y-visible"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Subtle dot matrix background texture matching reference media_1790608868545.png */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)',
                  backgroundSize: '24px 24px',
                  opacity: 0.5,
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              {/* Floating atmospheric embers rising behind the rack */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
                {[
                  { left: '18%', delay: '0s', dur: '5.4s', size: '2.5px' },
                  { left: '34%', delay: '1.2s', dur: '6.2s', size: '3px' },
                  { left: '50%', delay: '0.5s', dur: '4.9s', size: '2px' },
                  { left: '66%', delay: '2.1s', dur: '5.8s', size: '3px' },
                  { left: '84%', delay: '1.6s', dur: '6.5s', size: '2.5px' }
                ].map((e, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: e.left,
                      width: e.size,
                      height: e.size,
                      borderRadius: '50%',
                      background: 'rgba(255, 77, 97, 0.75)',
                      boxShadow: '0 0 8px rgba(255, 77, 97, 0.9)',
                      animation: `emberRise ${e.dur} ease-in-out infinite`,
                      animationDelay: e.delay
                    }}
                  />
                ))}
              </div>

              {/* Soft ambient back-light under the rod */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '92%',
                  maxWidth: '1200px',
                  height: '160px',
                  background:
                    'radial-gradient(ellipse at 50% 10%, rgba(225, 29, 72, 0.16) 0%, rgba(225, 29, 72, 0.03) 50%, transparent 80%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              <div
                className="mx-auto"
                style={{
                  minWidth: '920px',
                  maxWidth: '1160px',
                  position: 'relative',
                  padding: '0 28px'
                }}
              >
                {/* 1. CONTINUOUS INDUSTRIAL METALLIC ROD (EXACT REFERENCE IN media_1790608868545.png) */}
                <div
                  className="relative w-full"
                  style={{ zIndex: 10, height: '24px', display: 'flex', alignItems: 'center' }}
                >
                  {/* Continuous Horizontal Metallic Rod (5px thick) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '5px',
                      borderRadius: '2.5px',
                      background: 'linear-gradient(180deg, #2b2026 0%, #1a1217 50%, #0d080b 100%)',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.95)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.95)'
                    }}
                  >
                    {/* Under-rod Ambient Wall Shadow */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: '-12px',
                        height: '12px',
                        background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.8) 0%, transparent 70%)',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>

                  {/* Left Vertical Mounting Peg (pierces through the rod 22px from left) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '22px',
                      top: '2px',
                      width: '5px',
                      height: '20px',
                      borderRadius: '2.5px',
                      background: 'linear-gradient(180deg, #382a33 0%, #1e151b 50%, #0d080b 100%)',
                      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.95)',
                      zIndex: 12
                    }}
                  />

                  {/* Right Vertical Mounting Peg (pierces through the rod 22px from right) */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '22px',
                      top: '2px',
                      width: '5px',
                      height: '20px',
                      borderRadius: '2.5px',
                      background: 'linear-gradient(180deg, #382a33 0%, #1e151b 50%, #0d080b 100%)',
                      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.95)',
                      zIndex: 12
                    }}
                  />
                </div>

                {/* 2. HORIZONTAL ROW OF HANGING PACKAGES (STAGGERED HEIGHTS & SIZES) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                    gap: '36px',
                    width: '100%',
                    marginTop: '-15px', // Minimal sleeve collars wrap directly around the 5px rod
                    position: 'relative',
                    zIndex: 15
                  }}
                >
                  {STORE_PRODUCTS.map((prod) => (
                    <HangingPackageItem
                      key={prod.id}
                      product={prod}
                      onSelect={() => handleSelectProduct(prod)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// INDIVIDUAL HANGING BLISTER PACKAGE ITEM ON RACK
// (MATCHING media_1790608868545.png WITHOUT WHITE OVERLAY)
// -------------------------------------------------------------
function HangingPackageItem({ product, onSelect }) {
  const { playSound } = useApp();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: `${product.packWidth}px`, // Staggered: 275px (higher center), 250px (left), 220px (smaller right)
        flexShrink: 0,
        position: 'relative'
      }}
    >
      {/* 1. MINIMAL METALLIC SLEEVE COLLAR SLIDING ON THE ROD (media_1790608868545.png) */}
      <div
        style={{
          width: '6px',
          height: '7px',
          borderRadius: '1px',
          background: 'linear-gradient(180deg, #584651 0%, #2e2229 50%, #140d12 100%)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          zIndex: 20,
          position: 'relative'
        }}
      />

      {/* 2. PENDULUM SWING CONTAINER (SWINGS FROM TOP HOOK PIVOT) */}
      <motion.div
        onClick={onSelect}
        onMouseEnter={() => {
          setHovered(true);
          if (playSound) playSound('hover');
        }}
        onMouseLeave={() => setHovered(false)}
        animate={
          hovered
            ? {}
            : {
                rotate: product.idleRotateRange,
                y: [0, -3.5, 0]
              }
        }
        transition={
          hovered
            ? {}
            : {
                duration: product.idleDuration,
                repeat: Infinity,
                ease: 'easeInOut'
              }
        }
        whileHover={{
          scale: 1.07,
          y: -10,
          rotate: product.id === 'clan-vip' ? [0, -3.5, 2.5, -1.2, 0] : [0, 3.5, -2.5, 1.2, 0],
          transition: { type: 'spring', stiffness: 280, damping: 14 }
        }}
        whileTap={{
          scale: 0.98,
          y: -4
        }}
        style={{
          transformOrigin: 'top center', // Physical pendulum swing from top hook!
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          cursor: 'pointer'
        }}
      >
        {/* SUSPENSION WIRE & CHROME HOOK */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* Thin Straight Stainless Steel Wire (1px) */}
          <div
            style={{
              width: '1px',
              height: `${product.wireHeight}px`, // Staggered: 22px (high), 52px (mid), 70px (low)
              background: 'linear-gradient(180deg, #9ca3af 0%, #6b7280 50%, #374151 100%)'
            }}
          />

          {/* Chrome Wire Hook entering Euro-slot */}
          <div
            style={{
              marginTop: '-2px',
              zIndex: 14,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
            }}
          >
            <svg viewBox="0 0 14 20" width="14" height="20" fill="none">
              <path
                d="M7 0V11C7 14 10.5 14 10.5 11.5L10.5 9"
                stroke="#9ca3af"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 0V11C7 14 10.5 14 10.5 11.5L10.5 9"
                stroke="#ffffff"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>

        {/* 3. 3D BLISTER FOIL POUCH */}
        <div
          style={{
            position: 'relative',
            marginTop: '-16px', // Hook clips precisely through the Euro-slot
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* A. Atmospheric Volumetric Red Ambient Glow behind the envelope */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${product.packWidth + 40}px`,
              height: '360px',
              borderRadius: '50%',
              background: hovered
                ? 'radial-gradient(circle, rgba(225, 29, 72, 0.45) 0%, rgba(225, 29, 72, 0.12) 45%, transparent 75%)'
                : 'radial-gradient(circle, rgba(225, 29, 72, 0.18) 0%, rgba(225, 29, 72, 0.04) 45%, transparent 75%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              transition: 'background 0.35s ease',
              zIndex: 0,
              animation: 'ambientAuraPulse 3.5s ease-in-out infinite'
            }}
          />

          {/* B. Floating Popular Tag */}
          {product.tag && (
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                right: '8px',
                zIndex: 25
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 9px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #e11d48 0%, #b91c1c 100%)',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontSize: '9.5px',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  boxShadow: '0 0 16px rgba(225, 29, 72, 0.85), 0 2px 4px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.4)'
                }}
              >
                <Flame size={10} />
                <span>{product.tag}</span>
              </span>
            </div>
          )}

          {/* C. The Real 3D Pack Graphic (CLEAN - NO WHITE BOX / CELLOPHANE OVERLAY) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              transition: 'filter 0.3s ease',
              filter: hovered
                ? 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 35px rgba(225, 29, 72, 0.6))'
                : 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 16px rgba(225, 29, 72, 0.25))'
            }}
          >
            {/* The Actual Foil Blister Image */}
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: `${product.packWidth}px`,
                height: 'auto',
                display: 'block',
                pointerEvents: 'none'
              }}
              loading="eager"
            />
          </div>

          {/* D. Oval Floor/Air Ambient Reflection beneath each hanging pack */}
          <div
            style={{
              marginTop: '-12px',
              width: `${Math.round(product.packWidth * 0.72)}px`,
              height: '16px',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, rgba(225, 29, 72, 0.22) 0%, rgba(0,0,0,0.7) 45%, transparent 75%)',
              filter: 'blur(5px)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        </div>
      </motion.div>

      {/* 4. BOTTOM LABEL & PRICE */}
      <motion.div
        animate={hovered ? { scale: 1.05, y: -3 } : { scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        style={{
          marginTop: '14px',
          textAlign: 'center',
          cursor: 'pointer',
          zIndex: 20
        }}
        onClick={onSelect}
      >
        <h4
          style={{
            fontSize: product.id === 'clan-vip' ? '17px' : '15px',
            fontWeight: 900,
            letterSpacing: '0.04em',
            margin: 0,
            transition: 'color 0.2s ease',
            color: hovered ? '#ff6b7a' : '#ffffff'
          }}
        >
          {product.displayName}
        </h4>
        <span
          style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: 800,
            color: product.id === 'clan-vip' ? '#ff6b7a' : 'rgba(255, 255, 255, 0.85)',
            fontFamily: 'monospace',
            marginTop: '3px',
            padding: '2px 8px',
            borderRadius: '4px',
            background: hovered ? 'rgba(225, 29, 72, 0.16)' : 'rgba(255, 255, 255, 0.04)',
            border: hovered ? '1px solid rgba(225, 29, 72, 0.45)' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: hovered ? '0 0 12px rgba(225, 29, 72, 0.35)' : 'none',
            transition: 'all 0.25s ease'
          }}
        >
          {product.price}
        </span>
      </motion.div>
    </div>
  );
}
