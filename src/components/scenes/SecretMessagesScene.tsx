import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, Unlock } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { triggerStarBurst } from '../../utils/confetti';
import { BirthdayConfig, SecretMessageItem } from '../../data/birthday';

interface SecretMessagesSceneProps {
  secretMessages: BirthdayConfig['secretMessages'];
  onNext: () => void;
}

export const SecretMessagesScene: React.FC<SecretMessagesSceneProps> = ({
  secretMessages,
  onNext,
}) => {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  const toggleUnlock = (msg: SecretMessageItem, e: React.MouseEvent) => {
    const isUnlocked = unlockedIds.includes(msg.id);
    if (!isUnlocked) {
      soundEffects.playMagicGlissando();
      triggerStarBurst(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
      setUnlockedIds((prev) => [...prev, msg.id]);
    } else {
      soundEffects.playPop();
    }
  };

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-xl w-full mx-auto flex flex-col items-center">
        {/* Top Header Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 text-xs font-semibold tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Classified Sibling Archive</span>
        </motion.div>

        <motion.h2
          className="font-serif text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-purple-100 to-pink-200 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Secret Sibling Notes 🤫
        </motion.h2>

        <motion.p
          className="text-xs text-purple-200/70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Tap the secret tiles to unseal private confessions ({unlockedIds.length} of {secretMessages.length} discovered)
        </motion.p>

        {/* Message Tiles Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
          {secretMessages.map((item, index) => {
            const isUnlocked = unlockedIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                onClick={(e) => toggleUnlock(item, e)}
                className={`p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 border relative overflow-hidden ${
                  isUnlocked
                    ? 'glass-panel-luxury border-purple-400/40 bg-purple-900/30 shadow-xl'
                    : 'bg-white/5 hover:bg-white/10 border-white/15'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{item.emoji}</span>
                  {isUnlocked ? (
                    <Unlock className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Lock className="w-4 h-4 text-purple-300/50" />
                  )}
                </div>

                <div className="text-xs font-semibold text-purple-200/60 uppercase font-mono mb-1">
                  {item.teaser}
                </div>

                {isUnlocked ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-handwritten text-xl text-white font-bold leading-snug"
                  >
                    &ldquo;{item.message}&rdquo;
                  </motion.p>
                ) : (
                  <p className="text-xs text-zinc-400 italic">
                    Tap to unlock this hidden note…
                  </p>
                )}
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
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Open Akka&apos;s Letter ✉️</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </SceneWrapper>
  );
};
