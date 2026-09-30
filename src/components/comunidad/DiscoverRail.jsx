import React from 'react';
import { ExternalLink, Users } from 'lucide-react';
import { FEATURED_CLANS, SUGGESTED_PLAYERS } from './communityData';
import { PlayerAvatar } from './PlayerAvatar';

export function DiscoverRail({ followed, onFollow, onHubAction, onOpenExplore }) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
      <section className="rounded-[12px] border border-white/[0.12] bg-[#07070b] p-5">
        <span className="block text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] text-[#ff2d46]">
          Descubre
        </span>
        <h2 className="mt-1 text-lg font-black italic uppercase [font-family:var(--font-display)]">
          Jugadores
        </h2>
        <ul className="mt-4 space-y-3">
          {SUGGESTED_PLAYERS.map((player) => {
            const isFollowed = followed.has(player.id);
            return (
              <li key={player.id} className="flex items-center gap-3">
                <PlayerAvatar initials={player.initials} color={player.color} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-white">{player.name}</p>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#7d8694]">
                    {player.clan} · {player.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onFollow(player)}
                  aria-pressed={isFollowed}
                  className={`min-h-10 rounded-lg px-3 text-[10px] font-mono font-bold uppercase tracking-[0.14em] transition-colors ${
                    isFollowed
                      ? 'border border-white/15 text-white/80 hover:border-[#ff2d46] hover:text-[#ff2d46]'
                      : 'bg-[#ff2d46] text-white hover:bg-[#e5384d]'
                  }`}
                >
                  {isFollowed ? 'Siguiendo' : 'Seguir'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-[12px] border border-white/[0.12] bg-[#07070b] p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-black italic uppercase [font-family:var(--font-display)]">
            Clanes
          </h2>
          <Users size={16} className="text-[#ff2d46]" aria-hidden="true" />
        </div>
        <ul className="mt-4 space-y-2.5">
          {FEATURED_CLANS.map((clan) => (
            <li key={clan.id}>
              <button
                type="button"
                onClick={() => onHubAction('clanes')}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors hover:border-white/30 ${
                  clan.highlight
                    ? 'border-[#ff2d46]/50 bg-[#1c060d]'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ff2d46]/70 bg-[#2d070d] text-[11px] font-black italic text-white">
                  {clan.tag}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-white">{clan.name}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#7d8694]">
                    #{clan.rank} · {clan.members} miembros
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[12px] border border-white/[0.12] bg-[#07070b] p-5">
        <h2 className="text-lg font-black italic uppercase [font-family:var(--font-display)]">
          Accesos
        </h2>
        <div className="mt-4 grid gap-2">
          <RailLink onClick={() => onHubAction('novedades')}>Novedades del parche</RailLink>
          <RailLink onClick={() => onHubAction('postulaciones')}>Postulaciones staff</RailLink>
          <RailLink onClick={onOpenExplore}>Explorar la comunidad</RailLink>
          <RailLink onClick={() => onHubAction('discord')} external>
            Discord oficial
          </RailLink>
        </div>
      </section>
    </aside>
  );
}

function RailLink({ children, onClick, external }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-11 w-full items-center justify-between rounded-lg border border-white/[0.08] px-3 text-left text-[12.5px] text-white/90 transition-colors hover:border-white/25 hover:text-white"
    >
      {children}
      {external ? <ExternalLink size={13} className="text-[#ff2d46]" /> : <span className="text-[#ff2d46]">→</span>}
    </button>
  );
}
