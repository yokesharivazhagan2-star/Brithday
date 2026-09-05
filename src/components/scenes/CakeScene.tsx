import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Mic, Flame } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { triggerMassiveCelebration } from '../../utils/confetti';

interface CakeSceneProps {
  name: string;
  onNext: () => void;
}

export const CakeScene: React.FC<CakeSceneProps> = ({ name, onNext }) => {
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [micListening, setMicListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const extinguishCandle = () => {
    if (isExtinguished) return;
    setIsExtinguished(true);
    setMicListening(false);
    soundEffects.playCandleExtinguish();
    triggerMassiveCelebration();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const startMicBlowDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setMicListening(true);

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkBlow = () => {
        if (isExtinguished) return;
        analyser.getByteFrequencyData(dataArray);
        
        let sum = 0;
        for (let i = 0; i < 20; i++) {
          sum += dataArray[i];
        }
        const avg = sum / 20;

        if (avg > 75) {
          extinguishCandle();
        } else {
          requestAnimationFrame(checkBlow);
        }
      };

      checkBlow();
    } catch {
      setMicListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <SceneWrapper className="text-center">
      <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center relative">
        <motion.div
          className="space-y-2 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Birthday Tradition</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-purple-100">
            {isExtinguished ? 'Wish Granted ✨' : `Make a wish, ${name} 🎂`}
          </h2>

          <p className="text-xs text-purple-200/70">
            {isExtinguished
              ? 'Your secret birthday wish is ascending to the stars!'
              : 'Tap the candle flame to blow it out'}
          </p>
        </motion.div>

        {/* 🎂 Birthday Cake Vector Component */}
        <div className="relative my-4 flex flex-col items-center">
          <div
            className="relative flex flex-col items-center cursor-pointer group"
            onClick={extinguishCandle}
          >
            <div className="relative h-14 w-8 flex items-center justify-center">
              <AnimatePresence>
                {!isExtinguished ? (
                  <motion.div
                    key="flame"
                    className="candle-flame absolute"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div className="w-5 h-8 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 blur-[1px] shadow-[0_0_20px_rgba(251,191,36,0.9)]" />
                    <div className="absolute top-1 left-1.5 w-2 h-4 rounded-full bg-white opacity-80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0.8, 0], y: -45, x: [0, 8, -5, 12] }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className="absolute text-zinc-400"
                  >
                    <div className="w-2 h-2 rounded-full bg-zinc-300 blur-sm" />
                    <div className="w-3 h-3 rounded-full bg-zinc-400 blur-md mt-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-1 h-2 bg-zinc-700 -mt-1" />
            <div className="w-4 h-12 rounded-t-sm bg-gradient-to-b from-purple-200 via-pink-300 to-purple-400 shadow-md border border-purple-200/50 flex flex-col justify-between py-1">
              <div className="w-full h-0.5 bg-purple-500/40" />
              <div className="w-full h-0.5 bg-purple-500/40" />
              <div className="w-full h-0.5 bg-purple-500/40" />
            </div>
          </div>

          {/* Top Layer */}
          <div className="relative w-40 h-16 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 shadow-xl border border-white/20 -mt-2 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 flex justify-around">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-3 bg-white/90 rounded-b-full shadow-sm"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <span className="text-xs">🦋</span>
              <span className="text-xs">✨</span>
              <span className="text-xs">🍓</span>
            </div>
          </div>

          {/* Bottom Layer */}
          <div className="relative w-56 h-20 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-900 to-purple-950 shadow-2xl border border-purple-400/30 -mt-2 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 flex justify-around">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-3.5 bg-purple-200/90 rounded-b-full shadow-sm"
                />
              ))}
            </div>
            <div className="text-[11px] font-serif tracking-widest text-purple-200/90 uppercase font-semibold">
              Kanii🦋 Celebration
            </div>
          </div>

          <div className="w-64 h-3 rounded-full bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-xl -mt-1 border border-amber-200" />
        </div>

        {!isExtinguished && (
          <div className="mt-4 flex flex-col items-center gap-2">
            {!micListening ? (
              <button
                onClick={startMicBlowDetection}
                className="inline-flex items-center gap-1.5 text-xs text-purple-300/70 hover:text-purple-200 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all"
              >
                <Mic className="w-3 h-3 text-purple-400" />
                <span>Or blow into microphone</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full animate-pulse border border-amber-500/30">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Microphone active: Blow softly now!</span>
              </div>
            )}
          </div>
        )}

        {isExtinguished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6"
          >
            <button
              onClick={() => {
                soundEffects.playMagicGlissando();
                onNext();
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Why You&apos;re The Best Big Sister</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </SceneWrapper>
  );
};
