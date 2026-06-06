/**
 * Store Configuration API
 *
 * Swap guide (AppContext.jsx):
 *   - config load  → storeConfigApi.get()
 *   - config save  → storeConfigApi.update(data)
 *
 * Expected backend routes:
 *   GET  /api/config       → storeConfig
 *   PUT  /api/config       { ...fields } → storeConfig  (admin only)
 */

import { apiFetch } from './config';

export const storeConfigApi = {
  get: () =>
    apiFetch('/config'),

  update: (data) =>
    apiFetch('/config', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
