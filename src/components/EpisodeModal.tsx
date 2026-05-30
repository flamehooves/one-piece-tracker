import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle, Circle, BookOpen } from 'lucide-react';
import type { Episode, UserEpisodeData } from '../types';
import StarRating from './StarRating';
import { useState } from 'react';

interface Props {
  episode: Episode | null;
  userData?: UserEpisodeData;
  onClose: () => void;
  onToggleWatch: () => void;
  onUpdate: (data: Partial<UserEpisodeData>) => void;
}

export default function EpisodeModal({ episode, userData, onClose, onToggleWatch, onUpdate }: Props) {
  const [notes, setNotes] = useState(userData?.notes ?? '');

  if (!episode) return null;

  const watched = !!userData?.isWatched;
  const favorite = !!userData?.isFavorite;

  function handleNotesSave() {
    onUpdate({ notes: notes.trim() || undefined });
  }

  return (
    <AnimatePresence>
      {episode && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0.2 }}
            className="fixed bottom-0 left-0 right-0 z-[70] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full"
          >
            <div className="glass border border-yellow-400/20 rounded-t-3xl md:rounded-3xl p-6 max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 text-sm font-bold font-mono">EP {episode.number}</span>
                    {episode.isFiller && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-600/40 text-gray-400 font-medium">FILLER</span>
                    )}
                  </div>
                  <h2 className="text-white font-bold text-base leading-snug">{episode.title}</h2>
                  <p className="text-white/50 text-sm mt-1">{episode.arcName} · {episode.saga} Saga</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={18} className="text-white/60" />
                </button>
              </div>

              {/* Arc badge */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">{episode.isFiller ? '📺' : '⚓'}</span>
                <div>
                  <p className="text-white/40 text-xs">Saga</p>
                  <p className="text-white/80 text-sm font-medium">{episode.saga}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-5">
                <button
                  onClick={onToggleWatch}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all
                    ${watched
                      ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                      : 'bg-yellow-400 text-[#081C2D] hover:bg-yellow-300'
                    }`}
                >
                  {watched ? <CheckCircle size={16} /> : <Circle size={16} />}
                  {watched ? 'Watched' : 'Mark Watched'}
                </button>
                <button
                  onClick={() => onUpdate({ isFavorite: !favorite })}
                  className={`px-4 py-3 rounded-xl border transition-all ${
                    favorite
                      ? 'bg-pink-500/20 border-pink-500/40 text-pink-400'
                      : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/60'
                  }`}
                >
                  <Heart size={16} className={favorite ? 'fill-pink-400' : ''} />
                </button>
              </div>

              {/* Rating */}
              <div className="mb-5">
                <p className="text-white/60 text-xs mb-2">Your Rating</p>
                <StarRating
                  rating={userData?.rating ?? 0}
                  onChange={r => onUpdate({ rating: r })}
                  size={24}
                />
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-blue-400" />
                  <p className="text-white/60 text-xs">Personal Notes</p>
                </div>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  onBlur={handleNotesSave}
                  placeholder="Add your thoughts about this episode..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm
                    placeholder-white/30 resize-none focus:outline-none focus:border-yellow-400/40
                    transition-colors"
                  rows={3}
                />
              </div>

              {userData?.watchedAt && (
                <p className="text-white/25 text-xs mt-3">
                  Watched {new Date(userData.watchedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
