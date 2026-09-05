import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEffects } from '../../utils/audioSynthesizer';
import { motion, AnimatePresence } from 'framer-motion';

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const togglePlayback = () => {
    const nextState = soundEffects.toggleMusic();
    setIsPlaying(nextState);
    if (nextState) {
      soundEffects.playMagicGlissando();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEffects.setMuted(nextMute);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-rose-200/90 shadow-lg"
          >
            {isPlaying ? 'Melody Playing ✨' : 'Play Background Melody 🎵'}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-xl hover:border-pink-500/40 transition-all duration-300"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          onClick={togglePlayback}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-200 border border-pink-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
          }`}
          aria-label={isPlaying ? 'Pause Background Melody' : 'Play Background Melody'}
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          <span className="hidden xs:inline">{isPlaying ? 'Music ON' : 'Play Music'}</span>
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full text-zinc-400 hover:text-pink-300 hover:bg-white/10 transition-colors"
            aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-pink-400" />}
          </button>
        )}
      </div>
    </div>
  );
};
