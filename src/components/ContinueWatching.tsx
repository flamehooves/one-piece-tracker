import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';
import type { Episode } from '../types';

interface Props {
  episode: Episode;
  onMarkWatched: () => void;
  onDetails: () => void;
}

export default function ContinueWatching({ episode, onMarkWatched, onDetails }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      onClick={onDetails}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/10 to-blue-900/40 rounded-2xl" />
      <div className="absolute inset-0 border border-yellow-400/30 rounded-2xl" />

      {/* Animated shimmer */}
      <div className="absolute inset-0 shimmer rounded-2xl" />

      <div className="relative p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400 text-xs font-bold tracking-wider uppercase">Continue Watching</span>
          <div className="flex-1 h-px bg-yellow-400/20" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 font-mono font-bold text-lg">EP {episode.number}</span>
              {episode.isFiller && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-600/40 text-gray-400">FILLER</span>
              )}
            </div>
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
              {episode.title}
            </h3>
            <p className="text-white/50 text-xs mt-1">{episode.arcName}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={e => { e.stopPropagation(); onDetails(); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-yellow-400 text-[#081C2D] rounded-xl font-bold text-sm pulse-gold"
            >
              <Play size={14} className="fill-current" />
              Watch
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={e => { e.stopPropagation(); onMarkWatched(); }}
              className="flex items-center gap-2 px-3 py-2 border border-yellow-400/30 text-yellow-400 rounded-xl text-xs font-medium hover:bg-yellow-400/10 transition-colors"
            >
              <CheckCircle size={12} />
              Done
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
