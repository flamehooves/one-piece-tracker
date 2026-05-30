import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon: ReactNode;
  iconBg?: string;
  index?: number;
}

export default function StatCard({ label, value, sub, icon, iconBg = 'rgba(232,160,32,0.12)', index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, delay: index * 0.07, type: 'spring', stiffness: 300, damping: 24 }}
      whileHover={{ scale: 1.025, y: -3 }}
      className="rounded-2xl p-4"
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.95)',
        boxShadow: '0 4px 20px rgba(10,35,66,0.08)',
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: iconBg }}>
        {icon}
      </div>
      <p className="text-xs font-semibold mb-1" style={{ color: '#94A3B8' }}>{label}</p>
      <p className="font-black text-2xl leading-tight" style={{ color: '#0A1628' }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>{sub}</p>}
    </motion.div>
  );
}
