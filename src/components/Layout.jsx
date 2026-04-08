import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-main text-text-main flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6">
        {children}
      </main>
      <footer className="py-12 px-6 border-t border-white/5 opacity-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest">
        <span>&copy; 2024 LoopDev Hub // Balrampreet Singh</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Status</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
