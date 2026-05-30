import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, Clock, ChevronRight, Zap, Trophy, Anchor } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import { ALL_EPISODES } from '../data/episodes';
import { TOTAL_EPISODES } from '../data/arcs';
import CircularProgress from '../components/CircularProgress';
import ContinueWatching from '../components/ContinueWatching';
import FloatingActionButton from '../components/FloatingActionButton';
import EpisodeModal from '../components/EpisodeModal';
import Confetti from '../components/Confetti';
import { useToast } from '../components/Toast';
import type { Page } from '../types';

const MILESTONES = [
  { pct: 10,  icon: '⚓', label: 'East Blue Rookie',  msg: "You've set sail, nakama!" },
  { pct: 25,  icon: '🗺️', label: 'Grand Line Explorer', msg: 'Quarter of the seas conquered!' },
  { pct: 50,  icon: '⚔️', label: 'War Veteran',       msg: 'Half the journey done!' },
  { pct: 75,  icon: '👑', label: 'Yonko Rival',       msg: 'Among the greatest pirates!' },
  { pct: 100, icon: '🏆', label: 'Pirate King',       msg: 'You conquered every sea!' },
];

const QUOTES = [
  '"I\'m not gonna run away, I never go back on my word!" — Naruto... wait, wrong show.',
  '"The sea is calling, nakama. Set sail!"',
  '"Even if I have to rip my dreams apart, I\'ll seize the One Piece!"',
  '"Nothing happened." — Roronoa Zoro (probably)',
  '"Your life is your own. Rise to the challenge of shaping it."',
];

interface Props { onNavigate: (p: Page) => void; }

