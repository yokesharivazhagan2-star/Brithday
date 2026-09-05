import React from 'react';
import { motion } from 'framer-motion';

interface SceneWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const SceneWrapper: React.FC<SceneWrapperProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-4 py-12 md:py-16 select-none ${className}`}
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // cinematic smooth ease-out
      }}
    >
      {children}
    </motion.div>
  );
};
