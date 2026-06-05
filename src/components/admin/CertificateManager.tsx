import { useState, useEffect, useCallback } from 'react';
import { supabase, type Certificate } from '../../lib/supabase';
import {
  Plus, Pencil, Trash2, Loader2, X, Save, AlertCircle, CheckCircle2, Award
} from 'lucide-react';

type FormData = Omit<Certificate, 'id' | 'created_at'>;
const EMPTY: FormData = { title: '', issuer: '', issue_date: '', credential_url: '', image_url: '' };

function Modal({ cert, onSave, onClose }: { cert: Partial<Certificate> | null; onSave: () => void; onClose: () => void }) {
  const isEdit = !!cert?.id;
  const [form, setForm] = useState<FormData>(cert?.id ? {
    title: cert.title ?? '',
    issuer: cert.issuer ?? '',
    issue_date: cert.issue_date ?? '',
    credential_url: cert.credential_url ?? '',
    image_url: cert.image_url ?? '',
  } : EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.title.trim() || !form.issuer.trim()) {
      setError('Title and issuer are required');
      return;
    }
    setSaving(true);
    setError('');
    const { error: err } = isEdit
      ? await supabase.from('certificates').update(form).eq('id', cert!.id!)
      : await supabase.from('certificates').insert(form);
    if (err) { setError(err.message); setSaving(false); return; }
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-strong rounded-3xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-text">{isEdit ? 'Edit Certificate' : 'New Certificate'}</h2>
          <button onClick={onClose} className="p-2 glass rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Title *', key: 'title', placeholder: 'AWS Certified Developer' },
            { label: 'Issuer *', key: 'issuer', placeholder: 'Amazon Web Services' },
            { label: 'Credential URL', key: 'credential_url', placeholder: 'https://...' },
            { label: 'Image URL', key: 'image_url', placeholder: 'https://...' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{label}</label>
              <input
                type="text"
                value={(form as Record<string, unknown>)[key] as string}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="input-field"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Issue Date</label>
            <input
              type="date"
              value={form.issue_date ?? ''}
              onChange={e => setForm(f => ({ ...f, issue_date: e.target.value }))}
              className="input-field"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isEdit ? 'Save Changes' : 'Create Certificate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificateManager() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; cert: Partial<Certificate> | null }>({ open: false, cert: null });
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('certificates').select('*').order('issue_date', { ascending: false });
    setCerts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = () => {
    setModal({ open: false, cert: null });
    setSuccess('Certificate saved!');
    load();
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this certificate?')) return;
    setDeleting(id);
    await supabase.from('certificates').delete().eq('id', id);
    await load();
    setDeleting(null);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">Certificates</h2>
        <button onClick={() => setModal({ open: true, cert: null })} className="btn-primary py-2 px-4 text-sm">
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl text-teal-700 dark:text-teal-300 text-sm mb-4">
          <CheckCircle2 size={16} /> {success}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary-500" size={32} /></div>
      ) : (
        <div className="space-y-3">
          {certs.map(c => (
            <div key={c.id} className="card flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-primary-100 dark:from-teal-900/40 dark:to-primary-900/40 rounded-xl flex items-center justify-center shrink-0">
                <Award size={22} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 truncate">{c.title}</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400">{c.issuer}</p>
                {c.issue_date && <p className="text-xs text-surface-400 mt-0.5">{formatDate(c.issue_date)}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setModal({ open: true, cert: c })}
                  className="p-2 glass rounded-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  disabled={deleting === c.id}
                  className="p-2 glass rounded-lg hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {deleting === c.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
            </div>
          ))}
          {certs.length === 0 && <p className="text-center text-surface-500 py-12">No certificates yet.</p>}
        </div>
      )}

      {modal.open && (
        <Modal cert={modal.cert} onSave={handleSave} onClose={() => setModal({ open: false, cert: null })} />
      )}
    </div>
  );
}
