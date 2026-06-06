/**
 * API Client base configuration
 *
 * When the backend is ready:
 *  1. Set VITE_API_BASE_URL in .env
 *  2. Replace storageService calls in each service with the corresponding api/* module
 *  3. Handle token storage (login → save token, logout → remove token)
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('bq_token');

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `Error ${res.status}`);
  }

  return res.json();
};
