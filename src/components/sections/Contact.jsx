import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const links = [
    { label: 'GitHub', href: 'https://github.com/Balram-1', icon: 'gh' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/balrampreet/', icon: 'li' },
    { label: 'Email', href: 'mailto:balrampreet0@gmail.com', icon: 'em' },
  ];

  return (
    <section id="contact" className="section-padding max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4">Contact</p>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Let's connect<span className="text-indigo-400">.</span>
        </h2>

        <p className="text-white/35 max-w-md mx-auto text-base leading-relaxed mb-12">
          Got a project idea, a question, or just want to say hi? I'm always open to talking about code, security, or anything tech.
        </p>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-card px-8 py-4 flex items-center gap-4 group w-full sm:w-auto justify-center"
            >
              <span className="text-sm font-medium text-white/50 group-hover:text-indigo-300 transition-colors">
                {link.label}
              </span>
              <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-indigo-400 transition-colors group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Direct CTA */}
        <motion.a
          href="mailto:balrampreet0@gmail.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 40px rgba(99,102,241,0.15)' }}
        >
          Say Hello
          <span className="text-white/60">→</span>
        </motion.a>
      </motion.div>

      {/* Footer */}
      <div className="mt-32 pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-white/15 font-mono">
          © 2026 Balram · Built with React & Node.js
        </p>
      </div>
    </section>
  );
};

export default Contact;
