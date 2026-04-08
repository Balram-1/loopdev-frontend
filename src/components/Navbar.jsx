import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, MessageSquare, Briefcase, TrendingUp, Terminal, Menu, X, Globe, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/#about', sectionId: 'about', icon: <Globe size={16} /> },
    { name: 'Timeline', path: '/#timeline', sectionId: 'timeline', icon: <TrendingUp size={16} /> },
    { name: 'Projects', path: '/#projects', sectionId: 'projects', icon: <Briefcase size={16} /> },
    { name: 'Secure Chat', path: '/chat', icon: <MessageSquare size={16} /> },
    { name: 'Contact', path: '/#contact', sectionId: 'contact', icon: <Mail size={16} /> },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (link.sectionId && location.pathname === '/') {
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] px-4 md:px-10 transition-all duration-500 ${isScrolled ? 'pt-4' : 'pt-8'}`}>
      <div className={`max-w-7xl mx-auto glass flex justify-between items-center px-6 md:px-10 py-4 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/[0.08] transition-all ${isScrolled ? 'bg-black/80' : 'bg-transparent border-transparent shadow-none'}`}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="relative">
            <Shield className="text-primary group-hover:rotate-12 transition-transform duration-300" size={28} />
            <div className="absolute inset-0 bg-primary blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">LoopDev</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => handleNavClick(link)}
              className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:text-white relative group ${
                location.pathname === link.path ? 'text-primary' : 'text-zinc-500'
              }`}
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">{link.icon}</span>
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 h-[2px] w-full bg-primary shadow-[0_0_10px_#00f2ff]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Status / Mobile Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-6 mr-2">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest">Sector 7 Online</span>
            </div>
            <span className="text-[8px] font-mono text-zinc-600 uppercase mt-0.5">V-3.1.0</span>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl glass hover:border-primary/40 transition-all text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden absolute top-24 left-4 right-4 glass p-8 backdrop-blur-3xl border-white/10 shadow-2xl origin-top"
          >
            <div className="grid grid-cols-1 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    location.pathname === link.path 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-zinc-100 border border-transparent hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span className="text-sm font-black uppercase tracking-widest">{link.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-4">
               <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                  <Globe size={14} />
                  <span>TRANSMISSION: DECRYPTED</span>
               </div>
               <div className="text-[9px] font-mono text-zinc-700 bg-white/5 p-4 rounded-lg break-all">
                  MD5: 7b56c4599c9c8286fe21df12e0fce5e6
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
