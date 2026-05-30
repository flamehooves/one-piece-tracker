import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TrackerProvider } from './context/TrackerContext';
import type { Page } from './types';
import { ToastProvider } from './components/Toast';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import EpisodesPage from './pages/EpisodesPage';
import ArcsPage from './pages/ArcsPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';

function AppInner() {
  const [page, setPage] = useState<Page>('home');

  const pages: Record<Page, React.ReactNode> = {
    home: <HomePage onNavigate={setPage} />,
    episodes: <EpisodesPage />,
    arcs: <ArcsPage />,
    stats: <StatsPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="min-h-dvh ocean-bg max-w-lg mx-auto relative">
      {/* Decorative ocean waves */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#0A2342]/80 to-transparent" />
        <div className="absolute bottom-16 left-0 right-0 h-32 bg-gradient-to-t from-[#081C2D] to-transparent" />
        {/* Subtle star field */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18 }}
          className="relative z-10"
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>

      <BottomNav current={page} onChange={setPage} />
    </div>
  );
}

export default function App() {
  return (
    <TrackerProvider>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </TrackerProvider>
  );
}
