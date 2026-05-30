import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon: ReactNode;
  color?: string;
  index?: number;
}

export default function StatCard({ label, value, sub, icon, color = '#FFD700', index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="glass-light rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}18` }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <p className="text-white/50 text-xs mb-1">{label}</p>
      <p className="text-white font-bold text-2xl leading-tight">{value}</p>
      {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
    </motion.div>
  );
}
