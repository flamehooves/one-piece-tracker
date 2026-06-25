export interface ArcDefinition {
  id: string;
  name: string;
  saga: string;
  startEp: number;
  endEp: number;
  isFiller: boolean;
  color: string;
  description: string;
  thumbnail: string;
}

export interface Episode {
  number: number;
  title: string;
  arcId: string;
  arcName: string;
  saga: string;
  isFiller: boolean;
}

export interface UserEpisodeData {
  isWatched: boolean;
  rating?: number;
  notes?: string;
  isFavorite: boolean;
  watchedAt?: string;
}

export type AnimeId = 'one-piece' | 'dbz' | 'dbgt' | 'dbs';

export interface AnimeProgress {
  watchedEpisodes: Record<number, UserEpisodeData>;
  lastWatched: number;
  streakData: StreakData;
  goals: Goals;
}

export interface TrackerState {
  activeAnime: AnimeId;
  animeProgress: Partial<Record<AnimeId, AnimeProgress>>;
  settings: Settings;
}

export interface Settings {
  theme: 'dark' | 'light';
  dailyGoal: number;
  showFiller: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastWatchedDate: string | null;
  streakDates: string[];
}

export interface Goals {
  watchedToday: number;
  lastResetDate: string | null;
}

export interface ArcProgress {
  arc: ArcDefinition;
  total: number;
  watched: number;
  percentage: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  percentage: number;
  icon: string;
  achieved: boolean;
}

export type Page = 'home' | 'episodes' | 'arcs' | 'stats' | 'settings';

export type SortOption = 'number-asc' | 'number-desc' | 'arc';
export type FilterOption = 'all' | 'watched' | 'unwatched' | 'canon' | 'filler' | 'favorites';
