import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1000); // Show "Hello"
    const timer2 = setTimeout(() => setPhase(2), 2000); // Show "World"
    const timer3 = setTimeout(() => setPhase(3), 3500); // Glitch/Finish
    const timer4 = setTimeout(onComplete, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full animate-float"></div>
      </div>

      <div className="relative text-center">
        <AnimatePresence mode="wait">
          {phase < 3 && (
            <motion.div 
              key="content"
              className="flex flex-col items-center gap-6"
            >
              <div className="flex gap-4 items-baseline overflow-hidden py-10">
                <AnimatePresence>
                  {phase >= 1 && (
                    <motion.h1
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase italic"
                    >
                      HELLO
                    </motion.h1>
                  )}
                  {phase >= 2 && (
                    <motion.h1
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="text-7xl md:text-9xl font-black tracking-tighter text-primary uppercase italic"
                    >
                      WORLD.
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                <p className="text-[10px] uppercase tracking-[0.6em] font-mono text-white/40">
                  LoopDev Ecosystem Initialized
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Access Granted Flash */}
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <h2 className="text-2xl font-black tracking-[0.5em] text-white italic">ACCESSING PORTAL</h2>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="h-1 w-1 bg-primary rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Finishing Flash */}
      {phase === 3 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          className="absolute inset-0 bg-white z-[101]"
        />
      )}
    </motion.div>
  );
};

export default IntroScreen;
