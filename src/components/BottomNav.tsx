import { Home, List, Anchor, BarChart2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Page } from '../types';

const TABS: { id: Page; label: string; Icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'episodes', label: 'Episodes', Icon: List },
  { id: 'arcs', label: 'Arcs', Icon: Anchor },
  { id: 'stats', label: 'Stats', Icon: BarChart2 },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

interface Props {
  current: Page;
  onChange: (p: Page) => void;
}

export default function BottomNav({ current, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="glass border-t border-yellow-400/10 px-2 pt-2 pb-1 flex justify-around items-center max-w-lg mx-auto">
        {TABS.map(({ id, label, Icon }) => {
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all relative min-w-[52px]"
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-yellow-400/10 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon
                size={20}
                className={`transition-colors relative z-10 ${active ? 'text-yellow-400' : 'text-white/40'}`}
              />
              <span className={`text-[10px] font-medium relative z-10 transition-colors ${active ? 'text-yellow-400' : 'text-white/40'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
