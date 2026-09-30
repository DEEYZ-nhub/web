export const FEED_TABS = [
  { id: 'para-ti', label: 'Para ti' },
  { id: 'clanes', label: 'Clanes' },
  { id: 'destacados', label: 'Destacados' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'guardados', label: 'Guardados' },
  { id: 'explorar', label: 'Explorar' }
];

export const COMMUNITY_STATS = [
  { value: '1.428', label: 'Miembros activos' },
  { value: '32.617', label: 'Mensajes totales' },
  { value: '4.733', label: 'En Discord ahora' }
];

export const SUGGESTED_PLAYERS = [
  { id: 'p1', name: 'Vort3x_Sniper', clan: 'VAGOS', role: 'Top 1', initials: 'VS', color: '#f59e0b' },
  { id: 'p2', name: 'Shadow_Killa', clan: 'BALLAS', role: 'Top 2', initials: 'SK', color: '#a855f7' },
  { id: 'p3', name: 'GhostRider99', clan: 'FAMILIES', role: 'Top 3', initials: 'GR', color: '#10b981' },
  { id: 'p4', name: 'K4rma_PVP', clan: 'CARTEL', role: 'Eventos', initials: 'K4', color: '#e5384d' }
];

export const FEATURED_CLANS = [
  { id: 'idlp', tag: 'IDLP', name: 'Isla de los Perdidos', rank: 1, members: 42 },
  { id: 'flz', tag: 'FLZ', name: 'Fellaz', rank: 2, members: 38 },
  { id: 'vpn', tag: 'VPN', name: 'VPN', rank: 3, members: 31 },
  { id: 'mdtn', tag: 'MDTN', name: 'Motion', rank: 4, members: 27, highlight: true }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    category: 'clanes',
    featured: true,
    time: 'hace 12 min',
    timestamp: Date.now() - 12 * 60 * 1000,
    author: {
      name: 'Viper_Strike',
      handle: '@viper.pvp',
      initials: 'VS',
      clan: 'STAFF',
      verified: true,
      color: '#f59e0b'
    },
    text: 'Scrim 10v10 esta noche a las 22:00. Cupos abiertos para clanes del top 12. Confirmad en comentarios con tag + roster.',
    image: null,
    likes: 128,
    shares: 14,
    comments: [
      {
        id: 'c1',
        author: 'IDLP_Lead',
        initials: 'ID',
        color: '#ff2d46',
        time: 'hace 8 min',
        text: 'IDLP entra con roster A. Mandamos lista por Discord.'
      },
      {
        id: 'c2',
        author: 'FLZ_Core',
        initials: 'FL',
        color: '#e5384d',
        time: 'hace 5 min',
        text: 'Fellaz in. ¿Mapa aleatorio o Grove vs Puerto?'
      }
    ]
  },
  {
    id: 'post-2',
    category: 'destacados',
    featured: true,
    time: 'hace 41 min',
    timestamp: Date.now() - 41 * 60 * 1000,
    author: {
      name: 'GhostRider99',
      handle: '@ghostrider',
      initials: 'GR',
      clan: 'FAMILIES',
      verified: true,
      color: '#10b981'
    },
    text: 'Clip de la ronda: 1v4 en el aeropuerto con la Mk II. El recoil nuevo de la 2.4 se nota, pero el peek sigue ganando duelos.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    likes: 342,
    shares: 41,
    comments: [
      {
        id: 'c3',
        author: 'Apex_Shooter',
        initials: 'AP',
        color: '#38bdf8',
        time: 'hace 20 min',
        text: 'Ese peek desde la torre es ilegal. Repite el ángulo.'
      }
    ]
  },
  {
    id: 'post-3',
    category: 'eventos',
    featured: false,
    time: 'hace 2 h',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    author: {
      name: 'K4rma_PVP',
      handle: '@k4rma.arena',
      initials: 'K4',
      clan: 'EVENTOS',
      verified: true,
      color: '#a855f7'
    },
    text: 'Domingo: Zona Dinámica + recompensas dobles de ELO. Inscripción en Discord, canal #eventos. Primeros 40 squads entran con prioridad.',
    image: null,
    likes: 96,
    shares: 22,
    comments: []
  },
  {
    id: 'post-4',
    category: 'clanes',
    featured: false,
    time: 'hace 3 h',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    author: {
      name: 'MDTN_Motion',
      handle: '@motion',
      initials: 'MD',
      clan: 'MDTN',
      verified: false,
      color: '#ff2d46'
    },
    text: 'Clan de la semana. Buscamos 2 riflers para war de jueves. Requisitos: 1.8+ K/D, voz, y no faltar a las 21:00.',
    image: null,
    likes: 54,
    shares: 8,
    comments: [
      {
        id: 'c4',
        author: 'NightShade_X',
        initials: 'NS',
        color: '#a855f7',
        time: 'hace 1 h',
        text: 'Me postulo. Te escribo por Discord.'
      }
    ]
  },
  {
    id: 'post-5',
    category: 'para-ti',
    featured: false,
    time: 'hace 6 h',
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
    author: {
      name: 'e2f2ke7gx',
      handle: '@e2f2ke7gx',
      initials: 'E2',
      clan: 'VAGOS',
      verified: false,
      color: '#e5384d'
    },
    text: 'Alguien más notó el hitreg de la pistola pesada tras el parche? En media distancia ahora gana más duelos de los que debería.',
    image: null,
    likes: 71,
    shares: 5,
    comments: [
      {
        id: 'c5',
        author: 'Sentinel_Dev',
        initials: 'SD',
        color: '#38bdf8',
        time: 'hace 4 h',
        text: 'Lo estamos midiendo. Si tenéis clips, abrid ticket con el rec.'
      }
    ]
  }
];

export const EXPLORE_CARDS = [
  {
    id: 'clanes',
    number: '01',
    title: 'CLANES',
    description: 'Busca clan, mira sus miembros y su Clan RP, o funda el tuyo con tu escuadra.',
    meta: '1.035 CLANES EN EL SERVIDOR · CLAN DE LA SEMANA [MDTN]',
    span: 'wide',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'creadores',
    number: '02',
    title: 'CREADORES',
    description: 'Los streamers que retransmiten la arena y el programa para entrar en él.',
    meta: 'CONOCE EL PROGRAMA DE CREADORES',
    span: 'narrow',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fundadores',
    number: '03',
    title: 'FUNDADORES',
    description: 'Quién levantó Global Arena y dónde seguirlos.',
    meta: 'CIRO · MECHAX · GLOOBS',
    span: 'third',
    image: '/assets/img/foto-izquierda.png'
  },
  {
    id: 'desarrollo',
    number: '04',
    title: 'DESARROLLO',
    description: 'Quién programa la arena y quién hace sus armas, mapas y ropa.',
    meta: 'COMPLEX STUDIOS · ANSTORE',
    span: 'third',
    watermark: 'CS AS',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'novedades',
    number: '05',
    title: 'NOVEDADES',
    description: 'Parches, cambios y todo lo que llega al servidor.',
    meta: 'ÚLTIMA · Actualización 2.4.0',
    span: 'third',
    watermark: '02·06',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'postulaciones',
    number: '06',
    title: 'POSTULACIONES',
    description: 'Entra en el staff que cuida la arena o en el programa de creadores.',
    meta: 'ABIERTAS: STAFF',
    span: 'narrow',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'discord',
    number: '07',
    title: 'DISCORD',
    description: 'Avisos, torneos, soporte y el acceso al servidor: todo pasa en el Discord.',
    meta: '29.728 DENTRO · 4.733 CONECTADOS',
    span: 'wide',
    featured: true
  }
];
