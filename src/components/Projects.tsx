import { useEffect, useState } from 'react';
import { Github, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, type Project } from '../lib/supabase';
import { fadeInUp, staggerContainer } from '../lib/animations';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card-hover group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={project.image_url || 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent" />
        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-brand-lavender to-brand-pink text-white text-xs font-semibold rounded-full shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-brand-text mb-2 group-hover:text-brand-lavender transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech_stack.slice(0, 4).map(tech => (
            <span key={tech} className="tag">{tech}</span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="tag opacity-60">+{project.tech_stack.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-brand-muted hover:text-brand-lavender transition-colors duration-200"
            >
              <Github size={16} />
              Source
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-lavender hover:text-brand-pink transition-colors duration-200 ml-auto"
            >
              Live Demo
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setProjects(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'featured' ? projects.filter(p => p.featured) : projects;

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-lavender/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="section-title">Projects</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            A showcase of what I've built — from side projects to production applications.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mt-8">
            {(['all', 'featured'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  filter === f
                    ? 'bg-gradient-to-r from-brand-lavender to-brand-pink text-white shadow-glow-lavender'
                    : 'glass text-brand-muted hover:text-brand-text hover:border-brand-lavender/30'
                }`}
              >
                {f === 'all' ? 'All Projects' : 'Featured'}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-lavender" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-brand-muted">
            No projects found.
          </div>
        )}
      </div>
    </section>
  );
}
