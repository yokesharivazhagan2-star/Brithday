import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, QrCode } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { QRModal } from '../ui/QRModal';

interface SecretEntryProps {
  name: string;
  relationship: string;
  onOpen: () => void;
}

export const SecretEntry: React.FC<SecretEntryProps> = ({ name, onOpen }) => {
  const [showQR, setShowQR] = useState(false);

  const handleStart = () => {
    soundEffects.playMagicGlissando();
    onOpen();
  };

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-md w-full mx-auto flex flex-col items-center">
        {/* Top Label */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-wide mb-8 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Private Sibling Birthday Surprise</span>
        </motion.div>

        {/* Gift Box Icon with Floating Glow */}
        <motion.div
          className="relative mb-8 cursor-pointer group"
          onClick={handleStart}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-amber-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
          
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl glass-panel-luxury flex items-center justify-center border-2 border-purple-400/40 shadow-2xl group-hover:border-purple-300/80 transition-all duration-300">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Gift className="w-14 h-14 text-purple-300 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]" />
            </motion.div>

            {/* Glowing Butterfly Badge */}
            <div className="absolute -top-2 -right-2 text-xl filter drop-shadow-md">
              🦋
            </div>
          </div>
        </motion.div>

        {/* Message Intro */}
        <motion.p
          className="font-serif text-lg md:text-xl text-purple-200/90 italic mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A little surprise for someone very special…
        </motion.p>

        <motion.div
          className="space-y-1 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
            MY BIG SISTER
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 tracking-tight drop-shadow-lg">
            {name}
          </h1>
          <p className="text-xs text-purple-200/60 font-mono tracking-widest uppercase mt-2">
            Ready? ✨
          </p>
        </motion.div>

        {/* Interactive CTA Button */}
        <motion.button
          onClick={handleStart}
          className="relative group w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white font-medium text-base tracking-wider uppercase shadow-[0_0_30px_rgba(192,132,252,0.4)] hover:shadow-[0_0_45px_rgba(192,132,252,0.7)] transition-all duration-300 active:scale-98 overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>OPEN YOUR BIRTHDAY SURPRISE</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </span>
        </motion.button>

        {/* QR Code Action */}
        <motion.button
          onClick={() => setShowQR(true)}
          className="inline-flex items-center gap-2 text-xs text-purple-200/60 hover:text-purple-200 transition-colors py-2 px-3 rounded-full hover:bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Open on smartphone via QR</span>
        </motion.button>
      </div>

      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} name={name} />
    </SceneWrapper>
  );
};