export default function HomePage({ onNavigate }: Props) {
  const { state, totalWatched, nextEpisode, markWatched, isWatched, getEpisodeData, updateEpisode, markUnwatched } = useTracker();
  const toast = useToast();
  const [selectedEp, setSelectedEp] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalEps = TOTAL_EPISODES;
  const pct = Math.round((totalWatched / totalEps) * 100);

  const currentEpisode = ALL_EPISODES.find(e => e.number === Math.min(nextEpisode, totalEps));
  const nearbyEps = useMemo(() =>
    ALL_EPISODES.filter(e => e.number >= Math.max(1, nextEpisode - 3) && e.number <= nextEpisode + 4).slice(0, 5),
    [nextEpisode]
  );

  const achievedMilestones = MILESTONES.filter(m => pct >= m.pct);
  const nextMilestone = MILESTONES.find(m => pct < m.pct);
  const latestMilestone = achievedMilestones[achievedMilestones.length - 1];
  const quote = QUOTES[totalWatched % QUOTES.length];
  const hoursWatched = Math.round((totalWatched * 24) / 60);

  function handleMarkCurrentWatched() {
    if (!currentEpisode) return;
    markWatched(currentEpisode.number);
    toast(`Episode ${currentEpisode.number} marked! ⚓`, 'success');
    const newPct = Math.round(((totalWatched + 1) / totalEps) * 100);
    if (MILESTONES.some(m => m.pct <= newPct && m.pct > pct)) {
      setShowConfetti(true);
      const m = MILESTONES.find(m2 => m2.pct <= newPct && m2.pct > pct)!;
      toast(`${m.icon} ${m.label} achieved!`, 'success');
    }
  }

  const selectedEpisode = selectedEp ? ALL_EPISODES.find(e => e.number === selectedEp) ?? null : null;

  return (
    <div className="pb-32">
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}

      {/* ── Header ── */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xl">🏴‍☠️</span>
              <h1 className="text-2xl font-black tracking-tight" style={{ color: '#0A1628' }}>
                One Piece Tracker
              </h1>
            </div>
            <p className="text-xs font-medium italic" style={{ color: '#94A3B8' }}>{quote}</p>
          </div>
          {/* Streak badge */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 12px rgba(10,35,66,0.10)' }}
          >
            <Flame size={14} style={{ color: '#F97316' }} />
            <span className="font-black text-sm" style={{ color: '#0A1628' }}>{state.streakData.currentStreak}</span>
          </motion.div>
        </div>
      </div>

      {/* ── Main Progress Card ── */}
      <div className="px-5 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="rounded-3xl p-5"
          style={{
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,1)',
            boxShadow: '0 12px 48px rgba(10,35,66,0.12)',
          }}
        >
          <div className="flex items-center gap-5">
            <CircularProgress percentage={pct} size={114} strokeWidth={10}>
              <p className="text-2xl font-black leading-none" style={{ color: '#0A1628' }}>{pct}%</p>
              <p className="text-[10px] font-semibold" style={{ color: '#94A3B8' }}>complete</p>
            </CircularProgress>

            <div className="flex-1 space-y-3.5">
              <div className="flex justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Watched</p>
                  <p className="text-2xl font-black" style={{ color: '#0A1628' }}>{totalWatched.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Left</p>
                  <p className="text-2xl font-black" style={{ color: '#0A1628' }}>{(totalEps - totalWatched).toLocaleString()}</p>
                </div>
              </div>

              {/* Thin progress bar */}
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(10,35,66,0.07)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #F59E0B, #E8A020)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, ease: [0.34, 1.1, 0.64, 1] }}
                />
              </div>

              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <Clock size={11} style={{ color: '#3B82F6' }} />
                  <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>{hoursWatched}h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={11} style={{ color: '#16A34A' }} />
                  <span className="text-xs font-medium" style={{ color: '#94A3B8' }}>{totalEps} eps</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Continue Watching ── */}
      {currentEpisode && currentEpisode.number <= totalEps && (
        <div className="px-5 mb-4">
          <ContinueWatching
            episode={currentEpisode}
            onMarkWatched={handleMarkCurrentWatched}
            onDetails={() => setSelectedEp(currentEpisode.number)}
          />
        </div>
      )}

      {/* ── Quick stats row ── */}
      <div className="px-5 mb-4 grid grid-cols-3 gap-3">
        {[
          { icon: <Flame size={16} style={{ color: '#F97316' }} />, val: state.streakData.currentStreak, label: 'Streak', bg: 'rgba(249,115,22,0.1)' },
          { icon: <Zap size={16} style={{ color: '#E8A020' }} />,   val: state.goals.watchedToday,       label: 'Today',  bg: 'rgba(232,160,32,0.1)' },
          { icon: <Trophy size={16} style={{ color: '#8B5CF6' }} />, val: achievedMilestones.length,     label: 'Badges', bg: 'rgba(139,92,246,0.1)' },
        ].map(({ icon, val, label, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 380, damping: 24 }}
            className="rounded-2xl p-3.5 text-center"
            style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 16px rgba(10,35,66,0.07)' }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: bg }}>
              {icon}
            </div>
            <p className="font-black text-lg leading-none" style={{ color: '#0A1628' }}>{val}</p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#94A3B8' }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Latest achievement ── */}
      {latestMilestone && (
        <div className="px-5 mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: 'rgba(255,255,255,0.82)', border: '1.5px solid rgba(232,160,32,0.3)', boxShadow: '0 4px 20px rgba(232,160,32,0.10)' }}
          >
            <span className="text-3xl">{latestMilestone.icon}</span>
            <div>
              <p className="font-bold text-sm" style={{ color: '#0A1628' }}>{latestMilestone.label}</p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{latestMilestone.msg}</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(232,160,32,0.12)', color: '#E8A020' }}>Achieved</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Next milestone ── */}
      {nextMilestone && (
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Next Milestone</p>
            <span className="text-xs font-semibold" style={{ color: '#94A3B8' }}>{nextMilestone.pct - pct}% away</span>
          </div>
          <div className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 16px rgba(10,35,66,0.07)' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl opacity-50">{nextMilestone.icon}</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#0A1628' }}>{nextMilestone.label}</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>At {nextMilestone.pct}% completion</p>
              </div>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(10,35,66,0.07)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #F59E0B80, #E8A02080)' }}
                initial={{ width: 0 }}
                animate={{ width: `${(pct / nextMilestone.pct) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Around current episode ── */}
      {nearbyEps.length > 0 && (
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Anchor size={14} style={{ color: '#94A3B8' }} />
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>Around Current</p>
            </div>
            <button onClick={() => onNavigate('episodes')} className="flex items-center gap-0.5">
              <span className="text-xs font-semibold" style={{ color: '#E8A020' }}>All</span>
              <ChevronRight size={13} style={{ color: '#E8A020' }} />
            </button>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 4px 16px rgba(10,35,66,0.07)' }}
          >
            {nearbyEps.map((ep, i) => {
              const watched = isWatched(ep.number);
              const isCurrent = ep.number === nextEpisode;
              return (
                <motion.div
                  key={ep.number}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setSelectedEp(ep.number)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-black/[0.02]"
                  style={{ borderBottom: i < nearbyEps.length - 1 ? '1px solid rgba(10,35,66,0.06)' : 'none',
                    background: isCurrent ? 'rgba(232,160,32,0.06)' : 'transparent' }}
                >
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{
                      background: watched ? 'linear-gradient(135deg, #F59E0B, #E8A020)' : isCurrent ? 'rgba(10,35,66,0.08)' : 'rgba(10,35,66,0.05)',
                      color: watched ? '#fff' : '#0A1628',
                    }}
                  >
                    {ep.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: watched ? '#94A3B8' : '#0A1628' }}>
                      {ep.title}
                    </p>
                    <p className="text-[10px]" style={{ color: '#CBD5E1' }}>{ep.arcName}</p>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(232,160,32,0.15)', color: '#E8A020' }}>NEXT</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* FAB */}
      {currentEpisode && currentEpisode.number <= totalEps && !isWatched(currentEpisode.number) && (
        <FloatingActionButton episodeNum={currentEpisode.number} onMark={handleMarkCurrentWatched} />
      )}

      <EpisodeModal
        episode={selectedEpisode}
        userData={selectedEp ? getEpisodeData(selectedEp) : undefined}
        onClose={() => setSelectedEp(null)}
        onToggleWatch={() => {
          if (!selectedEp) return;
          if (isWatched(selectedEp)) { markUnwatched(selectedEp); toast(`EP ${selectedEp} unmarked`, 'info'); }
          else { markWatched(selectedEp); toast(`EP ${selectedEp} watched! ⚓`, 'success'); }
        }}
        onUpdate={data => { if (selectedEp) updateEpisode(selectedEp, data); }}
      />
    </div>
  );
}
