import { useEffect, useRef } from 'react';
import styles from './CursorFx.module.css';

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-active]';

/**
 * Custom cursor dot + lagging ring. Skips itself entirely on touch/coarse
 * pointers so it never interferes with mobile tapping.
 */
export function CursorFx() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let rafId = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      dot.classList.add(styles.visible!);
      ring.classList.add(styles.visible!);

      const isInteractive = (event.target as Element | null)?.closest(INTERACTIVE_SELECTOR);
      ring.classList.toggle(styles.active!, Boolean(isInteractive));
    };

    const onLeave = () => {
      dot.classList.remove(styles.visible!);
      ring.classList.remove(styles.visible!);
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    rafId = requestAnimationFrame(animate);

    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
