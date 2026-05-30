import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TrackerProvider } from './context/TrackerContext';
import { ToastProvider } from './components/Toast';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import EpisodesPage from './pages/EpisodesPage';
import ArcsPage from './pages/ArcsPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import type { Page } from './types';

/* Decorative SVG compass rose watermark */
function CompassRose() {
  return (
    <svg viewBox="0 0 200 200" className="absolute opacity-[0.04] pointer-events-none select-none"
      style={{ width: 320, height: 320, top: -60, right: -60 }}>
      <circle cx="100" cy="100" r="90" fill="none" stroke="#0A1628" strokeWidth="1.5"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#0A1628" strokeWidth="0.8"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#0A1628" strokeWidth="0.8"/>
      <circle cx="100" cy="100" r="8" fill="#0A1628"/>
      {/* N S E W points */}
      <path d="M100 10 L106 94 L100 100 L94 94 Z" fill="#0A1628"/>
      <path d="M100 190 L106 106 L100 100 L94 106 Z" fill="#0A1628"/>
      <path d="M10 100 L94 106 L100 100 L94 94 Z" fill="#0A1628"/>
      <path d="M190 100 L106 106 L100 100 L106 94 Z" fill="#0A1628"/>
      {/* Diagonal points */}
      <path d="M29 29 L97 97 L100 100 L97 97 L93 87 Z" fill="#0A1628" opacity="0.5"/>
      <path d="M171 29 L103 97 L100 100 L103 97 L107 87 Z" fill="#0A1628" opacity="0.5"/>
      <path d="M29 171 L97 103 L100 100 L97 103 L93 113 Z" fill="#0A1628" opacity="0.5"/>
      <path d="M171 171 L103 103 L100 100 L103 103 L107 113 Z" fill="#0A1628" opacity="0.5"/>
      {/* Tick marks */}
      {Array.from({length: 32}, (_,i) => {
        const angle = (i * 360/32) * Math.PI/180;
        const r1 = i % 4 === 0 ? 72 : i % 2 === 0 ? 75 : 78;
        const r2 = 82;
        return <line key={i}
          x1={100 + r1*Math.sin(angle)} y1={100 - r1*Math.cos(angle)}
          x2={100 + r2*Math.sin(angle)} y2={100 - r2*Math.cos(angle)}
          stroke="#0A1628" strokeWidth={i % 4 === 0 ? 1.5 : 0.8} />;
      })}
      {/* Text labels */}
      <text x="100" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0A1628">N</text>
      <text x="100" y="187" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0A1628">S</text>
      <text x="183" y="104" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0A1628">E</text>
      <text x="17" y="104" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0A1628">W</text>
    </svg>
  );
}

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
    <div className="min-h-dvh max-w-lg mx-auto relative" style={{ zIndex: 1 }}>
      {/* Compass rose watermark — top-right corner */}
      <div className="fixed top-0 right-0 pointer-events-none z-0 max-w-lg w-full" style={{ left: '50%', transform: 'translateX(-50%)', maxWidth: 512 }}>
        <div className="relative">
          <CompassRose />
        </div>
      </div>

      {/* Wave decoration — bottom */}
      <div className="fixed bottom-16 left-0 right-0 pointer-events-none z-0 overflow-hidden h-24 opacity-[0.06]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#0A1628"/>
          <path d="M0,55 C200,20 400,70 600,45 C800,20 1000,65 1200,40 C1300,27 1370,45 1440,35 L1440,80 L0,80 Z" fill="#0A1628" opacity="0.5"/>
        </svg>
      </div>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
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
