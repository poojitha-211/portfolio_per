import { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, ArrowDown, Sparkles } from 'lucide-react';

const TYPED_STRINGS = ['Web Developer', 'React Specialist', 'CS Student', 'Problem Solver'];

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
      timerRef.current = window.setTimeout(type, deletingRef.current ? 60 : 100);
    };

    timerRef.current = window.setTimeout(type, 500);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-20 -left-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-300" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-1 gap-16 items-center">
          {/* Text content */}
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-primary-600 dark:text-primary-400 mb-6 border border-primary-200 dark:border-primary-800">
              <Sparkles size={14} className="text-teal-500" />
              B.Tech Computer Science Student | Graduating 2027
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="text-surface-900 dark:text-white">Hi, I'm </span>
              <span className="gradient-text">Nakkina Poojitha</span>
            </h1>

            <div className="text-2xl md:text-3xl font-semibold text-surface-600 dark:text-surface-300 mb-6 h-10">
              <span ref={typedRef} className="gradient-text" />
              <span className="animate-pulse text-primary-500">|</span>
            </div>

            <p className="text-lg text-surface-600 dark:text-surface-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              B.Tech Computer Science student with strong technical skills and a passion for innovation.
              Building web applications, machine learning models, and IoT solutions.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <a
                href="/resume.pdf"
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
            </div>

            <div className="flex items-center gap-5 justify-center lg:justify-start">
              <span className="text-sm text-surface-500 dark:text-surface-400">Find me on:</span>
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
                  className="p-2.5 glass rounded-xl hover:scale-110 hover:shadow-glow-blue active:scale-95 transition-all duration-200 text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-surface-400 animate-bounce">
          <span className="text-xs">Scroll down</span>
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}
