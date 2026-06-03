import { storage } from './storageService';

const cartKey = (userId) => `cart_${userId || 'guest'}`;

export const cartService = {
  getCart: (userId) => storage.get(cartKey(userId)) || [],

  saveCart: (userId, items) => storage.set(cartKey(userId), items),

  clearCart: (userId) => storage.remove(cartKey(userId)),

  addItem: (userId, product) => {
    const cart = cartService.getCart(userId);
    const existing = cart.find(i => i.id === product.id);
    let updated;
    if (existing) {
      if (existing.quantity >= 10) return { ok: false, error: 'Límite alcanzado (10)' };
      updated = cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }
    cartService.saveCart(userId, updated);
    return { ok: true, cart: updated };
  },

  removeItem: (userId, productId) => {
    const updated = cartService.getCart(userId).filter(i => i.id !== productId);
    cartService.saveCart(userId, updated);
    return updated;
  },

  updateQuantity: (userId, productId, quantity) => {
    if (quantity < 1 || quantity > 10) return cartService.getCart(userId);
    const updated = cartService.getCart(userId).map(i => i.id === productId ? { ...i, quantity } : i);
    cartService.saveCart(userId, updated);
    return updated;
  },
};
