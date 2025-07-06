import { useEffect, useState } from 'react';
import apiFetch from '@/lib/api';

export interface Profile {
  id: number;
  email: string;
  name: string;
  role: string;
  banned: boolean;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch('/auth/profile')
      .then((data) => setProfile(data.user))
      .catch((err) => setError(err.error || 'Failed to fetch profile'))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}
