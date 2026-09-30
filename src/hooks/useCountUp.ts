import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1400;

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Animates a number from 0 to `target` once the returned ref scrolls into
 * view. Runs a single time per mount to avoid re-triggering on re-renders.
 */
export function useCountUp<T extends HTMLElement>(target: number) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(() => (typeof IntersectionObserver === 'undefined' ? target : 0));
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();

            const tick = (now: number) => {
              const progress = Math.min((now - start) / DURATION_MS, 1);
              setValue(Math.round(target * easeOutExpo(progress)));
              if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return { ref, value };
}
