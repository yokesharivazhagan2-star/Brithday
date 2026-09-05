import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Maximize2 } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { BirthdayConfig } from '../../data/birthday';
import { PhotoLightbox } from '../ui/PhotoLightbox';

interface MemoryLaneProps {
  memories: BirthdayConfig['memories'];
  onNext: () => void;
}

export const MemoryLane: React.FC<MemoryLaneProps> = ({ memories, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
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

  const currentMemory = memories[currentIndex];

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-md w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          className="space-y-2 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Our Scrapbook</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-100 to-pink-200">
            OUR MEMORY LANE 📸
          </h2>
          <p className="text-xs text-purple-200/70 font-mono">
            Tap photo to enlarge ({currentIndex + 1} of {memories.length})
          </p>
        </motion.div>

        {/* Polaroid Container with 3D Float & Shadow */}
        <div className="relative w-full h-[430px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              onClick={() => {
                soundEffects.playPop();
                setIsLightboxOpen(true);
              }}
              className="absolute w-72 sm:w-80 bg-[#fdfcf9] p-4 rounded-2xl polaroid-frame cursor-pointer select-none text-zinc-800 shadow-2xl border border-amber-900/10"
              style={{
                transform: `rotate(${currentMemory.rotation || 0}deg)`,
              }}
              initial={{
                opacity: 0,
                x: direction * 160,
                rotate: direction * 12,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: currentMemory.rotation || 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -direction * 160,
                rotate: -direction * 12,
                scale: 0.85,
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 22,
              }}
              whileHover={{ scale: 1.03, rotate: 0 }}
            >
              {/* Top Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-purple-200/80 -rotate-2 rounded-sm shadow-sm backdrop-blur-sm border border-purple-300/40" />

              {/* Photo Area - Enhanced height and object positioning for portrait clarity */}
              <div className="relative w-full h-64 rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center group">
                <img
                  src={currentMemory.image}
                  alt={currentMemory.caption}
                  className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Special Overlay per Photo */}
                {currentMemory.specialEffect === 'butterfly' && (
                  <div className="absolute top-2 right-2 text-xl pointer-events-none animate-bounce">
                    🦋
                  </div>
                )}
                {currentMemory.specialEffect === 'sunlight' && (
                  <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent pointer-events-none" />
                )}
                {currentMemory.specialEffect === 'gold_spotlight' && (
                  <div className="absolute bottom-2 left-2 text-xs bg-amber-500/80 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    ✨ Akka
                  </div>
                )}
                {currentMemory.specialEffect === 'garden_leaves' && (
                  <div className="absolute top-2 left-2 text-lg opacity-80 pointer-events-none">
                    🌿
                  </div>
                )}

                {/* Enlarge Hint */}
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="pt-3 pb-1 text-left space-y-1">
                <div className="text-[10px] font-mono font-bold text-purple-700 tracking-wider uppercase">
                  MEMORY #{currentMemory.number} • {currentMemory.tag}
                </div>
                <p className="font-handwritten text-xl sm:text-2xl text-zinc-900 font-bold leading-tight line-clamp-2">
                  &ldquo;{currentMemory.caption}&rdquo;
                </p>
                <p className="text-[11px] text-zinc-500 font-sans italic">
                  {currentMemory.secondaryText}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full mt-6 px-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full border transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed border-white/10 text-zinc-500'
                : 'border-purple-400/30 text-purple-200 hover:bg-purple-500/20 active:scale-95'
            }`}
            aria-label="Previous memory"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {memories.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 bg-gradient-to-r from-amber-300 to-purple-400'
                    : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 py-3 px-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
            aria-label="Next memory"
          >
            <span>{currentIndex === memories.length - 1 ? 'Meet Sibling Mascot 🐻' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        isOpen={isLightboxOpen}
        memories={memories}
        currentIndex={currentIndex}
        onClose={() => setIsLightboxOpen(false)}
        onSelectIndex={(idx) => setCurrentIndex(idx)}
      />
    </SceneWrapper>
  );
};
