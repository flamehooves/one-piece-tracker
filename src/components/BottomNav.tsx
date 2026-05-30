import { motion } from 'framer-motion';
import { Home, List, Anchor, BarChart2, Settings } from 'lucide-react';
import type { Page } from '../types';

const TABS: { id: Page; label: string; Icon: React.ElementType }[] = [
  { id: 'home',     label: 'Home',     Icon: Home },
  { id: 'episodes', label: 'Episodes', Icon: List },
  { id: 'arcs',     label: 'Arcs',     Icon: Anchor },
  { id: 'stats',    label: 'Stats',    Icon: BarChart2 },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

interface Props {
  current: Page;
  onChange: (p: Page) => void;
}

export default function BottomNav({ current, onChange }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{ maxWidth: 512, left: '50%', transform: 'translateX(-50%)', width: '100%' }}
    >
      <div
        className="mx-3 mb-3 rounded-2xl flex justify-around items-center px-1 py-2"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.95)',
          boxShadow: '0 8px 32px rgba(10,35,66,0.14), 0 2px 8px rgba(10,35,66,0.06)',
        }}
      >
        {TABS.map(({ id, label, Icon }) => {
          const active = current === id;
          return (
            <motion.button
              key={id}
              onClick={() => onChange(id)}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl relative min-w-[52px]"
            >
              {active && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(10,35,66,0.07)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: active ? 1.08 : 1, y: active ? -1 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="relative z-10"
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.2 : 1.7}
                  style={{ color: active ? '#0A1628' : '#94A3B8' }}
                />
              </motion.div>
              <span
                className="text-[10px] font-semibold relative z-10 transition-colors"
                style={{ color: active ? '#0A1628' : '#94A3B8', letterSpacing: '0.01em' }}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
