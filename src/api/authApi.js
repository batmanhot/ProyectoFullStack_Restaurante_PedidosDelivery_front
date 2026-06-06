/**
 * Auth API
 *
 * Swap guide (AuthContext.jsx):
 *   - login()    → replace storageService user lookup with authApi.login()
 *   - register() → replace storageService user creation with authApi.register()
 *   - logout()   → call authApi.logout() then remove token from localStorage
 *
 * Expected backend routes:
 *   POST /api/auth/login      { email, password }   → { token, user }
 *   POST /api/auth/register   { name, email, password } → { token, user }
 *   POST /api/auth/logout     (Bearer token)         → 200
 *   GET  /api/auth/me         (Bearer token)         → { user }
 */

import { apiFetch } from './config';

export const authApi = {
  login: (email, password) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password) =>
    apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  logout: () =>
    apiFetch('/auth/logout', { method: 'POST' }),

  getProfile: () =>
    apiFetch('/auth/me'),

  updateProfile: (data) =>
    apiFetch('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
