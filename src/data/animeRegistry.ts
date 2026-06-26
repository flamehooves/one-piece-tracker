import type { ArcDefinition, Episode, CustomAnimeEntry } from '../types';
import { ARC_DEFINITIONS as OP_ARCS } from './arcs';
import { ALL_EPISODES as OP_EPISODES } from './episodes';
import { DBZ_ARC_DEFINITIONS, DBZ_EPISODES, DBZ_TOTAL } from './dbz';
import { DBGT_ARC_DEFINITIONS, DBGT_EPISODES, DBGT_TOTAL } from './dbgt';
import { DBS_ARC_DEFINITIONS, DBS_EPISODES, DBS_TOTAL } from './dbs';

export interface AnimeMilestone {
  pct: number;
  icon: string;
  label: string;
  msg: string;
}

export interface AnimeRegistryEntry {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  arcs: ArcDefinition[];
  episodes: Episode[];
  total: number;
  milestones: AnimeMilestone[];
  quotes: string[];
}

export const BUILTIN_REGISTRY: Record<string, AnimeRegistryEntry> = {
  'one-piece': {
    id: 'one-piece',
    name: 'One Piece',
    shortName: 'One Piece',
    icon: '🏴‍☠️',
    arcs: OP_ARCS,
    episodes: OP_EPISODES,
    total: OP_EPISODES.length,
    milestones: [
      { pct: 10,  icon: '⚓', label: 'East Blue Rookie',    msg: "You've set sail, nakama!" },
      { pct: 25,  icon: '🗺️', label: 'Grand Line Explorer', msg: 'Quarter of the seas conquered!' },
      { pct: 50,  icon: '⚔️', label: 'War Veteran',        msg: 'Half the journey done!' },
      { pct: 75,  icon: '👑', label: 'Yonko Rival',        msg: 'Among the greatest pirates!' },
      { pct: 100, icon: '🏆', label: 'Pirate King',        msg: 'You conquered every sea!' },
    ],
    quotes: [
      '"I\'m not gonna run away, I never go back on my word!"',
      '"The sea is calling, nakama. Set sail!"',
      '"Even if I have to rip my dreams apart, I\'ll seize the One Piece!"',
      '"Nothing happened." — Roronoa Zoro (probably)',
      '"Your life is your own. Rise to the challenge of shaping it."',
    ],
  },
  'dbz': {
    id: 'dbz',
    name: 'Dragon Ball Z',
    shortName: 'DBZ',
    icon: '⚡',
    arcs: DBZ_ARC_DEFINITIONS,
    episodes: DBZ_EPISODES,
    total: DBZ_TOTAL,
    milestones: [
      { pct: 10,  icon: '💪', label: 'Earth Defender',     msg: "You've survived Raditz's arrival!" },
      { pct: 25,  icon: '⭐', label: 'Super Saiyan',       msg: 'The legend has awakened!' },
      { pct: 50,  icon: '🤖', label: 'Android Slayer',     msg: "Halfway through Earth's greatest battles!" },
      { pct: 75,  icon: '😈', label: 'Buu Basher',         msg: 'Among the strongest in the universe!' },
      { pct: 100, icon: '🏆', label: 'Saiyan Legend',      msg: "You've witnessed every transformation!" },
    ],
    quotes: [
      '"It\'s over 9000!"',
      '"A Saiyan\'s pride is eternal." — Vegeta',
      '"Kakarot... you are the mightiest Saiyan." — Vegeta',
      '"I am the hope of the universe!" — Son Goku',
      '"Power comes in response to a need, not a desire." — Goku',
    ],
  },
  'dbgt': {
    id: 'dbgt',
    name: 'Dragon Ball GT',
    shortName: 'DBGT',
    icon: '🐉',
    arcs: DBGT_ARC_DEFINITIONS,
    episodes: DBGT_EPISODES,
    total: DBGT_TOTAL,
    milestones: [
      { pct: 10,  icon: '⭐', label: 'Space Explorer',    msg: 'Setting out through the galaxy!' },
      { pct: 25,  icon: '👹', label: 'Baby Survivor',     msg: 'Survived the Baby invasion!' },
      { pct: 50,  icon: '🤖', label: 'Android Hunter',    msg: 'Super 17 is no match for you!' },
      { pct: 75,  icon: '🐲', label: 'Shadow Chaser',     msg: 'Almost conquered the Shadow Dragons!' },
      { pct: 100, icon: '🏆', label: 'GT Legend',         msg: "You've witnessed Goku's final farewell!" },
    ],
    quotes: [
      '"This journey takes courage, Pan." — Goku',
      '"Even in another body, a Saiyan\'s will never breaks." — Vegeta',
      '"Super Saiyan 4 — the power of a true Saiyan."',
      '"The Dragon Balls are corrupted, but hope remains."',
      '"Until we meet again..." — Son Goku',
    ],
  },
  'dbs': {
    id: 'dbs',
    name: 'Dragon Ball Super',
    shortName: 'DBS',
    icon: '🌟',
    arcs: DBS_ARC_DEFINITIONS,
    episodes: DBS_EPISODES,
    total: DBS_TOTAL,
    milestones: [
      { pct: 10,  icon: '🐱', label: 'God Challenger',       msg: "You've faced the God of Destruction!" },
      { pct: 25,  icon: '💛', label: 'Golden Warrior',       msg: 'More powerful than Frieza could imagine!' },
      { pct: 50,  icon: '⚔️', label: 'Universal Fighter',   msg: 'Halfway through the multiverse saga!' },
      { pct: 75,  icon: '🌌', label: 'Tournament Contender', msg: 'The Tournament of Power draws near!' },
      { pct: 100, icon: '🏆', label: 'Ultra Instinct',       msg: "You've mastered the divine technique!" },
    ],
    quotes: [
      '"I\'m going to surpass the gods!" — Son Goku',
      '"Ultra Instinct — it\'s not a technique, it\'s a state of being."',
      '"Every universe has its warriors. Only one survives."',
      '"Even a God of Destruction bows to power." — Beerus',
      '"Pride of a Saiyan and the heart of a warrior." — Vegeta',
    ],
  },
};

