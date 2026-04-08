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
    <nav className="glass sticky top-0 z-50 w-full px-6 py-4 flex justify-between items-center backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2 group">
        <Shield className="text-primary group-hover:rotate-12 transition-transform" size={28} />
        <span className="text-xl font-bold tracking-tighter gradient-text">LoopDev.xyz</span>
      </Link>

      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === link.path ? 'text-primary' : 'text-text-muted'
            }`}
          >
            {link.icon}
            {link.name}
            {location.pathname === link.path && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-[-18px] h-0.5 w-full bg-primary"
              />
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="System Online"></div>
        <span className="text-xs font-mono text-text-muted uppercase tracking-widest hidden sm:inline">
          Server: Active
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
