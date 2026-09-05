import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { triggerStarBurst } from '../../utils/confetti';

interface CharacterSceneProps {
  name: string;
  onNext: () => void;
}

export const CharacterScene: React.FC<CharacterSceneProps> = ({ onNext }) => {
  const [tapCount, setTapCount] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [moodText, setMoodText] = useState("Happy Birthday, Akka! 🥳");

  const handleCharacterTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    setIsWaving(true);
    soundEffects.playPop();
    triggerStarBurst(0.5, 0.45);

    if (nextCount === 1) {
      setMoodText("Okay... today you get to be right about everything. 😂");
    } else if (nextCount === 2) {
      setMoodText("Stop bullying me, Akka! 😂 Just kidding, you're the best.");
    } else if (nextCount >= 3) {
      soundEffects.playCelebrationTrumpet();
      setMoodText("🌟 Sibling Easter Egg: Akka Officially Rules The Day! 🌟");
    }

    setTimeout(() => setIsWaving(false), 1200);
  };

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-md w-full mx-auto flex flex-col items-center">
        {/* Header Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Sibling Mascot</span>
        </motion.div>

        {/* Speech Bubble */}
        <motion.div
          key={moodText}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-400/30 text-purple-100 text-sm font-medium mb-8 max-w-xs shadow-lg"
        >
          {moodText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 border-r border-b border-purple-400/30 rotate-45" />
        </motion.div>

        {/* 🐻 Adorable Sibling Mascot Lumi */}
        <div
          className="relative cursor-pointer group my-2 select-none"
          onClick={handleCharacterTap}
        >
          {/* Floating Butterfly Halo */}
          <motion.div
            className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center text-xl filter drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🦋
          </motion.div>

          {/* Character Body / Head */}
          <motion.div
            className="relative w-44 h-44 rounded-full bg-gradient-to-b from-purple-200 via-pink-200 to-purple-300 shadow-2xl border-4 border-white/50 flex items-center justify-center"
            animate={
              isWaving
                ? { scale: [1, 1.15, 0.95, 1], rotate: [0, -10, 10, -5, 0] }
                : { y: [0, -8, 0], scale: [1, 1.02, 1] }
            }
            transition={
              isWaving
                ? { duration: 0.8, type: 'spring' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Bear Ears */}
            <div className="absolute -top-3 -left-1 w-12 h-12 rounded-full bg-purple-300 border-2 border-white/40 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-purple-400/60" />
            </div>
            <div className="absolute -top-3 -right-1 w-12 h-12 rounded-full bg-purple-300 border-2 border-white/40 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-purple-400/60" />
            </div>

            {/* Eyes */}
            <div className="absolute top-14 left-10 w-4 h-5 rounded-full bg-zinc-900 flex items-start justify-end p-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
            <div className="absolute top-14 right-10 w-4 h-5 rounded-full bg-zinc-900 flex items-start justify-end p-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>

            {/* Rosy Cheeks */}
            <div className="absolute top-20 left-6 w-6 h-3 rounded-full bg-pink-400/60 blur-[2px]" />
            <div className="absolute top-20 right-6 w-6 h-3 rounded-full bg-pink-400/60 blur-[2px]" />

            {/* Cute Snout & Smile */}
            <div className="absolute top-18 w-12 h-8 rounded-full bg-white/90 flex flex-col items-center justify-center pt-1 shadow-inner">
              <div className="w-3 h-2 rounded-full bg-purple-900 mb-0.5" />
              <div className="w-4 h-2 border-b-2 border-purple-900 rounded-full" />
            </div>

            {/* Birthday Party Hat */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[36px] border-b-amber-400 filter drop-shadow-md">
              <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-purple-400 animate-pulse" />
            </div>

            {/* Waving Paw with Sibling Heart */}
            <motion.div
              className="absolute -right-4 bottom-8 w-8 h-8 rounded-full bg-purple-300 border-2 border-white/40 flex items-center justify-center shadow-md text-xs"
              animate={isWaving ? { rotate: [0, 40, -20, 40, 0] } : { rotate: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: isWaving ? 1 : Infinity }}
            >
              <Heart className="w-3.5 h-3.5 text-purple-600 fill-current" />
            </motion.div>
          </motion.div>
        </div>

        <p className="text-xs text-purple-200/60 mt-4">
          Tap Lumi to share a sibling high-five! (Taps: {tapCount})
        </p>

        {/* Continue Button */}
        <motion.button
          onClick={() => {
            soundEffects.playMagicGlissando();
            onNext();
          }}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Bouquet of Thanks 💐</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </SceneWrapper>
  );
};
