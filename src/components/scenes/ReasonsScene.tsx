import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { BirthdayConfig } from '../../data/birthday';

interface ReasonsSceneProps {
  reasons: BirthdayConfig['reasons'];
  onNext: () => void;
}

export const ReasonsScene: React.FC<ReasonsSceneProps> = ({ reasons, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if (currentIndex < reasons.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      soundEffects.playPop();
    } else {
      soundEffects.playMagicGlissando();
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      soundEffects.playPop();
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) {
      handleNext();
    } else if (info.offset.x > 60) {
      handlePrev();
    }
  };

  const currentReason = reasons[currentIndex];

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-md w-full mx-auto flex flex-col items-center">
        <motion.div
          className="space-y-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sibling Appreciation</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200">
            Reasons Why Kanii🦋 Is The Best Big Sister
          </h2>
          <p className="text-xs text-purple-200/60 font-mono">
            Swipe or tap to turn the page ({currentIndex + 1} of {reasons.length})
          </p>
        </motion.div>

        {/* 3D Depth Card Container */}
        <div className="relative w-full h-80 flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={handleDragEnd}
              className={`absolute inset-0 w-full h-full rounded-3xl p-8 flex flex-col justify-between glass-panel-luxury border-2 border-purple-400/40 cursor-grab active:cursor-grabbing shadow-2xl bg-gradient-to-br ${currentReason.accentColor}`}
              initial={{
                opacity: 0,
                x: direction * 150,
                rotate: direction * 8,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -direction * 150,
                rotate: -direction * 8,
                scale: 0.9,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-300 tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full border border-purple-400/30">
                  REASON #{currentReason.number}
                </span>
                <span className="text-3xl filter drop-shadow-md">
                  {currentReason.emoji}
                </span>
              </div>

              <div className="my-auto text-left space-y-3">
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                  {currentReason.title}
                </h3>
                <p className="text-sm text-purple-100/90 leading-relaxed font-light">
                  {currentReason.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-purple-200/60">
                <span>Swipe left / right</span>
                <span>🦋</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress & Controls */}
        <div className="flex items-center justify-between w-full mt-8 px-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full border transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed border-white/10 text-zinc-500'
                : 'border-purple-400/30 text-purple-200 hover:bg-purple-500/20 active:scale-95'
            }`}
            aria-label="Previous reason"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {reasons.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 bg-gradient-to-r from-purple-400 to-amber-300'
                    : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 py-3 px-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
            aria-label="Next reason"
          >
            <span>{currentIndex === reasons.length - 1 ? 'Memory Lane 📸' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </SceneWrapper>
  );
};
