import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Download, Upload, Trash2, Eye, EyeOff, Target, Check } from 'lucide-react';
import { useTracker } from '../context/TrackerContext';
import type { TrackerState } from '../types';
import { useToast } from '../components/Toast';
import { TOTAL_EPISODES } from '../data/arcs';

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
    toast('Progress exported! 🗂️', 'success');
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
        toast('Progress imported successfully! ⚓', 'success');
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
      toast(`Please enter a number between 1 and ${TOTAL_EPISODES}`, 'error');
      return;
    }
    markUpTo(n);
    toast(`Marked all episodes up to EP ${n} as watched! ⚓`, 'success');
  }

  const pct = Math.round((totalWatched / TOTAL_EPISODES) * 100);

  return (
    <div className="pb-28 px-4 pt-6">
      <h1 className="text-white font-bold text-lg mb-6">Settings</h1>

      {/* Progress summary */}
      <div className="glass rounded-2xl p-4 mb-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-white/60 text-sm">Overall Progress</p>
          <p className="text-yellow-400 font-bold">{pct}%</p>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/40">
          <span>{totalWatched.toLocaleString()} watched</span>
          <span>{(TOTAL_EPISODES - totalWatched).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-light rounded-2xl p-4 mb-4">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Appearance</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {state.settings.theme === 'dark' ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-yellow-400" />}
            <div>
              <p className="text-white text-sm font-medium">Theme</p>
              <p className="text-white/40 text-xs">{state.settings.theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ theme: state.settings.theme === 'dark' ? 'light' : 'dark' })}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              state.settings.theme === 'light' ? 'bg-yellow-400' : 'bg-white/20'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow
              ${state.settings.theme === 'light' ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Show filler */}
      <div className="glass-light rounded-2xl p-4 mb-4">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Episodes</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {state.settings.showFiller ? <Eye size={18} className="text-green-400" /> : <EyeOff size={18} className="text-gray-400" />}
            <div>
              <p className="text-white text-sm font-medium">Show Filler Episodes</p>
              <p className="text-white/40 text-xs">{state.settings.showFiller ? 'All episodes visible' : 'Filler hidden'}</p>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ showFiller: !state.settings.showFiller })}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              state.settings.showFiller ? 'bg-green-500' : 'bg-white/20'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow
              ${state.settings.showFiller ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Daily goal */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <Target size={18} className="text-purple-400" />
            <div>
              <p className="text-white text-sm font-medium">Daily Goal</p>
              <p className="text-white/40 text-xs">{state.settings.dailyGoal} episodes per day</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 5, 7, 10].map(n => (
              <button
                key={n}
                onClick={() => updateSettings({ dailyGoal: n })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors
                  ${state.settings.dailyGoal === n
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                  }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Jump to episode */}
      <div className="glass-light rounded-2xl p-4 mb-4">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Quick Setup</p>
        <p className="text-white/70 text-sm mb-2">Mark all episodes up to a specific episode as watched</p>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            max={TOTAL_EPISODES}
            value={jumpEp}
            onChange={e => setJumpEp(e.target.value)}
            placeholder={`Episode # (1–${TOTAL_EPISODES})`}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm
              placeholder-white/30 focus:outline-none focus:border-yellow-400/40 transition-colors"
          />
          <button
            onClick={handleMarkUpTo}
            className="px-4 py-2.5 bg-yellow-400 text-[#081C2D] rounded-xl font-bold text-sm hover:bg-yellow-300 transition-colors flex items-center gap-1.5"
          >
            <Check size={14} /> Set
          </button>
        </div>
      </div>

      {/* Data management */}
      <div className="glass-light rounded-2xl p-4 mb-4">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Data</p>
        <div className="space-y-2">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Download size={16} className="text-green-400" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">Export Progress</p>
              <p className="text-white/40 text-xs">Save your data as JSON</p>
            </div>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Upload size={16} className="text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">Import Progress</p>
              <p className="text-white/40 text-xs">Restore from a backup file</p>
            </div>
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        </div>
      </div>

      {/* Reset */}
      <div className="glass-light rounded-2xl p-4 border border-red-500/20">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Danger Zone</p>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Trash2 size={16} className="text-red-400" />
            </div>
            <div className="text-left">
              <p className="text-red-400 text-sm font-medium">Reset All Progress</p>
              <p className="text-white/30 text-xs">This cannot be undone</p>
            </div>
          </button>
        ) : (
          <div>
            <p className="text-white/70 text-sm mb-3">Are you sure? This will delete all your progress forever.</p>
            <div className="flex gap-2">
              <button
                onClick={() => { reset(); setShowResetConfirm(false); toast('Progress reset', 'info'); }}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-400 transition-colors"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 bg-white/10 text-white/70 rounded-xl font-medium text-sm hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-white/20 text-xs mt-6">
        One Piece Episode Tracker v1.0 · Made with ❤️ for nakama
      </p>
    </div>
  );
}
