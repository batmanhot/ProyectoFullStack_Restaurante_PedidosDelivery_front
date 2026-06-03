import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const mergeCartItems = (userCart, guestCart) => {
  const merged = [...userCart];
  guestCart.forEach(guestItem => {
    const existing = merged.find(i => i.id === guestItem.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + guestItem.quantity, 10);
    } else {
      merged.push(guestItem);
    }
  });
  return merged;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const prevUserIdRef = useRef(userId);

  const [cart, setCart] = useState(() => cartService.getCart(userId));

  useEffect(() => {
    const prevUserId = prevUserIdRef.current;

    if (prevUserId === 'guest' && userId !== 'guest') {
      const guestCart = cartService.getCart('guest');
      if (guestCart.length > 0) {
        const userCart = cartService.getCart(userId);
        const merged = mergeCartItems(userCart, guestCart);
        cartService.saveCart(userId, merged);
        cartService.clearCart('guest');
      }
    }

    setCart(cartService.getCart(userId));
    prevUserIdRef.current = userId;
  }, [userId]);

  const addToCart = (product) => {
    const result = cartService.addItem(userId, product);
    if (result.ok) { setCart(result.cart); return { ok: true }; }
    return result;
  };

  const removeFromCart = (productId) => setCart(cartService.removeItem(userId, productId));

  const updateQuantity = (productId, quantity) =>
    setCart(cartService.updateQuantity(userId, productId, quantity));

  const clearCart = () => { cartService.clearCart(userId); setCart([]); };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
