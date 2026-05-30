import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
      className={`glass-light rounded-2xl overflow-hidden border transition-colors
        ${isComplete ? 'border-yellow-400/40' : 'border-white/5'}`}
    >
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{arc.thumbnail}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-white font-semibold text-sm truncate">{arc.name}</h3>
              {arc.isFiller && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-600/30 text-gray-400 flex-shrink-0">F</span>
              )}
              {isComplete && <span className="text-yellow-400 text-xs flex-shrink-0">✓</span>}
            </div>
            <p className="text-white/40 text-xs">{arc.saga} · Ep {arc.startEp}–{arc.endEp}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-yellow-400 font-bold text-sm">{pct}%</p>
              <p className="text-white/40 text-xs">{watched}/{total}</p>
            </div>
            {expanded ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: isComplete ? '#FFD700' : arc.color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/5 pt-3">
              <p className="text-white/50 text-xs leading-relaxed mb-3">{arc.description}</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <p className="text-yellow-400 font-bold">{total}</p>
                  <p className="text-white/40 text-[10px]">Total</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <p className="text-green-400 font-bold">{watched}</p>
                  <p className="text-white/40 text-[10px]">Watched</p>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center">
                  <p className="text-blue-400 font-bold">{total - watched}</p>
                  <p className="text-white/40 text-[10px]">Remaining</p>
                </div>
              </div>
              {onArcClick && (
                <button
                  onClick={() => onArcClick(arc)}
                  className="w-full mt-3 py-2 text-xs text-yellow-400 border border-yellow-400/20 rounded-xl hover:bg-yellow-400/10 transition-colors font-medium"
                >
                  View Episodes →
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
