import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, Clock, ChevronRight, Zap, Trophy } from 'lucide-react';
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
  { pct: 10, icon: '⚓', label: 'East Blue Rookie', msg: 'You\'ve started your pirate journey!' },
  { pct: 25, icon: '🗺️', label: 'Grand Line Explorer', msg: 'A quarter of the way to becoming Pirate King!' },
  { pct: 50, icon: '⚔️', label: 'War Veteran', msg: 'Half the seas conquered, nakama!' },
  { pct: 75, icon: '👑', label: 'Yonko Rival', msg: 'You stand among the greats!' },
  { pct: 100, icon: '🏆', label: 'Pirate King', msg: 'You\'ve conquered every sea!' },
];

const PIRATE_MSGS = [
  "The sea is calling, nakama! Set sail!",
  "Even if I have to rip your dreams apart, I'll seize the One Piece!",
  "I'd rather fight to the death than live like a coward!",
  "I'm not gonna run away, I never go back on my word!",
  "Your life is your own. Rise to the challenge.",
  "GOMU GOMU NO... let's watch another episode!",
];

interface Props {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: Props) {
  const { state, totalWatched, nextEpisode, markWatched, isWatched, getEpisodeData, updateEpisode, markUnwatched } = useTracker();
  const toast = useToast();
  const [selectedEp, setSelectedEp] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalEps = TOTAL_EPISODES;
  const pct = Math.round((totalWatched / totalEps) * 100);

  const currentEpisode = ALL_EPISODES.find(e => e.number === Math.min(nextEpisode, totalEps));
  const recentEps = useMemo(() =>
    ALL_EPISODES.filter(e => e.number > nextEpisode - 4 && e.number <= nextEpisode + 3 && e.number >= 1 && e.number <= totalEps)
      .slice(0, 5),
    [nextEpisode, totalEps]
  );

  const nextMilestone = MILESTONES.find(m => pct < m.pct);
  const achievedMilestones = MILESTONES.filter(m => pct >= m.pct);
  const latestMilestone = achievedMilestones[achievedMilestones.length - 1];

  const pirateMsg = PIRATE_MSGS[Math.floor(Math.random() * PIRATE_MSGS.length)];
  const hoursWatched = Math.round((totalWatched * 24) / 60);

  function handleMarkCurrentWatched() {
    if (!currentEpisode) return;
    markWatched(currentEpisode.number);
    toast(`Episode ${currentEpisode.number} marked as watched! ⚓`, 'success');

    const newPct = Math.round(((totalWatched + 1) / totalEps) * 100);
    const newMilestone = MILESTONES.find(m => m.pct <= newPct && m.pct > pct);
    if (newMilestone) {
      setShowConfetti(true);
      toast(`🎉 Achievement: ${newMilestone.label}!`, 'success');
    }
  }

  const selectedEpisode = selectedEp ? ALL_EPISODES.find(e => e.number === selectedEp) ?? null : null;

  return (
    <div className="pb-28">
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}

      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">
              <span className="gradient-text">One Piece</span> Tracker
            </h1>
            <p className="text-white/40 text-xs mt-0.5">{pirateMsg}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/30 rounded-xl px-3 py-1.5">
            <Flame size={14} className="text-orange-400" />
            <span className="text-orange-400 font-bold text-sm">{state.streakData.currentStreak}</span>
          </div>
        </div>
      </div>

