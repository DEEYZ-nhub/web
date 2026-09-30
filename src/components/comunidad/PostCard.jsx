import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2
} from 'lucide-react';
import { PlayerAvatar } from './PlayerAvatar';

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}k`;
  return String(n);
}

export function PostCard({ post, onLike, onSave, onShare, onComment, reduceMotion }) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [likeBurst, setLikeBurst] = useState(false);
  const menuRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const motionOff = reduceMotion || prefersReduced;

  const submitComment = (e) => {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    onComment(post.id, value);
    setDraft('');
    setCommentsOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onPointer = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleLike = () => {
    onLike(post.id);
    if (!post.liked) {
      setLikeBurst(true);
      window.setTimeout(() => setLikeBurst(false), 450);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-[12px] border border-white/[0.12] bg-[#07070b] transition-[border-color,transform] duration-200 hover:border-white/30">
      <div className="p-5 sm:p-6">
        <header className="flex items-start gap-3">
          <PlayerAvatar initials={post.author.initials} color={post.author.color} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <h3 className="truncate text-[14.5px] font-semibold text-white">{post.author.name}</h3>
              {post.author.verified && (
                <span className="rounded px-1.5 py-px text-[9px] font-mono font-bold uppercase tracking-[0.14em] text-[#ff2d46]">
                  Verificado
                </span>
              )}
            </div>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] font-mono font-bold uppercase tracking-[0.12em] text-[#7d8694]">
              <span>{post.author.handle}</span>
              <span aria-hidden="true">·</span>
              <span>{post.author.clan}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={new Date(post.timestamp).toISOString()}>{post.time}</time>
            </p>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="Más opciones"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#8e96a5] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <MoreHorizontal size={18} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={motionOff ? false : { opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={motionOff ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-white/12 bg-[#0b0b12] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
                  role="menu"
                >
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full px-3 py-2.5 text-left text-[12px] text-white/90 hover:bg-white/[0.06]"
                    onClick={() => {
                      onShare(post);
                      setMenuOpen(false);
                    }}
                  >
                    Copiar enlace
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full px-3 py-2.5 text-left text-[12px] text-white/90 hover:bg-white/[0.06]"
                    onClick={() => {
                      onSave(post.id);
                      setMenuOpen(false);
                    }}
                  >
                    {post.saved ? 'Quitar de guardados' : 'Guardar publicación'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <p className="mt-4 text-[14.5px] leading-relaxed text-white/90">{post.text}</p>

        {post.image && (
          <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.08]">
            <img
              src={post.image}
              alt=""
              className="h-48 w-full object-cover sm:h-56"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-1 border-t border-white/[0.06] px-2 sm:px-3">
        <ActionButton
          pressed={post.liked}
          label={`${post.liked ? 'Quitar me gusta' : 'Me gusta'}. ${post.likes} en total`}
          onClick={handleLike}
        >
          <Heart
            size={17}
            className={likeBurst ? 'comunidad-like-pop' : ''}
            fill={post.liked ? '#ff2d46' : 'none'}
            color={post.liked ? '#ff2d46' : 'currentColor'}
          />
          <span className={post.liked ? 'text-[#ff2d46]' : ''}>{formatCount(post.likes)}</span>
        </ActionButton>

        <ActionButton
          pressed={commentsOpen}
          label={`${commentsOpen ? 'Cerrar' : 'Abrir'} comentarios. ${post.comments.length} en total`}
          onClick={() => setCommentsOpen((v) => !v)}
        >
          <MessageCircle size={17} />
          <span>{formatCount(post.comments.length)}</span>
        </ActionButton>

        <ActionButton label="Compartir publicación" onClick={() => onShare(post)}>
          <Share2 size={17} />
          <span>{formatCount(post.shares)}</span>
        </ActionButton>

        <ActionButton
          pressed={post.saved}
          label={post.saved ? 'Quitar de guardados' : 'Guardar publicación'}
          onClick={() => onSave(post.id)}
        >
          <Bookmark
            size={17}
            fill={post.saved ? '#ff2d46' : 'none'}
            color={post.saved ? '#ff2d46' : 'currentColor'}
          />
        </ActionButton>
      </div>

      <AnimatePresence initial={false}>
        {commentsOpen && (
          <motion.section
            key="comments"
            initial={motionOff ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={motionOff ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06]"
            aria-label="Comentarios"
          >
            <div className="space-y-4 px-5 py-4 sm:px-6">
              {post.comments.length === 0 ? (
                <p className="text-[13px] text-[#8e96a5]">Sé el primero en comentar.</p>
              ) : (
                <ul className="space-y-3.5">
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="flex gap-2.5">
                      <PlayerAvatar initials={comment.initials} color={comment.color} size="sm" />
                      <div className="min-w-0 flex-1 rounded-lg bg-white/[0.03] px-3 py-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[12.5px] font-semibold text-white">{comment.author}</span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#7d8694]">
                            {comment.time}
                          </span>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-white/80">{comment.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <form onSubmit={submitComment} className="flex items-end gap-2">
                <label htmlFor={`comment-${post.id}`} className="sr-only">
                  Escribe un comentario
                </label>
                <textarea
                  id={`comment-${post.id}`}
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Escribe un comentario…"
                  className="min-h-11 flex-1 resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[13.5px] text-white placeholder:text-[#7d8694] transition-colors focus:border-[#ff2d46]/50"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#ff2d46] text-white transition-transform enabled:hover:scale-[1.04] enabled:active:scale-[0.96] disabled:opacity-35"
                  aria-label="Enviar comentario"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </article>
  );
}

function ActionButton({ children, onClick, label, pressed }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed ? true : undefined}
      className="inline-flex min-h-12 min-w-12 flex-1 items-center justify-center gap-1.5 rounded-lg px-1 text-[12px] font-mono font-bold text-[#8e96a5] transition-colors hover:bg-white/[0.05] hover:text-white"
    >
      {children}
    </button>
  );
}
