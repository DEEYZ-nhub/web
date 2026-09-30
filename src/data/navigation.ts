import type { NavDropdown, NavLink } from '../types';

export const navLinks: readonly NavLink[] = [
  { label: 'HOME', href: '/' },
  { label: 'STORE', href: '/store' },
  { label: 'TOURNAMENTS', href: '/#tournaments', isLive: true },
  { label: 'STATS', href: '/#stats' },
  { label: 'TEAM', href: '/#team' },
];

export const navDropdowns: readonly NavDropdown[] = [
  {
    label: 'RULES',
    items: [
      { label: 'General Conduct', href: '#' },
      { label: 'PvP Guidelines', href: '#' },
      { label: 'Tournament Rules', href: '#' },
    ],
  },
];
