import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import About from '../components/sections/About';
import Timeline from '../components/sections/Timeline';
import Contact from '../components/sections/Contact';

const Portfolio = () => {
  const [data, setData] = useState({ skills: [], projects: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/portfolio');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <About />

      {/* Projects */}
      <section id="projects" className="section-padding max-w-6xl mx-auto scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Things I've built<span className="text-indigo-400">.</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project, i) => (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <div id="timeline" className="scroll-mt-24">
        <Timeline />
      </div>
      <div id="contact" className="scroll-mt-24">
        <Contact />
      </div>
    </>
  );
};

export default Portfolio;