      {/* Main Progress Card */}
      <div className="px-4 mb-4">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <CircularProgress percentage={pct} size={120} strokeWidth={10}>
              <p className="text-yellow-400 font-bold text-2xl leading-none">{pct}%</p>
              <p className="text-white/50 text-[10px]">complete</p>
            </CircularProgress>
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/50 text-xs">Watched</p>
                  <p className="text-white font-bold text-xl">{totalWatched.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-xs">Remaining</p>
                  <p className="text-white font-bold text-xl">{(totalEps - totalWatched).toLocaleString()}</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Clock size={11} className="text-blue-400" />
                  <span className="text-white/50 text-xs">{hoursWatched}h watched</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={11} className="text-green-400" />
                  <span className="text-white/50 text-xs">{totalEps} total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Watching */}
      {currentEpisode && currentEpisode.number <= totalEps && (
        <div className="px-4 mb-4">
          <ContinueWatching
            episode={currentEpisode}
            onMarkWatched={handleMarkCurrentWatched}
            onDetails={() => setSelectedEp(currentEpisode.number)}
          />
        </div>
      )}

      {/* Stats Row */}
      <div className="px-4 mb-4 grid grid-cols-3 gap-3">
        <div className="glass-light rounded-xl p-3 text-center">
          <Flame size={16} className="text-orange-400 mx-auto mb-1" />
          <p className="text-white font-bold">{state.streakData.currentStreak}</p>
          <p className="text-white/40 text-[10px]">Day Streak</p>
        </div>
        <div className="glass-light rounded-xl p-3 text-center">
          <Zap size={16} className="text-yellow-400 mx-auto mb-1" />
          <p className="text-white font-bold">{state.goals.watchedToday}</p>
          <p className="text-white/40 text-[10px]">Today</p>
        </div>
        <div className="glass-light rounded-xl p-3 text-center">
          <Trophy size={16} className="text-purple-400 mx-auto mb-1" />
          <p className="text-white font-bold">{achievedMilestones.length}</p>
          <p className="text-white/40 text-[10px]">Badges</p>
        </div>
      </div>

      {/* Latest Milestone */}
      {latestMilestone && (
        <div className="px-4 mb-4">
          <div className="glass-light rounded-2xl p-4 border border-yellow-400/20">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{latestMilestone.icon}</span>
              <div className="flex-1">
                <p className="text-yellow-400 font-bold text-sm">{latestMilestone.label}</p>
                <p className="text-white/50 text-xs">{latestMilestone.msg}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Milestone */}
      {nextMilestone && (
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white/70 text-sm font-semibold">Next Milestone</h2>
            <span className="text-white/30 text-xs">{nextMilestone.pct - pct}% away</span>
          </div>
          <div className="glass-light rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl opacity-40">{nextMilestone.icon}</span>
              <div>
                <p className="text-white/60 text-sm font-medium">{nextMilestone.label}</p>
                <p className="text-white/30 text-xs">At {nextMilestone.pct}% completion</p>
              </div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-400/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(pct / nextMilestone.pct) * 100}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Recent Episodes */}
      {recentEps.length > 0 && (
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white/70 text-sm font-semibold">Around Current Episode</h2>
            <button
              onClick={() => onNavigate('episodes')}
              className="text-yellow-400/70 text-xs flex items-center gap-0.5"
            >
              All <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {recentEps.map(ep => {
              const watched = isWatched(ep.number);
              return (
                <div
                  key={ep.number}
                  onClick={() => setSelectedEp(ep.number)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors
                    ${ep.number === nextEpisode ? 'bg-yellow-400/10 border border-yellow-400/20' : 'hover:bg-white/5'}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                    ${watched ? 'bg-yellow-400 text-[#081C2D]' : 'bg-white/10 text-white/40'}`}>
                    {ep.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${watched ? 'text-white/50' : 'text-white/80'}`}>
                      {ep.title}
                    </p>
                    <p className="text-white/30 text-[10px]">{ep.arcName}</p>
                  </div>
                  {ep.number === nextEpisode && (
                    <span className="text-yellow-400 text-[10px] font-bold flex-shrink-0">NEXT</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FAB */}
      {currentEpisode && currentEpisode.number <= totalEps && !isWatched(currentEpisode.number) && (
        <FloatingActionButton
          episodeNum={currentEpisode.number}
          onMark={handleMarkCurrentWatched}
        />
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
