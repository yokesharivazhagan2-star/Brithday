import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';
import { MemoryPhoto } from '../../data/birthday';
import { soundEffects } from '../../utils/audioSynthesizer';

interface PhotoLightboxProps {
  isOpen: boolean;
  memories: MemoryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  memories,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const currentPhoto = memories[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen || !currentPhoto) return null;

  const handleNext = () => {
    setIsZoomed(false);
    soundEffects.playPop();
    onSelectIndex((currentIndex + 1) % memories.length);
  };

  const handlePrev = () => {
    setIsZoomed(false);
    soundEffects.playPop();
    onSelectIndex((currentIndex - 1 + memories.length) % memories.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 select-none">
        {/* Backdrop blur */}
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-between rounded-3xl overflow-hidden glass-panel-luxury border border-purple-500/30 p-4 sm:p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-xs text-purple-200/80 mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30">
                MEMORY {currentPhoto.number} of {memories.length}
              </span>
              <span className="hidden sm:inline font-serif font-bold text-white">
                {currentPhoto.tag}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 transition-colors"
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Photo Display */}
          <div className="relative w-full flex-1 min-h-[350px] sm:min-h-[480px] flex items-center justify-center overflow-hidden rounded-2xl bg-zinc-950/80 my-2">
            {/* Special Ambient Overlays */}
            {currentPhoto.specialEffect === 'butterfly' && (
              <div className="absolute inset-0 pointer-events-none z-10">
                <span className="absolute top-6 left-8 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>🦋</span>
                <span className="absolute bottom-10 right-10 text-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🦋</span>
              </div>
            )}

            {currentPhoto.specialEffect === 'sunlight' && (
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none z-10" />
            )}

            {currentPhoto.specialEffect === 'gold_spotlight' && (
              <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none z-10" />
            )}

            {currentPhoto.specialEffect === 'garden_leaves' && (
              <div className="absolute inset-0 pointer-events-none z-10">
                <span className="absolute top-4 right-8 text-xl opacity-60">🌿</span>
                <span className="absolute bottom-6 left-6 text-xl opacity-60">🍃</span>
              </div>
            )}

            <motion.img
              key={currentPhoto.id}
              src={currentPhoto.image}
              alt={currentPhoto.caption}
              className={`max-h-[65vh] w-auto max-w-full rounded-xl object-contain transition-transform duration-500 shadow-2xl ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.25 : 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Prev / Next Floating Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all z-20"
              aria-label="Previous photo"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all z-20"
              aria-label="Next photo"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Caption & Secondary Text */}
          <div className="w-full text-center mt-3 space-y-1">
            <h4 className="font-handwritten text-2xl sm:text-3xl text-purple-100 font-bold">
              &ldquo;{currentPhoto.caption}&rdquo;
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/70 font-light flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentPhoto.secondaryText}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
