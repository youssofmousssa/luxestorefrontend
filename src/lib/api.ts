// Centralized API client for all backend calls
// Uses fetch and handles JWT, errors, and base URL

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://luxestore-mvd2.onrender.com/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('luxestore_token');
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });
  if (!res.ok) {
    let error;
    try { error = await res.json(); } catch { error = { error: res.statusText }; }
    throw error;
  }
  return res.json();
}

export default apiFetch;
export { API_BASE };
