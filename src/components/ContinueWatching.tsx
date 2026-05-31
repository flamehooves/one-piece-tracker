import { motion } from 'framer-motion';
import { Play, CheckCircle2, MapPin } from 'lucide-react';
import type { Episode } from '../types';

interface Props {
  episode: Episode;
  onMarkWatched: () => void;
  onDetails: () => void;
}

export default function ContinueWatching({ episode, onMarkWatched, onDetails }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.012, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={onDetails}
      className="relative overflow-hidden rounded-3xl cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 60%, #0D2040 100%)',
        boxShadow: '0 20px 60px rgba(10,35,66,0.30), 0 4px 16px rgba(10,35,66,0.20)',
      }}
    >
      {/* Decorative wave pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 400 160" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,80 C80,40 160,120 240,80 C320,40 360,90 400,70 L400,160 L0,160 Z" fill="white" opacity="0.4"/>
          <path d="M0,100 C100,60 200,130 300,90 C350,70 380,105 400,95 L400,160 L0,160 Z" fill="white" opacity="0.25"/>
        </svg>
      </div>

      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #E8A020, transparent)' }} />

      <div className="relative p-5">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ boxShadow: '0 0 6px #E8A020' }} />
          <span className="text-amber-400 text-[11px] font-bold tracking-widest uppercase">Continue Watching</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Episode number — large */}
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-4xl font-black text-white leading-none tracking-tight">
                EP {episode.number}
              </span>
              {episode.isFiller && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-medium border border-white/15">FILLER</span>
              )}
            </div>
            <p className="text-white/90 font-semibold text-sm leading-snug line-clamp-2 mb-1">
              {episode.title}
            </p>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-amber-400/70" />
              <p className="text-white/50 text-xs">{episode.arcName}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              onClick={e => { e.stopPropagation(); onDetails(); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #E8A020)', color: '#0A1628', boxShadow: '0 4px 16px rgba(232,160,32,0.4)' }}
            >
              <Play size={14} className="fill-current" />
              Watch
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              onClick={e => { e.stopPropagation(); onMarkWatched(); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
            >
              <CheckCircle2 size={12} />
              Done
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
