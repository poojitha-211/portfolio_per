import { useState } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle2, Loader2, AlertCircle, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../lib/animations';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }
  };

  const Field = ({
    label, id, error, children,
  }: { label: string; id: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-text/80 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lavender/5 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-pink/5 rounded-full blur-[100px]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="section-title">Get in Touch</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
            Have a project in mind or want to chat? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info panel */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-xl text-brand-text mb-6">Contact Info</h3>
              <div className="space-y-5">
                {[
                  { Icon: Mail, label: 'Email', value: 'poojithanakkina2005@gmail.com', href: 'mailto:poojithanakkina2005@gmail.com' },
                  { Icon: MapPin, label: 'Location', value: 'India', href: null },
                  { Icon: Phone, label: 'Phone', value: 'Available on request', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-lavender/10 rounded-xl flex items-center justify-center shrink-0 border border-brand-lavender/20">
                      <Icon size={18} className="text-brand-lavender" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-muted-2">{label}</p>
                      {href ? (
                        <a href={href} className="font-medium text-brand-text hover:text-brand-lavender transition-colors duration-200 text-sm">
                          {value}
                        </a>
                      ) : (
                        <p className="font-medium text-brand-text text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-brand-text mb-4">Connect</h3>
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
                    className="p-3 glass rounded-xl hover:border-brand-lavender/30 hover:shadow-glow-lavender hover:scale-110 active:scale-95 transition-all duration-300 text-brand-muted hover:text-brand-lavender"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-brand-text mb-3">Response Time</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                I typically respond to messages within <span className="text-brand-lavender font-semibold">24 hours</span>.
                For urgent matters, feel free to reach out directly via email.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-lavender/10 border border-brand-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-lavender">
                    <CheckCircle2 className="text-brand-lavender" size={32} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-text mb-2">Message Sent!</h3>
                  <p className="text-brand-muted mb-6">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-secondary">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" id="name" error={errors.name}>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Alex Chen"
                        className={`input-field ${errors.name ? 'ring-2 ring-red-400/50' : ''}`}
                      />
                    </Field>
                    <Field label="Email Address" id="email" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="alex@example.com"
                        className={`input-field ${errors.email ? 'ring-2 ring-red-400/50' : ''}`}
                      />
                    </Field>
                  </div>

                  <Field label="Subject" id="subject" error={errors.subject}>
                    <input
                      id="subject"
                      type="text"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      placeholder="Project inquiry..."
                      className={`input-field ${errors.subject ? 'ring-2 ring-red-400/50' : ''}`}
                    />
                  </Field>

                  <Field label="Message" id="message" error={errors.message}>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project or idea..."
                      className={`input-field resize-none ${errors.message ? 'ring-2 ring-red-400/50' : ''}`}
                    />
                  </Field>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