// Alias for backward compat
export const ANIME_REGISTRY = BUILTIN_REGISTRY;
export const ANIME_IDS = ['one-piece', 'dbz', 'dbgt', 'dbs'] as const;

const SEASON_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F97316', '#10B981', '#E8A020', '#06B6D4', '#EF4444'];
const SEASON_SIZE = 25;

function generateCustomArcs(entry: CustomAnimeEntry): ArcDefinition[] {
  const count = Math.ceil(entry.totalEpisodes / SEASON_SIZE);
  return Array.from({ length: count }, (_, i) => ({
    id: `${entry.id}-s${i + 1}`,
    name: count === 1 ? entry.name : `Season ${i + 1}`,
    saga: count === 1 ? entry.name : `Season ${i + 1}`,
    startEp: i * SEASON_SIZE + 1,
    endEp: Math.min((i + 1) * SEASON_SIZE, entry.totalEpisodes),
    isFiller: false,
    color: SEASON_COLORS[i % SEASON_COLORS.length],
    description: `${entry.name} — Season ${i + 1}`,
    thumbnail: entry.icon,
  }));
}

function generateCustomEpisodes(entry: CustomAnimeEntry): Episode[] {
  const arcs = generateCustomArcs(entry);
  const eps: Episode[] = [];
  for (const arc of arcs) {
    for (let n = arc.startEp; n <= arc.endEp; n++) {
      eps.push({ number: n, title: `Episode ${n}`, arcId: arc.id, arcName: arc.name, saga: arc.saga, isFiller: false });
    }
  }
  return eps;
}

export function buildCustomEntry(entry: CustomAnimeEntry): AnimeRegistryEntry {
  const arcs = generateCustomArcs(entry);
  const episodes = generateCustomEpisodes(entry);
  const shortName = entry.name.length > 12 ? entry.name.slice(0, 12) + '…' : entry.name;
  const milestones: AnimeMilestone[] = [
    { pct: 10,  icon: '🎬', label: 'Getting Started', msg: "You've begun your journey!" },
    { pct: 25,  icon: '⭐', label: 'Quarter Done',   msg: '25% conquered!' },
    { pct: 50,  icon: '🔥', label: 'Halfway There',  msg: "You're on a roll!" },
    { pct: 75,  icon: '👑', label: 'Almost There',   msg: 'The finish line is near!' },
    { pct: 100, icon: '🏆', label: 'Completed!',     msg: `You finished ${entry.name}!` },
  ];
  return {
    id: entry.id,
    name: entry.name,
    shortName,
    icon: entry.icon,
    arcs,
    episodes,
    total: entry.totalEpisodes,
    milestones,
    quotes: [
      `"Every episode of ${entry.name} is worth watching."`,
      `"Keep going — ${entry.name} gets better each arc."`,
      `"${entry.icon} ${entry.name} — on the watch list and making progress."`,
    ],
  };
}
