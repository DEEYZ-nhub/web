import { useEffect, useState } from 'react';

const MIN_DISPLAY_MS = 1400;

/**
 * Keeps the preloader mounted for a minimum duration (so the intro animation
 * always gets to play) and then also waits for `window.load` before hiding.
 */
export function usePreloader() {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let loaded = document.readyState === 'complete';
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);
      window.setTimeout(() => setIsDone(true), remaining);
    };

    if (loaded) {
      finish();
      return;
    }

    const onLoad = () => {
      loaded = true;
      finish();
    };

    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return isDone;
}
