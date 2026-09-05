import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';

interface EnvelopeSceneProps {
  name: string;
  onOpenLetter: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({ name, onOpenLetter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundEffects.playPaperSwoosh();

    setTimeout(() => {
      soundEffects.playMagicGlissando();
      onOpenLetter();
    }, 1200);
  };

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-md w-full mx-auto flex flex-col items-center">
        {/* Top Header */}
        <motion.div
          className="space-y-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Something I Don&apos;t Say Enough</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200">
            A Little Note For {name} ✉️
          </h2>
          <p className="text-xs text-purple-200/70 font-sans">
            Tap the wax seal to open the handwritten letter
          </p>
        </motion.div>

        {/* ✉️ Physical Floating Envelope Component */}
        <motion.div
          className="relative w-80 h-52 sm:w-96 sm:h-60 cursor-pointer select-none group perspective-1000 my-4"
          onClick={handleOpen}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute -bottom-8 inset-x-8 h-8 bg-black/40 rounded-full blur-xl group-hover:blur-2xl transition-all" />

          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#f0d9f8] via-[#e5c7f0] to-[#d8b0e8] shadow-2xl border border-white/60 overflow-hidden flex items-end justify-center">
            <motion.div
              className="absolute inset-x-6 top-6 h-44 bg-[#fcf9f2] rounded-t-xl shadow-lg border border-amber-900/10 p-4 flex flex-col justify-start text-left"
              initial={{ y: 20 }}
              animate={isOpen ? { y: -75, scale: 1.05 } : { y: 20 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-handwritten text-lg text-purple-950 font-bold">
                Dear {name},
              </span>
              <div className="mt-2 space-y-1.5 opacity-40">
                <div className="w-full h-1.5 bg-purple-400 rounded-full" />
                <div className="w-4/5 h-1.5 bg-purple-400 rounded-full" />
                <div className="w-3/4 h-1.5 bg-purple-400 rounded-full" />
              </div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none z-20">
              <svg className="w-full h-full" viewBox="0 0 384 240" fill="none">
                <path d="M0 0 L192 130 L0 240 Z" fill="#e2bef0" fillOpacity="0.95" />
                <path d="M384 0 L192 130 L384 240 Z" fill="#d9aff0" fillOpacity="0.95" />
                <path d="M0 240 L192 120 L384 240 Z" fill="#c99ee5" />
              </svg>
            </div>

            <motion.div
              className="absolute top-0 inset-x-0 h-32 z-30 origin-top"
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: 180, zIndex: 10 } : { rotateX: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <svg className="w-full h-full" viewBox="0 0 384 130" fill="none">
                <path
                  d="M0 0 L192 125 L384 0 Z"
                  fill="#eed2fa"
                  stroke="#ffffff"
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-24 left-1/2 -translate-x-1/2 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-950 shadow-xl border-2 border-purple-400/50 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform"
              animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            >
              <span className="text-xl filter drop-shadow-md">🦋</span>
              <div className="absolute inset-0 rounded-full border border-amber-300/30 animate-pulse" />
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          className="text-xs text-purple-200/60 mt-8 tracking-widest uppercase font-mono"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isOpen ? 'Unfolding letter…' : 'Tap envelope to read'}
        </motion.p>
      </div>
    </SceneWrapper>
  );
};
