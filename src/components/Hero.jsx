import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-40 px-6 flex flex-col items-center text-center mt-10">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] bg-secondary/5 blur-[120px] rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10"
      >
        <span className="text-[11px] font-mono font-bold tracking-[0.4em] text-primary uppercase mb-8 inline-flex items-center gap-3 border border-primary/30 bg-primary/5 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(0,242,255,0.1)]">
          <Zap size={14} className="animate-pulse" />
          Neural Link Established
        </span>
        
        <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
          LoopDev <span className="gradient-text">Hub</span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed font-medium">
          The unified ecosystem for <span className="text-white border-b-2 border-primary/50 font-bold px-1">Cybersecurity Experts</span>. 
          Real-time secure communication, automated intelligence gathering, and wealth orchestration.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button className="px-10 py-4 rounded-xl bg-primary text-black font-black hover:bg-white hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(0,242,255,0.4)] flex items-center gap-3 group">
            <ShieldCheck size={22} className="group-hover:rotate-12 transition-transform" />
            INITIATE SECURE CHAT
          </button>
          
          <button className="px-10 py-4 rounded-xl glass hover:bg-white/10 font-bold flex items-center gap-3 group border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.03] active:scale-95">
            <Terminal size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
            ACCESS OSINT TOOLS
          </button>
        </div>
      </motion.div>

      {/* Hero Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-32 w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-12 glass p-10 relative"
      >
        <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="flex flex-col items-center">
          <span className="text-4xl font-black gradient-text">4+</span>
          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2">Active Nodes</span>
        </div>
        <div className="flex flex-col items-center border-l border-white/5">
          <span className="text-4xl font-black gradient-text">ECC-384</span>
          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2">Encryption Std</span>
        </div>
        <div className="flex flex-col items-center border-l border-white/5">
          <span className="text-4xl font-black gradient-text">99.9%</span>
          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2">Uptime Reliability</span>
        </div>
        <div className="flex flex-col items-center border-l border-white/5">
          <span className="text-4xl font-black gradient-text">∞</span>
          <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2">Data Intelligence</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
