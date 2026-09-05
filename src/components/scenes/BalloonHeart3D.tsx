import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SceneWrapper } from '../transitions/SceneWrapper';
import { soundEffects } from '../../utils/audioSynthesizer';
import { triggerHeartConfetti } from '../../utils/confetti';

interface BalloonHeart3DProps {
  name: string;
  onNext: () => void;
}

export const BalloonHeart3D: React.FC<BalloonHeart3DProps> = ({ name, onNext }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    soundEffects.playCelebrationTrumpet();
    triggerHeartConfetti();
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let balloonGroup: THREE.Group;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 22;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
      dirLight.position.set(10, 15, 15);
      scene.add(dirLight);

      const purpleLight = new THREE.PointLight(0xc084fc, 5, 50);
      purpleLight.position.set(-8, 5, 8);
      scene.add(purpleLight);

      const goldLight = new THREE.PointLight(0xfbbf24, 4, 50);
      goldLight.position.set(8, -5, 8);
      scene.add(goldLight);

      balloonGroup = new THREE.Group();
      scene.add(balloonGroup);

      // Sibling aesthetic balloon colors: lavender, peach, cream, rose, gold
      const balloonColors = [
        0xc084fc, // Lavender
        0xfbcfe8, // Peach / blush
        0xfef08a, // Soft cream
        0xf472b6, // Rose accent
        0xfbbf24, // Gold accent
        0x38bdf8, // Butterfly sky blue
      ];

      const sphereGeo = new THREE.SphereGeometry(1, 24, 24);
      const totalPoints = 65;

      for (let i = 0; i < totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = (Math.random() - 0.5) * 4;

        const scale = (Math.random() * 0.45 + 0.65) * 0.55;
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];

        const mat = new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.15,
          metalness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          reflectivity: 0.9,
        });

        const balloon = new THREE.Mesh(sphereGeo, mat);
        balloon.position.set(x * 0.45, y * 0.45, z);
        balloon.scale.set(scale, scale * 1.15, scale);
        balloon.rotation.z = (Math.random() - 0.5) * 0.3;

        balloonGroup.add(balloon);
      }

      // Central core
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0xc084fc,
        roughness: 0.1,
        clearcoat: 1.0,
        reflectivity: 1.0,
      });
      const core = new THREE.Mesh(new THREE.SphereGeometry(2.4, 32, 32), coreMat);
      core.position.set(0, 0, -0.5);
      core.scale.set(1.4, 1.3, 1.1);
      balloonGroup.add(core);

      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      window.addEventListener('mousemove', handleMouseMove);

      let clock = 0;
      const animate = () => {
        clock += 0.015;
        if (balloonGroup) {
          balloonGroup.position.y = Math.sin(clock * 1.5) * 0.4;
          balloonGroup.rotation.y = THREE.MathUtils.lerp(balloonGroup.rotation.y, mouseX * 0.4 + Math.sin(clock * 0.5) * 0.1, 0.05);
          balloonGroup.rotation.x = THREE.MathUtils.lerp(balloonGroup.rotation.x, -mouseY * 0.4 + Math.cos(clock * 0.5) * 0.1, 0.05);
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!container || !camera || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  return (
    <SceneWrapper className="text-center">
      <div className="flex flex-col items-center justify-center max-w-xl w-full mx-auto relative">
        <div className="relative w-full h-72 md:h-80 flex items-center justify-center">
          {webGlSupported ? (
            <div ref={mountRef} className="w-full h-full cursor-pointer" />
          ) : (
            <div className="relative w-44 h-44 animate-float-medium flex items-center justify-center text-6xl">
              🦋
            </div>
          )}
        </div>

        <motion.div
          className="mt-2 space-y-2"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs font-semibold tracking-widest uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>To The Best Big Sister</span>
          </motion.div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-amber-200 drop-shadow-lg">
            HAPPY BIRTHDAY
          </h1>

          <motion.h2
            className="font-serif text-3xl md:text-5xl text-purple-300 font-bold"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
          >
            {name}
          </motion.h2>

          <p className="text-xs sm:text-sm text-purple-200/80 font-mono tracking-wider pt-1">
            To the best big sister in the universe. ✨
          </p>
        </motion.div>

        <motion.button
          onClick={() => {
            soundEffects.playMagicGlissando();
            onNext();
          }}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>See The Story Unfold</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </SceneWrapper>
  );
};
