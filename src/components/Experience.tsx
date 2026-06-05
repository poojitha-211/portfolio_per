import { useEffect, useState } from 'react';
import { Briefcase, Award, MapPin, Calendar, Loader2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { supabase, type Experience, type Certificate } from '../lib/supabase';

function ExperienceCard({ exp }: { exp: Experience }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const typeColors: Record<string, string> = {
    internship: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'full-time': 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
    'part-time': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  };

  return (
    <div className="card group hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-teal-500 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md group-hover:scale-110 transition-transform">
          <Briefcase size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100">{exp.role}</h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold">{exp.company}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${typeColors[exp.type] || typeColors.internship}`}>
              {exp.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-surface-500 dark:text-surface-400">
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

          <p className="mt-4 text-surface-600 dark:text-surface-400 leading-relaxed text-sm">
            {exp.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ cert }: { cert: Certificate }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="card group hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-primary-500 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md group-hover:scale-110 transition-transform">
        <Award size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-surface-900 dark:text-surface-100 leading-tight">{cert.title}</h3>
        <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-1">{cert.issuer}</p>
        {cert.issue_date && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-surface-500 dark:text-surface-400">
            <CheckCircle2 size={12} className="text-teal-500" />
            Issued {formatDate(cert.issue_date)}
          </div>
        )}
        {cert.credential_url && (
          <a
            href={cert.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            View Credential <ExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'experience' | 'certificates'>('experience');

  useEffect(() => {
    Promise.all([
      supabase.from('experiences').select('*').order('start_date', { ascending: false }),
      supabase.from('certificates').select('*').order('issue_date', { ascending: false }),
    ]).then(([expRes, certRes]) => {
      setExperiences(expRes.data ?? []);
      setCertificates(certRes.data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle mx-auto">
            My professional journey and the certifications I've earned along the way.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            {[
              { key: 'experience', label: `Work (${experiences.length})`, Icon: Briefcase },
              { key: 'certificates', label: `Certificates (${certificates.length})`, Icon: Award },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  tab === key
                    ? 'bg-gradient-to-r from-primary-600 to-teal-600 text-white shadow-lg'
                    : 'glass text-surface-600 dark:text-surface-300 hover:bg-white/80 dark:hover:bg-surface-800'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary-500" size={40} />
          </div>
        ) : (
          <div className="space-y-4">
            {tab === 'experience'
              ? experiences.map(exp => <ExperienceCard key={exp.id} exp={exp} />)
              : certificates.map(cert => <CertificateCard key={cert.id} cert={cert} />)
            }
            {tab === 'experience' && experiences.length === 0 && (
              <p className="text-center text-surface-500 py-12">No experience entries yet.</p>
            )}
            {tab === 'certificates' && certificates.length === 0 && (
              <p className="text-center text-surface-500 py-12">No certificates yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
