import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Props {
  rating?: number;
  onChange?: (r: number) => void;
  readonly?: boolean;
  size?: number;
}

export default function StarRating({ rating = 0, onChange, readonly = false, size = 16 }: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <motion.button
          key={n}
          type="button"
          disabled={readonly}
          whileTap={{ scale: 0.80 }}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          transition={{ type: 'spring', stiffness: 600, damping: 24 }}
          onClick={() => onChange?.(n === rating ? 0 : n)}
          className={readonly ? 'cursor-default' : 'cursor-pointer'}
        >
          <Star
            size={size}
            style={{
              fill: n <= rating ? '#E8A020' : 'transparent',
              color: n <= rating ? '#E8A020' : '#CBD5E1',
              filter: n <= rating ? 'drop-shadow(0 1px 4px rgba(232,160,32,0.4))' : 'none',
            }}
          />
        </motion.button>
      ))}
    </div>
  );
}
