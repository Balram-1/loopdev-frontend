import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ShieldCheck, ArrowRight, Loader2, Info, Mail, RefreshCw } from 'lucide-react';
import axios from 'axios';

const AuthView = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Real-time validation states
  const isUsernameValid = formData.username.length >= 3;
  const isEmailValid = isLogin || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
  const isPasswordValid = formData.password.length >= 6;
  
  const isFormValid = isUsernameValid && isPasswordValid && (isLogin || isEmailValid);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
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
            <h2 className="text-4xl font-black tracking-tighter text-white">
              {isLogin ? 'SECURE' : 'JOIN'} <span className="text-primary italic">{isLogin ? 'LOGIN' : 'HUB'}</span>
            </h2>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mt-2">
              Level: {isLogin ? 'Classified' : 'Unauthorized'}
            </p>
          </div>
          <ShieldCheck className="text-primary/40 animate-pulse" size={32} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.username && !isUsernameValid ? 'text-red-400' : 'text-white/30 group-focus-within:text-primary'}`} size={18} />
              <input
                type="text"
                placeholder="USERNAME"
                required
                className={`w-full bg-white/[0.03] border rounded-xl py-4 pl-12 pr-4 text-sm font-mono tracking-widest outline-none transition-all text-white ${
                  formData.username && !isUsernameValid ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 focus:border-primary/50 focus:bg-primary/5'
                }`}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              {formData.username && !isUsernameValid && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-red-400 font-bold uppercase tracking-tighter">Min 3</span>
              )}
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="relative group overflow-hidden"
                >
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.email && !isEmailValid ? 'text-red-400' : 'text-white/30 group-focus-within:text-primary'}`} size={18} />
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    required={!isLogin}
                    className={`w-full bg-white/[0.03] border rounded-xl py-4 pl-12 pr-4 text-sm font-mono tracking-widest outline-none transition-all text-white ${
                      formData.email && !isEmailValid ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 focus:border-primary/50 focus:bg-primary/5'
                    }`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.password && !isPasswordValid ? 'text-red-400' : 'text-white/30 group-focus-within:text-primary'}`} size={18} />
              <input
                type="password"
                placeholder="PASSWORD"
                required
                className={`w-full bg-white/[0.03] border rounded-xl py-4 pl-12 pr-4 text-sm font-mono tracking-widest outline-none transition-all text-white ${
                  formData.password && !isPasswordValid ? 'border-red-400/50 bg-red-400/5' : 'border-white/10 focus:border-primary/50 focus:bg-primary/5'
                }`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {formData.password && !isPasswordValid && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-red-400 font-bold uppercase tracking-tighter">Min 6</span>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl text-[10px] font-bold border border-red-400/20"
              >
                <Info size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || (!isFormValid)}
            className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-neon disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <span className="relative z-10">{isLogin ? 'GRANT ACCESS' : 'ESTABLISH LINK'}</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={handleToggle}
            className="text-[10px] font-mono font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-[0.2em]"
          >
            {isLogin ? 'Request New Identity' : 'Return to Login Portal'}
          </button>
        </div>
      </motion.div>

      {/* Dynamic Background Hints */}
      <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-secondary/10 blur-3xl rounded-full"></div>
    </div>
  );
};

export default AuthView;
