import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, Heart } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { triggerStarBurst, triggerHeartConfetti } from '../../utils/confetti';
import { BirthdayConfig, BouquetMessage } from '../../data/birthday';

interface BouquetSceneProps {
  bouquetMessages: BirthdayConfig['bouquetMessages'];
  onNext: () => void;
}

export const BouquetScene: React.FC<BouquetSceneProps> = ({ bouquetMessages, onNext }) => {
  const [selectedMessage, setSelectedMessage] = useState<BouquetMessage | null>(null);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const handleSelectMessage = (msg: BouquetMessage) => {
    setSelectedMessage(msg);
    if (!openedIds.includes(msg.id)) {
      setOpenedIds((prev) => [...prev, msg.id]);
    }

    if (msg.isSecret) {
      soundEffects.playCelebrationTrumpet();
      triggerHeartConfetti();
    } else {
      soundEffects.playMagicGlissando();
      triggerStarBurst(0.5, 0.5);
    }
  };

  // Harmonious, collision-free layout positions for all 5 capsules
  const pillPositions = [
    { left: '10%', top: '22%', mobileClass: 'order-2' },  // Top-Left: Looking Out
    { left: '90%', top: '22%', mobileClass: 'order-3' },  // Top-Right: Believing In Me
    { left: '12%', top: '76%', mobileClass: 'order-4' },  // Bottom-Left: The Little Things
    { left: '88%', top: '76%', mobileClass: 'order-5' },  // Bottom-Right: Always There
    { left: '50%', top: '6%', mobileClass: 'order-1' },   // Top-Center: Lucky Sibling (Secret)
  ];

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-2xl w-full mx-auto flex flex-col items-center relative px-2">
        {/* Top Header */}
        <motion.div
          className="space-y-2 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Gratitude In Bloom</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200">
            A BOUQUET OF THANKS 💐
          </h2>
          <p className="text-xs text-purple-200/70">
            Tap the floating blossoms to unlock secret messages of thanks ({openedIds.length} of {bouquetMessages.length})
          </p>
        </motion.div>

        {/* Desktop / Tablet Orbital Stage */}
        <div className="relative w-full h-[430px] sm:h-[460px] hidden sm:flex items-center justify-center my-2">
          {/* Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

          {/* 💐 Elegant Handcrafted Vector Bouquet */}
          <motion.div
            className="relative z-10 w-64 h-80 flex flex-col items-center justify-center pointer-events-none select-none"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1.5, -1.5, 0],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              viewBox="0 0 240 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Back foliage / Eucalyptus branches */}
              <path d="M70 120 C50 80, 60 50, 80 40 C85 60, 80 90, 85 120 Z" fill="#2d6a4f" opacity="0.8" />
              <path d="M170 120 C190 80, 180 50, 160 40 C155 60, 160 90, 155 120 Z" fill="#2d6a4f" opacity="0.8" />
              <path d="M120 110 C120 60, 110 40, 120 30 C130 40, 120 60, 120 110 Z" fill="#40916c" opacity="0.9" />

              {/* Foliage leaves */}
              <circle cx="85" cy="80" r="14" fill="#52b788" opacity="0.7" />
              <circle cx="155" cy="80" r="14" fill="#52b788" opacity="0.7" />
              <circle cx="120" cy="65" r="16" fill="#74c69d" opacity="0.8" />

              {/* Flower Stems */}
              <path d="M90 140 L120 220" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
              <path d="M150 140 L120 220" stroke="#2d6a4f" strokeWidth="4" strokeLinecap="round" />
              <path d="M120 130 L120 220" stroke="#40916c" strokeWidth="4" strokeLinecap="round" />

              {/* Blooming Flowers */}
              {/* Left Peach Rose */}
              <g transform="translate(60, 85)">
                <circle cx="20" cy="20" r="22" fill="#fda4af" />
                <circle cx="20" cy="20" r="16" fill="#f43f5e" opacity="0.9" />
                <path d="M12 20 Q20 12 28 20 Q20 28 12 20 Z" fill="#fff1f2" opacity="0.7" />
                <circle cx="20" cy="20" r="6" fill="#ffe4e6" />
              </g>

              {/* Right Lavender Peony */}
              <g transform="translate(140, 85)">
                <circle cx="20" cy="20" r="22" fill="#d8b4fe" />
                <circle cx="20" cy="20" r="16" fill="#a855f7" opacity="0.9" />
                <path d="M12 20 Q20 12 28 20 Q20 28 12 20 Z" fill="#faf5ff" opacity="0.7" />
                <circle cx="20" cy="20" r="6" fill="#f3e8ff" />
              </g>

              {/* Top Golden Daisy */}
              <g transform="translate(100, 50)">
                <circle cx="20" cy="20" r="20" fill="#fde047" />
                <circle cx="20" cy="20" r="14" fill="#eab308" />
                <circle cx="20" cy="20" r="7" fill="#713f12" />
              </g>

              {/* Center Large Pink Blossom */}
              <g transform="translate(95, 90)">
                <circle cx="25" cy="25" r="28" fill="#f472b6" />
                <circle cx="25" cy="25" r="20" fill="#db2777" />
                <circle cx="25" cy="25" r="12" fill="#fda4af" />
                <circle cx="25" cy="25" r="6" fill="#ffffff" />
              </g>

              {/* Delicate Buttercups & Baby's Breath */}
              <circle cx="65" cy="65" r="5" fill="#ffffff" />
              <circle cx="175" cy="65" r="5" fill="#ffffff" />
              <circle cx="120" cy="45" r="4" fill="#ffffff" />
              <circle cx="75" cy="130" r="5" fill="#ffffff" />
              <circle cx="165" cy="130" r="5" fill="#ffffff" />

              {/* Wrapping Paper Cone (Dusty Rose & Warm Parchment) */}
              <path
                d="M50 140 L120 270 L190 140 Q120 160 50 140 Z"
                fill="url(#wrapGradient)"
                stroke="#fbcfe8"
                strokeWidth="1.5"
              />

              {/* Wrapping paper folded collar */}
              <path d="M50 140 Q120 155 120 180 Q120 155 190 140 Q120 130 50 140 Z" fill="#f5d0fe" opacity="0.6" />

              {/* Satin Ribbon Bow */}
              <g transform="translate(100, 195)">
                {/* Left bow loop */}
                <ellipse cx="8" cy="10" rx="14" ry="8" transform="rotate(-25 8 10)" fill="#ec4899" />
                <ellipse cx="8" cy="10" rx="8" ry="4" transform="rotate(-25 8 10)" fill="#be185d" />
                {/* Right bow loop */}
                <ellipse cx="32" cy="10" rx="14" ry="8" transform="rotate(25 32 10)" fill="#ec4899" />
                <ellipse cx="32" cy="10" rx="8" ry="4" transform="rotate(25 32 10)" fill="#be185d" />
                {/* Center knot */}
                <circle cx="20" cy="10" r="6" fill="#fda4af" stroke="#be185d" strokeWidth="1" />
                {/* Ribbon tails */}
                <path d="M16 14 Q10 32 6 45" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
                <path d="M24 14 Q30 32 34 45" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="wrapGradient" x1="50" y1="140" x2="190" y2="270" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fdf2f8" />
                  <stop offset="0.5" stopColor="#fce7f3" />
                  <stop offset="1" stopColor="#e9d5ff" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Floating Interactive Message Pills with Zero Collisions */}
          {bouquetMessages.map((msg, index) => {
            const isRead = openedIds.includes(msg.id);
            const pos = pillPositions[index] || { left: `${msg.x}%`, top: `${msg.y}%` };

            return (
              <motion.button
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                style={{
                  position: 'absolute',
                  left: pos.left,
                  top: pos.top,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`z-20 group flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md shadow-2xl transition-all duration-300 ${
                  msg.isSecret
                    ? 'bg-sky-500/20 border-2 border-sky-300/80 shadow-[0_0_20px_rgba(56,189,248,0.5)] animate-pulse text-sky-100'
                    : isRead
                    ? 'bg-purple-950/80 border border-purple-400/40 text-purple-200'
                    : 'bg-white/15 hover:bg-white/25 border border-white/30 text-white'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: 1,
                  y: [0, index % 2 === 0 ? -5 : 5, 0],
                }}
                transition={{
                  scale: { duration: 3, repeat: Infinity, delay: index * 0.4 },
                  y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Open ${msg.title}`}
              >
                <span className="text-base">{msg.flower}</span>
                <span className="text-xs sm:text-sm font-serif font-medium whitespace-nowrap">
                  {msg.title}
                </span>
                {msg.isSecret && <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-spin" />}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile-Optimized Responsive Stack (Prevents Any Collisions on Small Screens) */}
        <div className="w-full flex flex-col items-center gap-3 sm:hidden my-4">
          {/* Centered Bouquet Graphic on Mobile */}
          <motion.div
            className="w-48 h-56 flex items-center justify-center my-1 select-none pointer-events-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-7xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              💐
            </span>
          </motion.div>

          {/* List of Message Capsules */}
          <div className="w-full grid grid-cols-1 gap-2.5 px-4 max-w-xs">
            {bouquetMessages.map((msg) => {
              const isRead = openedIds.includes(msg.id);

              return (
                <button
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl backdrop-blur-md shadow-lg transition-all ${
                    msg.isSecret
                      ? 'bg-sky-500/25 border-2 border-sky-300/80 text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                      : isRead
                      ? 'bg-purple-950/70 border border-purple-400/30 text-purple-200'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{msg.flower}</span>
                    <span className="text-xs font-serif font-semibold">{msg.title}</span>
                  </div>
                  {msg.isSecret ? (
                    <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-spin" />
                  ) : (
                    <span className="text-[10px] text-purple-300/60 font-mono">
                      {isRead ? 'Read ✓' : 'Tap to read'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Detail Popup Modal */}
        <AnimatePresence>
          {selectedMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMessage(null)}
              />

              <motion.div
                className="relative z-10 w-full max-w-sm glass-panel-luxury p-6 sm:p-7 rounded-3xl text-center border-2 border-purple-400/40 shadow-2xl"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
              >
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
                  aria-label="Close message"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-5xl mb-3">{selectedMessage.flower}</div>
                <h3 className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 mb-2">
                  {selectedMessage.title}
                </h3>
                <p className="text-base text-purple-100/90 leading-relaxed font-light mb-6">
                  &ldquo;{selectedMessage.message}&rdquo;
                </p>

                <button
                  onClick={() => {
                    setSelectedMessage(null);
                    soundEffects.playPop();
                  }}
                  className="w-full py-3 rounded-xl bg-purple-500/25 hover:bg-purple-500/35 border border-purple-400/30 text-purple-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-purple-400 fill-current" />
                  <span>Keep In Heart</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.button
          onClick={() => {
            soundEffects.playMagicGlissando();
            onNext();
          }}
          className="mt-4 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Secret Sibling Messages 🤫</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </SceneWrapper>
  );
};
