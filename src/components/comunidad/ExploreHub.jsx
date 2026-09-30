import React from 'react';
import { EXPLORE_CARDS } from './communityData';

const DISCORD_PATH =
  'M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z';

function ExploreCard({ card, onAction }) {
  return (
    <button
      type="button"
      onClick={() => onAction(card.id)}
      className={`group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[12px] border p-6 text-left transition-all duration-200 sm:p-7 ${
        card.featured
          ? 'border-[#ff2d46]/70 bg-gradient-to-r from-[#1c060d] via-[#100307] to-[#070204] hover:border-[#ff2d46] hover:shadow-[0_0_35px_rgba(255,45,70,0.25)]'
          : 'border-white/[0.12] bg-[#07070b] hover:border-white/30'
      }`}
    >
      {card.image && (
        <span
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 transition-opacity duration-300 group-hover:opacity-35"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(7,7,11,0.2) 0%, rgba(7,7,11,0.95) 85%), url('${card.image}')`
          }}
          aria-hidden="true"
        />
      )}

      {card.watermark && (
        <span className="pointer-events-none absolute right-3 top-1 select-none text-5xl font-black italic leading-none text-white/[0.04] [font-family:var(--font-display)] sm:text-[68px]">
          {card.watermark}
        </span>
      )}

      {card.featured && (
        <svg
          viewBox="0 0 127.14 96.36"
          className="pointer-events-none absolute -bottom-4 right-0 h-auto w-44 fill-current text-[#ff2d46]/[0.18] transition-colors duration-300 group-hover:text-[#ff2d46]/[0.26] sm:right-4 sm:bottom-0 sm:w-64"
          aria-hidden="true"
        >
          <path d={DISCORD_PATH} />
        </svg>
      )}

      <span
        className="relative z-10 text-[32px] font-black italic leading-none [font-family:var(--font-display)]"
        style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
      >
        {card.number}
      </span>

      <div className="relative z-10 pt-6">
        <h3 className="text-[28px] font-black italic uppercase leading-tight tracking-[0.02em] [font-family:var(--font-display)]">
          {card.title}
        </h3>
        <p className={`mt-1.5 max-w-lg text-[13px] leading-relaxed ${card.featured ? 'text-[#b8b3b7]' : 'text-[#8e95a5]'}`}>
          {card.description}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#858e9d]">
          <span className="text-[8px] text-[#ff2d46]">■</span>
          {card.meta}
        </p>
        <div className="mt-4 border-t border-white/[0.06] pt-3.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-extrabold uppercase tracking-[0.18em] text-white transition-colors group-hover:text-[#ff334b]">
            {card.id === 'discord' ? 'Entrar al Discord' : 'Entrar'}
            <span className="text-[13px] text-[#ff2d46] transition-transform group-hover:translate-x-1">
              {card.id === 'discord' ? '↗' : '→'}
            </span>
          </span>
        </div>
      </div>
    </button>
  );
}

export function ExploreHub({ onAction }) {
  const rows = [
    { className: 'comunidad-explore-row--split-a', cards: EXPLORE_CARDS.slice(0, 2) },
    { className: 'comunidad-explore-row--thirds', cards: EXPLORE_CARDS.slice(2, 5) },
    { className: 'comunidad-explore-row--split-b', cards: EXPLORE_CARDS.slice(5) }
  ];

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="mb-1">
        <span className="block text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] text-[#ff2d46]">
          Explora
        </span>
        <div className="mt-1 flex items-center">
          <h2 className="shrink-0 text-xl text-white sm:text-2xl">
            <span className="font-black italic uppercase [font-family:var(--font-display)]">Navega</span>{' '}
            <span className="font-normal text-white/80">por dónde entrar</span>
          </h2>
          <div className="ml-5 hidden h-px flex-1 bg-white/[0.08] sm:block" />
        </div>
      </div>

      {rows.map((row) => (
        <div key={row.className} className={`comunidad-explore-row ${row.className}`}>
          {row.cards.map((card) => (
            <ExploreCard key={card.id} card={card} onAction={onAction} />
          ))}
        </div>
      ))}
    </div>
  );
}
