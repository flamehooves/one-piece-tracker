// Dragon Ball Z — arc definitions and episode data

type ArcDefinition = {
  id: string;
  name: string;
  saga: string;
  startEp: number;
  endEp: number;
  isFiller: boolean;
  color: string;
  description: string;
  thumbnail: string;
};

type Episode = {
  number: number;
  title: string;
  arcId: string;
  arcName: string;
  saga: string;
  isFiller: boolean;
};

export const DBZ_ARC_DEFINITIONS: ArcDefinition[] = [
  {
    id: 'dbz-saiyan',
    name: 'Saiyan Saga',
    saga: 'Saiyan',
    startEp: 1,
    endEp: 35,
    isFiller: false,
    color: '#F97316',
    description: 'Goku and his friends face the powerful Saiyan warriors Raditz, Nappa, and Vegeta, pushing Earth\'s defenders to their absolute limits.',
    thumbnail: '💥',
  },
  {
    id: 'dbz-namek',
    name: 'Namek Saga',
    saga: 'Frieza',
    startEp: 36,
    endEp: 67,
    isFiller: false,
    color: '#3B82F6',
    description: 'Gohan, Krillin, and Bulma travel to the distant Planet Namek to gather the Dragon Balls, only to find Frieza\'s forces already there.',
    thumbnail: '🌍',
  },
  {
    id: 'dbz-ginyu',
    name: 'Captain Ginyu Saga',
    saga: 'Frieza',
    startEp: 68,
    endEp: 74,
    isFiller: false,
    color: '#8B5CF6',
    description: 'Frieza\'s elite mercenary squad, the Ginyu Force, arrives on Namek to collect the Dragon Balls and neutralize Goku\'s allies.',
    thumbnail: '🐸',
  },
  {
    id: 'dbz-frieza',
    name: 'Frieza Saga',
    saga: 'Frieza',
    startEp: 75,
    endEp: 107,
    isFiller: false,
    color: '#EF4444',
    description: 'Goku unleashes the legendary power of a Super Saiyan in a climactic showdown against the tyrannical Emperor Frieza.',
    thumbnail: '👑',
  },
  {
    id: 'dbz-garlic',
    name: 'Garlic Jr. Saga',
    saga: 'Androids',
    startEp: 108,
    endEp: 117,
    isFiller: true,
    color: '#94A3B8',
    description: 'The immortal Garlic Jr. escapes the Dead Zone and unleashes the Black Water Mist upon the Earth while Goku travels home.',
    thumbnail: '🧄',
  },
  {
    id: 'dbz-trunks',
    name: 'Trunks Saga',
    saga: 'Androids',
    startEp: 118,
    endEp: 125,
    isFiller: false,
    color: '#06B6D4',
    description: 'A mysterious young Super Saiyan named Trunks arrives from the future bearing a dire warning about deadly Androids.',
    thumbnail: '⚔️',
  },
  {
    id: 'dbz-android',
    name: 'Android Saga',
    saga: 'Androids',
    startEp: 126,
    endEp: 139,
    isFiller: false,
    color: '#64748B',
    description: 'Dr. Gero activates his powerful Android creations, who prove to be far more dangerous than Trunks\'s warnings had suggested.',
    thumbnail: '🤖',
  },
  {
    id: 'dbz-cell-imperfect',
    name: 'Imperfect Cell Saga',
    saga: 'Cell',
    startEp: 140,
    endEp: 152,
    isFiller: false,
    color: '#16A34A',
    description: 'A monstrous bio-android named Cell emerges and begins absorbing humans and Androids to reach his perfect form.',
    thumbnail: '🦟',
  },
  {
    id: 'dbz-cell-perfect',
    name: 'Perfect Cell Saga',
    saga: 'Cell',
    startEp: 153,
    endEp: 165,
    isFiller: false,
    color: '#15803D',
    description: 'Cell absorbs Android 17 and 18 to achieve his perfect form, then announces a worldwide tournament called the Cell Games.',
    thumbnail: '💚',
  },
  {
    id: 'dbz-cell-games',
    name: 'Cell Games Saga',
    saga: 'Cell',
    startEp: 166,
    endEp: 194,
    isFiller: false,
    color: '#22C55E',
    description: 'The Cell Games begin as Earth\'s greatest fighters face Perfect Cell, culminating in a father-son Kamehameha that decides the planet\'s fate.',
    thumbnail: '⚡',
  },
  {
    id: 'dbz-saiyaman',
    name: 'Great Saiyaman Saga',
    saga: 'Buu',
    startEp: 195,
    endEp: 209,
    isFiller: false,
    color: '#F59E0B',
    description: 'Seven years after the Cell Games, a teenage Gohan starts high school in Satan City and adopts the secret superhero identity of the Great Saiyaman.',
    thumbnail: '🦸',
  },
  {
    id: 'dbz-tournament',
    name: 'World Tournament Saga',
    saga: 'Buu',
    startEp: 210,
    endEp: 219,
    isFiller: false,
    color: '#E8A020',
    description: 'Goku returns from Other World for one day to compete in the World Martial Arts Tournament alongside his son and old friends.',
    thumbnail: '🏆',
  },
  {
    id: 'dbz-babidi',
    name: 'Babidi Saga',
    saga: 'Buu',
    startEp: 220,
    endEp: 232,
    isFiller: false,
    color: '#7C3AED',
    description: 'The evil wizard Babidi uses the energy gathered at the tournament to resurrect the ancient demon Majin Buu.',
    thumbnail: '🧙',
  },
  {
    id: 'dbz-majin-buu',
    name: 'Majin Buu Saga',
    saga: 'Buu',
    startEp: 233,
    endEp: 253,
    isFiller: false,
    color: '#EC4899',
    description: 'The childlike but devastatingly powerful Majin Buu wreaks havoc across the Earth, turning people into candy and defying all expectations.',
    thumbnail: '🍬',
  },
  {
    id: 'dbz-fusion',
    name: 'Fusion Saga',
    saga: 'Buu',
    startEp: 254,
    endEp: 275,
    isFiller: false,
    color: '#D946EF',
    description: 'With Buu absorbing Gohan and the Earth in peril, Goku and Vegeta must put aside their rivalry and fuse together inside Buu\'s own body.',
    thumbnail: '✨',
  },
  {
    id: 'dbz-kid-buu',
    name: 'Kid Buu Saga',
    saga: 'Buu',
    startEp: 276,
    endEp: 291,
    isFiller: false,
    color: '#9333EA',
    description: 'Buu reverts to his pure, chaotic Kid Buu form and destroys the Earth, forcing Goku to gather the universe\'s energy for one final Spirit Bomb.',
    thumbnail: '😈',
  },
];

