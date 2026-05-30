import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Star, BookOpen, Heart } from 'lucide-react';
import type { Episode, UserEpisodeData } from '../types';

interface Props {
  episode: Episode;
  userData?: UserEpisodeData;
  onToggleWatch: () => void;
  onClick: () => void;
  index?: number;
}

export default function EpisodeCard({ episode, userData, onToggleWatch, onClick, index = 0 }: Props) {
  const watched = !!userData?.isWatched;
  const favorite = !!userData?.isFavorite;
  const rating = userData?.rating ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.025, 0.35), ease: [0.25,0.1,0.25,1] }}
      whileHover={{ scale: 1.008, y: -1 }}
      whileTap={{ scale: 0.985 }}
      style={{
        background: watched ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: watched ? '0 2px 8px rgba(10,35,66,0.05)' : '0 4px 16px rgba(10,35,66,0.08)',
      }}
      className="rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer"
      onClick={onClick}
    >
      {/* Watch toggle */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 600, damping: 28 }}
        className="flex-shrink-0"
        onClick={e => { e.stopPropagation(); onToggleWatch(); }}
      >
        {watched
          ? <CheckCircle2 size={22} style={{ color: '#E8A020' }} />
          : <Circle size={22} style={{ color: '#CBD5E1' }} />
        }
      </motion.button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-xs font-bold font-mono"
            style={{ color: watched ? '#94A3B8' : '#E8A020' }}
          >
            EP {episode.number}
          </span>
          {episode.isFiller && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold tracking-wide"
              style={{ background: 'rgba(148,163,184,0.18)', color: '#64748B', border: '1px solid rgba(148,163,184,0.35)' }}>
              FILLER
            </span>
          )}
          {favorite && <Heart size={11} style={{ color: '#F472B6', fill: '#F472B6' }} />}
        </div>
        <p className="text-sm font-semibold truncate leading-tight"
          style={{ color: watched ? '#94A3B8' : '#0A1628' }}>
          {episode.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{episode.arcName}</p>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {rating > 0 && (
          <div className="flex gap-0.5">
            {Array.from({ length: rating }, (_, i) => (
              <Star key={i} size={10} style={{ fill: '#E8A020', color: '#E8A020' }} />
            ))}
          </div>
        )}
        {userData?.notes && <BookOpen size={13} style={{ color: '#93C5FD' }} />}
      </div>
    </motion.div>
  );
}
