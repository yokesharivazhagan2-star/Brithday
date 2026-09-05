import React from 'react';
import { SceneState } from './BackgroundAtmosphere';

interface SubtleProgressProps {
  currentScene: SceneState;
  onJumpScene?: (scene: SceneState) => void;
}

const sceneOrder: SceneState[] = [
  'ENTRY',
  'HEART',
  'BALLOON_HEART',
  'INTRO',
  'CHECKLIST',
  'CAKE',
  'REASONS',
  'MEMORIES',
  'CHARACTER',
  'BOUQUET',
  'SECRET_MESSAGES',
  'ENVELOPE',
  'LETTER',
  'THINGS_I_DONT_SAY',
  'STARLIGHT',
  'FINAL'
];

export const SubtleProgress: React.FC<SubtleProgressProps> = ({ currentScene, onJumpScene }) => {
  // Hide on loading and on the final grand celebration screen
  if (currentScene === 'LOADING' || currentScene === 'FINAL') return null;

  const currentIndex = sceneOrder.indexOf(currentScene);
  const total = sceneOrder.length;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
      {sceneOrder.map((scene, idx) => {
        const isActive = idx === currentIndex;
        const isPassed = idx < currentIndex;

        return (
          <button
            key={scene}
            onClick={() => onJumpScene && onJumpScene(scene)}
            className={`rounded-full transition-all duration-500 focus:outline-none ${
              isActive
                ? 'w-5 h-1.5 bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 shadow-[0_0_8px_rgba(192,132,252,0.8)]'
                : isPassed
                ? 'w-1.5 h-1.5 bg-purple-400/50 hover:bg-purple-300'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Jump to scene ${idx + 1}`}
          />
        );
      })}
      <span className="text-[10px] text-purple-200/60 font-mono ml-1.5 tracking-tighter">
        {Math.max(1, currentIndex + 1)}/{total}
      </span>
    </div>
  );
};
