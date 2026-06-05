import { useState, useEffect, useCallback } from 'react';
import { supabase, type Project } from '../../lib/supabase';
import {
  Plus, Pencil, Trash2, Loader2, X, Save, AlertCircle, CheckCircle2
} from 'lucide-react';

type FormData = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
const EMPTY: FormData = {
  title: '', description: '', image_url: '', tech_stack: [],
  github_url: '', live_url: '', featured: false, sort_order: 0,
};

function Modal({
  project, onSave, onClose,
}: {
  project: Partial<Project> | null;
  onSave: () => void;
  onClose: () => void;
}) {
  const isEdit = !!project?.id;
  const [form, setForm] = useState<FormData>(project?.id ? {
    title: project.title ?? '',
    description: project.description ?? '',
    image_url: project.image_url ?? '',
    tech_stack: project.tech_stack ?? [],
    github_url: project.github_url ?? '',
    live_url: project.live_url ?? '',
    featured: project.featured ?? false,
    sort_order: project.sort_order ?? 0,
  } : EMPTY);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech_stack.includes(t)) {
      setForm(f => ({ ...f, tech_stack: [...f.tech_stack, t] }));
    }
    setTechInput('');
  };

  const removeTech = (t: string) =>
    setForm(f => ({ ...f, tech_stack: f.tech_stack.filter(x => x !== t) }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required');
      return;
    }
    setSaving(true);
    setError('');
    const payload = { ...form, updated_at: new Date().toISOString() };
    const { error: err } = isEdit
      ? await supabase.from('projects').update(payload).eq('id', project!.id!)
      : await supabase.from('projects').insert(payload);
    if (err) { setError(err.message); setSaving(false); return; }
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-strong rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-text">{isEdit ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose} className="p-2 glass rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Title *', key: 'title', placeholder: 'My Awesome Project' },
            { label: 'Image URL', key: 'image_url', placeholder: 'https://...' },
            { label: 'GitHub URL', key: 'github_url', placeholder: 'https://github.com/...' },
            { label: 'Live URL', key: 'live_url', placeholder: 'https://...' },
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
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Description *</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="input-field resize-none"
              placeholder="Describe the project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Add technology..."
                className="input-field flex-1"
              />
              <button onClick={addTech} type="button" className="btn-secondary py-2 px-4 text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tech_stack.map(t => (
                <span key={t} className="tag flex items-center gap-1 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  onClick={() => removeTech(t)}>
                  {t} <X size={12} />
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${form.featured ? 'bg-primary-500' : 'bg-surface-300 dark:bg-surface-600'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform duration-200 shadow-sm ${form.featured ? 'translate-x-6.5 ml-0.5' : 'ml-0.5'}`} />
                </div>
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Featured</span>
              </label>
            </div>
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
              {isEdit ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; project: Partial<Project> | null }>({ open: false, project: null });
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('sort_order');
    setProjects(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = () => {
    setModal({ open: false, project: null });
    setSuccess('Project saved successfully!');
    load();
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;
    setDeleting(id);
    await supabase.from('projects').delete().eq('id', id);
    await load();
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">Projects</h2>
        <button onClick={() => setModal({ open: true, project: null })} className="btn-primary py-2 px-4 text-sm">
          <Plus size={16} /> Add Project
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
          {projects.map(p => (
            <div key={p.id} className="card flex items-center gap-4">
              <img
                src={p.image_url || 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={p.title}
                className="w-14 h-14 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 truncate">{p.title}</h3>
                  {p.featured && <span className="tag text-xs shrink-0">Featured</span>}
                </div>
                <p className="text-sm text-surface-500 dark:text-surface-400 truncate">{p.description}</p>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {p.tech_stack.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-surface-600 dark:text-surface-400">{t}</span>
                  ))}
                  {p.tech_stack.length > 3 && <span className="text-xs text-surface-400">+{p.tech_stack.length - 3}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setModal({ open: true, project: p })}
                  className="p-2 glass rounded-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className="p-2 glass rounded-lg hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {deleting === p.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-surface-500 py-12">No projects yet. Add one!</p>
          )}
        </div>
      )}

      {modal.open && (
        <Modal project={modal.project} onSave={handleSave} onClose={() => setModal({ open: false, project: null })} />
      )}
    </div>
  );
}
