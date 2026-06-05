import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-200/50 dark:border-surface-700/30 bg-white/50 dark:bg-surface-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">Poojitha</span>
            </div>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Building beautiful, responsive web applications with modern technologies.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-semibold text-surface-800 dark:text-surface-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-surface-800 dark:text-surface-200 mb-4">Connect</h3>
            <div className="flex gap-3">
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
                  className="p-2.5 glass rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-200/50 dark:border-surface-700/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500 dark:text-surface-400 flex items-center gap-1.5">
            Built with <Heart size={13} className="text-red-400 fill-current" /> by Nakkina Poojitha &copy; {new Date().getFullYear()}
          </p>
          <a
            href="/admin"
            className="text-xs text-surface-400 dark:text-surface-500 hover:text-primary-500 transition-colors"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
}
