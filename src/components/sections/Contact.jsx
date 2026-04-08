import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, User, Mail, ExternalLink, ArrowRight } from 'lucide-react';

const ContactLink = ({ icon: Icon, label, href, sub }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass p-8 flex items-center justify-between group hover:border-primary/50 transition-all duration-300"
  >
    <div className="flex items-center gap-6">
      <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
        <Icon className="text-white/40 group-hover:text-primary transition-colors" size={24} />
      </div>
      <div>
        <span className="text-[10px] font-mono text-primary font-black tracking-widest uppercase mb-1 block">
          {label}
        </span>
        <h4 className="text-xl font-black text-white tracking-tight">{sub}</h4>
      </div>
    </div>
    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <ExternalLink size={16} className="text-primary" />
    </div>
  </motion.a>
);

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-48 px-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-4">
              Step 05 // Contact
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-none">
              ESTABLISH <br />
              <span className="text-primary italic">UPLINK.</span>
            </h3>
            <p className="text-text-secondary text-lg max-w-md leading-relaxed mb-12">
              Have a high-security project in mind or just want to chat about systems architecture? Drop a signal below.
            </p>

            <a 
              href="mailto:balrampreet0@gmail.com"
              className="inline-flex items-center gap-4 py-5 px-10 rounded-2xl bg-primary text-black font-black uppercase tracking-widest hover:shadow-neon hover:scale-105 transition-all group"
            >
              TRANSMIT SIGNAL
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="space-y-4">
            <ContactLink 
              icon={Terminal} 
              label="Development" 
              sub="GITHUB // BALRAM-1" 
              href="https://github.com/Balram-1"
            />
            <ContactLink 
              icon={User} 
              label="Professional" 
              sub="LINKEDIN // BALRAMPREET" 
              href="https://www.linkedin.com/in/balrampreet/"
            />
            <ContactLink 
              icon={Mail} 
              label="Direct Signal" 
              sub="BALRAMPREET0@GMAIL.COM" 
              href="mailto:balrampreet0@gmail.com"
            />
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-48 pt-12 border-t border-white/5 text-center flex flex-col items-center gap-4 opacity-30">
        <div className="text-[10px] font-mono tracking-[0.5em] text-white">LOOPDEV_HUB_SYSTEM_V2.0.1</div>
        <div className="text-[8px] text-text-muted">DESIGNED BY ANTIGRAVITY // REFINED BY STITCH</div>
      </div>
    </section>
  );
};

export default Contact;
