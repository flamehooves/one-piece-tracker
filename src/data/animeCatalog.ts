export interface CatalogEntry {
  id: string;
  name: string;
  icon: string;
  episodes: number;
  color: string;
  genre: string;
}

export const ANIME_CATALOG: CatalogEntry[] = [
  // Action
  { id: 'akame-ga-kill', name: 'Akame ga Kill!', icon: '🗡️', episodes: 24, color: '#DC2626', genre: 'Action' },
  { id: 'black-clover', name: 'Black Clover', icon: '🍀', episodes: 170, color: '#16A34A', genre: 'Action' },
  { id: 'bleach', name: 'Bleach', icon: '⚔️', episodes: 366, color: '#64748B', genre: 'Action' },
  { id: 'bleach-tybw', name: 'Bleach: Thousand-Year Blood War', icon: '💀', episodes: 52, color: '#1E293B', genre: 'Action' },
  { id: 'blue-lock', name: 'Blue Lock', icon: '⚽', episodes: 24, color: '#1D4ED8', genre: 'Action' },
  { id: 'boruto', name: 'Boruto: Naruto Next Generations', icon: '💨', episodes: 293, color: '#3B82F6', genre: 'Action' },
  { id: 'chainsaw-man', name: 'Chainsaw Man', icon: '🪚', episodes: 12, color: '#EF4444', genre: 'Action' },
  { id: 'demon-slayer', name: 'Demon Slayer: Kimetsu no Yaiba', icon: '💧', episodes: 55, color: '#E11D48', genre: 'Action' },
  { id: 'dragon-ball', name: 'Dragon Ball', icon: '🐉', episodes: 153, color: '#F97316', genre: 'Action' },
  { id: 'fairy-tail', name: 'Fairy Tail', icon: '🔮', episodes: 328, color: '#8B5CF6', genre: 'Action' },
  { id: 'fma-2003', name: 'Fullmetal Alchemist (2003)', icon: '⚗️', episodes: 51, color: '#DC2626', genre: 'Action' },
  { id: 'fmab', name: 'Fullmetal Alchemist: Brotherhood', icon: '🔩', episodes: 64, color: '#E8A020', genre: 'Action' },
  { id: 'hxh', name: 'Hunter x Hunter (2011)', icon: '⚡', episodes: 148, color: '#22C55E', genre: 'Action' },
  { id: 'inuyasha', name: 'Inuyasha', icon: '🌙', episodes: 167, color: '#8B5CF6', genre: 'Action' },
  { id: 'jujutsu-kaisen', name: 'Jujutsu Kaisen', icon: '👁️', episodes: 47, color: '#6B21A8', genre: 'Action' },
  { id: 'mha', name: 'My Hero Academia', icon: '💪', episodes: 138, color: '#22C55E', genre: 'Action' },
  { id: 'naruto', name: 'Naruto', icon: '🍃', episodes: 220, color: '#F97316', genre: 'Action' },
  { id: 'naruto-shippuden', name: 'Naruto Shippuden', icon: '🔥', episodes: 500, color: '#EF4444', genre: 'Action' },
  { id: 'rurouni-kenshin', name: 'Rurouni Kenshin', icon: '⚔️', episodes: 94, color: '#DC2626', genre: 'Action' },
  { id: 'seven-deadly-sins', name: 'The Seven Deadly Sins', icon: '🔱', episodes: 96, color: '#7C3AED', genre: 'Action' },
  { id: 'spy-x-family', name: 'Spy x Family', icon: '🕵️', episodes: 37, color: '#10B981', genre: 'Action' },
  { id: 'sword-art-online', name: 'Sword Art Online', icon: '🕹️', episodes: 96, color: '#3B82F6', genre: 'Action' },
  { id: 'vinland-saga', name: 'Vinland Saga', icon: '⚓', episodes: 48, color: '#92400E', genre: 'Action' },

  // Adventure
  { id: 'black-clover-2', name: 'Black Clover (all)', icon: '🍀', episodes: 170, color: '#16A34A', genre: 'Adventure' },
  { id: 'dr-stone', name: 'Dr. Stone', icon: '💎', episodes: 57, color: '#10B981', genre: 'Adventure' },
  { id: 'fullmetal-alchemist-brotherhood', name: 'FMA: Brotherhood', icon: '🔩', episodes: 64, color: '#E8A020', genre: 'Adventure' },
  { id: 'gintama', name: 'Gintama', icon: '🗡️', episodes: 367, color: '#3B82F6', genre: 'Adventure' },
  { id: 'magi', name: 'Magi: The Labyrinth of Magic', icon: '🏺', episodes: 50, color: '#D97706', genre: 'Adventure' },
  { id: 'nier-automata', name: 'NieR:Automata Ver1.1a', icon: '🤖', episodes: 25, color: '#374151', genre: 'Adventure' },
  { id: 'promised-neverland', name: 'The Promised Neverland', icon: '🌿', episodes: 23, color: '#16A34A', genre: 'Adventure' },
  { id: 'radiant', name: 'Radiant', icon: '🌟', episodes: 47, color: '#8B5CF6', genre: 'Adventure' },
  { id: 'to-your-eternity', name: 'To Your Eternity', icon: '🌊', episodes: 42, color: '#0EA5E9', genre: 'Adventure' },

  // Comedy
  { id: 'daily-lives', name: 'Daily Lives of High School Boys', icon: '😄', episodes: 12, color: '#3B82F6', genre: 'Comedy' },
  { id: 'genshiken', name: 'Genshiken', icon: '🎮', episodes: 24, color: '#64748B', genre: 'Comedy' },
  { id: 'gintama-comedy', name: 'Gintama (Comedy Arcs)', icon: '😂', episodes: 367, color: '#3B82F6', genre: 'Comedy' },
  { id: 'konosuba-god', name: 'KonoSuba: God\'s Blessing', icon: '💥', episodes: 20, color: '#F59E0B', genre: 'Comedy' },
  { id: 'mob-psycho', name: 'Mob Psycho 100', icon: '💫', episodes: 37, color: '#8B5CF6', genre: 'Comedy' },
  { id: 'one-punch-man', name: 'One Punch Man', icon: '👊', episodes: 24, color: '#F59E0B', genre: 'Comedy' },

  // Dark / Thriller
  { id: 'aot', name: 'Attack on Titan', icon: '⚙️', episodes: 94, color: '#374151', genre: 'Dark / Thriller' },
  { id: 'berserk', name: 'Berserk (1997)', icon: '⚔️', episodes: 25, color: '#1E293B', genre: 'Dark / Thriller' },
  { id: 'death-note', name: 'Death Note', icon: '📓', episodes: 37, color: '#1E293B', genre: 'Dark / Thriller' },
  { id: 'elfen-lied', name: 'Elfen Lied', icon: '🎀', episodes: 13, color: '#F9A8D4', genre: 'Dark / Thriller' },
  { id: 'goblin-slayer', name: 'Goblin Slayer', icon: '🗡️', episodes: 24, color: '#374151', genre: 'Dark / Thriller' },
  { id: 'hellsing', name: 'Hellsing Ultimate', icon: '🧛', episodes: 10, color: '#DC2626', genre: 'Dark / Thriller' },
  { id: 'higurashi', name: 'Higurashi: When They Cry', icon: '🔪', episodes: 26, color: '#EF4444', genre: 'Dark / Thriller' },
  { id: 'made-in-abyss', name: 'Made in Abyss', icon: '⬇️', episodes: 25, color: '#854D0E', genre: 'Dark / Thriller' },
  { id: 'parasyte', name: 'Parasyte: The Maxim', icon: '🧬', episodes: 24, color: '#16A34A', genre: 'Dark / Thriller' },
  { id: 'tokyo-ghoul', name: 'Tokyo Ghoul', icon: '👁️', episodes: 48, color: '#DC2626', genre: 'Dark / Thriller' },

  // Isekai
  { id: 'danmachi', name: 'Is It Wrong to Try to Pick Up Girls in a Dungeon?', icon: '⚔️', episodes: 48, color: '#3B82F6', genre: 'Isekai' },
  { id: 'konosuba', name: 'KonoSuba', icon: '💥', episodes: 20, color: '#F59E0B', genre: 'Isekai' },
  { id: 'log-horizon', name: 'Log Horizon', icon: '🌐', episodes: 62, color: '#1E40AF', genre: 'Isekai' },
  { id: 'mushoku-tensei', name: 'Mushoku Tensei', icon: '📖', episodes: 46, color: '#8B5CF6', genre: 'Isekai' },
  { id: 'no-game-no-life', name: 'No Game No Life', icon: '♟️', episodes: 12, color: '#F97316', genre: 'Isekai' },
  { id: 'overlord', name: 'Overlord', icon: '💀', episodes: 52, color: '#1E293B', genre: 'Isekai' },
  { id: 'rezero', name: 'Re:Zero', icon: '🕐', episodes: 50, color: '#3B82F6', genre: 'Isekai' },
  { id: 'shield-hero', name: 'The Rising of the Shield Hero', icon: '🛡️', episodes: 38, color: '#78350F', genre: 'Isekai' },
  { id: 'sword-art-online-alicization', name: 'SAO: Alicization', icon: '💫', episodes: 47, color: '#60A5FA', genre: 'Isekai' },
  { id: 'tate-no-yuusha', name: 'The Rising of the Shield Hero (alt.)', icon: '🏹', episodes: 38, color: '#78350F', genre: 'Isekai' },
  { id: 'tensura', name: 'That Time I Got Reincarnated as a Slime', icon: '🫧', episodes: 48, color: '#6366F1', genre: 'Isekai' },

  // Romance
  { id: 'anohana', name: 'AnoHana', icon: '💐', episodes: 11, color: '#86EFAC', genre: 'Romance' },
  { id: 'clannad', name: 'Clannad + After Story', icon: '🌸', episodes: 47, color: '#93C5FD', genre: 'Romance' },
  { id: 'fruits-basket', name: 'Fruits Basket (2019)', icon: '🧺', episodes: 63, color: '#F9A8D4', genre: 'Romance' },
  { id: 'horimiya', name: 'Horimiya', icon: '🌻', episodes: 22, color: '#F97316', genre: 'Romance' },
  { id: 'kaguya-sama', name: 'Kaguya-sama: Love is War', icon: '💝', episodes: 37, color: '#EF4444', genre: 'Romance' },
  { id: 'kaichou-wa-maid-sama', name: 'Kaichou wa Maid-sama!', icon: '🎀', episodes: 26, color: '#F472B6', genre: 'Romance' },
  { id: 'nana', name: 'Nana', icon: '🎸', episodes: 47, color: '#1E293B', genre: 'Romance' },
  { id: 'ouran-host-club', name: 'Ouran High School Host Club', icon: '🌹', episodes: 26, color: '#F9A8D4', genre: 'Romance' },
  { id: 'sailor-moon', name: 'Sailor Moon', icon: '🌙', episodes: 200, color: '#F9A8D4', genre: 'Romance' },
  { id: 'toradora', name: 'Toradora!', icon: '🎄', episodes: 25, color: '#EF4444', genre: 'Romance' },
  { id: 'violet-evergarden', name: 'Violet Evergarden', icon: '💌', episodes: 13, color: '#BFDBFE', genre: 'Romance' },
  { id: 'your-lie-in-april', name: 'Your Lie in April', icon: '🎹', episodes: 22, color: '#F9A8D4', genre: 'Romance' },

  // Sci-Fi / Mecha
  { id: 'code-geass', name: 'Code Geass', icon: '♟️', episodes: 50, color: '#DC2626', genre: 'Sci-Fi / Mecha' },
  { id: 'cowboy-bebop', name: 'Cowboy Bebop', icon: '🎷', episodes: 26, color: '#1E40AF', genre: 'Sci-Fi / Mecha' },
  { id: 'darling-in-franxx', name: 'Darling in the FranXX', icon: '🌹', episodes: 24, color: '#EF4444', genre: 'Sci-Fi / Mecha' },
  { id: 'eureka-seven', name: 'Eureka Seven', icon: '🌊', episodes: 50, color: '#0EA5E9', genre: 'Sci-Fi / Mecha' },
  { id: 'ghost-in-the-shell-sac', name: 'Ghost in the Shell: SAC', icon: '🧠', episodes: 52, color: '#374151', genre: 'Sci-Fi / Mecha' },
  { id: 'gurren-lagann', name: 'Gurren Lagann', icon: '🌀', episodes: 27, color: '#EF4444', genre: 'Sci-Fi / Mecha' },
  { id: 'macross', name: 'Macross: Do You Remember Love?', icon: '🚀', episodes: 36, color: '#3B82F6', genre: 'Sci-Fi / Mecha' },
  { id: 'nge', name: 'Neon Genesis Evangelion', icon: '🤖', episodes: 26, color: '#7C3AED', genre: 'Sci-Fi / Mecha' },
  { id: 'psycho-pass', name: 'Psycho-Pass', icon: '🔭', episodes: 44, color: '#374151', genre: 'Sci-Fi / Mecha' },
  { id: 'steinsgate', name: 'Steins;Gate', icon: '⏰', episodes: 24, color: '#F97316', genre: 'Sci-Fi / Mecha' },
  { id: 'trigun', name: 'Trigun', icon: '🔫', episodes: 26, color: '#D97706', genre: 'Sci-Fi / Mecha' },

  // Sports
  { id: 'ace-of-diamond', name: 'Ace of Diamond', icon: '⚾', episodes: 126, color: '#3B82F6', genre: 'Sports' },
  { id: 'free', name: 'Free! Iwatobi Swim Club', icon: '🏊', episodes: 25, color: '#0EA5E9', genre: 'Sports' },
  { id: 'hajime-no-ippo', name: 'Hajime no Ippo', icon: '🥊', episodes: 75, color: '#EF4444', genre: 'Sports' },
  { id: 'haikyuu', name: 'Haikyuu!!', icon: '🏐', episodes: 85, color: '#F97316', genre: 'Sports' },
  { id: 'kuroko-basketball', name: "Kuroko's Basketball", icon: '🏀', episodes: 75, color: '#3B82F6', genre: 'Sports' },
  { id: 'slam-dunk', name: 'Slam Dunk', icon: '🏀', episodes: 101, color: '#F97316', genre: 'Sports' },
  { id: 'yowapeda', name: 'Yowamushi Pedal', icon: '🚴', episodes: 76, color: '#22C55E', genre: 'Sports' },

  // Supernatural
  { id: 'ao-no-exorcist', name: 'Ao no Exorcist', icon: '🔵', episodes: 25, color: '#3B82F6', genre: 'Supernatural' },
  { id: 'blue-exorcist', name: 'Blue Exorcist', icon: '🔵', episodes: 25, color: '#3B82F6', genre: 'Supernatural' },
  { id: 'd-gray-man', name: 'D.Gray-man', icon: '🌑', episodes: 103, color: '#374151', genre: 'Supernatural' },
  { id: 'fullmetal-alchemy', name: 'Fullmetal Alchemist', icon: '⚗️', episodes: 51, color: '#E8A020', genre: 'Supernatural' },
  { id: 'noragami', name: 'Noragami', icon: '⛩️', episodes: 25, color: '#3B82F6', genre: 'Supernatural' },
  { id: 'seraph-of-end', name: 'Seraph of the End', icon: '🩸', episodes: 24, color: '#DC2626', genre: 'Supernatural' },
  { id: 'soul-eater', name: 'Soul Eater', icon: '💀', episodes: 51, color: '#374151', genre: 'Supernatural' },
  { id: 'ushio-and-tora', name: 'Ushio and Tora', icon: '🐯', episodes: 39, color: '#F97316', genre: 'Supernatural' },
  { id: 'yu-yu-hakusho', name: 'Yu Yu Hakusho', icon: '👻', episodes: 112, color: '#8B5CF6', genre: 'Supernatural' },
];

export const CATALOG_GENRES: string[] = [
  'Action',
  'Adventure',
  'Comedy',
  'Dark / Thriller',
  'Isekai',
  'Romance',
  'Sci-Fi / Mecha',
  'Sports',
  'Supernatural',
];
