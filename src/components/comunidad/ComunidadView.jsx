import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PenLine, Search, Send, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COMMUNITY_STATS, FEED_TABS, INITIAL_POSTS } from './communityData';
import { DiscoverRail } from './DiscoverRail';
import { ExploreHub } from './ExploreHub';
import { FeedEmpty, FeedError, FeedSkeleton } from './FeedStates';
import { PostCard } from './PostCard';
import './comunidad.css';

const CURRENT_USER = {
  name: 'e2f2ke7gx',
  handle: '@e2f2ke7gx',
  initials: 'E2',
  clan: 'VAGOS',
  verified: false,
  color: '#e5384d'
};

function clonePosts(posts) {
  return posts.map((post) => ({
    ...post,
    liked: false,
    saved: false,
    comments: post.comments.map((comment) => ({ ...comment }))
  }));
}

export function ComunidadView() {
  const { playSound, showToast, openModal } = useApp();
  const reduceMotion = useReducedMotion();
  const composerRef = useRef(null);

  const [tab, setTab] = useState('para-ti');
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [posts, setPosts] = useState(() => clonePosts(INITIAL_POSTS));
  const [status, setStatus] = useState('loading');
  const [followed, setFollowed] = useState(() => new Set());
  const [composerOpen, setComposerOpen] = useState(false);

  const loadFeed = useCallback((simulateError = false) => {
    setStatus('loading');
    const timer = window.setTimeout(() => {
      if (simulateError) {
        setStatus('error');
        return;
      }
      setPosts((prev) => (prev.length ? prev : clonePosts(INITIAL_POSTS)));
      setStatus('ready');
    }, 720);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    return loadFeed(false);
  }, [loadFeed]);

  const handleHubAction = (cardId) => {
    playSound('click');
    switch (cardId) {
      case 'clanes':
        showToast('Clanes Oficiales', 'Explorando clanes y ranking de facciones.');
        setTab('clanes');
        break;
      case 'creadores':
        showToast('Programa de Creadores', 'Canal oficial de directos, clips y creadores verificados.');
        break;
      case 'fundadores':
        showToast('Fundadores', 'Ciro, Mechax y Gloobs — Fundadores del proyecto.');
        break;
      case 'desarrollo':
        showToast('Equipo de Desarrollo', 'Complex Studios & Anstore — Scripts y mapeos.');
        break;
      case 'novedades':
        openModal('cambios');
        break;
      case 'postulaciones':
        openModal('postulaciones');
        break;
      case 'discord':
        playSound('success');
        showToast('Discord Oficial', 'Abriendo servidor discord.gg/globalarena...');
        window.open('https://discord.gg/globalarena', '_blank', 'noopener,noreferrer');
        break;
      default:
        break;
    }
  };

  const filteredPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (tab === 'guardados' && !post.saved) return false;
      if (tab === 'clanes' && post.category !== 'clanes') return false;
      if (tab === 'eventos' && post.category !== 'eventos') return false;
      if (tab === 'destacados' && !post.featured && post.likes < 100) return false;
      if (!needle) return true;
      const haystack = `${post.text} ${post.author.name} ${post.author.clan} ${post.author.handle}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, query, tab]);

  const handleLike = (id) => {
    playSound('click');
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
          : post
      )
    );
  };

  const handleSave = (id) => {
    playSound('click');
    const target = posts.find((post) => post.id === id);
    const nextSaved = !target?.saved;
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, saved: !post.saved } : post)));
    showToast(
      nextSaved ? 'Guardado' : 'Eliminado de guardados',
      nextSaved ? 'Lo encontrarás en la pestaña Guardados.' : 'La publicación ya no está en Guardados.'
    );
  };

  const handleShare = async (post) => {
    const url = `${window.location.origin}${window.location.pathname}#comunidad?post=${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      playSound('success');
      showToast('Enlace copiado', 'Comparte esta publicación con tu clan.');
      setPosts((prev) => prev.map((item) => (item.id === post.id ? { ...item, shares: item.shares + 1 } : item)));
    } catch {
      playSound('click');
      showToast('Enlace listo', url);
    }
  };

  const handleComment = (id, text) => {
    playSound('success');
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c-${Date.now()}`,
                  author: CURRENT_USER.name,
                  initials: CURRENT_USER.initials,
                  color: CURRENT_USER.color,
                  time: 'ahora',
                  text
                }
              ]
            }
          : post
      )
    );
    showToast('Comentario publicado', 'Tu respuesta ya está visible en el hilo.');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const next = {
      id: `post-${Date.now()}`,
      category: tab === 'eventos' ? 'eventos' : tab === 'clanes' ? 'clanes' : 'para-ti',
      featured: false,
      time: 'ahora',
      timestamp: Date.now(),
      author: CURRENT_USER,
      text,
      image: null,
      likes: 0,
      shares: 0,
      liked: false,
      saved: false,
      comments: []
    };
    setPosts((prev) => [next, ...prev]);
    setDraft('');
    setComposerOpen(false);
    setTab('para-ti');
    playSound('success');
    showToast('Publicación enviada', 'Tu mensaje ya está en el feed de la comunidad.');
  };

  const handleFollow = (player) => {
    playSound('click');
    const isFollowed = followed.has(player.id);
    setFollowed((prev) => {
      const next = new Set(prev);
      if (isFollowed) next.delete(player.id);
      else next.add(player.id);
      return next;
    });
    showToast(isFollowed ? 'Dejaste de seguir' : 'Siguiendo', isFollowed ? player.name : `${player.name} · ${player.clan}`);
  };

  const openComposer = () => {
    setComposerOpen(true);
    window.setTimeout(() => composerRef.current?.focus(), 80);
  };

  const fade = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 }
      };

  return (
    <div className="comunidad-root relative mx-auto w-full max-w-[1380px] px-4 pb-16 pt-1 text-white sm:px-6 lg:px-8">
      <header className="mb-8 space-y-3.5">
        <span className="block text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#ff2d46]">
          Nexus Community
        </span>
        <h1
          className="text-5xl font-black italic uppercase leading-none tracking-[-0.03em] text-white [font-family:var(--font-display)] sm:text-7xl md:text-[76px]"
          style={{ fontVariationSettings: '"wdth" 110' }}
        >
          Comunidad
        </h1>
        <h2 className="pt-0.5 text-xl font-normal tracking-normal text-white/95 sm:text-2xl md:text-[25px]">
          El lugar donde los jugadores se encuentran
        </h2>
        <p className="max-w-2xl pt-0.5 text-[13.5px] leading-relaxed text-[#8e96a5] sm:text-[14.5px]">
          Comparte tu pasión, conoce a otros miembros, participa en eventos y forma parte de una comunidad que vive el mismo juego que tú.
        </p>

        <div className="flex flex-col gap-5 pt-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {COMMUNITY_STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="h-[34px] w-[2px] shrink-0 bg-[#ff2d46]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black leading-none tracking-tight [font-family:var(--font-display)] sm:text-[28px]">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#7d8694]">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openComposer}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#ff2d46] px-4 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <PenLine size={14} />
              Publicar
            </button>
            <button
              type="button"
              onClick={() => handleHubAction('discord')}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-4 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#ff2d46] hover:text-[#ff2d46]"
            >
              Discord
            </button>
          </div>
        </div>
      </header>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <nav aria-label="Filtros de comunidad" className="comunidad-filters flex min-w-0 gap-1.5 overflow-x-auto pb-1">
          {FEED_TABS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setTab(item.id);
                }}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-[11px] font-mono font-bold uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? 'bg-[#ff2d46] text-white'
                    : 'bg-white/[0.04] text-[#8e96a5] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {tab !== 'explorar' && (
          <label className="relative min-w-0 flex-1 lg:max-w-xs">
            <span className="sr-only">Buscar en el feed</span>
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7d8694]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar jugadores, clanes o clips…"
              className="h-11 w-full rounded-lg border border-white/10 bg-[#07070b] pl-9 pr-3 text-[13px] text-white placeholder:text-[#7d8694] transition-colors focus:border-[#ff2d46]/50"
            />
          </label>
        )}
      </div>

      <AnimatePresence>
        {composerOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 rounded-[12px] border border-white/[0.12] bg-[#07070b] p-4 sm:p-5"
          >
            <form onSubmit={handlePublish}>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#ff2d46]">
                  Nueva publicación
                </p>
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#8e96a5] hover:bg-white/[0.06] hover:text-white"
                  aria-label="Cerrar compositor"
                >
                  <X size={16} />
                </button>
              </div>
              <textarea
                ref={composerRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                placeholder="Comparte un clip, un reclutamiento o un aviso para la arena…"
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-[14px] text-white placeholder:text-[#7d8694] focus:border-[#ff2d46]/50"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#ff2d46] px-4 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white transition-transform enabled:hover:scale-[1.02] enabled:active:scale-[0.98] disabled:opacity-35"
                >
                  <Send size={14} />
                  Publicar ahora
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {tab === 'explorar' ? (
        <ExploreHub onAction={handleHubAction} />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            {status === 'loading' && <FeedSkeleton />}
            {status === 'error' && <FeedError onRetry={() => loadFeed(false)} />}
            {status === 'ready' && filteredPosts.length === 0 && (
              <FeedEmpty tab={tab} query={query} onClear={() => setQuery('')} />
            )}
            {status === 'ready' && filteredPosts.length > 0 && (
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      layout={!reduceMotion}
                      {...fade}
                      transition={{ duration: 0.22, delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16), ease: [0.16, 1, 0.3, 1] }}
                    >
                      <PostCard
                        post={post}
                        onLike={handleLike}
                        onSave={handleSave}
                        onShare={handleShare}
                        onComment={handleComment}
                        reduceMotion={reduceMotion}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <DiscoverRail
            followed={followed}
            onFollow={handleFollow}
            onHubAction={handleHubAction}
            onOpenExplore={() => setTab('explorar')}
          />
        </div>
      )}
    </div>
  );
}
