import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle2, Circle, BookOpen, MapPin } from 'lucide-react';
import type { Episode, UserEpisodeData } from '../types';
import StarRating from './StarRating';
import { useState, useEffect, useRef } from 'react';

interface Props {
  episode: Episode | null;
  userData?: UserEpisodeData;
  onClose: () => void;
  onToggleWatch: () => void;
  onUpdate: (data: Partial<UserEpisodeData>) => void;
}

export default function EpisodeModal({ episode, userData, onClose, onToggleWatch, onUpdate }: Props) {
  const [notes, setNotes] = useState(userData?.notes ?? '');
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  // Reset notes when switching episodes
  useEffect(() => {
    setNotes(userData?.notes ?? '');
  }, [episode?.number]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save notes 600ms after the user stops typing
  useEffect(() => {
    if (!episode) return;
    const timer = setTimeout(() => {
      onUpdateRef.current({ notes: notes.trim() || undefined });
    }, 600);
    return () => clearTimeout(timer);
  }, [notes, episode?.number]);

  if (!episode) return null;

  const watched = !!userData?.isWatched;
  const favorite = !!userData?.isFavorite;

  return (
    <AnimatePresence>
      {episode && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(10,22,40,0.55)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-[70] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full"
          >
            <div
              className="rounded-t-[32px] md:rounded-3xl p-6 max-h-[88vh] overflow-y-auto"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,1)',
                boxShadow: '0 -8px 40px rgba(10,35,66,0.18)',
              }}
            >
              {/* Drag indicator */}
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'rgba(10,35,66,0.12)' }} />

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-black font-mono" style={{ color: '#E8A020' }}>EP {episode.number}</span>
                    {episode.isFiller && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: 'rgba(100,116,139,0.1)', color: '#94A3B8' }}>FILLER</span>
                    )}
                  </div>
                  <h2 className="font-bold text-base leading-snug" style={{ color: '#0A1628' }}>{episode.title}</h2>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin size={11} style={{ color: '#94A3B8' }} />
                    <p className="text-xs" style={{ color: '#94A3B8' }}>{episode.arcName} · {episode.saga} Saga</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(10,35,66,0.06)' }}
                >
                  <X size={16} style={{ color: '#64748B' }} />
                </motion.button>
              </div>

              {/* Watch + Favorite */}
              <div className="flex gap-3 mb-5">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                  onClick={onToggleWatch}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all"
                  style={watched
                    ? { background: 'rgba(232,160,32,0.1)', color: '#E8A020', border: '1.5px solid rgba(232,160,32,0.3)' }
                    : { background: 'linear-gradient(135deg, #F59E0B, #E8A020)', color: '#fff', boxShadow: '0 4px 16px rgba(232,160,32,0.35)' }
                  }
                >
                  {watched ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  {watched ? 'Watched ✓' : 'Mark as Watched'}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => onUpdate({ isFavorite: !favorite })}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all"
                  style={favorite
                    ? { background: 'rgba(244,114,182,0.12)', border: '1.5px solid rgba(244,114,182,0.3)', color: '#F472B6' }
                    : { background: 'rgba(10,35,66,0.05)', border: '1.5px solid rgba(10,35,66,0.1)', color: '#94A3B8' }
                  }
                >
                  <Heart size={18} style={{ fill: favorite ? '#F472B6' : 'none' }} />
                </motion.button>
              </div>

              {/* Rating */}
              <div className="mb-5 p-4 rounded-2xl" style={{ background: 'rgba(10,35,66,0.04)' }}>
                <p className="text-xs font-semibold mb-3" style={{ color: '#64748B' }}>Your Rating</p>
                <StarRating
                  rating={userData?.rating ?? 0}
                  onChange={r => onUpdate({ rating: r })}
                  size={26}
                />
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} style={{ color: '#93C5FD' }} />
                  <p className="text-xs font-semibold" style={{ color: '#64748B' }}>Notes</p>
                </div>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Your thoughts about this episode..."
                  className="w-full rounded-2xl px-4 py-3 text-sm resize-none focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(10,35,66,0.04)',
                    border: '1.5px solid rgba(10,35,66,0.08)',
                    color: '#0A1628',
                  }}
                  rows={3}
                />
              </div>

              {userData?.watchedAt && (
                <p className="text-xs mt-3" style={{ color: '#CBD5E1' }}>
                  Watched {new Date(userData.watchedAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
