import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTracker } from '../context/TrackerContext';
import { ARC_DEFINITIONS, SAGA_COLORS } from '../data/arcs';
import { ALL_EPISODES } from '../data/episodes';
import ArcCard from '../components/ArcCard';
import type { ArcProgress } from '../types';

export default function ArcsPage() {
  const { state } = useTracker();
  const [sagaFilter, setSagaFilter] = useState<string>('all');

  const sagas = useMemo(() => ['all', ...Array.from(new Set(ARC_DEFINITIONS.map(a => a.saga)))], []);

  const arcProgresses = useMemo<ArcProgress[]>(() =>
    ARC_DEFINITIONS.map(arc => {
      const eps = ALL_EPISODES.filter(e => e.arcId === arc.id);
      const watched = eps.filter(e => !!state.watchedEpisodes[e.number]?.isWatched).length;
      return { arc, total: eps.length, watched, percentage: eps.length ? (watched / eps.length) * 100 : 0 };
    }),
    [state.watchedEpisodes]
  );

  const filtered = sagaFilter === 'all'
    ? arcProgresses
    : arcProgresses.filter(p => p.arc.saga === sagaFilter);

  const totalWatched = Object.values(state.watchedEpisodes).filter(d => d?.isWatched).length;
  const fillerWatched = ALL_EPISODES.filter(e => e.isFiller && state.watchedEpisodes[e.number]?.isWatched).length;
  const canonWatched = totalWatched - fillerWatched;

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-white font-bold text-lg mb-4">Arc Progress</h1>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass-light rounded-xl p-3 text-center">
            <p className="text-yellow-400 font-bold text-lg">{ARC_DEFINITIONS.length}</p>
            <p className="text-white/40 text-[10px]">Total Arcs</p>
          </div>
          <div className="glass-light rounded-xl p-3 text-center">
            <p className="text-green-400 font-bold text-lg">{arcProgresses.filter(p => p.percentage >= 100).length}</p>
            <p className="text-white/40 text-[10px]">Completed</p>
          </div>
          <div className="glass-light rounded-xl p-3 text-center">
            <p className="text-blue-400 font-bold text-lg">{canonWatched}</p>
            <p className="text-white/40 text-[10px]">Canon Eps</p>
          </div>
        </div>

        {/* Saga filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {sagas.map(saga => (
            <button
              key={saga}
              onClick={() => setSagaFilter(saga)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${sagaFilter === saga
                  ? 'bg-yellow-400 text-[#081C2D]'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              style={sagaFilter === saga ? {} : { borderLeft: `3px solid ${SAGA_COLORS[saga] ?? '#666'}20` }}
            >
              {saga === 'all' ? 'All Sagas' : saga}
            </button>
          ))}
        </div>
      </div>

      {/* Arc list */}
      <div className="px-4 space-y-3">
        {filtered.map((progress, i) => (
          <motion.div
            key={progress.arc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <ArcCard progress={progress} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
