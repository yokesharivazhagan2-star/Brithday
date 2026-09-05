import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';

interface CinematicMessageProps {
  name: string;
  onNext: () => void;
}

export const CinematicMessage: React.FC<CinematicMessageProps> = ({ name, onNext }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage(1);
      soundEffects.playChime(440, 1.5);
    }, 1800);

    const t2 = setTimeout(() => {
      setStage(2);
      soundEffects.playMagicGlissando();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-xl w-full mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <div className="absolute w-72 h-72 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="msg1"
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-purple-300/70">
                  A Moment To Pause
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-purple-100 tracking-wide">
                  Today isn’t just another day…
                </h2>
              </motion.div>
            )}

            {stage >= 1 && (
              <motion.div
                key="msg2"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Celebrating You</span>
                </motion.div>

                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 drop-shadow-lg">
                  It’s your day, {name}.
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-base md:text-lg text-purple-200/90 font-light max-w-md mx-auto"
                >
                  And today, we’re celebrating you. ✨
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stage >= 2 && (
          <motion.button
            onClick={() => {
              soundEffects.playMagicGlissando();
              onNext();
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Open Big Sister Checklist 📋</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </SceneWrapper>
  );
};
