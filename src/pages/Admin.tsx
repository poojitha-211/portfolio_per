import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import { Loader2 } from 'lucide-react';

export default function Admin() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <Loader2 className="animate-spin text-primary-500" size={40} />
      </div>
    );
  }

  return user ? <AdminDashboard /> : <AdminLogin />;
}
