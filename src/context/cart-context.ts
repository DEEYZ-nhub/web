import { createContext } from 'react';
import type { CartLine } from '../types';

export interface CartContextValue {
  readonly lines: readonly CartLine[];
  readonly totalCount: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
