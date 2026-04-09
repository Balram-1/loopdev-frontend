import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Timeline', href: '/#timeline' },
  { name: 'Chat', href: '/chat' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (link) => {
    setMobileOpen(false);
    if (link.href.startsWith('/#') && location.pathname === '/') {
      const id = link.href.replace('/#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'glass shadow-2xl shadow-black/20'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              B
            </div>
            <span className="text-white font-semibold text-sm tracking-tight hidden sm:block">
              balram<span className="text-indigo-400">.dev</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleClick(link)}
                className="px-4 py-2 text-[13px] font-medium text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Status + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[11px] font-medium text-emerald-400/80">Available for work</span>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }} className="w-5 h-[1.5px] bg-white/60 block rounded-full" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-5 h-[1.5px] bg-white/60 block rounded-full" />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }} className="w-5 h-[1.5px] bg-white/60 block rounded-full" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              className="md:hidden mt-2 glass rounded-2xl p-4 shadow-2xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleClick(link)}
                  className="block px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
