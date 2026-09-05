import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { triggerHeartConfetti } from '../../utils/confetti';

interface HeartInteractionProps {
  onUnlock: () => void;
}

export const HeartInteraction: React.FC<HeartInteractionProps> = ({ onUnlock }) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const y = useMotionValue(0);
  const dragThreshold = 140;

  const scale = useTransform(y, [0, dragThreshold], [1, 1.35]);
  const stretchY = useTransform(y, [0, dragThreshold], [1, 1.4]);
  const stretchX = useTransform(y, [0, dragThreshold], [1, 0.85]);
  const glowOpacity = useTransform(y, [0, dragThreshold], [0.3, 0.9]);
  const pullPercentage = useTransform(y, [0, dragThreshold], [0, 100]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    if (isTriggered) return;
    if (info.offset.y > 40 && info.offset.y < 50) {
      soundEffects.playChime(440, 0.2);
    } else if (info.offset.y > 90 && info.offset.y < 100) {
      soundEffects.playChime(554.37, 0.2);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (isTriggered) return;

    if (info.offset.y >= dragThreshold) {
      triggerRelease();
    } else {
      soundEffects.playPop();
    }
  };

  const triggerRelease = () => {
    setIsTriggered(true);
    soundEffects.playHeartRelease();
    triggerHeartConfetti();

    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  const handleHeartClick = () => {
    if (isTriggered) return;
    const newCount = tapCount + 1;
    setTapCount(newCount);
    soundEffects.playPop();

    if (newCount >= 5) {
      setEasterEggActive(true);
      soundEffects.playMagicGlissando();
      triggerHeartConfetti();
    }
  };

  return (
    <SceneWrapper className="text-center overflow-hidden">
      <div className="flex flex-col items-center justify-center max-w-md w-full mx-auto relative">
        {/* Instruction badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase mb-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Family Bond</span>
        </motion.div>

        <motion.h2
          className="font-serif text-2xl md:text-3xl text-purple-100 font-light mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Pull This…
        </motion.h2>

        <motion.p
          className="text-xs text-purple-200/70 mb-10 tracking-wide font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Because every big sister deserves a surprise ✨
        </motion.p>

        {/* Draggable Heart Interactive Element */}
        <div className="relative h-64 w-full flex items-center justify-center">
          <motion.div
            className="absolute top-12 w-0.5 bg-gradient-to-b from-purple-500/80 via-pink-400 to-transparent"
            style={{
              height: y,
              opacity: glowOpacity,
            }}
          />

          <motion.div
            className="absolute w-44 h-44 rounded-full bg-purple-500 blur-3xl pointer-events-none"
            style={{
              opacity: glowOpacity,
              scale: scale,
            }}
          />

          <motion.div
            className="relative cursor-grab active:cursor-grabbing z-20 touch-none select-none"
            style={{
              y,
              scaleY: stretchY,
              scaleX: stretchX,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: dragThreshold + 30 }}
            dragElastic={0.4}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onClick={handleHeartClick}
            animate={
              isTriggered
                ? {
                    scale: [1, 2.5, 30],
                    opacity: [1, 1, 0],
                    rotate: [0, 15, -15, 0],
                  }
                : {
                    y: [0, -8, 0],
                  }
            }
            transition={
              isTriggered
                ? { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
                : { y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }
            }
          >
            <div className="relative p-6 group">
              <svg
                className="w-28 h-28 md:w-32 md:h-32 text-purple-400 fill-current filter drop-shadow-[0_0_25px_rgba(192,132,252,0.9)] transition-colors group-hover:text-purple-300"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-white font-bold tracking-widest text-[11px] drop-shadow-md">
                <span className="font-serif">PULL ME</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce mt-0.5 text-purple-200" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Drag Distance Meter */}
        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mt-6">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-amber-300 rounded-full"
            style={{ width: pullPercentage }}
          />
        </div>

        {easterEggActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full"
          >
            ✨ You found the Secret Sibling Sparkle! (5/5 taps)
          </motion.div>
        )}
      </div>
    </SceneWrapper>
  );
};
