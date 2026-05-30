import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Download, Upload, Trash2, Eye, EyeOff, Target, Check } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import type { TrackerState } from '../types';
import { useToast } from '../components/Toast';
import { TOTAL_EPISODES } from '../data/arcs';

const cardStyle = {
  background: 'rgba(255,255,255,0.82)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.95)',
  boxShadow: '0 4px 20px rgba(10,35,66,0.07)',
};

function Toggle({ on, onToggle, color }: { on: boolean; onToggle: () => void; color: string }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-all flex-shrink-0"
      style={{ background: on ? color : 'rgba(10,35,66,0.10)' }}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ x: on ? 28 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
      {children}
    </p>
  );
}

export default function SettingsPage() {
  const { state, updateSettings, importState, reset, totalWatched, markUpTo } = useTracker();
  const toast = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [jumpEp, setJumpEp] = useState(String(state.lastWatched || ''));
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `one-piece-tracker-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Progress exported!', 'success');
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target?.result as string) as TrackerState;
        if (!data.watchedEpisodes) throw new Error('Invalid format');
        importState(data);
        toast('Progress imported successfully!', 'success');
      } catch {
        toast('Invalid backup file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleMarkUpTo() {
    const n = parseInt(jumpEp);
    if (isNaN(n) || n < 1 || n > TOTAL_EPISODES) {
      toast(`Enter a number between 1 and ${TOTAL_EPISODES}`, 'error');
      return;
    }
    markUpTo(n);
    toast(`Marked all episodes up to EP ${n} as watched!`, 'success');
  }

  const pct = Math.round((totalWatched / TOTAL_EPISODES) * 100);

  return (
    <div className="pb-32">
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-2xl font-black mb-5" style={{ color: '#0A1628' }}>Settings</h1>

        {/* Progress summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          className="rounded-2xl p-4 mb-5"
          style={cardStyle}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold" style={{ color: '#64748B' }}>Overall Progress</p>
            <p className="text-sm font-black" style={{ color: '#E8A020' }}>{pct}%</p>
          </div>
          <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(10,35,66,0.07)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #F59E0B, #E8A020)' }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: [0.34, 1.1, 0.64, 1] }}
            />
          </div>
          <div className="flex justify-between text-xs font-semibold" style={{ color: '#94A3B8' }}>
            <span>{totalWatched.toLocaleString()} watched</span>
            <span>{(TOTAL_EPISODES - totalWatched).toLocaleString()} remaining</span>
          </div>
        </motion.div>
      </div>

      <div className="px-5 space-y-3">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, type: 'spring', stiffness: 360, damping: 28 }}
          className="rounded-2xl p-4"
          style={cardStyle}
        >
          <SectionTitle>Appearance</SectionTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: state.settings.theme === 'dark' ? 'rgba(99,102,241,0.12)' : 'rgba(245,158,11,0.12)' }}>
                {state.settings.theme === 'dark'
                  ? <Moon size={17} style={{ color: '#818CF8' }} />
                  : <Sun size={17} style={{ color: '#F59E0B' }} />}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0A1628' }}>Theme</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{state.settings.theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
              </div>
            </div>
            <Toggle
              on={state.settings.theme === 'light'}
              onToggle={() => updateSettings({ theme: state.settings.theme === 'dark' ? 'light' : 'dark' })}
              color="#F59E0B"
            />
          </div>
        </motion.div>

        {/* Episodes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: 'spring', stiffness: 360, damping: 28 }}
          className="rounded-2xl p-4"
          style={cardStyle}
        >
          <SectionTitle>Episodes</SectionTitle>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: state.settings.showFiller ? 'rgba(22,163,74,0.12)' : 'rgba(100,116,139,0.10)' }}>
                {state.settings.showFiller
                  ? <Eye size={17} style={{ color: '#16A34A' }} />
                  : <EyeOff size={17} style={{ color: '#94A3B8' }} />}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0A1628' }}>Show Filler Episodes</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{state.settings.showFiller ? 'All episodes visible' : 'Filler hidden'}</p>
              </div>
            </div>
            <Toggle
              on={state.settings.showFiller}
              onToggle={() => updateSettings({ showFiller: !state.settings.showFiller })}
              color="#16A34A"
            />
          </div>

          {/* Daily goal */}
          <div className="pt-4" style={{ borderTop: '1px solid rgba(10,35,66,0.06)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.12)' }}>
                <Target size={17} style={{ color: '#8B5CF6' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0A1628' }}>Daily Goal</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{state.settings.dailyGoal} episodes per day</p>
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 5, 7, 10].map(n => (
                <motion.button
                  key={n}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => updateSettings({ dailyGoal: n })}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                  style={state.settings.dailyGoal === n
                    ? { background: '#8B5CF6', color: '#fff', boxShadow: '0 4px 12px rgba(139,92,246,0.30)' }
                    : { background: 'rgba(10,35,66,0.05)', color: '#64748B' }
                  }
                >
                  {n}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick setup */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.11, type: 'spring', stiffness: 360, damping: 28 }}
          className="rounded-2xl p-4"
          style={cardStyle}
        >
          <SectionTitle>Quick Setup</SectionTitle>
          <p className="text-xs mb-3 font-medium" style={{ color: '#64748B' }}>
            Mark all episodes up to a specific episode as watched
          </p>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={TOTAL_EPISODES}
              value={jumpEp}
              onChange={e => setJumpEp(e.target.value)}
              placeholder={`Episode # (1–${TOTAL_EPISODES})`}
              className="flex-1 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none transition-all"
              style={{
                background: 'rgba(10,35,66,0.05)',
                border: '1.5px solid rgba(10,35,66,0.08)',
                color: '#0A1628',
              }}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkUpTo}
              className="px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #E8A020)', color: '#fff', boxShadow: '0 4px 12px rgba(232,160,32,0.30)' }}
            >
              <Check size={14} /> Set
            </motion.button>
          </div>
        </motion.div>

        {/* Data management */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, type: 'spring', stiffness: 360, damping: 28 }}
          className="rounded-2xl p-4"
          style={cardStyle}
        >
          <SectionTitle>Data</SectionTitle>
          <div className="space-y-1">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{ background: 'transparent' }}
              whileHover={{ background: 'rgba(22,163,74,0.06)' } as never}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.12)' }}>
                <Download size={17} style={{ color: '#16A34A' }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#0A1628' }}>Export Progress</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>Save your data as JSON</p>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{ background: 'transparent' }}
              whileHover={{ background: 'rgba(59,130,246,0.06)' } as never}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.12)' }}>
                <Upload size={17} style={{ color: '#3B82F6' }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#0A1628' }}>Import Progress</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>Restore from a backup file</p>
              </div>
            </motion.button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17, type: 'spring', stiffness: 360, damping: 28 }}
          className="rounded-2xl p-4"
          style={{ ...cardStyle, border: '1px solid rgba(239,68,68,0.18)' }}
        >
          <SectionTitle>Danger Zone</SectionTitle>
          {!showResetConfirm ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{ background: 'transparent' }}
              whileHover={{ background: 'rgba(239,68,68,0.06)' } as never}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.10)' }}>
                <Trash2 size={17} style={{ color: '#EF4444' }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#EF4444' }}>Reset All Progress</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>This cannot be undone</p>
              </div>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <p className="text-sm mb-4 font-medium" style={{ color: '#64748B' }}>
                Are you sure? This will delete all your progress forever.
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { reset(); setShowResetConfirm(false); toast('Progress reset', 'info'); }}
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: '#EF4444', boxShadow: '0 4px 12px rgba(239,68,68,0.25)' }}
                >
                  Yes, Reset
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm"
                  style={{ background: 'rgba(10,35,66,0.06)', color: '#64748B' }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <p className="text-center text-xs py-2 font-medium" style={{ color: '#CBD5E1' }}>
          One Piece Tracker v1.0 · Made for nakama
        </p>
      </div>
    </div>
  );
}
