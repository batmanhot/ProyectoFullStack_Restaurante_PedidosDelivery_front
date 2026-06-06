/**
 * Products & Categories API
 *
 * Swap guide (productService.js):
 *   - getProducts()         → productsApi.getAll()
 *   - getCategories()       → productsApi.getCategories()
 *   - addProduct()          → productsApi.create(data)
 *   - updateProduct()       → productsApi.update(id, data)
 *   - deleteProduct()       → productsApi.remove(id)
 *   - toggleAvailability()  → productsApi.toggleAvailability(id)
 *   - toggleFeatured()      → productsApi.toggleFeatured(id)
 *   - setBadge()            → productsApi.update(id, { badge })
 *
 * Expected backend routes:
 *   GET    /api/products                    → [ product ]
 *   GET    /api/products?category=:id       → [ product ]
 *   GET    /api/products/featured           → [ product ]
 *   POST   /api/products                    → product
 *   PUT    /api/products/:id                → product
 *   DELETE /api/products/:id                → 204
 *   PATCH  /api/products/:id/availability   → product
 *   PATCH  /api/products/:id/featured       → product
 *   GET    /api/categories                  → [ category ]
 *   POST   /api/categories                  → category
 *   DELETE /api/categories/:id              → 204
 */

import { apiFetch } from './config';

export const productsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/products${query ? `?${query}` : ''}`);
  },

  getFeatured: () =>
    apiFetch('/products/featured'),

  create: (data) =>
    apiFetch('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiFetch(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    apiFetch(`/products/${id}`, { method: 'DELETE' }),

  toggleAvailability: (id) =>
    apiFetch(`/products/${id}/availability`, { method: 'PATCH' }),

  toggleFeatured: (id) =>
    apiFetch(`/products/${id}/featured`, { method: 'PATCH' }),

  getCategories: () =>
    apiFetch('/categories'),

  createCategory: (data) =>
    apiFetch('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteCategory: (id) =>
    apiFetch(`/categories/${id}`, { method: 'DELETE' }),
};
