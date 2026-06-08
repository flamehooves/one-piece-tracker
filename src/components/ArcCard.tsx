import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import type { ArcDefinition, ArcProgress } from '../types';

interface Props {
  progress: ArcProgress;
  onArcClick?: (arc: ArcDefinition) => void;
}

export default function ArcCard({ progress, onArcClick }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { arc, total, watched, percentage } = progress;
  const pct = Math.round(percentage);
  const isComplete = pct >= 100;

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isComplete ? '1.5px solid rgba(232,160,32,0.4)' : '1px solid rgba(255,255,255,0.9)',
        boxShadow: isComplete
          ? '0 8px 32px rgba(232,160,32,0.12), 0 2px 8px rgba(10,35,66,0.06)'
          : '0 4px 16px rgba(10,35,66,0.07)',
      }}
    >
      <div
        className="p-4 cursor-pointer select-none"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-3">
          {/* Arc emoji in pill */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: `${arc.color}18`, border: `1.5px solid ${arc.color}30` }}
          >
            {arc.thumbnail}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="font-bold text-sm truncate" style={{ color: '#0A1628' }}>{arc.name}</h3>
              {arc.isFiller && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-md flex-shrink-0 font-bold tracking-wide"
                  style={{ background: 'rgba(148,163,184,0.18)', color: '#64748B', border: '1px solid rgba(148,163,184,0.35)' }}>FILLER</span>
              )}
              {isComplete && (
                <Trophy size={13} style={{ color: '#E8A020', fill: '#E8A020' }} className="flex-shrink-0" />
              )}
            </div>
            <p className="text-xs" style={{ color: '#94A3B8' }}>{arc.saga} · Ep {arc.startEp}–{arc.endEp}</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="font-black text-sm" style={{ color: isComplete ? '#E8A020' : '#0A1628' }}>{pct}%</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{watched}/{total}</p>
            </div>
            {expanded
              ? <ChevronUp size={16} style={{ color: '#CBD5E1' }} />
              : <ChevronDown size={16} style={{ color: '#CBD5E1' }} />
            }
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(10,35,66,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: isComplete ? 'linear-gradient(90deg, #F59E0B, #E8A020)' : arc.color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: [0.34, 1.1, 0.64, 1] }}
          />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            <div className="px-4 pb-4 pt-1" style={{ borderTop: '1px solid rgba(10,35,66,0.06)' }}>
              <p className="text-xs leading-relaxed mb-3" style={{ color: '#64748B' }}>{arc.description}</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Total', value: total, color: '#0A1628' },
                  { label: 'Watched', value: watched, color: '#16A34A' },
                  { label: 'Left', value: total - watched, color: '#3B82F6' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-xl p-2.5 text-center"
                    style={{ background: 'rgba(10,35,66,0.04)' }}>
                    <p className="font-black text-base" style={{ color }}>{value}</p>
                    <p className="text-[10px] font-medium" style={{ color: '#94A3B8' }}>{label}</p>
                  </div>
                ))}
              </div>
              {onArcClick && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onArcClick(arc)}
                  className="w-full mt-3 py-2 rounded-xl text-xs font-semibold transition-colors"
                  style={{ background: 'rgba(10,35,66,0.05)', color: '#1E3A5F', border: '1px solid rgba(10,35,66,0.1)' }}
                >
                  View Episodes →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
