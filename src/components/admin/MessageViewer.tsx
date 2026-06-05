import { useState, useEffect, useCallback } from 'react';
import { supabase, type ContactMessage } from '../../lib/supabase';
import { Loader2, Mail, MailOpen, Trash2, Clock, AlertCircle } from 'lucide-react';

export default function MessageViewer() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (msg: ContactMessage) => {
    if (!msg.read) {
      await supabase.from('contact_messages').update({ read: true }).eq('id', msg.id);
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
    setSelected({ ...msg, read: true });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    setDeleting(id);
    await supabase.from('contact_messages').delete().eq('id', id);
    if (selected?.id === id) setSelected(null);
    await load();
    setDeleting(null);
  };

  const filtered = filter === 'unread' ? messages.filter(m => !m.read) : messages;
  const unreadCount = messages.filter(m => !m.read).length;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">Messages</h2>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-primary-600 to-teal-600 text-white'
                  : 'glass text-surface-600 dark:text-surface-300'
              }`}
            >
              {f === 'all' ? 'All' : 'Unread'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary-500" size={32} /></div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Message list */}
          <div className="space-y-2">
            {filtered.map(msg => (
              <div
                key={msg.id}
                onClick={() => markRead(msg)}
                className={`card cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                  selected?.id === msg.id ? 'ring-2 ring-primary-500/50' : ''
                } ${!msg.read ? 'border-l-4 border-l-primary-500' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`mt-0.5 shrink-0 ${!msg.read ? 'text-primary-500' : 'text-surface-400'}`}>
                      {msg.read ? <MailOpen size={18} /> : <Mail size={18} />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-semibold truncate text-sm ${!msg.read ? 'text-surface-900 dark:text-surface-100' : 'text-surface-700 dark:text-surface-300'}`}>
                          {msg.name}
                        </p>
                        {!msg.read && <span className="w-2 h-2 bg-primary-500 rounded-full shrink-0" />}
                      </div>
                      <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{msg.subject}</p>
                      <p className="text-xs text-surface-400 mt-1 truncate">{msg.message.slice(0, 60)}...</p>
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(msg.id); }}
                    disabled={deleting === msg.id}
                    className="p-1.5 glass rounded-lg hover:text-red-500 transition-colors shrink-0 disabled:opacity-50"
                  >
                    {deleting === msg.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-surface-400">
                  <Clock size={11} /> {formatDate(msg.created_at)}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-surface-500">
                <AlertCircle size={32} className="mx-auto mb-3 text-surface-300" />
                <p>{filter === 'unread' ? 'No unread messages.' : 'No messages yet.'}</p>
              </div>
            )}
          </div>

          {/* Message detail */}
          <div>
            {selected ? (
              <div className="card h-fit sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-surface-900 dark:text-surface-100">{selected.subject}</h3>
                  <span className="text-xs text-surface-400">{formatDate(selected.created_at)}</span>
                </div>
                <div className="flex items-center gap-2 mb-4 p-3 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
                  <div>
                    <p className="font-semibold text-sm text-surface-900 dark:text-surface-100">{selected.name}</p>
                    <a href={`mailto:${selected.email}`} className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                      {selected.email}
                    </a>
                  </div>
                </div>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed text-sm whitespace-pre-wrap">
                  {selected.message}
                </p>
                <div className="mt-5 pt-4 border-t border-surface-200/50 dark:border-surface-700/30">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="btn-primary text-sm py-2.5 w-full justify-center"
                  >
                    <Mail size={16} />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <MailOpen size={40} className="text-surface-300 dark:text-surface-600 mb-3" />
                <p className="text-surface-500 dark:text-surface-400">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
