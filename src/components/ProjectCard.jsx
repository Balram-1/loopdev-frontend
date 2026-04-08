import React from 'react';
import { ExternalLink, Code, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card p-8 flex flex-col gap-6 h-full relative overflow-hidden group border-white/5"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        <Terminal size={16} className="text-primary/40" />
      </div>
      
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-black group-hover:text-primary transition-colors duration-300 tracking-tight">{project.title}</h3>
        <div className="flex gap-4 text-zinc-500">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300 hover:scale-110">
            <Code size={20} />
          </a>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300 hover:scale-110">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <p className="text-zinc-400 font-medium leading-relaxed flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-3 mt-4">
        {project.stack.map(tech => (
          <span key={tech} className="text-[9px] uppercase font-black tracking-[0.15em] px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
