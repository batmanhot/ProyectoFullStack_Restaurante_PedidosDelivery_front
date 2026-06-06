/**
 * Orders API
 *
 * Swap guide (orderService.js):
 *   - getOrders()        → ordersApi.getAll()
 *   - getOrdersByUser()  → ordersApi.getByUser(userId)
 *   - createOrder()      → ordersApi.create(data)
 *   - updateStatus()     → ordersApi.updateStatus(id, status, extra)
 *   - deleteOrder()      → ordersApi.remove(id)
 *   - getStats()         → ordersApi.getStats()
 *
 * Expected backend routes:
 *   GET    /api/orders              → [ order ]
 *   GET    /api/orders?userId=:id   → [ order ]
 *   POST   /api/orders              → order
 *   PATCH  /api/orders/:id/status   { status, deliveryPerson? } → order
 *   DELETE /api/orders/:id          → 204
 *   GET    /api/orders/stats        → { total, revenue, byStatus }
 *
 * Real-time (WebSocket / SSE alternative):
 *   The current 5s polling in MyOrdersPage and WelcomeBackSection
 *   can be replaced with a WebSocket subscription:
 *   ws.on('order:updated', (order) => setOrders(...))
 */

import { apiFetch } from './config';

export const ordersApi = {
  getAll: () =>
    apiFetch('/orders'),

  getByUser: (userId) =>
    apiFetch(`/orders?userId=${userId}`),

  create: (data) =>
    apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id, status, extra = {}) =>
    apiFetch(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, ...extra }),
    }),

  remove: (id) =>
    apiFetch(`/orders/${id}`, { method: 'DELETE' }),

  getStats: () =>
    apiFetch('/orders/stats'),
};
