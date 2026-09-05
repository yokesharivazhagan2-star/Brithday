import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingButterfliesProps {
  count?: number;
}

export const FloatingButterflies: React.FC<FloatingButterfliesProps> = ({ count = 8 }) => {
  const butterflies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      yStart: 105 + Math.random() * 15,
      size: Math.random() * 14 + 16,
      duration: Math.random() * 7 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.35,
      wingDuration: Math.random() * 0.3 + 0.25,
      color: ['#c084fc', '#f472b6', '#38bdf8', '#fbbf24', '#fbcfe8'][i % 5],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]" aria-hidden="true">
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.x}%`,
            fontSize: `${b.size}px`,
          }}
          initial={{ y: `${b.yStart}vh`, opacity: 0, scale: 0.8 }}
          animate={{
            y: '-12vh',
            opacity: [0, b.opacity, b.opacity, 0],
            scale: [0.8, 1.1, 1, 0.9],
            x: [0, Math.sin(b.id * 2) * 45, -Math.cos(b.id * 2) * 35, 0],
            rotate: [0, 15, -15, 10, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Animated 3D Butterfly */}
          <motion.div
            className="inline-block filter drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]"
            animate={{
              scaleX: [1, 0.3, 1],
              scaleY: [1, 0.85, 1],
            }}
            transition={{
              duration: b.wingDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🦋
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
