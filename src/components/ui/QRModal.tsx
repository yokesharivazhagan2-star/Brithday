import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, Sparkles, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../../utils/audioSynthesizer';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, name }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    soundEffects.playPop();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-sm glass-panel-luxury p-6 rounded-3xl text-center border border-purple-400/40"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex p-3 rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-300 mb-4">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 mb-1">
              {name}&apos;s Surprise
            </h3>
            <p className="text-xs text-purple-200/70 mb-5">
              Scan with any smartphone camera to open this surprise on mobile
            </p>

            <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl mb-5">
              <QRCodeSVG
                value={currentUrl}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white shadow-lg shadow-purple-500/25 hover:opacity-95 active:scale-98 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Surprise link copied ✓' : 'COPY GIFT LINK'}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 mt-2">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Made for Kanii🦋</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
