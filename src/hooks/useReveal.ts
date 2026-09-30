import { useEffect, useRef } from 'react';

/**
 * Adds an `is-visible` class once the element scrolls into view, driving the
 * `.reveal` CSS transition defined in index.css. Uses IntersectionObserver so
 * work only happens near the viewport instead of on every scroll event.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
