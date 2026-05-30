import { motion } from 'framer-motion';
import { CheckCircle, Circle, Star, BookOpen, Heart } from 'lucide-react';
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.4) }}
      className={`glass-light rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all
        hover:border-yellow-400/30 active:scale-[0.98]
        ${watched ? 'opacity-75' : ''}
        ${episode.isFiller ? 'border-l-2 border-l-gray-500/40' : 'border-l-2 border-l-yellow-400/40'}`}
      onClick={onClick}
    >
      {/* Watch toggle */}
      <button
        className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
        onClick={e => { e.stopPropagation(); onToggleWatch(); }}
      >
        {watched
          ? <CheckCircle size={22} className="text-yellow-400" />
          : <Circle size={22} className="text-white/30 hover:text-white/60" />
        }
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-yellow-400/70 text-xs font-mono font-bold">
            EP {episode.number}
          </span>
          {episode.isFiller && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-600/40 text-gray-400 font-medium">
              FILLER
            </span>
          )}
          {favorite && <Heart size={11} className="text-pink-400 fill-pink-400" />}
        </div>
        <p className="text-white text-sm font-medium truncate leading-tight">{episode.title}</p>
        <p className="text-white/40 text-xs mt-0.5">{episode.arcName}</p>
      </div>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: rating }, (_, i) => (
            <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      )}

      {/* Notes indicator */}
      {userData?.notes && <BookOpen size={14} className="text-blue-400/60 flex-shrink-0" />}
    </motion.div>
  );
}
