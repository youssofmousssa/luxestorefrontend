import { useEffect, useState } from 'react';
import apiFetch from '@/lib/api';

export function useAdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch('/admin/dashboard')
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err.error || 'Failed to fetch dashboard stats'))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
}
