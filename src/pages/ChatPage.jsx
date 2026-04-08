import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthView from '../components/chat/AuthView';
import { Terminal, Lock, LogOut, Shield } from 'lucide-react';

const ChatPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ld_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ld_token');
    localStorage.removeItem('ld_user');
    setUser(null);
  };

  return (
    <div className="min-h-[80vh] relative flex items-center justify-center overflow-hidden py-20">
      {/* Cyber Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full"></div>
      </div>

      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full flex justify-center px-4"
          >
            <AuthView onAuthSuccess={(u) => setUser(u)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl glass-card p-12 min-h-[600px] flex flex-col gap-8 relative overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Shield className="text-primary" size={24} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-bg-main animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">SECURE <span className="text-primary uppercase tracking-widest">{user.username}</span></h2>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mt-1">Status: Encrypted Tunnel Established</p>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-lg glass hover:bg-red-500/10 hover:border-red-500/20 text-xs font-bold transition-all text-zinc-400 hover:text-red-400"
              >
                <LogOut size={16} />
                TERMINATE SESSION
              </button>
            </div>

            {/* Placeholder Chat Content */}
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-30 select-none pointer-events-none">
              <Terminal size={64} className="mb-6 text-primary animate-pulse" />
              <h3 className="text-3xl font-black tracking-tight mb-2 uppercase italic">Awaiting Peers</h3>
              <p className="text-sm font-mono tracking-widest uppercase">Waiting for secure connection signals...</p>
            </div>

            {/* Footer / System Message */}
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <span className="text-[10px] font-mono font-bold text-primary flex items-center gap-2">
                <Lock size={12} />
                SYSTEM: AES-256-GCM READY. STARTING P2P HANDSHAKE.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
