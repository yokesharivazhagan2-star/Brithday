import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';

interface FinalStarlightSceneProps {
  name: string;
  onNext: () => void;
}

export const FinalStarlightScene: React.FC<FinalStarlightSceneProps> = ({
  name,
  onNext,
}) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => {
      setStage(2);
      soundEffects.playMagicGlissando();
    }, 2400);
    const t3 = setTimeout(() => setStage(3), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-xl w-full mx-auto flex flex-col items-center justify-center min-h-[55vh] relative">
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-purple-500/20 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 space-y-6">
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-3"
            >
              <p className="font-serif text-2xl sm:text-3xl text-purple-100 font-light leading-relaxed">
                Some people become a part of your story…
              </p>
              <p className="font-serif text-2xl sm:text-3xl text-purple-200/90 font-light leading-relaxed">
                Some people help shape your story.
              </p>
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 pt-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>YOU DID BOTH</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 drop-shadow-[0_0_35px_rgba(192,132,252,0.4)]">
                HAPPY BIRTHDAY
              </h1>
              <h2 className="font-serif text-3xl sm:text-5xl text-purple-300 font-bold">
                {name}
              </h2>
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-4 pt-2"
            >
              <p className="font-handwritten text-2xl sm:text-3xl text-purple-200/90 italic">
                To my amazing big sister. ✨
              </p>

              <div className="flex items-center justify-center gap-2 text-purple-300 text-xl">
                <span>🦋</span>
                <span>✨</span>
                <span>🦋</span>
              </div>
            </motion.div>
          )}
        </div>

        {stage >= 3 && (
          <motion.button
            onClick={() => {
              soundEffects.playCelebrationTrumpet();
              onNext();
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white font-semibold text-sm shadow-[0_0_35px_rgba(192,132,252,0.4)] hover:shadow-[0_0_50px_rgba(192,132,252,0.7)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Grand Birthday Celebration! 🎉</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </SceneWrapper>
  );
};
