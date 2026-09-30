import { useCallback, useRef } from 'react';

const MAX_TILT_DEG = 6;

/**
 * Returns pointer handlers for a "tilt + spotlight" hover card: rotates the
 * card toward the cursor and exposes `--mx`/`--my` CSS variables a spotlight
 * gradient can follow. All math stays on the DOM node (no React state), so
 * mouse-move doesn't trigger re-renders.
 */
export function usePointerTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - py) * MAX_TILT_DEG;
    const rotateY = (px - 0.5) * MAX_TILT_DEG;

    node.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    node.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    node.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    node.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  }, []);

  const onPointerLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
