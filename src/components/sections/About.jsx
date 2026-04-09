import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const About = () => {
  // 3D tilt on profile card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 20 });
  const my = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mx, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  return (
    <section id="about" className="section-padding max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
        
        {/* Text — takes 3 cols */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4">About</p>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug mb-8">
            I like building software that's <br className="hidden md:block"/>
            <span className="gradient-text">both useful and beautiful.</span>
          </h2>

          <div className="space-y-5 text-white/45 text-[15px] leading-relaxed">
            <p>
              I'm <strong className="text-white/80 font-medium">Balram</strong> — a student developer with a deep curiosity for how systems work under the hood. 
              I started with HTML in 2022, got hooked, and haven't stopped building since.
            </p>
            <p>
              My work sits at the intersection of <strong className="text-white/80 font-medium">full-stack development</strong> and 
              <strong className="text-white/80 font-medium"> cybersecurity research</strong>. I enjoy creating polished frontends 
              just as much as I enjoy finding vulnerabilities in them.
            </p>
            <p>
              Currently working with React, Node.js, Express, MongoDB, and Python. 
              When I'm not coding, I'm probably doing CTFs or exploring steganography techniques.
            </p>
          </div>
 
          {/* Skill chips */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['React', 'Node.js', 'Python', 'C/C++', 'MongoDB', 'Express', 'Socket.io', 'Git'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-white/50 transition-colors duration-300 hover:text-indigo-300 hover:bg-indigo-500/10 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Profile card — takes 2 cols */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2 flex justify-center lg:justify-end"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            className="glass-card p-8 w-full max-w-[300px] text-center group cursor-default"
          >
            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-5 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', transform: 'translateZ(30px)' }}
            >
              <span className="text-3xl font-bold text-white" style={{ transform: 'translateZ(10px)' }}>B</span>
            </div>

            <h4 className="text-lg font-semibold text-white mb-1" style={{ transform: 'translateZ(20px)' }}>Balram</h4>
            <p className="text-xs text-white/30 font-mono mb-6" style={{ transform: 'translateZ(15px)' }}>@Balram-1</p>

            <div className="space-y-3" style={{ transform: 'translateZ(10px)' }}>
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Focus</span>
                <span className="text-white/60">Security & Full-Stack</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Stack</span>
                <span className="text-white/60">MERN + Python</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30">Status</span>
                <span className="text-emerald-400/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Learning
                </span>
              </div>
            </div>

            {/* Subtle glow on hover */}
            <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'radial-gradient(400px at 50% 50%, rgba(99,102,241,0.1), transparent 70%)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
