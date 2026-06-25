// Dragon Ball GT — arc definitions and episode data

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

export const DBGT_ARC_DEFINITIONS: ArcDefinition[] = [
  {
    id: 'dbgt-black-star',
    name: 'Black Star Dragon Ball Saga',
    saga: 'Black Star',
    startEp: 1,
    endEp: 16,
    isFiller: false,
    color: '#8B5CF6',
    description: 'Goku is wished back to childhood by Emperor Pilaf using the Black Star Dragon Balls, and must travel the galaxy to find them before Earth is destroyed.',
    thumbnail: '⭐',
  },
  {
    id: 'dbgt-baby',
    name: 'Baby Saga',
    saga: 'Baby',
    startEp: 17,
    endEp: 40,
    isFiller: false,
    color: '#EF4444',
    description: 'A parasitic Tuffle organism named Baby possesses Vegeta and enslaves Earth\'s population, forcing Goku to transform into a Super Saiyan 4.',
    thumbnail: '👹',
  },
  {
    id: 'dbgt-super-17',
    name: 'Super 17 Saga',
    saga: 'Super 17',
    startEp: 41,
    endEp: 47,
    isFiller: false,
    color: '#64748B',
    description: 'Dr. Gero and Dr. Myuu fuse Androids 17 from two dimensions to create the ultimate android Super 17.',
    thumbnail: '🤖',
  },
  {
    id: 'dbgt-shadow-dragon',
    name: 'Shadow Dragon Saga',
    saga: 'Shadow Dragon',
    startEp: 48,
    endEp: 64,
    isFiller: false,
    color: '#1E293B',
    description: 'The seven Shadow Dragons emerge from the corrupted Dragon Balls, with the mightiest, Omega Shenron, pushing Goku and Vegeta to fuse one final time.',
    thumbnail: '🐲',
  },
];

const NOTABLE_DBGT_TITLES: Record<number, string> = {
  1: 'A Devastating Wish',
  2: 'Pan Blasts Off',
  5: 'Goku vs. Ledgic',
  16: "Goku's Final Attack!",
  17: 'Beginning of the End',
  28: "Baby's Arrival",
  40: "Baby, I'll Kill You!",
  41: "Hell's Trap",
  46: 'Eternal Dragon Balls, Eternal Youth',
  47: 'The Greatest Surprise',
  48: 'The Shadow Dragons',
  56: 'Super Saiyan 4 Vegeta',
  60: 'Super Saiyan 4 Fusion',
  63: 'Until We Meet Again...',
  64: "A Hero's Legacy",
};

function generateEpisodes(): Episode[] {
  const episodes: Episode[] = [];
  for (const arc of DBGT_ARC_DEFINITIONS) {
    for (let epNum = arc.startEp; epNum <= arc.endEp; epNum++) {
      const title = NOTABLE_DBGT_TITLES[epNum] ?? `${arc.name} — Episode ${epNum}`;
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

export const DBGT_EPISODES: Episode[] = generateEpisodes();

export const DBGT_TOTAL = 64;
