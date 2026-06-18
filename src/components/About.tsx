import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../lib/animations';

const education = [
  {
    degree: 'B.Tech - Computer Science Engineering',
    institution: 'International School of Technology and Sciences for Women',
    period: '2022 – 2027',
    location: 'Andhra Pradesh, India',
    highlights: ['Graduating 2027', 'Strong Technical Foundation', 'Continuous Learning'],
  },
  {
    degree: 'Diploma - Electronic Communication Engineering',
    institution: 'Government Polytechnic for Women, Guntur',
    period: '2019 – 2022',
    location: 'Guntur, Andhra Pradesh',
    highlights: ['Electronics Foundation', 'Communication Systems', 'Technical Excellence'],
  },
];

const stats = [
  { label: 'Projects Built', value: '3+' },
  { label: 'Certifications', value: '9' },
  { label: 'Internships', value: '1+' },
  { label: 'Skills', value: '12+' },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-pink/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="section-title">About Me</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            A driven CS student passionate about building impactful software and continuously learning.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio + Stats + Education */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            {/* Bio */}
            <div className="glass-card p-6">
              <p className="text-brand-text/90 leading-relaxed text-lg">
                I'm a B.Tech Computer Science student with strong technical skills and a passion for innovation.
                My expertise spans web development, machine learning, and embedded systems with hands-on experience
                in building real-world applications and IoT solutions.
              </p>
              <p className="text-brand-muted leading-relaxed mt-4">
                Currently pursuing my degree while working on diverse projects ranging from fraud detection models
                to smart home automation systems. I'm committed to continuous learning and applying my skills to solve
                practical problems across different technology domains.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card p-4 text-center group hover:border-brand-lavender/30 transition-all duration-300"
                >
                  <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-brand-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-display font-bold text-brand-text mb-4 flex items-center gap-2">
                <GraduationCap className="text-brand-lavender" size={22} />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.degree} className="glass-card p-5 group hover:border-brand-lavender/30 transition-all duration-300">
                    <h4 className="font-bold text-brand-text">{edu.degree}</h4>
                    <p className="text-brand-lavender font-semibold text-sm mt-1">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-brand-muted">
                      <span className="flex items-center gap-1.5"><Calendar size={13} />{edu.period}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} />{edu.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {edu.highlights.map(h => (
                        <span key={h} className="tag-pink">{h}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - decorative/visual element */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div className="glass-card p-8 h-full flex flex-col justify-center items-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 hero-gradient opacity-50" />
              <div className="absolute inset-0 dot-pattern opacity-20" />

              <div className="relative z-10 text-center space-y-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-brand-lavender/20 to-brand-pink/20 border-2 border-brand-lavender/30 flex items-center justify-center glow-lavender">
                  <span className="text-5xl font-display font-bold gradient-text">NP</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-bold text-brand-text">Nakkina Poojitha</h3>
                  <p className="text-brand-lavender font-medium">Full Stack Developer</p>
                  <p className="text-brand-muted text-sm">Based in India</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: '🎯', label: 'Problem Solver' },
                    { icon: '🚀', label: 'Quick Learner' },
                    { icon: '💡', label: 'Innovative' },
                    { icon: '🤝', label: 'Team Player' },
                  ].map(item => (
                    <div key={item.label} className="glass p-3 rounded-xl text-center hover:border-brand-lavender/30 transition-all duration-200">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-xs text-brand-muted mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
