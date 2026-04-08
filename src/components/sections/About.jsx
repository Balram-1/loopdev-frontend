import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const About = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-primary"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-primary font-bold">Identity // 01</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-none">
            DEFENSIVE <br />
            <span className="text-primary italic">ORCHESTRATOR.</span>
          </h2>
          
          <div className="space-y-6 text-text-secondary text-lg leading-relaxed max-w-xl">
            <p>
              Hi, my name is <span className="text-white font-bold">Balram</span>. I’m a cybersecurity researcher and full-stack developer obsessed with hardened architectures and minimalist design.
            </p>
            <p>
              I specialize in building digital fortresses—applications that aren't just functional, but inherently secure from the first line of code. My work sits at the intersection of offensive logic and defensive engineering.
            </p>
          </div>

          <div className="mt-12 flex gap-8 font-mono text-[10px] uppercase tracking-widest text-text-muted">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold">Location</span>
              <span className="text-white">Remote // Neutral Zone</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold">Specialization</span>
              <span className="text-white">Full-Stack Security</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full max-w-[450px] aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10"
          >
            {/* Placeholder Image Styling */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5"></div>
            
            {/* Corner Light Accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/40 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center">
                  <div className="text-white/10 font-black text-9xl tracking-tighter select-none">B</div>
                  <p className="font-mono text-[8px] tracking-[0.5em] text-white/20 uppercase -mt-4">Static_Asset_v01</p>
               </div>
            </div>

            {/* Glass Overlay on Hover */}
            <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
                <span className="font-mono text-[10px] text-primary">ENCRYPTED_ID</span>
                <h4 className="text-white font-black text-xl">BALRAM_PORTAL</h4>
            </div>
          </motion.div>

          {/* Underglow */}
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[40px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
