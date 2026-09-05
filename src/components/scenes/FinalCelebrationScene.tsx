import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { triggerMassiveCelebration } from '../../utils/confetti';

interface FinalCelebrationSceneProps {
  name: string;
  onReplay: () => void;
}

export const FinalCelebrationScene: React.FC<FinalCelebrationSceneProps> = ({ name, onReplay }) => {
  useEffect(() => {
    soundEffects.playCelebrationTrumpet();
    triggerMassiveCelebration();
  }, []);

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-lg w-full mx-auto flex flex-col items-center justify-center relative py-6">
        {/* Confetti / Fireworks Trigger Button */}
        <motion.div
          className="relative mb-6 cursor-pointer"
          onClick={() => {
            soundEffects.playCelebrationTrumpet();
            triggerMassiveCelebration();
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-amber-300 flex items-center justify-center shadow-[0_0_40px_rgba(192,132,252,0.7)]">
            <span className="text-4xl animate-bounce">🎉</span>
          </div>
          <div className="absolute -inset-2 rounded-full border-2 border-purple-400/40 animate-ping pointer-events-none" />
        </motion.div>

        {/* Title & Sibling Dedication */}
        <motion.div
          className="space-y-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-serif text-lg sm:text-xl text-purple-200/90 italic">
            No matter how much we grow up…
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
            You&apos;ll always be my big sister.
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 drop-shadow-xl pt-2">
            HAPPY BIRTHDAY, {name} ❤️
          </h1>

          <p className="text-sm sm:text-base text-purple-200/80 font-light max-w-md mx-auto pt-2">
            Here&apos;s to many more adventures, laughs, and memories together! 🥂
          </p>
        </motion.div>

        {/* Experience Again Replay Button */}
        <div className="w-full max-w-xs mt-2">
          <motion.button
            onClick={() => {
              soundEffects.playMagicGlissando();
              onReplay();
            }}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white font-semibold text-sm shadow-[0_0_30px_rgba(192,132,252,0.4)] hover:shadow-[0_0_45px_rgba(192,132,252,0.7)] active:scale-98 transition-all tracking-wider uppercase"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>EXPERIENCE AGAIN</span>
          </motion.button>
        </div>

        {/* Footer Credit Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-purple-300/60 mt-10 font-mono">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Made with love for Kanii🦋</span>
        </div>
      </div>
    </SceneWrapper>
  );
};
