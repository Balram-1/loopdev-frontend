import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ShieldCheck, ArrowRight, Loader2, Info } from 'lucide-react';
import axios from 'axios';

const AuthView = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      // Store token
      localStorage.setItem('ld_token', response.data.token);
      localStorage.setItem('ld_user', JSON.stringify(response.data));
      
      onAuthSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      {/* Glow Effects */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl opacity-50"></div>
      
      <motion.div 
        layout
        className="glass-card p-10 relative overflow-hidden bg-black/80 border-white/10"
      >
        {/* Scanline Effect */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-primary/20 animate-pulse pointer-events-none"></div>

        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter">
              {isLogin ? 'SECURE' : 'JOIN'} <span className="gradient-text">{isLogin ? 'LOGIN' : 'HUB'}</span>
            </h2>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">
              Level: Unauthorized
            </p>
          </div>
          <ShieldCheck className="text-primary/40" size={32} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="USERNAME"
                required
                className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm font-mono tracking-widest outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="password"
                placeholder="PASSWORD"
                required
                className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm font-mono tracking-widest outline-none focus:border-primary/50 focus:bg-primary/5 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl text-xs font-bold border border-red-400/20"
              >
                <Info size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-neon disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                {isLogin ? 'AUTHENTICATE' : 'ESTABLISH LINK'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={handleToggle}
            className="text-[10px] font-mono font-bold text-zinc-500 hover:text-primary transition-colors uppercase tracking-[0.2em]"
          >
            {isLogin ? 'Need an identity? Register here' : 'Already registered? Login portal'}
          </button>
        </div>
      </motion.div>

      {/* Dynamic Background Hints */}
      <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-secondary/10 blur-3xl rounded-full"></div>
    </div>
  );
};

export default AuthView;
