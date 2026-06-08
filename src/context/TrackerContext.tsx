import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import type { TrackerState, UserEpisodeData, Settings } from '../types';

const STORAGE_KEY = 'op-tracker-v1';

const DEFAULT_STATE: TrackerState = {
  watchedEpisodes: {},
  lastWatched: 0,
  settings: {
    theme: 'dark',
    dailyGoal: 3,
    showFiller: true,
  },
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

type Action =
  | { type: 'MARK_WATCHED'; ep: number; data?: Partial<UserEpisodeData> }
  | { type: 'MARK_UNWATCHED'; ep: number }
  | { type: 'MARK_UP_TO'; ep: number }
  | { type: 'UPDATE_EPISODE'; ep: number; data: Partial<UserEpisodeData> }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
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

function updateStreak(state: TrackerState): TrackerState['streakData'] {
  const today = todayISO();
  const { streakData } = state;
  const last = streakData.lastWatchedDate;

  if (last === today) return streakData;

  const newDates = [...new Set([...streakData.streakDates, today])];
  const current = last === yesterdayISO() ? streakData.currentStreak + 1 : 1;
  const longest = Math.max(streakData.longestStreak, current);

  return { currentStreak: current, longestStreak: longest, lastWatchedDate: today, streakDates: newDates };
}

function updateGoals(state: TrackerState): TrackerState['goals'] {
  const today = todayISO();
  const { goals } = state;
  if (goals.lastResetDate !== today) {
    return { watchedToday: 1, lastResetDate: today };
  }
  return { ...goals, watchedToday: goals.watchedToday + 1 };
}

function reducer(state: TrackerState, action: Action): TrackerState {
  switch (action.type) {
    case 'MARK_WATCHED': {
      const existing = state.watchedEpisodes[action.ep] ?? { isWatched: false, isFavorite: false };
      if (existing.isWatched) return state;
      const newData: UserEpisodeData = {
        ...existing,
        ...action.data,
        isWatched: true,
        watchedAt: new Date().toISOString(),
      };
      const lastWatched = Math.max(state.lastWatched, action.ep);
      return {
        ...state,
        watchedEpisodes: { ...state.watchedEpisodes, [action.ep]: newData },
        lastWatched,
        streakData: updateStreak(state),
        goals: updateGoals(state),
      };
    }
    case 'MARK_UNWATCHED': {
      const { [action.ep]: _removed, ...rest } = state.watchedEpisodes;
      const lastWatched = Object.keys(rest)
        .map(Number)
        .filter(n => rest[n]?.isWatched)
        .reduce((max, n) => Math.max(max, n), 0);
      return { ...state, watchedEpisodes: rest, lastWatched };
    }
    case 'MARK_UP_TO': {
      const updates: TrackerState['watchedEpisodes'] = { ...state.watchedEpisodes };
      for (let i = 1; i <= action.ep; i++) {
        if (!updates[i]?.isWatched) {
          updates[i] = { isWatched: true, isFavorite: false, watchedAt: new Date().toISOString() };
        }
      }
      return {
        ...state,
        watchedEpisodes: updates,
        lastWatched: action.ep,
        streakData: updateStreak(state),
        goals: updateGoals(state),
      };
    }
    case 'UPDATE_EPISODE': {
      const existing = state.watchedEpisodes[action.ep] ?? { isWatched: false, isFavorite: false };
      return {
        ...state,
        watchedEpisodes: { ...state.watchedEpisodes, [action.ep]: { ...existing, ...action.data } },
      };
    }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case 'IMPORT_STATE':
      return action.state;
    case 'RESET':
      return { ...DEFAULT_STATE };
    default:
      return state;
  }
}

function loadState(): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const saved = JSON.parse(raw);
    // Migrate: remove stale goals.dailyGoal if present
    if (saved.goals?.dailyGoal !== undefined) {
      delete saved.goals.dailyGoal;
    }
    return { ...DEFAULT_STATE, ...saved };
  } catch {
    return DEFAULT_STATE;
  }
}

interface TrackerContextValue {
  state: TrackerState;
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
  /** Streak that is 0 if the user hasn't watched today or yesterday */
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

  const totalWatched = useMemo(
    () => Object.values(state.watchedEpisodes).filter(d => d?.isWatched).length,
    [state.watchedEpisodes]
  );
  const nextEpisode = state.lastWatched + 1;

  // Derived at read-time so they're always accurate regardless of when the
  // last mark-watched happened
  const effectiveStreak = useMemo(() => {
    const last = state.streakData.lastWatchedDate;
    if (last === todayISO() || last === yesterdayISO()) return state.streakData.currentStreak;
    return 0;
  }, [state.streakData]);

  const watchedToday = useMemo(() => {
    const today = todayISO();
    return state.goals.lastResetDate === today ? state.goals.watchedToday : 0;
  }, [state.goals]);

  const markWatched = useCallback((ep: number, data?: Partial<UserEpisodeData>) => {
    dispatch({ type: 'MARK_WATCHED', ep, data });
  }, []);
  const markUnwatched = useCallback((ep: number) => dispatch({ type: 'MARK_UNWATCHED', ep }), []);
  const markUpTo = useCallback((ep: number) => dispatch({ type: 'MARK_UP_TO', ep }), []);
  const updateEpisode = useCallback((ep: number, data: Partial<UserEpisodeData>) => dispatch({ type: 'UPDATE_EPISODE', ep, data }), []);
  const updateSettings = useCallback((settings: Partial<Settings>) => dispatch({ type: 'UPDATE_SETTINGS', settings }), []);
  const importState = useCallback((s: TrackerState) => dispatch({ type: 'IMPORT_STATE', state: s }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const isWatched = useCallback((ep: number) => !!state.watchedEpisodes[ep]?.isWatched, [state.watchedEpisodes]);
  const getEpisodeData = useCallback((ep: number) => state.watchedEpisodes[ep], [state.watchedEpisodes]);

  return (
    <TrackerContext.Provider value={{
      state, markWatched, markUnwatched, markUpTo, updateEpisode,
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
