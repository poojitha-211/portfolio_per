import { useEffect, useState } from 'react';
import { Github, ExternalLink, Loader2 } from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card group cursor-default hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
        <img
          src={project.image_url || 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600'}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-primary-500 to-teal-500 text-white text-xs font-semibold rounded-full shadow-lg">
            Featured
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-2">{project.title}</h3>
      <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tech_stack.map(tech => (
          <span key={tech} className="tag text-xs">{tech}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-4 border-t border-surface-200/50 dark:border-surface-700/30">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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
            className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors ml-auto"
          >
            Live Demo
            <ExternalLink size={15} />
          </a>
        )}
      </div>
    </div>
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
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle mx-auto">
            A showcase of what I've built — from side projects to production applications.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            {(['all', 'featured'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  filter === f
                    ? 'bg-gradient-to-r from-primary-600 to-teal-600 text-white shadow-lg'
                    : 'glass text-surface-600 dark:text-surface-300 hover:bg-white/80 dark:hover:bg-surface-800'
                }`}
              >
                {f === 'all' ? 'All Projects' : 'Featured'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary-500" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-surface-500 dark:text-surface-400">
            No projects found.
          </div>
        )}
      </div>
    </section>
  );
}
