import type { StatItem } from '../types';

export const stats: readonly StatItem[] = [
  { id: 'players', label: 'Active Players', value: 42000, suffix: '+' },
  { id: 'tournaments', label: 'Tournaments Hosted', value: 1280, suffix: '+' },
  { id: 'countries', label: 'Countries Reached', value: 96 },
  { id: 'prizes', label: 'Prizes Distributed', value: 15000, prefix: '$', suffix: '+' },
];
