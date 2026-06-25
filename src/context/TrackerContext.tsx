import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import type { TrackerState, AnimeProgress, AnimeId, UserEpisodeData, Settings, StreakData, ArcDefinition, Episode } from '../types';
import { ANIME_REGISTRY } from '../data/animeRegistry';

const STORAGE_KEY = 'op-tracker-v1';

const DEFAULT_ANIME_PROGRESS: AnimeProgress = {
  watchedEpisodes: {},
  lastWatched: 0,
  streakData: {
    currentStreak: 0,
    longestStreak: 0,
    lastWatchedDate: null,
    streakDates: [],
  },
  goals: {
    watchedToday: 0,
    lastResetDate: null,
  },
};

const DEFAULT_STATE: TrackerState = {
  activeAnime: 'one-piece',
  animeProgress: {},
  settings: {
    theme: 'dark',
    dailyGoal: 3,
    showFiller: true,
  },
};

type Action =
  | { type: 'MARK_WATCHED'; ep: number; data?: Partial<UserEpisodeData> }
  | { type: 'MARK_UNWATCHED'; ep: number }
  | { type: 'MARK_UP_TO'; ep: number }
  | { type: 'UPDATE_EPISODE'; ep: number; data: Partial<UserEpisodeData> }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
  | { type: 'SWITCH_ANIME'; id: AnimeId }
  | { type: 'IMPORT_STATE'; state: TrackerState }
  | { type: 'RESET' };

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function yesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function updateStreak(progress: AnimeProgress): StreakData {
  const today = todayISO();
  const { streakData } = progress;
  const last = streakData.lastWatchedDate;
  if (last === today) return streakData;
  const newDates = [...new Set([...streakData.streakDates, today])];
  const current = last === yesterdayISO() ? streakData.currentStreak + 1 : 1;
  const longest = Math.max(streakData.longestStreak, current);
  return { currentStreak: current, longestStreak: longest, lastWatchedDate: today, streakDates: newDates };
}

function updateGoals(progress: AnimeProgress): AnimeProgress['goals'] {
  const today = todayISO();
  const { goals } = progress;
  if (goals.lastResetDate !== today) {
    return { watchedToday: 1, lastResetDate: today };
  }
  return { ...goals, watchedToday: goals.watchedToday + 1 };
}

function getProgress(state: TrackerState): AnimeProgress {
  return state.animeProgress[state.activeAnime] ?? DEFAULT_ANIME_PROGRESS;
}

function setProgress(state: TrackerState, progress: AnimeProgress): TrackerState {
  return {
    ...state,
    animeProgress: { ...state.animeProgress, [state.activeAnime]: progress },
  };
}

function reducer(state: TrackerState, action: Action): TrackerState {
  switch (action.type) {
    case 'MARK_WATCHED': {
      const progress = getProgress(state);
      const existing = progress.watchedEpisodes[action.ep] ?? { isWatched: false, isFavorite: false };
      if (existing.isWatched) return state;
      const newData: UserEpisodeData = {
        ...existing,
        ...action.data,
        isWatched: true,
        watchedAt: new Date().toISOString(),
      };
      const lastWatched = Math.max(progress.lastWatched, action.ep);
      return setProgress(state, {
        ...progress,
        watchedEpisodes: { ...progress.watchedEpisodes, [action.ep]: newData },
        lastWatched,
        streakData: updateStreak(progress),
        goals: updateGoals(progress),
      });
    }
    case 'MARK_UNWATCHED': {
      const progress = getProgress(state);
      const { [action.ep]: _removed, ...rest } = progress.watchedEpisodes;
      const lastWatched = Object.keys(rest)
        .map(Number)
        .filter(n => rest[n]?.isWatched)
        .reduce((max, n) => Math.max(max, n), 0);
      return setProgress(state, { ...progress, watchedEpisodes: rest, lastWatched });
    }
    case 'MARK_UP_TO': {
      const progress = getProgress(state);
      const updates = { ...progress.watchedEpisodes };
      for (let i = 1; i <= action.ep; i++) {
        if (!updates[i]?.isWatched) {
          updates[i] = { isWatched: true, isFavorite: false, watchedAt: new Date().toISOString() };
        }
      }
      return setProgress(state, {
        ...progress,
        watchedEpisodes: updates,
        lastWatched: action.ep,
        streakData: updateStreak(progress),
        goals: updateGoals(progress),
      });
    }
    case 'UPDATE_EPISODE': {
      const progress = getProgress(state);
      const existing = progress.watchedEpisodes[action.ep] ?? { isWatched: false, isFavorite: false };
      return setProgress(state, {
        ...progress,
        watchedEpisodes: { ...progress.watchedEpisodes, [action.ep]: { ...existing, ...action.data } },
      });
    }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case 'SWITCH_ANIME':
      return { ...state, activeAnime: action.id };
    case 'IMPORT_STATE':
      return action.state;
    case 'RESET': {
      const { [state.activeAnime]: _removed, ...rest } = state.animeProgress;
      return { ...state, animeProgress: rest };
    }
    default:
      return state;
  }
}

