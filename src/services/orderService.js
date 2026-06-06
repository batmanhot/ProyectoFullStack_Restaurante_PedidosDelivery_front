import { storage } from './storageService';
import { ORDER_STATUS } from '../constants/orderStatus';
export { ORDER_STATUS };

const STATUS_SEQUENCE = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.ON_WAY,
  ORDER_STATUS.DELIVERED,
];

const isValidTransition = (fromStatus, toStatus) => {
  if (toStatus === ORDER_STATUS.CANCELLED) return true;
  const fromIdx = STATUS_SEQUENCE.indexOf(fromStatus);
  const toIdx = STATUS_SEQUENCE.indexOf(toStatus);
  return fromIdx !== -1 && toIdx === fromIdx + 1;
};

export const orderService = {
  getOrders: () => storage.get('orders') || [],

  getOrdersByUser: (userId) => {
    return orderService.getOrders().filter(o => o.userId === userId);
  },

  createOrder: (orderData) => {
    const orders = orderService.getOrders();
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      orderNumber: orders.length + 1001,
      status: ORDER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };
    storage.set('orders', [...orders, newOrder]);
    return newOrder;
  },

  updateStatus: (id, status, extra = {}) => {
    const orders = orderService.getOrders();
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    if (!isValidTransition(order.status, status)) return order;

    const autoExtra = status === ORDER_STATUS.ON_WAY ? { departureTime: new Date().toISOString() } : {};
    const updated = orders.map(o =>
      o.id === id ? { ...o, status, updatedAt: new Date().toISOString(), ...autoExtra, ...extra } : o
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
