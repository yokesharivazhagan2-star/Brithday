import React, { useEffect, useRef } from 'react';

interface AmbientStarsProps {
  scene?: string;
  speedMultiplier?: number;
}

export const AmbientStars: React.FC<AmbientStarsProps> = ({ speedMultiplier = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars & stardust
    const starCount = Math.min(100, Math.floor((width * height) / 10000));
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      speed: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const colors = ['#ffffff', '#ffd1dc', '#fae8ff', '#fef08a', '#f43f5e'];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = Math.random() * 0.7 + 0.2;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.6,
        alpha: baseAlpha,
        baseAlpha,
        speed: (Math.random() * 0.25 + 0.05) * speedMultiplier,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        const twinkle = Math.sin(time * star.twinkleSpeed * 50) * 0.3;
        const currentAlpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = star.size * 3;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
