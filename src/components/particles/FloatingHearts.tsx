import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingHeartsProps {
  count?: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 15 }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 95,
      yStart: 105 + Math.random() * 20,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.15,
      color: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af', '#fb7185'][i % 5],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            color: heart.color,
            fontSize: `${heart.size}px`,
          }}
          initial={{ y: `${heart.yStart}vh`, opacity: 0, scale: 0.8 }}
          animate={{
            y: '-15vh',
            opacity: [0, heart.opacity, heart.opacity, 0],
            scale: [0.8, 1.1, 1, 0.9],
            x: [0, Math.sin(heart.id) * 30, 0, Math.cos(heart.id) * -30],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'easeInOut',
          }}
        >
          <svg
            className="w-full h-full fill-current filter drop-shadow-[0_0_8px_currentColor]"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
