import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-brand-border bg-brand-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-lavender to-brand-pink rounded-lg flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg gradient-text">Poojitha</span>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">
              Building beautiful, responsive web applications with modern technologies. Passionate about creating elegant solutions to complex problems.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-display font-semibold text-brand-text mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-brand-muted hover:text-brand-lavender transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-semibold text-brand-text mb-4">Connect</h3>
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
                  className="p-2.5 glass rounded-xl hover:border-brand-lavender/30 hover:shadow-glow-lavender hover:scale-110 active:scale-95 transition-all duration-300 text-brand-muted hover:text-brand-lavender"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-muted-2 flex items-center gap-1.5">
            Built with <Heart size={13} className="text-brand-pink fill-current" /> by Nakkina Poojitha &copy; {new Date().getFullYear()}
          </p>
          <a
            href="/admin"
            className="text-xs text-brand-muted-2 hover:text-brand-lavender transition-colors duration-200"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
}
