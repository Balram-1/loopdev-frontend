import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lines = [
  { text: '> root@loopdev:~$ initializing system...', delay: 0 },
  { text: '> modules: react, framer-motion, canvas-api', delay: 400 },
  { text: '> connectivity: secure_tunnel_established', delay: 800 },
  { text: '> access: granted', delay: 1200 },
  { text: '', delay: 1500 },
];

const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('drawing'); 
  const canvasRef = useRef(null);

  // Starfield logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random(),
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Start drawing immediately
  useEffect(() => {
    // Phase is already 'drawing' now
  }, []);

  // Complete after drawing
  useEffect(() => {
    if (phase === 'drawing') {
      const exitTimer = setTimeout(onComplete, 3500);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#050508]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />

      <AnimatePresence mode="wait">
        {phase === 'drawing' && (
          <motion.div
            key="drawing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 flex flex-col items-center"
          >
             <svg width="400" height="150" viewBox="0 0 400 150" className="drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
              <defs>
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                initial={{ pathLength: 0, fill: "rgba(34,211,238,0)", opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  fill: "rgba(34,211,238,0.15)",
                  opacity: 1,
                  transition: { 
                    pathLength: { duration: 2.5, ease: "easeInOut" },
                    fill: { delay: 1.8, duration: 1.2 },
                    opacity: { duration: 0.1 }
                  }
                }}
                className="text-7xl font-black lowercase tracking-tighter stroke-cyan-400 stroke-[1.2px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                hello world!
              </motion.text>
              <motion.path
                d="M 100 110 Q 200 125 300 110"
                fill="none"
                stroke="url(#neonGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-8 text-cyan-400/40 text-[10px] font-mono uppercase tracking-[0.5em]"
            >
              initializing
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IntroScreen;
