import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [data, setData] = useState({ skills: [], projects: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/portfolio');
        setData(res.data);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-32">
      <Hero />
      
      <div className="mt-40 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-4">
              Step 01 // Stack
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              Technical <span className="text-primary italic">Arsenal</span>
            </h3>
          </div>
          <p className="max-w-md text-zinc-500 font-medium text-sm">
            Hardened skills in security research, full-stack orchestration, and defensive architecture.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-48">
          {data.skills.map((skill, index) => (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              key={skill} 
              className="px-8 py-3 glass hover:border-primary/50 transition-all duration-300 text-xs font-black uppercase tracking-widest hover:scale-105 hover:bg-primary/5 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-4">
              Step 02 // Projects
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              Featured <span className="text-primary italic">Incursions</span>
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 glass animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                key={project.id}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
