import { useState } from 'react';
import apiFetch from '@/lib/api';

export function useAuthApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('luxestore_token', data.token);
      }
      return data.user;
    } catch (err: any) {
      setError(err.error || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, name: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('luxestore_token', data.token);
      }
      return data.user;
    } catch (err: any) {
      setError(err.error || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('luxestore_token');
    }
  }

  return { login, register, logout, loading, error };
}
