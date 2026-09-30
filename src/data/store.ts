import type { StoreItem } from '../types';

export const storeItems: readonly StoreItem[] = [
  {
    id: 'challenger-rank',
    name: 'Challenger Rank',
    description: 'Unlock exclusive kits, tags and priority queue.',
    price: '$9.99',
    glyph: '⚔',
    colorFrom: '#ff6b57',
    colorTo: '#7a1710',
    badge: 'POPULAR',
  },
  {
    id: 'cosmetic-crate',
    name: 'Cosmetic Crate',
    description: 'Random trail, cape and kill-effect bundle.',
    price: '$4.99',
    glyph: '✦',
    colorFrom: '#ffb057',
    colorTo: '#7a4a10',
  },
  {
    id: 'season-pass',
    name: 'Season Pass',
    description: 'Full track of rewards across the entire season.',
    price: '$14.99',
    glyph: '◆',
    colorFrom: '#57ffb0',
    colorTo: '#107a4a',
  },
  {
    id: 'legend-bundle',
    name: 'Legend Bundle',
    description: 'Top-tier rank plus the full cosmetic vault.',
    price: '$24.99',
    glyph: '♛',
    colorFrom: '#57b0ff',
    colorTo: '#10467a',
  },
];
