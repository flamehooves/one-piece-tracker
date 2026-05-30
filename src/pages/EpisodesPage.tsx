import { useState, useMemo, useCallback, useRef } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTracker } from '../context/TrackerContext';
import { ALL_EPISODES } from '../data/episodes';
import { ARC_DEFINITIONS } from '../data/arcs';
import EpisodeCard from '../components/EpisodeCard';
import EpisodeModal from '../components/EpisodeModal';
import type { FilterOption, SortOption, Episode } from '../types';
import { useToast } from '../components/Toast';

const FILTER_LABELS: Record<FilterOption, string> = {
  all: 'All', watched: 'Watched', unwatched: 'Unwatched',
  canon: 'Canon', filler: 'Filler', favorites: 'Favorites',
};

const SORT_LABELS: Record<SortOption, string> = {
  'number-asc': 'Ep ↑', 'number-desc': 'Ep ↓', 'arc': 'By Arc',
};

const PAGE_SIZE = 50;

export default function EpisodesPage() {
  const { isWatched, markWatched, markUnwatched, getEpisodeData, updateEpisode, state } = useTracker();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [sort, setSort] = useState<SortOption>('number-asc');
  const [arcFilter, setArcFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEp, setSelectedEp] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  const episodes = useMemo(() => {
    let eps = state.settings.showFiller
      ? ALL_EPISODES
      : ALL_EPISODES.filter(e => !e.isFiller);

    if (arcFilter !== 'all') eps = eps.filter(e => e.arcId === arcFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      eps = eps.filter(e =>
        e.title.toLowerCase().includes(q) ||
        String(e.number).includes(q) ||
        e.arcName.toLowerCase().includes(q)
      );
    }

    switch (filter) {
      case 'watched': eps = eps.filter(e => isWatched(e.number)); break;
      case 'unwatched': eps = eps.filter(e => !isWatched(e.number)); break;
      case 'canon': eps = eps.filter(e => !e.isFiller); break;
      case 'filler': eps = eps.filter(e => e.isFiller); break;
      case 'favorites': eps = eps.filter(e => state.watchedEpisodes[e.number]?.isFavorite); break;
    }

    switch (sort) {
      case 'number-desc': return [...eps].reverse();
      case 'arc': return [...eps].sort((a, b) => a.arcId.localeCompare(b.arcId) || a.number - b.number);
      default: return eps;
    }
  }, [search, filter, sort, arcFilter, state.watchedEpisodes, state.settings.showFiller, isWatched]);

  const totalFiltered = episodes.length;
  const visibleEps = episodes.slice(0, page * PAGE_SIZE);
  const hasMore = visibleEps.length < totalFiltered;

  const selectedEpisode = selectedEp ? ALL_EPISODES.find(e => e.number === selectedEp) ?? null : null;

  const handleToggle = useCallback((ep: Episode) => {
    if (isWatched(ep.number)) {
      markUnwatched(ep.number);
      toast(`EP ${ep.number} unmarked`, 'info');
    } else {
      markWatched(ep.number);
      toast(`EP ${ep.number} watched! ⚓`, 'success');
    }
  }, [isWatched, markWatched, markUnwatched, toast]);

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  function handleFilter(f: FilterOption) {
    setFilter(f);
    setPage(1);
  }

  const arcOptions = useMemo(() =>
    [{ id: 'all', name: 'All Arcs' }, ...ARC_DEFINITIONS.map(a => ({ id: a.id, name: a.name }))],
    []
  );

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 sticky top-0 z-30 bg-[#081C2D]/90 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-white font-bold text-lg flex-1">Episodes</h1>
          <span className="text-white/30 text-xs">{totalFiltered} eps</span>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search episodes, arcs..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-9 py-2.5 text-white text-sm
              placeholder-white/30 focus:outline-none focus:border-yellow-400/40 transition-colors"
          />
          {search && (
            <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-white/40" />
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(Object.keys(FILTER_LABELS) as FilterOption[]).map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${filter === f
                  ? 'bg-yellow-400 text-[#081C2D]'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
          <button
            onClick={() => setShowFilters(s => !s)}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors
              ${showFilters ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-white/50'}`}
          >
            <Filter size={11} /> More
          </button>
        </div>

        {/* Extended filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 flex gap-2">
                {/* Arc filter */}
                <div className="relative flex-1">
                  <select
                    value={arcFilter}
                    onChange={e => { setArcFilter(e.target.value); setPage(1); }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs
                      focus:outline-none focus:border-yellow-400/40 appearance-none"
                  >
                    {arcOptions.map(a => (
                      <option key={a.id} value={a.id} className="bg-[#0A2342]">{a.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs
                      focus:outline-none appearance-none pr-7"
                  >
                    {(Object.keys(SORT_LABELS) as SortOption[]).map(s => (
                      <option key={s} value={s} className="bg-[#0A2342]">{SORT_LABELS[s]}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Episode list */}
      <div ref={listRef} className="px-4 space-y-2">
        {visibleEps.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white/50 text-sm">No episodes found</p>
          </div>
        ) : (
          <>
            {visibleEps.map((ep, i) => (
              <EpisodeCard
                key={ep.number}
                episode={ep}
                userData={getEpisodeData(ep.number)}
                onToggleWatch={() => handleToggle(ep)}
                onClick={() => setSelectedEp(ep.number)}
                index={i}
              />
            ))}
            {hasMore && (
              <button
                onClick={() => setPage(p => p + 1)}
                className="w-full py-3 text-yellow-400/70 text-sm border border-yellow-400/20 rounded-xl
                  hover:bg-yellow-400/5 transition-colors mt-2"
              >
                Load more ({totalFiltered - visibleEps.length} remaining)
              </button>
            )}
          </>
        )}
      </div>

      <EpisodeModal
        episode={selectedEpisode}
        userData={selectedEp ? getEpisodeData(selectedEp) : undefined}
        onClose={() => setSelectedEp(null)}
        onToggleWatch={() => {
          if (!selectedEp) return;
          const ep = ALL_EPISODES.find(e => e.number === selectedEp);
          if (ep) handleToggle(ep);
        }}
        onUpdate={data => { if (selectedEp) updateEpisode(selectedEp, data); }}
      />
    </div>
  );
}
