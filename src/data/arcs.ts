import type { ArcDefinition } from '../types';

export const ARC_DEFINITIONS: ArcDefinition[] = [
  // ── East Blue Saga ──
  {
    id: 'romance-dawn', name: 'Romance Dawn', saga: 'East Blue',
    startEp: 1, endEp: 3, isFiller: false,
    color: '#E74C3C',
    description: 'Monkey D. Luffy sets out to sea, recruiting his first crewmate and beginning his journey to become King of the Pirates.',
    thumbnail: '🏴‍☠️',
  },
  {
    id: 'orange-town', name: 'Orange Town', saga: 'East Blue',
    startEp: 4, endEp: 8, isFiller: false,
    color: '#E67E22',
    description: 'Luffy and Zoro arrive at a town terrorized by Buggy the Clown and his crew.',
    thumbnail: '🤡',
  },
  {
    id: 'syrup-village', name: 'Syrup Village', saga: 'East Blue',
    startEp: 9, endEp: 18, isFiller: false,
    color: '#27AE60',
    description: 'The crew visits Usopp\'s hometown and faces the Black Cat Pirates led by the scheming Captain Kuro.',
    thumbnail: '🎯',
  },
  {
    id: 'baratie', name: 'Baratie', saga: 'East Blue',
    startEp: 19, endEp: 30, isFiller: false,
    color: '#3498DB',
    description: 'At the floating sea restaurant, Luffy recruits Sanji and faces the fearsome Don Krieg.',
    thumbnail: '🍖',
  },
  {
    id: 'arlong-park', name: 'Arlong Park', saga: 'East Blue',
    startEp: 31, endEp: 44, isFiller: false,
    color: '#2980B9',
    description: 'Luffy fights to free Nami\'s village from the tyranny of Arlong the fishman pirate.',
    thumbnail: '🦈',
  },
  {
    id: 'loguetown', name: 'Loguetown', saga: 'East Blue',
    startEp: 45, endEp: 53, isFiller: false,
    color: '#8E44AD',
    description: 'The crew visits the Town of Beginning and End, where the Pirate King was born and executed.',
    thumbnail: '⚔️',
  },
  {
    id: 'warship-island', name: 'Warship Island', saga: 'East Blue',
    startEp: 54, endEp: 61, isFiller: true,
    color: '#7F8C8D',
    description: '[Filler] The Straw Hats encounter a Marine base and a young girl named Apis with a special power.',
    thumbnail: '🚢',
  },

  // ── Alabasta Saga ──
  {
    id: 'reverse-mountain', name: 'Reverse Mountain', saga: 'Alabasta',
    startEp: 62, endEp: 63, isFiller: false,
    color: '#F39C12',
    description: 'The Straw Hats sail up the reverse mountain waterfall to enter the Grand Line.',
    thumbnail: '🌊',
  },
  {
    id: 'whisky-peak', name: 'Whisky Peak', saga: 'Alabasta',
    startEp: 64, endEp: 67, isFiller: false,
    color: '#D4AC0D',
    description: 'The crew lands on a party island that hides a dark secret — every resident is a bounty hunter.',
    thumbnail: '🎭',
  },
  {
    id: 'coby-meppo', name: 'Coby & Meppo', saga: 'Alabasta',
    startEp: 68, endEp: 69, isFiller: false,
    color: '#95A5A6',
    description: 'A side story following Coby and Helmeppo training under Vice Admiral Garp.',
    thumbnail: '⚓',
  },
  {
    id: 'little-garden', name: 'Little Garden', saga: 'Alabasta',
    startEp: 70, endEp: 77, isFiller: false,
    color: '#1ABC9C',
    description: 'On a prehistoric island, the crew meets two giants waging a 100-year duel.',
    thumbnail: '🦕',
  },
  {
    id: 'drum-island', name: 'Drum Island', saga: 'Alabasta',
    startEp: 78, endEp: 91, isFiller: false,
    color: '#ECF0F1',
    description: 'Nami falls ill and the crew seeks a doctor, finding Chopper on a snow-covered island.',
    thumbnail: '❄️',
  },
  {
    id: 'alabasta', name: 'Alabasta', saga: 'Alabasta',
    startEp: 92, endEp: 130, isFiller: false,
    color: '#E59866',
    description: 'The epic battle against Baroque Works as the Straw Hats help Princess Vivi save her kingdom from civil war.',
    thumbnail: '🏜️',
  },
  {
    id: 'post-alabasta', name: 'Post-Alabasta', saga: 'Alabasta',
    startEp: 131, endEp: 135, isFiller: true,
    color: '#7F8C8D',
    description: '[Filler] Individual stories for each Straw Hat member after leaving Alabasta.',
    thumbnail: '📖',
  },
  {
    id: 'goat-island', name: 'Goat Island', saga: 'Alabasta',
    startEp: 136, endEp: 138, isFiller: true,
    color: '#7F8C8D',
    description: '[Filler] The crew discovers a Marine who has been stranded on an island for 20 years.',
    thumbnail: '🐐',
  },
  {
    id: 'ruluka-island', name: 'Ruluka Island', saga: 'Alabasta',
    startEp: 139, endEp: 143, isFiller: true,
    color: '#7F8C8D',
    description: '[Filler] The crew visits a rainbow island with a legendary treasure.',
    thumbnail: '🌈',
  },

  // ── Skypiea Saga ──
  {
    id: 'jaya', name: 'Jaya', saga: 'Skypiea',
    startEp: 144, endEp: 152, isFiller: false,
    color: '#5D6D7E',
    description: 'The crew searches for information about Skypiea and meets the pirate Bellamy.',
    thumbnail: '☁️',
  },
  {
    id: 'skypiea', name: 'Skypiea', saga: 'Skypiea',
    startEp: 153, endEp: 195, isFiller: false,
    color: '#F4D03F',
    description: 'The Straw Hats reach an island in the sky and face the self-proclaimed god Enel.',
    thumbnail: '⚡',
  },
  {
    id: 'g8', name: 'G-8', saga: 'Skypiea',
    startEp: 196, endEp: 206, isFiller: true,
    color: '#7F8C8D',
    description: '[Filler] The crew crash-lands into a Marine base and must escape.',
    thumbnail: '🔒',
  },

  // ── Water 7 Saga ──
  {
    id: 'long-ring', name: 'Long Ring Long Land', saga: 'Water 7',
    startEp: 207, endEp: 219, isFiller: false,
    color: '#EB984E',
    description: 'The Straw Hats are challenged by the Foxy Pirates in the Davy Back Fight.',
    thumbnail: '🎲',
  },
  {
    id: 'oceans-dream', name: "Ocean's Dream", saga: 'Water 7',
    startEp: 220, endEp: 224, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] The crew wakes up with no memories of each other.",
    thumbnail: '💤',
  },
  {
    id: 'foxys-return', name: "Foxy's Return", saga: 'Water 7',
    startEp: 225, endEp: 228, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] Foxy returns for another challenge.",
    thumbnail: '🦊',
  },
  {
    id: 'water-7', name: 'Water 7', saga: 'Water 7',
    startEp: 229, endEp: 263, isFiller: false,
    color: '#2471A3',
    description: 'Betrayal and heartbreak in the shipbuilding city as Robin mysteriously leaves the crew.',
    thumbnail: '🌆',
  },
  {
    id: 'enies-lobby', name: 'Enies Lobby', saga: 'Water 7',
    startEp: 264, endEp: 312, isFiller: false,
    color: '#E74C3C',
    description: "Luffy declares war on the World Government to rescue Robin. One of the most epic arcs in the series.",
    thumbnail: '🔥',
  },
  {
    id: 'post-enies-lobby', name: 'Post-Enies Lobby', saga: 'Water 7',
    startEp: 313, endEp: 325, isFiller: false,
    color: '#85C1E9',
    description: "The crew receives new bounties and a new ship — the Thousand Sunny.",
    thumbnail: '☀️',
  },

  // ── Thriller Bark Saga ──
  {
    id: 'ice-hunter', name: 'Ice Hunter', saga: 'Thriller Bark',
    startEp: 326, endEp: 335, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] The Straw Hats are hunted by a bounty hunter group called the Accino Family.",
    thumbnail: '🧊',
  },
  {
    id: 'thriller-bark', name: 'Thriller Bark', saga: 'Thriller Bark',
    startEp: 337, endEp: 381, isFiller: false,
    color: '#6C3483',
    description: "On a ghost island, the crew faces the Warlord Gecko Moria who steals their shadows.",
    thumbnail: '👻',
  },
  {
    id: 'spa-island', name: 'Spa Island', saga: 'Thriller Bark',
    startEp: 382, endEp: 384, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] The crew visits a luxury spa island.",
    thumbnail: '🏖️',
  },

  // ── Summit War Saga ──
  {
    id: 'sabaody', name: 'Sabaody Archipelago', saga: 'Summit War',
    startEp: 385, endEp: 405, isFiller: false,
    color: '#1E8BC3',
    description: "The crew reaches the last island before the New World but faces the Warlords and Admirals.",
    thumbnail: '🫧',
  },
  {
    id: 'amazon-lily', name: 'Amazon Lily', saga: 'Summit War',
    startEp: 408, endEp: 421, isFiller: false,
    color: '#E91E8C',
    description: "Luffy lands on the island of women and meets the Warlord Boa Hancock.",
    thumbnail: '💗',
  },
  {
    id: 'impel-down', name: 'Impel Down', saga: 'Summit War',
    startEp: 422, endEp: 458, isFiller: false,
    color: '#922B21',
    description: "Luffy infiltrates the world's most impenetrable prison to save his brother Ace.",
    thumbnail: '⛓️',
  },
  {
    id: 'marineford', name: 'Marineford', saga: 'Summit War',
    startEp: 459, endEp: 489, isFiller: false,
    color: '#C0392B',
    description: "The War of the Best — the greatest battle in One Piece history as Luffy fights to save Ace.",
    thumbnail: '⚔️',
  },
  {
    id: 'post-war', name: 'Post-War', saga: 'Summit War',
    startEp: 490, endEp: 516, isFiller: false,
    color: '#566573',
    description: "The aftermath of war. Luffy's world falls apart and the crew is separated for two years.",
    thumbnail: '💔',
  },

  // ── Fishman Island Saga ──
  {
    id: 'return-sabaody', name: 'Return to Sabaody', saga: 'Fishman Island',
    startEp: 517, endEp: 522, isFiller: false,
    color: '#1ABC9C',
    description: "The Straw Hats reunite after 2 years of training — stronger than ever.",
    thumbnail: '🎉',
  },
  {
    id: 'fishman-island', name: 'Fishman Island', saga: 'Fishman Island',
    startEp: 523, endEp: 574, isFiller: false,
    color: '#0E6655',
    description: "The crew reaches the underwater kingdom and faces the New Fishman Pirates.",
    thumbnail: '🐠',
  },

  // ── Dressrosa Saga ──
  {
    id: 'z-ambition', name: "Z's Ambition", saga: 'Dressrosa',
    startEp: 575, endEp: 578, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] A mini arc serving as a prequel to the One Piece Film: Z.",
    thumbnail: '🎬',
  },
  {
    id: 'punk-hazard', name: 'Punk Hazard', saga: 'Dressrosa',
    startEp: 579, endEp: 625, isFiller: false,
    color: '#E74C3C',
    description: "On a burning and frozen island, the crew discovers Caesar Clown's illegal experiments.",
    thumbnail: '🧪',
  },
  {
    id: 'caesar-retrieval', name: 'Caesar Retrieval', saga: 'Dressrosa',
    startEp: 626, endEp: 628, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] A filler arc involving an attempt to steal Caesar Clown.",
    thumbnail: '🎭',
  },
  {
    id: 'dressrosa', name: 'Dressrosa', saga: 'Dressrosa',
    startEp: 629, endEp: 746, isFiller: false,
    color: '#C0392B',
    description: "The longest arc — the crew battles Donquixote Doflamingo in the kingdom of Dressrosa.",
    thumbnail: '🌹',
  },

  // ── Four Emperors Saga ──
  {
    id: 'silver-mine', name: 'Silver Mine', saga: 'Four Emperors',
    startEp: 747, endEp: 750, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] Luffy and Bartolomeo are captured and taken to Silver Mine.",
    thumbnail: '⛏️',
  },
  {
    id: 'zou', name: 'Zou', saga: 'Four Emperors',
    startEp: 751, endEp: 779, isFiller: false,
    color: '#6D4C41',
    description: "The crew arrives on a moving island — an elephant the size of an island — and learns of the Road Poneglyphs.",
    thumbnail: '🐘',
  },
  {
    id: 'marine-rookie', name: 'Marine Rookie', saga: 'Four Emperors',
    startEp: 780, endEp: 782, isFiller: true,
    color: '#7F8C8D',
    description: "[Filler] Sanji, Luffy, and Carrot sneak onto a Marine ship.",
    thumbnail: '⚓',
  },
  {
    id: 'whole-cake', name: 'Whole Cake Island', saga: 'Four Emperors',
    startEp: 783, endEp: 877, isFiller: false,
    color: '#E91E8C',
    description: "Sanji's past is revealed as the crew infiltrates Big Mom's territory to rescue him.",
    thumbnail: '🎂',
  },
  {
    id: 'reverie', name: 'Reverie', saga: 'Four Emperors',
    startEp: 878, endEp: 889, isFiller: false,
    color: '#8E44AD',
    description: "World leaders gather at the Reverie as the world changes dramatically.",
    thumbnail: '👑',
  },
  {
    id: 'wano', name: 'Wano Country', saga: 'Four Emperors',
    startEp: 890, endEp: 1085, isFiller: false,
    color: '#E74C3C',
    description: "The samurai kingdom under Kaido's iron grip — the biggest battle of the series.",
    thumbnail: '🗾',
  },

  // ── Final Saga ──
  {
    id: 'egghead', name: 'Egghead', saga: 'Final',
    startEp: 1086, endEp: 1122, isFiller: false,
    color: '#00BCD4',
    description: "The crew visits Dr. Vegapunk's futuristic island as the final saga begins.",
    thumbnail: '🤖',
  },
];

export const SAGA_COLORS: Record<string, string> = {
  'East Blue': '#3498DB',
  'Alabasta': '#E59866',
  'Skypiea': '#F4D03F',
  'Water 7': '#2471A3',
  'Thriller Bark': '#6C3483',
  'Summit War': '#C0392B',
  'Fishman Island': '#0E6655',
  'Dressrosa': '#C0392B',
  'Four Emperors': '#922B21',
  'Final': '#00BCD4',
};

export const TOTAL_EPISODES = ARC_DEFINITIONS[ARC_DEFINITIONS.length - 1].endEp;
