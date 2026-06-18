import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../lib/animations';

const TYPED_STRINGS = ['Full Stack Developer', 'Frontend Developer', 'JavaScript Enthusiast'];

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const charIndexRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef<number>();

  useEffect(() => {
    const type = () => {
      const el = typedRef.current;
      if (!el) return;
      const current = TYPED_STRINGS[indexRef.current];

      if (!deletingRef.current) {
        el.textContent = current.slice(0, charIndexRef.current + 1);
        charIndexRef.current++;
        if (charIndexRef.current === current.length) {
          deletingRef.current = true;
          timerRef.current = window.setTimeout(type, 2000);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIndexRef.current - 1);
        charIndexRef.current--;
        if (charIndexRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % TYPED_STRINGS.length;
        }
      }
      timerRef.current = window.setTimeout(type, deletingRef.current ? 50 : 100);
    };

    timerRef.current = window.setTimeout(type, 800);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-brand-lavender/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-lavender/5 rounded-full blur-[80px] animate-pulse-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Status badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-brand-lavender mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            B.Tech Computer Science Student | Graduating 2027
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-4 leading-tight tracking-tight"
          >
            <span className="text-brand-text">Hi, I'm </span>
            <span className="gradient-text">Poojitha</span>
          </motion.h1>

          {/* Typed role */}
          <motion.div
            variants={fadeInUp}
            className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-brand-muted mb-8 h-12 flex items-center justify-center"
          >
            <span ref={typedRef} className="gradient-text-alt" />
            <span className="animate-pulse text-brand-lavender ml-0.5">|</span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-brand-muted mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            B.Tech Computer Science student with strong technical skills and a passion for innovation.
            Building web applications, machine learning models, and IoT solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center mb-12">
            <a
              href="/NAKKINA_POOJITHA_updated_01.pdf"
              download
              className="btn-primary"
            >
              <Download size={18} />
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-secondary"
            >
              <Mail size={18} />
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeInUp} className="flex items-center gap-6 justify-center">
            {[
              { Icon: Github, href: 'https://github.com', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/poojitha-nakkina', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:poojithanakkina2005@gmail.com', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 glass rounded-xl hover:border-brand-lavender/30 hover:shadow-glow-lavender hover:scale-110 active:scale-95 transition-all duration-300 text-brand-muted hover:text-brand-lavender"
              >
                <Icon size={22} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted-2"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} className="text-brand-lavender" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
