import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartLine } from '../types';
import { CartContext, type CartContextValue } from './cart-context';

const STORAGE_KEY = 'global-arena.cart.v1';

function readStoredLines(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CartLine =>
        typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as CartLine).productId === 'string' &&
        typeof (entry as CartLine).quantity === 'number',
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { readonly children: React.ReactNode }) {
  const [lines, setLines] = useState<readonly CartLine[]>(() => readStoredLines());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable (private browsing, quota); the cart still
      // works for the current session, it just won't persist.
    }
  }, [lines]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (existing) {
        return current.map((line) =>
          line.productId === productId ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...current, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totalCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  const value = useMemo<CartContextValue>(
    () => ({ lines, totalCount, addItem, removeItem, clear }),
    [lines, totalCount, addItem, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
