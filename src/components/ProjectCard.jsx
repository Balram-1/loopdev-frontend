import React from 'react';
import { ExternalLink, Code, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 flex flex-col gap-4 h-full relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Terminal size={14} className="text-primary/50" />
      </div>
      
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
        <div className="flex gap-2 text-text-muted">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Code size={18} />
          </a>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <p className="text-sm text-text-muted flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.stack.map(tech => (
          <span key={tech} className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/5 font-mono text-primary/80">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
