import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Resets scroll position on every route change (react-router doesn't do this by default). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
