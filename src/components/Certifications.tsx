import { useEffect, useState } from 'react';
import { Award, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, type Certificate } from '../lib/supabase';
import { fadeInUp, staggerContainer } from '../lib/animations';

function CertificateCard({ cert, index }: { cert: Certificate; index: number }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card-hover group p-5 flex items-start gap-4"
    >
      <div className="w-10 h-10 bg-gradient-to-br from-brand-pink to-brand-lavender rounded-xl flex items-center justify-center shrink-0 text-white shadow-glow-pink group-hover:scale-110 transition-transform duration-300">
        <Award size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-brand-text leading-tight group-hover:text-brand-lavender transition-colors duration-200">
          {cert.title}
        </h3>
        <p className="text-brand-pink text-sm font-medium mt-1">{cert.issuer}</p>
        {cert.issue_date && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-brand-muted">
            <CheckCircle2 size={12} className="text-brand-lavender" />
            Issued {formatDate(cert.issue_date)}
          </div>
        )}
        {cert.credential_url && (
          <a
            href={cert.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-brand-lavender hover:text-brand-pink transition-colors duration-200"
          >
            View Credential <ExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('certificates')
      .select('*')
      .order('issue_date', { ascending: false })
      .then(({ data }) => {
        setCertificates(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="certifications" className="py-24 relative">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-brand-lavender/5 rounded-full blur-[120px]" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="section-title">Certifications</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            Professional certifications that validate my skills and knowledge.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-lavender" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {certificates.map((cert, i) => (
              <CertificateCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        )}

        {!loading && certificates.length === 0 && (
          <p className="text-center text-brand-muted py-12">No certificates yet.</p>
        )}
      </div>
    </section>
  );
}
