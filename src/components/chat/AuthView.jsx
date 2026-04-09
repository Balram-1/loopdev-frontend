import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AuthView = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Determine API Base URL: Use env var, current origin (if on same domain), or fallback to localhost
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { username: form.username, password: form.password }
        : form;

      console.log(`📡 Attempting auth at: ${API_BASE_URL}${endpoint}`);
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
      
      localStorage.setItem('ld_token', res.data.token);
      localStorage.setItem('ld_user', JSON.stringify(res.data));
      onAuthSuccess(res.data);
    } catch (err) {
      console.error('❌ AUTH ERROR:', err);
      if (!err.response) {
        setError('Connection failed. Please ensure the backend is running and reachable.');
      } else {
        setError(err.response.data?.message || 'Authentication failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => { setIsLogin(!isLogin); setError(''); };

  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div layout className="glass-card p-8">
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-1">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-xs text-white/30">
            {isLogin ? 'Sign in to join the chat' : 'Set up your chat identity'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:ring-1 focus:ring-indigo-500/50"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          />

          <AnimatePresence>
            {!isLogin && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <input
                  type="email"
                  placeholder="Email"
                  required={!isLogin}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:ring-1 focus:ring-indigo-500/50"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:ring-1 focus:ring-indigo-500/50"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          />

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 px-1">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6">
          <button onClick={toggleMode} className="text-xs text-white/25 hover:text-indigo-400 transition-colors">
            {isLogin ? "Don't have an account? Sign up" : 'Already have one? Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthView;
