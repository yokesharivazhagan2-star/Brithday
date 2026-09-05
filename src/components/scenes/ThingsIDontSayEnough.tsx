import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { BirthdayConfig } from '../../data/birthday';

interface ThingsIDontSayEnoughProps {
  items: BirthdayConfig['thingsIDontSayEnough'];
  onNext: () => void;
}

export const ThingsIDontSayEnough: React.FC<ThingsIDontSayEnoughProps> = ({ items, onNext }) => {
  return (
    <SceneWrapper className="text-center">
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        {/* Top Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs font-semibold tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>From The Heart</span>
        </motion.div>

        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-100 to-pink-200 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Things I Don&apos;t Say Enough ✨
        </motion.h2>

        <motion.p
          className="text-xs text-purple-200/70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Words that are always true, even when left unspoken
        </motion.p>

        {/* Staggered Floating Cards */}
        <div className="w-full space-y-3.5 my-2">
          {items.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                className="w-full p-5 rounded-2xl glass-panel-luxury border border-amber-400/20 text-left flex items-start gap-4 shadow-lg hover:border-amber-400/40 transition-all"
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/20 shrink-0">
                  {item.emoji}
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                    &ldquo;{item.text}&rdquo;
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 font-light">
                    {item.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.button
          onClick={() => {
            soundEffects.playMagicGlissando();
            onNext();
          }}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-medium text-sm shadow-xl shadow-pink-500/25 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Look Up At The Stars 🌌</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </SceneWrapper>
  );
};
