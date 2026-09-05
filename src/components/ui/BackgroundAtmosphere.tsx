import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type SceneState =
  | 'LOADING'
  | 'ENTRY'
  | 'HEART'
  | 'BALLOON_HEART'
  | 'INTRO'
  | 'CHECKLIST'
  | 'CAKE'
  | 'REASONS'
  | 'MEMORIES'
  | 'CHARACTER'
  | 'BOUQUET'
  | 'SECRET_MESSAGES'
  | 'ENVELOPE'
  | 'LETTER'
  | 'THINGS_I_DONT_SAY'
  | 'STARLIGHT'
  | 'FINAL';

interface BackgroundAtmosphereProps {
  currentScene: SceneState;
}

const sceneGradients: Record<SceneState, { bg: string; glow: string; secondaryGlow: string }> = {
  LOADING: {
    bg: 'radial-gradient(ellipse at center, #1b092b 0%, #0d0417 100%)',
    glow: 'rgba(192, 132, 252, 0.2)',
    secondaryGlow: 'rgba(244, 114, 182, 0.15)'
  },
  ENTRY: {
    bg: 'radial-gradient(ellipse at top, #240b3b 0%, #120320 60%, #08010f 100%)',
    glow: 'rgba(192, 132, 252, 0.25)',
    secondaryGlow: 'rgba(249, 168, 212, 0.18)'
  },
  HEART: {
    bg: 'radial-gradient(circle at 50% 40%, #351042 0%, #1a0624 55%, #0d0214 100%)',
    glow: 'rgba(244, 114, 182, 0.3)',
    secondaryGlow: 'rgba(192, 132, 252, 0.25)'
  },
  BALLOON_HEART: {
    bg: 'radial-gradient(circle at 50% 45%, #3d144e 0%, #1c0525 60%, #09010e 100%)',
    glow: 'rgba(192, 132, 252, 0.35)',
    secondaryGlow: 'rgba(251, 191, 36, 0.25)'
  },
  INTRO: {
    bg: 'radial-gradient(circle at 50% 50%, #300f3d 0%, #15031d 70%, #09010e 100%)',
    glow: 'rgba(192, 132, 252, 0.28)',
    secondaryGlow: 'rgba(251, 191, 36, 0.2)'
  },
  CHECKLIST: {
    bg: 'radial-gradient(ellipse at top right, #2d103b 0%, #16061f 60%, #0a020f 100%)',
    glow: 'rgba(244, 114, 182, 0.22)',
    secondaryGlow: 'rgba(56, 189, 248, 0.2)'
  },
  CAKE: {
    bg: 'radial-gradient(circle at 50% 60%, #2f1730 0%, #18091a 60%, #0b030c 100%)',
    glow: 'rgba(251, 191, 36, 0.3)',
    secondaryGlow: 'rgba(244, 114, 182, 0.25)'
  },
  REASONS: {
    bg: 'radial-gradient(ellipse at center, #2c0f3b 0%, #14041d 60%, #09010e 100%)',
    glow: 'rgba(192, 132, 252, 0.28)',
    secondaryGlow: 'rgba(251, 191, 36, 0.22)'
  },
  MEMORIES: {
    bg: 'radial-gradient(circle at center, #271a25 0%, #160c15 60%, #0b050a 100%)',
    glow: 'rgba(254, 215, 170, 0.22)',
    secondaryGlow: 'rgba(192, 132, 252, 0.18)'
  },
  CHARACTER: {
    bg: 'radial-gradient(circle at 50% 40%, #2e1240 0%, #170622 60%, #0c0211 100%)',
    glow: 'rgba(244, 114, 182, 0.3)',
    secondaryGlow: 'rgba(192, 132, 252, 0.3)'
  },
  BOUQUET: {
    bg: 'radial-gradient(circle at center, #2b1138 0%, #15061c 60%, #0b0210 100%)',
    glow: 'rgba(244, 114, 182, 0.28)',
    secondaryGlow: 'rgba(192, 132, 252, 0.25)'
  },
  SECRET_MESSAGES: {
    bg: 'radial-gradient(ellipse at top left, #29103c 0%, #13041f 65%, #09010f 100%)',
    glow: 'rgba(56, 189, 248, 0.25)',
    secondaryGlow: 'rgba(244, 114, 182, 0.25)'
  },
  ENVELOPE: {
    bg: 'radial-gradient(circle at 50% 50%, #281525 0%, #140813 70%, #0b030b 100%)',
    glow: 'rgba(253, 164, 175, 0.22)',
    secondaryGlow: 'rgba(251, 191, 36, 0.18)'
  },
  LETTER: {
    bg: 'radial-gradient(circle at center, #231b20 0%, #140d12 60%, #0b0609 100%)',
    glow: 'rgba(254, 243, 199, 0.2)',
    secondaryGlow: 'rgba(192, 132, 252, 0.15)'
  },
  THINGS_I_DONT_SAY: {
    bg: 'radial-gradient(ellipse at center, #26113b 0%, #120320 60%, #08010f 100%)',
    glow: 'rgba(251, 191, 36, 0.25)',
    secondaryGlow: 'rgba(192, 132, 252, 0.25)'
  },
  STARLIGHT: {
    bg: 'radial-gradient(ellipse at bottom, #2b0d47 0%, #120322 55%, #06010d 100%)',
    glow: 'rgba(168, 85, 247, 0.35)',
    secondaryGlow: 'rgba(244, 114, 182, 0.3)'
  },
  FINAL: {
    bg: 'radial-gradient(circle at 50% 40%, #3e104e 0%, #1c0424 55%, #09010d 100%)',
    glow: 'rgba(192, 132, 252, 0.45)',
    secondaryGlow: 'rgba(251, 191, 36, 0.4)'
  }
};

export const BackgroundAtmosphere: React.FC<BackgroundAtmosphereProps> = ({ currentScene }) => {
  const currentTheme = sceneGradients[currentScene] || sceneGradients.LOADING;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentScene}
          className="absolute inset-0 w-full h-full"
          style={{ background: currentTheme.bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <motion.div
        className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[110px] pointer-events-none"
        style={{ background: currentTheme.glow }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[130px] pointer-events-none"
        style={{ background: currentTheme.secondaryGlow }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};
