import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProjectManager from './ProjectManager';
import CertificateManager from './CertificateManager';
import MessageViewer from './MessageViewer';
import {
  LayoutDashboard, FolderKanban, Award, MessageSquare,
  LogOut, Menu, Code2, ChevronRight
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

type Tab = 'overview' | 'projects' | 'certificates' | 'messages';

const tabs: { key: Tab; label: string; Icon: React.ElementType }[] = [
  { key: 'overview', label: 'Overview', Icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', Icon: FolderKanban },
  { key: 'certificates', label: 'Certificates', Icon: Award },
  { key: 'messages', label: 'Messages', Icon: MessageSquare },
];

function Overview() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-bold text-brand-text">Dashboard Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: 'View Projects', icon: FolderKanban, color: 'from-brand-lavender to-blue-400' },
          { label: 'Certificates', value: 'View Certificates', icon: Award, color: 'from-brand-pink to-orange-400' },
          { label: 'Messages', value: 'View Messages', icon: MessageSquare, color: 'from-amber-400 to-yellow-400' },
          { label: 'Portfolio', value: 'Live Site', icon: LayoutDashboard, color: 'from-brand-lavender to-brand-pink' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card-hover group p-5">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-110 transition-transform`}>
              <Icon size={22} />
            </div>
            <p className="text-sm text-brand-muted">{label}</p>
            <p className="font-semibold text-brand-text mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-bold text-brand-text mb-3">Quick Actions</h3>
        <p className="text-brand-muted text-sm">
          Use the sidebar to manage your portfolio content. You can add, edit, and delete projects,
          certificates, and view contact messages from visitors.
        </p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <a href="/" className="btn-secondary text-sm py-2 px-4">View Portfolio</a>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTab = tabs.find(t => t.key === tab)!;

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 glass-strong border-r border-brand-border
        flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-lavender to-brand-pink rounded-lg flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold gradient-text">Admin Panel</span>
              <p className="text-xs text-brand-muted-2 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                tab === key
                  ? 'bg-gradient-to-r from-brand-lavender to-brand-pink text-white shadow-glow-lavender'
                  : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {label}
              {tab === key && <ChevronRight size={15} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-border space-y-2">
          <a href="/" className="w-full btn-secondary text-sm py-2.5 justify-center">View Portfolio</a>
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="glass-strong border-b border-brand-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 glass rounded-xl text-brand-muted">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="font-display font-bold text-brand-text">{currentTab.label}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 glass rounded-xl hover:border-brand-lavender/30 transition-all duration-200 text-brand-muted hover:text-brand-lavender"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={signOut}
              className="hidden sm:flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {tab === 'overview' && <Overview />}
          {tab === 'projects' && <ProjectManager />}
          {tab === 'certificates' && <CertificateManager />}
          {tab === 'messages' && <MessageViewer />}
        </main>
      </div>
    </div>
  );
}
