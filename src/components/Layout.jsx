import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';

import ClickSpark from './ClickSpark';

const Layout = ({ children }) => {
  const glowRef = useRef(null);
  const sparkColor = '#6366f1'; // Indigo-500

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ClickSpark sparkColor={sparkColor} sparkSize={12} sparkRadius={20} sparkCount={10} duration={500}>
      <div className="min-h-screen relative overflow-hidden">
        {/* ── Animated mesh gradient background ── */}
        <div className="mesh-gradient">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
        </div>

        {/* ── Dot grid ── */}
        <div className="dot-grid"></div>

        {/* ── Cursor glow ── */}
        <div ref={glowRef} className="cursor-glow hidden md:block"></div>

        {/* ── Content ── */}
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </ClickSpark>
  );
};

export default Layout;
