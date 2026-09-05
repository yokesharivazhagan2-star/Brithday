import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, Smile } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { BirthdayConfig } from '../../data/birthday';

interface BigSisterChecklistProps {
  checklist: BirthdayConfig['checklist'];
  conclusion: BirthdayConfig['checklistConclusion'];
  onNext: () => void;
}

export const BigSisterChecklist: React.FC<BigSisterChecklistProps> = ({
  checklist,
  conclusion,
  onNext,
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>(checklist.map((c) => c.id));

  const toggleItem = (id: string) => {
    soundEffects.playPop();
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-lg w-full mx-auto flex flex-col items-center">
        {/* Top Header Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Scientific Sibling Evidence</span>
        </motion.div>

        <motion.h2
          className="font-serif text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          BIG SISTER CHECKLIST 📋
        </motion.h2>

        <motion.p
          className="text-xs text-purple-200/70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Verifying the essential qualities of Kanii🦋
        </motion.p>

        {/* Checklist Card */}
        <motion.div
          className="w-full rounded-3xl glass-panel-luxury p-6 sm:p-8 text-left space-y-3.5 border border-purple-400/30 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {checklist.map((item, index) => {
            const isChecked = checkedItems.includes(item.id);

            return (
              <motion.div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isChecked
                    ? 'bg-purple-500/15 border border-purple-400/30 text-purple-100'
                    : 'bg-white/5 border border-white/10 text-zinc-400'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isChecked ? 'text-emerald-400' : 'text-zinc-600'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 fill-current/20" />
                </div>
                <span className="text-sm sm:text-base font-medium select-none flex-1">
                  {item.label}
                </span>
                <span className="text-xs opacity-50">✓</span>
              </motion.div>
            );
          })}

          {/* Sibling Punchline */}
          <AnimatePresence>
            <motion.div
              className="mt-6 pt-6 border-t border-white/10 text-center space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center justify-center gap-2 text-amber-300 text-base sm:text-lg font-bold">
                <Smile className="w-5 h-5" />
                <span>{conclusion.punchline}</span>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/80 font-handwritten text-xl sm:text-2xl">
                &ldquo;{conclusion.warmNote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={() => {
            soundEffects.playMagicGlissando();
            onNext();
          }}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Time For The Cake! 🎂</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </SceneWrapper>
  );
};
