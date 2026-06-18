import { useEffect, useState } from 'react';
import { Briefcase, MapPin, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, type Experience } from '../lib/supabase';
import { fadeInUp, staggerContainer } from '../lib/animations';

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const typeColors: Record<string, string> = {
    internship: 'bg-brand-lavender/15 text-brand-lavender border-brand-lavender/20',
    'full-time': 'bg-brand-pink/15 text-brand-pink border-brand-pink/20',
    'part-time': 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card-hover group p-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-lavender to-brand-pink rounded-xl flex items-center justify-center shrink-0 text-white shadow-glow-lavender group-hover:scale-110 transition-transform duration-300">
          <Briefcase size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-lg font-display font-bold text-brand-text">{exp.role}</h3>
              <p className="text-brand-lavender font-semibold text-sm">{exp.company}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize border ${typeColors[exp.type] || typeColors.internship}`}>
              {exp.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-brand-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formatDate(exp.start_date)} – {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}
            </span>
            {exp.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                {exp.location}
              </span>
            )}
          </div>

          <p className="mt-4 text-brand-muted leading-relaxed text-sm">
            {exp.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false })
      .then(({ data }) => {
        setExperiences(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-brand-pink/5 rounded-full blur-[100px]" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="section-title">Experience</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            My professional journey and the experiences that have shaped my growth.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-lavender" size={40} />
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
            {experiences.length === 0 && (
              <p className="text-center text-brand-muted py-12">No experience entries yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
