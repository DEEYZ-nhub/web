/**
 * Mock data for Global Arena
 */

export const LEADERBOARD_PLAYERS = [
  { rank: 1, name: 'Vort3x_Sniper', gang: 'VAGOS', kills: 3421, deaths: 820, kd: 4.17, elo: 2450, badge: 'gold' },
  { rank: 2, name: 'Shadow_Killa', gang: 'BALLAS', kills: 3110, deaths: 940, kd: 3.31, elo: 2380, badge: 'silver' },
  { rank: 3, name: 'GhostRider99', gang: 'FAMILIES', kills: 2950, deaths: 980, kd: 3.01, elo: 2290, badge: 'bronze' },
  { rank: 4, name: 'e2f2ke7gx', gang: 'VAGOS', kills: 2410, deaths: 848, kd: 2.84, elo: 2110, isYou: true },
  { rank: 5, name: 'K4rma_PVP', gang: 'CARTEL', kills: 2190, deaths: 810, kd: 2.70, elo: 2050 },
  { rank: 6, name: 'NightShade_X', gang: 'BALLAS', kills: 2040, deaths: 890, kd: 2.29, elo: 1980 },
  { rank: 7, name: 'Apex_Shooter', gang: 'FAMILIES', kills: 1890, deaths: 840, kd: 2.25, elo: 1920 },
  { rank: 8, name: 'Viper_Strike', gang: 'MAFIA', kills: 1750, deaths: 790, kd: 2.21, elo: 1870 }
];

export const LEADERBOARD_GANGS = [
  { rank: 1, name: 'LOS SANTOS VAGOS', leader: 'Vort3x_Sniper', members: 32, points: '18,450 pts', kills: 14290, color: '#f59e0b' },
  { rank: 2, name: 'BALLAS GANG', leader: 'Shadow_Killa', members: 30, points: '16,120 pts', kills: 12870, color: '#a855f7' },
  { rank: 3, name: 'THE FAMILIES', leader: 'GhostRider99', members: 28, points: '14,900 pts', kills: 11400, color: '#10b981' },
  { rank: 4, name: 'CARTEL DEL VALLE', leader: 'K4rma_PVP', members: 25, points: '12,300 pts', kills: 9850, color: '#ef4444' }
];

export const WEAPON_STATS = [
  { name: 'Carabina Especial Mk II', kills: 42910, pct: 92, caliber: '5.56×45mm' },
  { name: 'Pistola Pesada .50 Tactical', kills: 28400, pct: 68, caliber: '.50 Action Express' },
  { name: 'Rifle Francotirador Pesado', kills: 19820, pct: 48, caliber: '.50 BMG Anti-Material' },
  { name: 'Subfusil Táctico Combat', kills: 16400, pct: 40, caliber: '9×19mm Parabellum' }
];

export const STORE_TIERS = [
  {
    id: 'silver',
    name: 'VIP PLATA',
    price: '4.99',
    period: '/mes',
    color: '#94a3b8',
    features: [
      'Slot reservado garantizado 24/7',
      'Rol exclusivo en Discord y FiveM',
      'Acceso a 15 skins de armas doradas',
      '3 vestimentas tácticas exclusivas',
      'Comando /killfeed con efecto sonoro'
    ]
  },
  {
    id: 'gold',
    name: 'VIP ORO',
    price: '9.99',
    period: '/mes',
    featured: true,
    badge: 'MÁS POPULAR',
    color: '#38bdf8',
    features: [
      'Todo lo incluido en VIP Plata',
      'Prioridad de cola máxima en horas punta',
      'Selector de animaciones de muerte (ragdoll custom)',
      'Paquete completo de skins cromadas y tornasol',
      'Rastreador de balas (Tracers neón azul/morado)',
      'Acceso a sala VIP exclusiva en Discord'
    ]
  },
  {
    id: 'diamond',
    name: 'VIP DIAMANTE',
    price: '17.99',
    period: '/mes',
    color: '#c084fc',
    features: [
      'Todo lo incluido en VIP Oro',
      'Creación de Clan / Banda oficial con tag en mapa',
      'Sonido de Headshot modificable (/headshot)',
      'Emotes tácticos de combate exclusivos',
      'Canal de soporte VIP prioritario con admins',
      'Badge de Donador Maestro en la web y juego'
    ]
  }
];

