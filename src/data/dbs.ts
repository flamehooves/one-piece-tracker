// Dragon Ball Super — arc definitions and episode data

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

export const DBS_ARC_DEFINITIONS: ArcDefinition[] = [
  {
    id: 'dbs-beerus',
    name: 'Beerus Saga',
    saga: 'Gods of Destruction',
    startEp: 1,
    endEp: 14,
    isFiller: false,
    color: '#8B5CF6',
    description: 'The God of Destruction Beerus awakens from his long slumber in search of a legendary Super Saiyan God, setting his sights on Earth.',
    thumbnail: '🐱',
  },
  {
    id: 'dbs-golden-frieza',
    name: 'Golden Frieza Saga',
    saga: 'Gods of Destruction',
    startEp: 15,
    endEp: 27,
    isFiller: false,
    color: '#F59E0B',
    description: 'Frieza returns from death with a new golden transformation, seeking revenge against Goku and the Super Saiyans.',
    thumbnail: '💛',
  },
  {
    id: 'dbs-universe-6',
    name: 'Universe 6 Saga',
    saga: 'Universe 6',
    startEp: 28,
    endEp: 46,
    isFiller: false,
    color: '#3B82F6',
    description: 'Beerus and his brother Champa organize a tournament between Universe 6 and Universe 7 to determine ownership of the Super Dragon Balls.',
    thumbnail: '⚔️',
  },
  {
    id: 'dbs-copy-vegeta',
    name: 'Copy-Vegeta Saga',
    saga: 'Universe 6',
    startEp: 47,
    endEp: 52,
    isFiller: false,
    color: '#06B6D4',
    description: "On Planet Potaufeu, a mysterious entity copies Vegeta's body and power, while Goku and Vegeta's consciousnesses switch.",
    thumbnail: '👥',
  },
  {
    id: 'dbs-future-trunks',
    name: 'Future Trunks Saga',
    saga: 'Future Trunks',
    startEp: 53,
    endEp: 67,
    isFiller: false,
    color: '#7C3AED',
    description: 'Future Trunks arrives from a ruined timeline with a new enemy — the mysterious Goku Black — who is systematically exterminating all humans.',
    thumbnail: '🗡️',
  },
  {
    id: 'dbs-zero-mortal',
    name: 'Universe Survival Saga: Prelude',
    saga: 'Tournament of Power',
    startEp: 68,
    endEp: 76,
    isFiller: false,
    color: '#E8A020',
    description: 'The Grand Zeno proposes a Tournament of Power between all twelve universes, where the losing universe will be erased from existence.',
    thumbnail: '🌌',
  },
  {
    id: 'dbs-tournament-power',
    name: 'Tournament of Power',
    saga: 'Tournament of Power',
    startEp: 77,
    endEp: 131,
    isFiller: false,
    color: '#EF4444',
    description: 'Eighty fighters from eight universes battle on the Null Realm in the ultimate tournament, as Goku achieves the divine Ultra Instinct to fight Jiren.',
    thumbnail: '🏆',
  },
];

const NOTABLE_DBS_TITLES: Record<number, string> = {
  1: 'A Peacetime Reward! Who Gets the 100,000,000 Zeni?',
  5: 'Beerus and Champa',
  10: 'Show Me, Goku! The Power of a Super Saiyan God!',
  14: "This Is All the Power I've Got! A Settlement Between Gods",
  15: 'Frieza and 1000 Soldiers Close In',
  27: "The Earth! Gohan! Both on the Ropes! Hurry and Come Home, Son Goku!!",
  28: "The 6th Universe's Mightiest Warrior! Meet Hit Man Hit!!",
  46: 'Goku vs. Black! A Closed-Off Road to the Future',
  53: 'Goku vs. Black! A Closed-Off Road to the Future',
  67: 'With New Hope!! In Our Hearts — Farewell, Trunks',
  68: 'Come Forth, Divine Dragon! And Grant My Wish, Peas and Carrots!',
  77: 'Let the Battle Begin! The Tournament of Power Is Finally Here!!',
  110: 'The Greatest Showdown of All Time! The Ultimate Survival Battle!!',
  130: 'An Unprecedented Super Showdown! The Ultimate Survival Battle!!',
  131: 'A Miraculous Conclusion! Farewell, Goku! Until We Meet Again...',
};

function generateEpisodes(): Episode[] {
  const episodes: Episode[] = [];
  for (const arc of DBS_ARC_DEFINITIONS) {
    for (let epNum = arc.startEp; epNum <= arc.endEp; epNum++) {
      const title = NOTABLE_DBS_TITLES[epNum] ?? `${arc.name} — Episode ${epNum}`;
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

export const DBS_EPISODES: Episode[] = generateEpisodes();

export const DBS_TOTAL = 131;
