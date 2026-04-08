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
    <div className="pb-20">
      <Hero />
      
      <div className="mt-20 px-6">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
          <span className="text-primary font-mono text-sm uppercase tracking-widest bg-primary/10 px-3 py-1 rounded border border-primary/20">01</span>
          Core Technical Stack
        </h2>
        
        <div className="flex flex-wrap gap-4 mb-32">
          {data.skills.map((skill, index) => (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={skill} 
              className="px-6 py-2 glass hover:border-primary/50 transition-colors text-sm font-medium"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
          <span className="text-primary font-mono text-sm uppercase tracking-widest bg-primary/10 px-3 py-1 rounded border border-primary/20">02</span>
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              key={project.id}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
