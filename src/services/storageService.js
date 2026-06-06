/**
 * storageService — capa de datos local (localStorage)
 *
 * SWAP GUIDE — cuando el backend esté listo:
 *
 * 1. En orderService.js  → reemplazar cada `storage.get/set` con `ordersApi.*`
 * 2. En productService.js → reemplazar con `productsApi.*`
 * 3. En AuthContext.jsx   → reemplazar con `authApi.*`
 * 4. En AppContext.jsx    → reemplazar con `storeConfigApi.*`
 *
 * Los módulos API skeleton ya están en src/api/
 * El cliente HTTP base está en src/api/config.js
 *
 * Real-time updates: el polling de 5s en MyOrdersPage/WelcomeBackSection
 * puede reemplazarse con WebSocket (socket.io) o Server-Sent Events.
 */

const PREFIX = 'bq_';

export const storage = {
  get: (key) => {
    try {
      const val = localStorage.getItem(PREFIX + key);
      return val ? JSON.parse(val) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove: (key) => localStorage.removeItem(PREFIX + key),
  clear: () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  },
};
