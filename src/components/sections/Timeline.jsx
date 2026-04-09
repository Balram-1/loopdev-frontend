import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timelineData = [
  { year: '2022', title: 'HTML & CSS', desc: 'Where it all started — fell in love with seeing code turn into visual things.' },
  { year: '2023', title: 'Python', desc: 'First real programming language. Scripts, automation, and a lot of Stack Overflow.' },
  { year: '2024', title: 'C & Go', desc: 'Went low-level: pointers, memory, concurrency. Understood why things crash.' },
  { year: '2025', title: 'C++ & Java', desc: 'OOP, data structures, and backend architecture. Started thinking in systems.' },
  { year: '2026', title: 'JavaScript & React', desc: 'Full-stack: Node, Express, MongoDB, Socket.io. Building real products now.' },
];

const Timeline = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? timelineData : timelineData.slice(0, 3);

  return (
    <section id="timeline" className="section-padding max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4">Timeline</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16">
          How I got here<span className="text-indigo-400">.</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/40 via-indigo-500/20 to-transparent"></div>

        <div className="space-y-0">
          <AnimatePresence>
            {visible.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-14 pb-12 last:pb-0 group"
              >
                {/* Node */}
                <div className="absolute left-3 top-1 flex items-center justify-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-indigo-500/60 ring-4 ring-indigo-500/10 group-hover:bg-indigo-400 group-hover:ring-indigo-400/20 transition-all duration-300"></div>
                </div>

                {/* Year */}
                <span className="text-xs font-mono text-white/25 mb-2 block">{item.year}</span>

                {/* Card */}
                <div className="glass-card p-5 inline-block max-w-md">
                  <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand button */}
        {timelineData.length > 3 && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => setExpanded(!expanded)}
            className="mt-10 ml-14 text-xs font-medium text-white/30 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
          >
            <span>{expanded ? 'Show less' : `Show ${timelineData.length - 3} more`}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default Timeline;
