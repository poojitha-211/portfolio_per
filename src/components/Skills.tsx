import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../lib/animations';

const skillCategories = [
  {
    name: 'Frontend',
    color: 'from-brand-lavender to-blue-400',
    borderColor: 'border-brand-lavender/20',
    bgHover: 'hover:bg-brand-lavender/10',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Streamlit'],
  },
  {
    name: 'Backend',
    color: 'from-brand-pink to-orange-400',
    borderColor: 'border-brand-pink/20',
    bgHover: 'hover:bg-brand-pink/10',
    skills: ['Python', 'C Programming', 'Node.js', 'Express.js'],
  },
  {
    name: 'Database & Cloud',
    color: 'from-emerald-400 to-teal-400',
    borderColor: 'border-emerald-400/20',
    bgHover: 'hover:bg-emerald-400/10',
    skills: ['MongoDB', 'Firebase', 'Supabase'],
  },
  {
    name: 'Tools & Others',
    color: 'from-amber-400 to-yellow-400',
    borderColor: 'border-amber-400/20',
    bgHover: 'hover:bg-amber-400/10',
    skills: ['Git', 'VS Code', 'Machine Learning', 'IoT', 'Embedded Systems', 'Scikit-Learn', 'NumPy', 'Pandas'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-lavender/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="section-title">Skills</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
              className="glass-card p-6 group hover:border-brand-lavender/20 transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                <h3 className="font-display font-bold text-brand-text text-lg">{category.name}</h3>
                <span className="text-xs text-brand-muted-2 ml-auto">{category.skills.length} skills</span>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + i * 0.05, duration: 0.3 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${category.borderColor} ${category.bgHover} text-brand-text transition-all duration-200 cursor-default`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
