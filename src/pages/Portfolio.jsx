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
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-bg-main relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[#050505]"></div>
        <div className="absolute top-20 left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-[-5%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Hero />
      
      {/* About Section */}
      <About />

      {/* Skills / Tech Arsenal */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-4">
              Step 02 // Stack
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              TECHNICAL <span className="text-primary italic">ARSENAL.</span>
            </h3>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 md:gap-4">
          {data.skills.map((skill, index) => (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              key={skill} 
              className="px-6 md:px-8 py-3 glass hover:border-primary/50 transition-all duration-300 text-[10px] md:text-xs font-black uppercase tracking-widest hover:scale-105 hover:bg-primary/5 cursor-default text-white"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <Timeline />

      {/* Projects Section */}
      <div id="projects" className="py-24 md:py-48 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-4">
              Step 04 // Deployments
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              FEATURED <span className="text-primary italic">INCURSIONS.</span>
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                key={project.id || index}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Portfolio;
