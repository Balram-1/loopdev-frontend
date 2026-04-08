import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, MessageSquare, Briefcase, TrendingUp, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Portfolio', path: '/', icon: <Briefcase size={20} /> },
    { name: 'Secure Chat', path: '/chat', icon: <MessageSquare size={20} /> },
    { name: 'Networth', path: '/networth', icon: <TrendingUp size={20} /> },
    { name: 'OSINT Tools', path: '/tools', icon: <Terminal size={20} /> },
  ];

  return (
    <nav className="glass sticky top-0 z-50 w-full px-8 py-5 flex justify-between items-center backdrop-blur-xl transition-all duration-300">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <Shield className="text-primary group-hover:rotate-12 transition-transform duration-300" size={32} />
          <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </div>
        <span className="text-2xl font-black tracking-tighter gradient-text">LoopDev.xyz</span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-300 hover:text-primary relative group ${
              location.pathname === link.path ? 'text-primary' : 'text-zinc-400'
            }`}
          >
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">{link.icon}</span>
            {link.name}
            {location.pathname === link.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-2 h-0.5 w-full bg-primary shadow-[0_0_8px_rgba(0,242,255,0.6)]"
              />
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-[0.2em]">
              Mainnet Active
            </span>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
            V-3.1.0-SECURE
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