function migrateState(raw: Record<string, unknown>): TrackerState {
  // Old format: had flat watchedEpisodes/lastWatched/streakData/goals at top level
  if (raw.watchedEpisodes && !raw.animeProgress) {
    const goals = raw.goals as Record<string, unknown> | undefined;
    if (goals?.dailyGoal !== undefined) delete goals.dailyGoal;
    const progress: AnimeProgress = {
      watchedEpisodes: (raw.watchedEpisodes as AnimeProgress['watchedEpisodes']) ?? {},
      lastWatched: (raw.lastWatched as number) ?? 0,
      streakData: { ...DEFAULT_ANIME_PROGRESS.streakData, ...(raw.streakData as Partial<AnimeProgress['streakData']>) },
      goals: { ...DEFAULT_ANIME_PROGRESS.goals, ...(goals as Partial<AnimeProgress['goals']>) },
    };
    return {
      ...DEFAULT_STATE,
      settings: { ...DEFAULT_STATE.settings, ...(raw.settings as Partial<Settings>) },
      animeProgress: { 'one-piece': progress },
    };
  }
  return { ...DEFAULT_STATE, ...(raw as Partial<TrackerState>) };
}

function loadState(): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return migrateState(JSON.parse(raw) as Record<string, unknown>);
  } catch {
    return DEFAULT_STATE;
  }
}

interface TrackerContextValue {
  state: TrackerState;
  // Active anime info
  activeAnime: AnimeId;
  setActiveAnime: (id: AnimeId) => void;
  animeName: string;
  animeShortName: string;
  animeIcon: string;
  animeEpisodes: Episode[];
  animeArcs: ArcDefinition[];
  animeTotal: number;
  // Current anime's progress (shortcuts so pages don't need to dig into state)
  watchedEpisodes: AnimeProgress['watchedEpisodes'];
  lastWatched: number;
  streakData: AnimeProgress['streakData'];
  // Actions
  markWatched: (ep: number, data?: Partial<UserEpisodeData>) => void;
  markUnwatched: (ep: number) => void;
  markUpTo: (ep: number) => void;
  updateEpisode: (ep: number, data: Partial<UserEpisodeData>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  importState: (s: TrackerState) => void;
  reset: () => void;
  isWatched: (ep: number) => boolean;
  getEpisodeData: (ep: number) => UserEpisodeData | undefined;
  totalWatched: number;
  nextEpisode: number;
  /** Streak that returns 0 if the user hasn't watched today or yesterday */
  effectiveStreak: number;
  /** Episodes watched today (0 if the day has rolled over) */
  watchedToday: number;
}

const TrackerContext = createContext<TrackerContextValue | null>(null);

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (state.settings.theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [state]);

  // Active anime registry entry
  const animeEntry = ANIME_REGISTRY[state.activeAnime];
  const animeEpisodes = animeEntry.episodes;
  const animeArcs = animeEntry.arcs;
  const animeTotal = animeEntry.total;
  const animeName = animeEntry.name;
  const animeShortName = animeEntry.shortName;
  const animeIcon = animeEntry.icon;

  // Current anime's progress shortcuts
  const currentProgress = state.animeProgress[state.activeAnime] ?? DEFAULT_ANIME_PROGRESS;
  const watchedEpisodes = currentProgress.watchedEpisodes;
  const lastWatched = currentProgress.lastWatched;
  const streakData = currentProgress.streakData;

  const totalWatched = useMemo(
    () => Object.values(watchedEpisodes).filter(d => d?.isWatched).length,
    [watchedEpisodes]
  );
  const nextEpisode = lastWatched + 1;

  const effectiveStreak = useMemo(() => {
    const last = streakData.lastWatchedDate;
    if (last === todayISO() || last === yesterdayISO()) return streakData.currentStreak;
    return 0;
  }, [streakData]);

  const watchedToday = useMemo(() => {
    const today = todayISO();
    return currentProgress.goals.lastResetDate === today ? currentProgress.goals.watchedToday : 0;
  }, [currentProgress.goals]);

  const markWatched = useCallback((ep: number, data?: Partial<UserEpisodeData>) => {
    dispatch({ type: 'MARK_WATCHED', ep, data });
  }, []);
  const markUnwatched = useCallback((ep: number) => dispatch({ type: 'MARK_UNWATCHED', ep }), []);
  const markUpTo = useCallback((ep: number) => dispatch({ type: 'MARK_UP_TO', ep }), []);
  const updateEpisode = useCallback((ep: number, data: Partial<UserEpisodeData>) => dispatch({ type: 'UPDATE_EPISODE', ep, data }), []);
  const updateSettings = useCallback((settings: Partial<Settings>) => dispatch({ type: 'UPDATE_SETTINGS', settings }), []);
  const setActiveAnime = useCallback((id: AnimeId) => dispatch({ type: 'SWITCH_ANIME', id }), []);
  const importState = useCallback((s: TrackerState) => dispatch({ type: 'IMPORT_STATE', state: s }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const isWatched = useCallback((ep: number) => !!watchedEpisodes[ep]?.isWatched, [watchedEpisodes]);
  const getEpisodeData = useCallback((ep: number) => watchedEpisodes[ep], [watchedEpisodes]);

  return (
    <TrackerContext.Provider value={{
      state,
      activeAnime: state.activeAnime, setActiveAnime,
      animeName, animeShortName, animeIcon,
      animeEpisodes, animeArcs, animeTotal,
      watchedEpisodes, lastWatched, streakData,
      markWatched, markUnwatched, markUpTo, updateEpisode,
      updateSettings, importState, reset, isWatched, getEpisodeData,
      totalWatched, nextEpisode, effectiveStreak, watchedToday,
    }}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error('useTracker must be used within TrackerProvider');
  return ctx;
}