const NOTABLE_DBZ_TITLES: Record<number, string> = {
  1: 'The Arrival of Raditz',
  2: "The World's Strongest Team",
  5: "Gohan's Hidden Powers",
  22: 'The Battle Ends',
  35: "Goku's Unusual Journey",
  36: 'Picking Up the Pieces',
  74: 'The Fusion',
  75: 'Fighting Power: One Million??',
  99: "Dende's Demise",
  107: "Goku's Alive!!",
  118: 'Unwelcome Discovery',
  131: 'Ghosts from Tomorrow',
  140: 'The Android Attacks',
  152: 'Say Goodbye, 17',
  165: "Cell's Bag of Tricks",
  166: 'The Games Begin',
  191: 'Save the World',
  194: "Goku's Decision",
  195: 'Warriors of the Dead',
  210: 'Trunks vs. Goten',
  232: "The Wizard's Curse",
  233: 'Heart of a Villain',
  253: 'Empty Planet',
  270: 'Gotenks is Awesome!',
  276: 'End of Earth',
  285: 'True Saiyans Fight Alone',
  291: "He's Always Late",
};

function generateEpisodes(): Episode[] {
  const episodes: Episode[] = [];
  for (const arc of DBZ_ARC_DEFINITIONS) {
    for (let epNum = arc.startEp; epNum <= arc.endEp; epNum++) {
      const title = NOTABLE_DBZ_TITLES[epNum] ?? `${arc.name} — Episode ${epNum}`;
      episodes.push({
        number: epNum,
        title,
        arcId: arc.id,
        arcName: arc.name,
        saga: arc.saga,
        isFiller: arc.isFiller,
      });
    }
  }
  return episodes;
}

export const DBZ_EPISODES: Episode[] = generateEpisodes();

export const DBZ_TOTAL = 291;
