import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface Props { episodeNum: number; onMark: () => void; }

export default function FloatingActionButton({ episodeNum, onMark }: Props) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      onClick={onMark}
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm"
      style={{
        background: 'linear-gradient(135deg, #F59E0B, #E8A020)',
        color: '#0A1628',
        boxShadow: '0 8px 28px rgba(232,160,32,0.40), 0 2px 8px rgba(232,160,32,0.20)',
      }}
    >
      <CheckCircle2 size={17} />
      EP {episodeNum} Watched
    </motion.button>
  );
}
