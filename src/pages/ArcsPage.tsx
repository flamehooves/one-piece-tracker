import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTracker } from '../context/TrackerContext';
import { ARC_DEFINITIONS } from '../data/arcs';
import { ALL_EPISODES } from '../data/episodes';
import ArcCard from '../components/ArcCard';
import type { ArcProgress, Page } from '../types';

interface Props { onNavigate: (p: Page) => void; }

export default function ArcsPage({ onNavigate }: Props) {
  const { state } = useTracker();
  const [sagaFilter, setSagaFilter] = useState('all');

  const sagas = useMemo(() => ['all', ...Array.from(new Set(ARC_DEFINITIONS.map(a => a.saga)))], []);

  const arcProgresses = useMemo<ArcProgress[]>(() =>
    ARC_DEFINITIONS.map(arc => {
      const eps = ALL_EPISODES.filter(e => e.arcId === arc.id);
      const watched = eps.filter(e => !!state.watchedEpisodes[e.number]?.isWatched).length;
      return { arc, total: eps.length, watched, percentage: eps.length ? (watched / eps.length) * 100 : 0 };
    }),
    [state.watchedEpisodes]
  );

  const filtered = sagaFilter === 'all' ? arcProgresses : arcProgresses.filter(p => p.arc.saga === sagaFilter);

  const totalWatched = Object.values(state.watchedEpisodes).filter(d => d?.isWatched).length;
  const fillerWatched = ALL_EPISODES.filter(e => e.isFiller && state.watchedEpisodes[e.number]?.isWatched).length;
  const canonWatched = totalWatched - fillerWatched;
  const completedArcs = arcProgresses.filter(p => p.percentage >= 100).length;

  return (
    <div className="pb-32">
      {/* ── Header ── */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-black mb-4" style={{ color: '#0A1628' }}>Arc Progress</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { val: ARC_DEFINITIONS.length, label: 'Arcs',     color: '#0A1628', bg: 'rgba(10,35,66,0.07)' },
            { val: completedArcs,           label: 'Done',     color: '#16A34A', bg: 'rgba(22,163,74,0.1)' },
            { val: canonWatched,            label: 'Canon',    color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
          ].map(({ val, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 380, damping: 26 }}
              className="rounded-2xl p-3.5 text-center"
              style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 16px rgba(10,35,66,0.07)' }}
            >
              <p className="font-black text-xl" style={{ color }}>{val}</p>
              <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#94A3B8' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Saga filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {sagas.map(saga => (
            <motion.button
              key={saga} whileTap={{ scale: 0.93 }}
              onClick={() => setSagaFilter(saga)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
              style={sagaFilter === saga
                ? { background: '#0A1628', color: '#fff', boxShadow: '0 4px 12px rgba(10,35,66,0.25)' }
                : { background: 'rgba(255,255,255,0.75)', color: '#64748B', border: '1px solid rgba(255,255,255,0.9)' }
              }
            >
              {saga === 'all' ? 'All Sagas' : saga}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Arc list */}
      <div className="px-5 space-y-3">
        {filtered.map((progress, i) => (
          <motion.div
            key={progress.arc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.4), type: 'spring', stiffness: 350, damping: 28 }}
          >
            <ArcCard progress={progress} onArcClick={() => onNavigate('episodes')} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
