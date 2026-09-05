import confetti from 'canvas-confetti';

export const triggerHeartConfetti = () => {
  const count = 35;
  const defaults = {
    origin: { y: 0.7 },
    shapes: ['circle' as confetti.Shape],
    colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#fbbf24', '#ffffff'],
    scalar: 1.2,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.3
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerMassiveCelebration = () => {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#fbbf24', '#38bdf8']
    });

    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#fbbf24', '#38bdf8']
    });
  }, 250);
};

export const triggerStarBurst = (x: number = 0.5, y: number = 0.5) => {
  confetti({
    particleCount: 40,
    spread: 80,
    origin: { x, y },
    colors: ['#fbbf24', '#fef08a', '#ffffff', '#f472b6'],
    ticks: 60,
    gravity: 0.8,
    scalar: 1.1
  });
};
