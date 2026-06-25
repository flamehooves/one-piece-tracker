import type { AnimeId, ArcDefinition, Episode } from '../types';
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
  id: AnimeId;
  name: string;
  shortName: string;
  icon: string;
  arcs: ArcDefinition[];
  episodes: Episode[];
  total: number;
  milestones: AnimeMilestone[];
  quotes: string[];
}

export const ANIME_REGISTRY: Record<AnimeId, AnimeRegistryEntry> = {
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

export const ANIME_IDS: AnimeId[] = ['one-piece', 'dbz', 'dbgt', 'dbs'];
