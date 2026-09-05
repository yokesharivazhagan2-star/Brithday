import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '../transitions/SceneWrapper';

interface LoadingSceneProps {
  onComplete: () => void;
}

export const LoadingScene: React.FC<LoadingSceneProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SceneWrapper className="text-center">
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Pulsing Glow */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-purple-500/20 blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Glowing Butterfly Emblem */}
        <motion.div
          className="relative text-4xl mb-6 filter drop-shadow-[0_0_25px_rgba(192,132,252,0.9)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: 1,
            rotate: [0, -6, 6, 0],
          }}
          transition={{
            scale: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.8 },
            rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          🦋
        </motion.div>

        {/* Cinematic Loading Text */}
        <motion.h2
          className="font-serif text-xl md:text-2xl text-purple-100 tracking-wider font-light mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Preparing something special for Kanii🦋…
        </motion.h2>

        <motion.p
          className="text-xs text-purple-200/50 tracking-widest uppercase font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ delay: 0.8, duration: 1.8, repeat: Infinity }}
        >
          Gathering sibling memories & stars
        </motion.p>
      </div>
    </SceneWrapper>
  );
};
