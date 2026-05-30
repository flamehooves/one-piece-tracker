import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Props {
  episodeNum: number;
  onMark: () => void;
}

export default function FloatingActionButton({ episodeNum, onMark }: Props) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onMark}
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-yellow-400 text-[#081C2D] rounded-2xl font-bold text-sm shadow-2xl glow-gold"
    >
      <CheckCircle size={18} />
      EP {episodeNum} Watched
    </motion.button>
  );
}
