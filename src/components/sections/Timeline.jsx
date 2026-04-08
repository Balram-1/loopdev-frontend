import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    date: 'SEPT 2022',
    title: 'HTML & CSS',
    desc: 'I wanted to design websites, so HTML was the next language to go to.',
    status: 'ROOT'
  },
  {
    date: 'APR 2023',
    title: 'PYTHON',
    desc: "Just to figure out this whole coding thing, I started with the language Google told me was the easiest to learn.",
    status: 'SCRIPT'
  },
  {
    date: 'AUG 2024',
    title: 'C LANGUAGE',
    desc: 'Deep diving into memory management and systems logic.',
    status: 'KERNEL'
  },
  {
    date: 'DEC 2024',
    title: 'GO LANGUAGE',
    desc: "Started learning Go language, didn't liked it much, but valued the concurrency concepts.",
    status: 'ABORT'
  },
  {
    date: 'JAN 2025',
    title: 'C++',
    desc: 'Transitioning system knowledge into high-performance OOP.',
    status: 'HARDENED'
  },
  {
    date: 'SEP 2025',
    title: 'JAVA',
    desc: 'Enterprise-grade architecture and robust backend design.',
    status: 'COMPILED'
  },
  {
    date: 'FEB 2026',
    title: 'JAVASCRIPT',
    desc: 'The final link to orchestrating full-stack ecosystem interactions.',
    status: 'UPLINK'
  }
];

const TimelineItem = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between mb-24 last:mb-0 w-full`}>
      {/* Connector Node */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-sm bg-bg-main border-2 border-primary z-10 rotate-45 shadow-neon"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`w-[45%] ${isEven ? 'text-right' : 'text-left ml-auto'}`}
      >
        <div className="space-y-3">
          <span className="font-mono text-[10px] text-primary font-black tracking-[0.3em] uppercase">
            {data.date} // {data.status}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
            {data.title}
          </h3>
          <p className="text-text-secondary font-mono text-xs leading-relaxed max-w-sm ml-auto mr-0">
            {data.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 md:py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-4">
            Transmission Path
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            ALWAYS KEEP <span className="text-primary italic">LEARNING.</span>
          </h3>
          <p className="mt-6 text-text-secondary font-medium max-w-2xl mx-auto">
            One of the things I love most about programming is that there's always something new to learn. 
            Here's a selection of some of the things I've been learning lately.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-primary via-primary/50 to-primary/10"
            />
          </div>

          <div className="relative pt-10">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
