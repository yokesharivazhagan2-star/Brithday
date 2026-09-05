import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { birthdayData } from './data/birthday';
import { BackgroundAtmosphere, SceneState } from './components/ui/BackgroundAtmosphere';
import { AmbientStars } from './components/particles/AmbientStars';
import { FloatingHearts } from './components/particles/FloatingHearts';
import { FloatingButterflies } from './components/particles/FloatingButterflies';
import { MusicController } from './components/ui/MusicController';
import { SubtleProgress } from './components/ui/SubtleProgress';

// Scenes
import { LoadingScene } from './components/scenes/LoadingScene';
import { SecretEntry } from './components/scenes/SecretEntry';
import { HeartInteraction } from './components/scenes/HeartInteraction';
import { BalloonHeart3D } from './components/scenes/BalloonHeart3D';
import { CinematicMessage } from './components/scenes/CinematicMessage';
import { BigSisterChecklist } from './components/scenes/BigSisterChecklist';
import { CakeScene } from './components/scenes/CakeScene';
import { ReasonsScene } from './components/scenes/ReasonsScene';
import { MemoryLane } from './components/scenes/MemoryLane';
import { CharacterScene } from './components/scenes/CharacterScene';
import { BouquetScene } from './components/scenes/BouquetScene';
import { SecretMessagesScene } from './components/scenes/SecretMessagesScene';
import { EnvelopeScene } from './components/scenes/EnvelopeScene';
import { LetterScene } from './components/scenes/LetterScene';
import { ThingsIDontSayEnough } from './components/scenes/ThingsIDontSayEnough';
import { FinalStarlightScene } from './components/scenes/FinalStarlightScene';
import { FinalCelebrationScene } from './components/scenes/FinalCelebrationScene';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneState>('LOADING');
  const [experienceKey, setExperienceKey] = useState<number>(0);

  const handleReplay = () => {
    setExperienceKey((prev) => prev + 1);
    setCurrentScene('ENTRY');
  };

  return (
    <main
      key={experienceKey}
      className="relative min-h-screen w-full bg-[#0d0417] text-white flex flex-col justify-between overflow-x-hidden font-sans"
    >
      {/* Dynamic Backgrounds & Particle Layers */}
      <BackgroundAtmosphere currentScene={currentScene} />
      <AmbientStars scene={currentScene} />
      <FloatingHearts count={currentScene === 'FINAL' ? 24 : 10} />
      <FloatingButterflies count={currentScene === 'FINAL' ? 12 : 7} />

      {/* Music & Sound Effects Controller */}
      <MusicController />

      {/* Main Scene Controller */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {currentScene === 'LOADING' && (
            <LoadingScene
              key="loading"
              onComplete={() => setCurrentScene('ENTRY')}
            />
          )}

          {currentScene === 'ENTRY' && (
            <SecretEntry
              key="entry"
              name={birthdayData.name}
              relationship={birthdayData.relationship}
              onOpen={() => setCurrentScene('HEART')}
            />
          )}

          {currentScene === 'HEART' && (
            <HeartInteraction
              key="heart"
              onUnlock={() => setCurrentScene('BALLOON_HEART')}
            />
          )}

          {currentScene === 'BALLOON_HEART' && (
            <BalloonHeart3D
              key="balloon_heart"
              name={birthdayData.name}
              onNext={() => setCurrentScene('INTRO')}
            />
          )}

          {currentScene === 'INTRO' && (
            <CinematicMessage
              key="intro"
              name={birthdayData.name}
              onNext={() => setCurrentScene('CHECKLIST')}
            />
          )}

          {currentScene === 'CHECKLIST' && (
            <BigSisterChecklist
              key="checklist"
              checklist={birthdayData.checklist}
              conclusion={birthdayData.checklistConclusion}
              onNext={() => setCurrentScene('CAKE')}
            />
          )}

          {currentScene === 'CAKE' && (
            <CakeScene
              key="cake"
              name={birthdayData.name}
              onNext={() => setCurrentScene('REASONS')}
            />
          )}

          {currentScene === 'REASONS' && (
            <ReasonsScene
              key="reasons"
              reasons={birthdayData.reasons}
              onNext={() => setCurrentScene('MEMORIES')}
            />
          )}

          {currentScene === 'MEMORIES' && (
            <MemoryLane
              key="memories"
              memories={birthdayData.memories}
              onNext={() => setCurrentScene('CHARACTER')}
            />
          )}

          {currentScene === 'CHARACTER' && (
            <CharacterScene
              key="character"
              name={birthdayData.name}
              onNext={() => setCurrentScene('BOUQUET')}
            />
          )}

          {currentScene === 'BOUQUET' && (
            <BouquetScene
              key="bouquet"
              bouquetMessages={birthdayData.bouquetMessages}
              onNext={() => setCurrentScene('SECRET_MESSAGES')}
            />
          )}

          {currentScene === 'SECRET_MESSAGES' && (
            <SecretMessagesScene
              key="secret_messages"
              secretMessages={birthdayData.secretMessages}
              onNext={() => setCurrentScene('ENVELOPE')}
            />
          )}

          {currentScene === 'ENVELOPE' && (
            <EnvelopeScene
              key="envelope"
              name={birthdayData.name}
              onOpenLetter={() => setCurrentScene('LETTER')}
            />
          )}

          {currentScene === 'LETTER' && (
            <LetterScene
              key="letter"
              letterData={birthdayData.letter}
              name={birthdayData.name}
              onNext={() => setCurrentScene('THINGS_I_DONT_SAY')}
            />
          )}

          {currentScene === 'THINGS_I_DONT_SAY' && (
            <ThingsIDontSayEnough
              key="things_i_dont_say"
              items={birthdayData.thingsIDontSayEnough}
              onNext={() => setCurrentScene('STARLIGHT')}
            />
          )}

          {currentScene === 'STARLIGHT' && (
            <FinalStarlightScene
              key="starlight"
              name={birthdayData.name}
              onNext={() => setCurrentScene('FINAL')}
            />
          )}

          {currentScene === 'FINAL' && (
            <FinalCelebrationScene
              key="final"
              name={birthdayData.name}
              onReplay={handleReplay}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Minimalist Scene Progress */}
      <SubtleProgress
        currentScene={currentScene}
        onJumpScene={(scene) => setCurrentScene(scene)}
      />
    </main>
  );
};

export default App;
