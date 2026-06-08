import { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTracker } from '../context/TrackerContext';
import { ALL_EPISODES } from '../data/episodes';
import { ARC_DEFINITIONS } from '../data/arcs';
import EpisodeCard from '../components/EpisodeCard';
import EpisodeModal from '../components/EpisodeModal';
import type { FilterOption, SortOption, Episode } from '../types';
import { useToast } from '../components/Toast';

const CANON_COUNT  = ALL_EPISODES.filter(e => !e.isFiller).length;
const FILLER_COUNT = ALL_EPISODES.filter(e =>  e.isFiller).length;

const FILTERS: { id: FilterOption; label: string; count?: number }[] = [
  { id: 'all',       label: 'All' },
  { id: 'watched',   label: 'Watched' },
  { id: 'unwatched', label: 'Unwatched' },
  { id: 'canon',     label: 'Canon',  count: CANON_COUNT  },
  { id: 'filler',    label: 'Filler', count: FILLER_COUNT },
  { id: 'favorites', label: '♥ Favs' },
];

const PAGE_SIZE = 50;

export default function EpisodesPage() {
  const { isWatched, markWatched, markUnwatched, getEpisodeData, updateEpisode, state } = useTracker();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [sort, setSort] = useState<SortOption>('number-asc');
  const [arcFilter, setArcFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEp, setSelectedEp] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const episodes = useMemo(() => {
    let eps = state.settings.showFiller ? ALL_EPISODES : ALL_EPISODES.filter(e => !e.isFiller);
    if (arcFilter !== 'all') eps = eps.filter(e => e.arcId === arcFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      eps = eps.filter(e => e.title.toLowerCase().includes(q) || String(e.number).includes(q) || e.arcName.toLowerCase().includes(q));
    }
    switch (filter) {
      case 'watched':   eps = eps.filter(e => isWatched(e.number)); break;
      case 'unwatched': eps = eps.filter(e => !isWatched(e.number) && (!e.isFiller || e.number > (state.lastWatched ?? 0))); break;
      case 'canon':     eps = eps.filter(e => !e.isFiller); break;
      case 'filler':    eps = eps.filter(e => e.isFiller); break;
      case 'favorites': eps = eps.filter(e => state.watchedEpisodes[e.number]?.isFavorite); break;
    }
    return sort === 'number-desc' ? [...eps].reverse() : eps;
  }, [search, filter, sort, arcFilter, state.watchedEpisodes, state.settings.showFiller, state.lastWatched, isWatched]);

  // Scroll to top whenever the filter/search changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [filter, search, arcFilter, sort]);

  const visible = episodes.slice(0, page * PAGE_SIZE);
  const selectedEpisode = selectedEp ? ALL_EPISODES.find(e => e.number === selectedEp) ?? null : null;

  const handleToggle = useCallback((ep: Episode) => {
    if (isWatched(ep.number)) { markUnwatched(ep.number); toast(`EP ${ep.number} unmarked`, 'info'); }
    else { markWatched(ep.number); toast(`EP ${ep.number} watched! ⚓`, 'success'); }
  }, [isWatched, markWatched, markUnwatched, toast]);

  const arcOptions = useMemo(() => [
    { id: 'all', name: 'All Arcs' },
    ...ARC_DEFINITIONS.map(a => ({ id: a.id, name: a.name })),
  ], []);

  return (
    <div className="pb-32">
      {/* ── Header ── */}
      <div className="px-5 pt-8 pb-3 sticky top-0 z-30"
        style={{ background: 'rgba(235,240,248,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-black" style={{ color: '#0A1628' }}>Episodes</h1>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(10,35,66,0.07)', color: '#64748B' }}>
            {episodes.length.toLocaleString()}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
          <input
            type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search episodes, arcs..."
            className="w-full rounded-2xl pl-10 pr-9 py-2.5 text-sm font-medium focus:outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.82)', border: '1.5px solid rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(10,35,66,0.06)', color: '#0A1628' }}
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1); }} className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <X size={14} style={{ color: '#94A3B8' }} />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {FILTERS.map(f => (
            <motion.button key={f.id} whileTap={{ scale: 0.93 }}
              onClick={() => { setFilter(f.id); setPage(1); }}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
              style={filter === f.id
                ? { background: '#0A1628', color: '#fff', boxShadow: '0 4px 12px rgba(10,35,66,0.25)' }
                : { background: 'rgba(255,255,255,0.75)', color: '#64748B', border: '1px solid rgba(255,255,255,0.9)' }
              }
            >
              {f.label}
              {f.count !== undefined && (
                <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-none"
                  style={filter === f.id
                    ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                    : { background: 'rgba(10,35,66,0.08)', color: '#94A3B8' }
                  }>
                  {f.count}
                </span>
              )}
            </motion.button>
          ))}
          <motion.button whileTap={{ scale: 0.93 }}
            onClick={() => setShowFilters(s => !s)}
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
            style={showFilters
              ? { background: 'rgba(10,35,66,0.1)', color: '#0A1628', border: '1.5px solid rgba(10,35,66,0.15)' }
              : { background: 'rgba(255,255,255,0.75)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.9)' }
            }
          >
            <Filter size={11} /> More
          </motion.button>
        </div>

        {/* Extended filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div className="pt-2.5 flex gap-2">
                <div className="relative flex-1">
                  <select value={arcFilter} onChange={e => { setArcFilter(e.target.value); setPage(1); }}
                    className="w-full rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none appearance-none"
                    style={{ background: 'rgba(255,255,255,0.82)', border: '1.5px solid rgba(255,255,255,0.95)', color: '#0A1628', boxShadow: '0 2px 8px rgba(10,35,66,0.06)' }}>
                    {arcOptions.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#94A3B8' }} />
                </div>
                <div className="relative">
                  <select value={sort} onChange={e => setSort(e.target.value as SortOption)}
                    className="rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none appearance-none pr-7"
                    style={{ background: 'rgba(255,255,255,0.82)', border: '1.5px solid rgba(255,255,255,0.95)', color: '#0A1628', boxShadow: '0 2px 8px rgba(10,35,66,0.06)' }}>
                    <option value="number-asc">EP ↑</option>
                    <option value="number-desc">EP ↓</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#94A3B8' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Episode list ── */}
      <div className="px-5 pt-2 space-y-2">
        {visible.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-3">🔍</p>
            <p className="font-semibold text-sm" style={{ color: '#94A3B8' }}>No episodes found</p>
          </div>
        ) : (
          <>
            {visible.map((ep, i) => (
              <EpisodeCard key={ep.number} episode={ep} userData={getEpisodeData(ep.number)}
                onToggleWatch={() => handleToggle(ep)} onClick={() => setSelectedEp(ep.number)} index={i} />
            ))}
            {visible.length < episodes.length && (
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => setPage(p => p + 1)}
                className="w-full py-3.5 rounded-2xl text-sm font-bold mt-2"
                style={{ background: 'rgba(255,255,255,0.82)', color: '#0A1628', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 16px rgba(10,35,66,0.07)' }}
              >
                Load {Math.min(PAGE_SIZE, episodes.length - visible.length)} more
              </motion.button>
            )}
          </>
        )}
      </div>

      <EpisodeModal
        episode={selectedEpisode} userData={selectedEp ? getEpisodeData(selectedEp) : undefined}
        onClose={() => setSelectedEp(null)}
        onToggleWatch={() => { if (selectedEp) { const ep = ALL_EPISODES.find(e => e.number === selectedEp); if (ep) handleToggle(ep); } }}
        onUpdate={data => { if (selectedEp) updateEpisode(selectedEp, data); }}
      />
    </div>
  );
}
