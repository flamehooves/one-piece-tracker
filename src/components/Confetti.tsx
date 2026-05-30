import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
const COUNT = 80;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Piece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

export default function Confetti({ onDone }: { onDone?: () => void }) {
  const pieces: Piece[] = Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    x: randomBetween(0, 100),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(6, 14),
    delay: randomBetween(0, 0.8),
    duration: randomBetween(2, 4),
    rotate: randomBetween(0, 720),
  }));

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    timerRef.current = setTimeout(() => onDone?.(), 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, p.rotate],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
