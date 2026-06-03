import { storage } from './storageService';
export { ORDER_STATUS } from '../constants/orderStatus';

export const orderService = {
  getOrders: () => storage.get('orders') || [],

  getOrdersByUser: (userId) => {
    return orderService.getOrders().filter(o => o.userId === userId);
  },

  createOrder: (orderData) => {
    const orders = orderService.getOrders();
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      orderNumber: orders.length + 1001,
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };
    storage.set('orders', [...orders, newOrder]);
    return newOrder;
  },

  updateStatus: (id, status) => {
    const orders = orderService.getOrders();
    const extra = status === ORDER_STATUS.ON_WAY ? { departureTime: new Date().toISOString() } : {};
    const updated = orders.map(o =>
      o.id === id ? { ...o, status, updatedAt: new Date().toISOString(), ...extra } : o
    );
    storage.set('orders', updated);
    return updated.find(o => o.id === id);
  },

  deleteOrder: (id) => {
    const orders = orderService.getOrders();
    storage.set('orders', orders.filter(o => o.id !== id));
  },

  getStats: () => {
    const orders = orderService.getOrders();
    const total = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const byStatus = Object.values(ORDER_STATUS).reduce((acc, s) => {
      acc[s] = orders.filter(o => o.status === s).length;
      return acc;
    }, {});
    return { total: orders.length, revenue: total, byStatus };
  },
};
