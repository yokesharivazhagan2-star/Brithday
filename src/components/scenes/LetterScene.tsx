import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { BirthdayConfig } from '../../data/birthday';

interface LetterSceneProps {
  letterData: BirthdayConfig['letter'];
  name: string;
  onNext: () => void;
}

export const LetterScene: React.FC<LetterSceneProps> = ({ letterData, name, onNext }) => {
  const [visibleParagraphs, setVisibleParagraphs] = useState<number>(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    letterData.paragraphs.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleParagraphs((prev) => Math.max(prev, index + 1));
        soundEffects.playChime(350 + index * 40, 0.6);
      }, 800 + index * 1800);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [letterData.paragraphs]);

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        {/* Top Header */}
        <motion.div
          className="space-y-1 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Heart of the Gift</span>
          </div>
        </motion.div>

        {/* 📜 Warm Parchment Paper Document */}
        <motion.div
          className="w-full rounded-3xl bg-[#fdfcf8] text-zinc-800 p-7 sm:p-10 shadow-2xl border border-amber-900/15 relative overflow-hidden text-left"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Sibling Postage Stamp */}
          <div className="absolute top-6 right-6 w-14 h-16 border-2 border-dashed border-purple-400/60 rounded-md flex flex-col items-center justify-center p-1 rotate-6 opacity-80 bg-purple-50">
            <span className="text-xl">🦋</span>
            <span className="text-[8px] font-mono tracking-tighter text-purple-800 mt-0.5 uppercase font-bold">
              AKKA 2026
            </span>
          </div>

          {/* Letter Greeting */}
          <h3 className="font-handwritten text-3xl sm:text-4xl text-purple-950 font-bold mb-6">
            Dear {name},
          </h3>

          {/* Progressive Paragraphs */}
          <div className="space-y-4 font-handwritten text-xl sm:text-2xl text-zinc-800 leading-relaxed">
            {letterData.paragraphs.map((paragraph, idx) => {
              const isVisible = idx < visibleParagraphs;

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.9 }}
                  className={!isVisible ? 'hidden' : ''}
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>

          {/* Closing & Signature */}
          {visibleParagraphs >= letterData.paragraphs.length && (
            <motion.div
              className="mt-8 pt-6 border-t border-zinc-300/80 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="font-handwritten text-2xl text-purple-900 font-bold">
                {letterData.closing}
              </p>
              <p className="font-handwritten text-3xl text-purple-950 font-bold">
                {letterData.signature}
              </p>

              {letterData.postscript && (
                <p className="font-handwritten text-lg text-zinc-600 italic mt-4 pt-2">
                  {letterData.postscript}
                </p>
              )}
            </motion.div>
          )}
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
          transition={{ delay: 1 }}
        >
          <span>Things I Don&apos;t Say Enough ✨</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </SceneWrapper>
  );
};
