import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse-reactive tilt on the hero card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-xs font-medium text-indigo-300/80 tracking-wide">Student Developer & Security Researcher</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">Balram</span>
          <span className="text-white/20">.</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-12 leading-relaxed font-light"
        >
          I build things for the web and break them to understand how they work.
          Full-stack dev with a passion for cybersecurity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}
          >
            <span className="flex items-center gap-2">
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Get in touch
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1.5px solid rgba(255,255,255,0.15)' }}
        >
          <motion.div className="w-1 h-2 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
