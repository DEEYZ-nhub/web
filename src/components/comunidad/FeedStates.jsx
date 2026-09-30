import React from 'react';
import { AlertTriangle, Bookmark, MessageSquarePlus, RefreshCw, Search } from 'lucide-react';

function SkeletonBlock({ className }) {
  return <div className={`comunidad-shimmer rounded-md ${className}`} />;
}

export function FeedSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite" aria-label="Cargando publicaciones">
      {[0, 1, 2].map((i) => (
        <article
          key={i}
          className="rounded-[12px] border border-white/[0.12] bg-[#07070b] p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <SkeletonBlock className="h-3 w-36" />
              <SkeletonBlock className="h-2.5 w-24" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-[88%]" />
            <SkeletonBlock className="h-3 w-[62%]" />
          </div>
          {i === 1 && <SkeletonBlock className="mt-4 h-40 w-full rounded-lg" />}
          <div className="mt-5 flex gap-6 border-t border-white/[0.06] pt-4">
            <SkeletonBlock className="h-4 w-12" />
            <SkeletonBlock className="h-4 w-12" />
            <SkeletonBlock className="h-4 w-12" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function FeedEmpty({ tab, query, onClear }) {
  const copy = query
    ? {
        icon: Search,
        title: 'Sin resultados',
        text: `No hay publicaciones que coincidan con “${query}”.`
      }
    : tab === 'guardados'
      ? {
          icon: Bookmark,
          title: 'Nada guardado todavía',
          text: 'Guarda clips, reclutamientos y avisos para volver a ellos más tarde.'
        }
      : {
          icon: MessageSquarePlus,
          title: 'El feed está en calma',
          text: 'Sé el primero en publicar o cambia de filtro para descubrir otro contenido.'
        };

  const Icon = copy.icon;

  return (
    <div
      className="flex flex-col items-center rounded-[12px] border border-white/[0.12] bg-[#07070b] px-6 py-14 text-center"
      role="status"
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#ff2d46]">
        <Icon size={20} />
      </span>
      <h3 className="text-xl font-black italic uppercase [font-family:var(--font-display)]">
        {copy.title}
      </h3>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-[#8e96a5]">{copy.text}</p>
      {query && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 min-h-11 rounded-lg border border-white/15 px-4 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#ff2d46] hover:text-[#ff2d46]"
        >
          Limpiar búsqueda
        </button>
      )}
    </div>
  );
}

export function FeedError({ onRetry }) {
  return (
    <div
      className="flex flex-col items-center rounded-[12px] border border-[#ff2d46]/40 bg-[#1c060d] px-6 py-12 text-center"
      role="alert"
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ff2d46]/40 bg-[#ff2d46]/10 text-[#ff2d46]">
        <AlertTriangle size={20} />
      </span>
      <h3 className="text-xl font-black italic uppercase [font-family:var(--font-display)]">
        No se pudo cargar
      </h3>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-[#b8b3b7]">
        El feed de comunidad no respondió. Vuelve a intentarlo sin perder tus filtros.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#ff2d46] px-4 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <RefreshCw size={14} />
        Reintentar
      </button>
    </div>
  );
}
