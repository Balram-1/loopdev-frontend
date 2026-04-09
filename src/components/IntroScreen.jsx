import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const lines = [
  { text: '> initializing portfolio...', delay: 0 },
  { text: '> loading modules: react, node, express', delay: 600 },
  { text: '> establishing connection...', delay: 1200 },
  { text: '> status: online', delay: 1800 },
  { text: '', delay: 2400 },
];

const IntroScreen = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedText, setTypedText] = useState('');
  const helloWorld = 'Hello, World.';

  // Show terminal lines one by one
  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // After terminal lines, type "Hello, World."
  useEffect(() => {
    const startTyping = setTimeout(() => {
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        setTypedText(helloWorld.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex >= helloWorld.length) {
          clearInterval(typeInterval);
          // Wait a beat, then exit
          setTimeout(onComplete, 800);
        }
      }, 80);
      return () => clearInterval(typeInterval);
    }, 2800);
    return () => clearTimeout(startTyping);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: '#0a0a0f' }}
    >
      <div className="max-w-lg w-full px-6">
        {/* Terminal window */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,15,25,0.8)' }}>
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            <span className="ml-3 text-[11px] text-white/20 font-mono">balram@portfolio ~ </span>
          </div>

          {/* Terminal content */}
          <div className="p-5 font-mono text-sm leading-7 min-h-[220px]">
            {lines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={i === 3 ? 'text-emerald-400' : 'text-white/40'}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Hello World typing */}
            {visibleLines >= lines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-2xl font-bold text-white flex items-baseline"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="inline-block w-[3px] h-6 ml-0.5 bg-indigo-400"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroScreen;
