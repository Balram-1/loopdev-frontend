import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-32 px-6 flex flex-col items-center text-center">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-primary opacity-5 blur-[120px] rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <span className="text-sm font-mono tracking-widest text-primary uppercase mb-4 inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1 rounded-full">
          <Zap size={14} className="animate-pulse" />
          Securing the Future
        </span>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          LoopDev <span className="gradient-text">Hub</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-text-muted mb-10 leading-relaxed font-light">
          Developer ecosystem & Cybersecurity hub built by <span className="text-primary font-medium">Balrampreet Singh</span>. 
          Real-time secure chat, OSINT tools, and unified asset tracking.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="px-8 py-3 rounded-full bg-primary text-bg-main font-bold hover:bg-white hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group">
            <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
            Launch Secured Chat
          </button>
          
          <button className="px-8 py-3 rounded-full glass hover:bg-white/5 font-semibold flex items-center gap-2 group border-white/10 hover:border-white/30">
            <Terminal size={18} className="group-hover:translate-x-1 transition-transform" />
            Explore OSINT Tools
          </button>
        </div>
      </motion.div>

      {/* Hero Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-24 w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-8 glass p-8"
      >
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold gradient-text">4+</span>
          <span className="text-xs text-text-muted uppercase tracking-wider font-mono">Projects Live</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold gradient-text">256-AES</span>
          <span className="text-xs text-text-muted uppercase tracking-wider font-mono">Chat Encryption</span>
        </div>
        <div className="flex flex-col items-center border-l border-white/10">
          <span className="text-3xl font-bold gradient-text">99.9%</span>
          <span className="text-xs text-text-muted uppercase tracking-wider font-mono">System Uptime</span>
        </div>
        <div className="flex flex-col items-center border-l border-white/10">
          <span className="text-3xl font-bold gradient-text">∞</span>
          <span className="text-xs text-text-muted uppercase tracking-wider font-mono">Cyber Vigilance</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