export const CHANGELOG_DATA = [
  {
    version: 'Patch v2.4.0',
    date: 'Septiembre 2026',
    status: 'latest',
    title: 'Gran Actualización de Rendimiento & Sistema de Zonas',
    changes: [
      'Optimización de FPS: Reducción del uso de VRAM en un 35% en tiroteos multitudinarios.',
      'Modo Zona Dinámica: La tormenta de arena se cierra al azar en 6 ubicaciones de Los Santos.',
      'Hitreg Mejorado: Tasa de ticks elevada a 64Hz con predicción de recoil balanceada.',
      'Anticheat SentinelCore v4: Detección instantánea de silent-aim, speed-hack y modificadores de hitbox.',
      'Crosshairs Personalizables: Nuevos 12 puntos de mira en el menú /crosshair.'
    ]
  },
  {
    version: 'Patch v2.3.8',
    date: 'Agosto 2026',
    status: 'stable',
    title: 'Balanceo de Armas & Eventos de Fin de Semana',
    changes: [
      'Ajuste en la dispersión del subfusil táctico en distancias medias.',
      'Nuevo mapa FFA en el Aeropuerto Internacional de Los Santos.',
      'Recompensas semanales dobles de ELO los sábados y domingos.'
    ]
  }
];

export const TEAM_MEMBERS = [
  {
    id: 'kronos',
    name: 'KRONOS',
    role: 'Fundador & Director General',
    tag: 'Owner',
    discord: 'kronos.ga',
    color: '#e5384d',
    bgBadge: 'rgba(229, 56, 77, 0.15)',
    borderBadge: 'rgba(229, 56, 77, 0.35)',
    status: 'En Línea',
    statusColor: '#34d399',
    description: 'Dirección general del proyecto, balance del servidor e infraestructura principal de Global Arena.'
  },
  {
    id: 'sentinel',
    name: 'Sentinel_Dev',
    role: 'Lead Developer & Anticheat',
    tag: 'Lead Dev',
    discord: 'sentinel.core',
    color: '#38bdf8',
    bgBadge: 'rgba(56, 189, 248, 0.15)',
    borderBadge: 'rgba(56, 189, 248, 0.35)',
    status: 'En Desarrollo',
    statusColor: '#38bdf8',
    description: 'Arquitectura de red a 64Hz, módulos anticheat SentinelCore v4 y optimización de VRAM para tiroteos.'
  },
  {
    id: 'viper',
    name: 'Viper_Strike',
    role: 'Head Admin & Competición',
    tag: 'Head Admin',
    discord: 'viper.pvp',
    color: '#f59e0b',
    bgBadge: 'rgba(245, 158, 11, 0.15)',
    borderBadge: 'rgba(245, 158, 11, 0.35)',
    status: 'En Línea',
    statusColor: '#34d399',
    description: 'Supervisión de torneos de bandas, arbitraje en vivo y control de sanciones de alta prioridad.'
  },
  {
    id: 'shadow',
    name: 'Shadow_Staff',
    role: 'Supervisor de Moderación',
    tag: 'Mod Lead',
    discord: 'shadow.staff',
    color: '#10b981',
    bgBadge: 'rgba(16, 185, 129, 0.15)',
    borderBadge: 'rgba(16, 185, 129, 0.35)',
    status: 'En Línea',
    statusColor: '#34d399',
    description: 'Gestión de tickets en Discord, revisión de clips de combate e investigación de reportes de jugadores.'
  },
  {
    id: 'k4rma',
    name: 'K4rma_PVP',
    role: 'Coordinador de Eventos & Scrims',
    tag: 'Eventos',
    discord: 'k4rma.arena',
    color: '#a855f7',
    bgBadge: 'rgba(168, 85, 247, 0.15)',
    borderBadge: 'rgba(168, 85, 247, 0.35)',
    status: 'En Línea',
    statusColor: '#34d399',
    description: 'Organización de arenas especiales de fin de semana, scrims 5v5/10v10 y entrega de recompensas de temporada.'
  }
];

