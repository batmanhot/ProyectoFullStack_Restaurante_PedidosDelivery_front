import { describe, it, expect, beforeEach } from 'vitest';
import { orderService, ORDER_STATUS } from '../services/orderService';

// Helper para crear un pedido de prueba
const makeOrder = (overrides = {}) => ({
  userId: 'user-1',
  customerName: 'Test Cliente',
  phone: '999888777',
  address: 'Av. Test 123',
  paymentMethod: 'efectivo',
  items: [{ id: 1, name: 'Burger', price: 25, quantity: 2 }],
  subtotal: 50,
  deliveryCost: 5,
  total: 55,
  ...overrides,
});

describe('orderService.createOrder', () => {
  it('crea un pedido con estado PENDING por defecto', () => {
    const order = orderService.createOrder(makeOrder());
    expect(order.status).toBe(ORDER_STATUS.PENDING);
  });

  it('asigna un id único con prefijo ORD-', () => {
    const order = orderService.createOrder(makeOrder());
    expect(order.id).toMatch(/^ORD-/);
  });

  it('asigna un orderNumber basado en la cantidad de pedidos', () => {
    const first = orderService.createOrder(makeOrder());
    const second = orderService.createOrder(makeOrder());
    expect(second.orderNumber).toBeGreaterThan(first.orderNumber);
  });

  it('incluye createdAt como ISO string', () => {
    const order = orderService.createOrder(makeOrder());
    expect(() => new Date(order.createdAt)).not.toThrow();
  });
});

describe('orderService.updateStatus — transiciones válidas', () => {
  let orderId;

  beforeEach(() => {
    const order = orderService.createOrder(makeOrder());
    orderId = order.id;
  });

  it('pendiente → confirmado', () => {
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.CONFIRMED);
    expect(updated.status).toBe(ORDER_STATUS.CONFIRMED);
  });

  it('confirmado → preparando', () => {
    orderService.updateStatus(orderId, ORDER_STATUS.CONFIRMED);
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.PREPARING);
    expect(updated.status).toBe(ORDER_STATUS.PREPARING);
  });

  it('preparando → en_camino (agrega departureTime)', () => {
    orderService.updateStatus(orderId, ORDER_STATUS.CONFIRMED);
    orderService.updateStatus(orderId, ORDER_STATUS.PREPARING);
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.ON_WAY);
    expect(updated.status).toBe(ORDER_STATUS.ON_WAY);
    expect(updated.departureTime).toBeDefined();
  });

  it('en_camino → entregado', () => {
    orderService.updateStatus(orderId, ORDER_STATUS.CONFIRMED);
    orderService.updateStatus(orderId, ORDER_STATUS.PREPARING);
    orderService.updateStatus(orderId, ORDER_STATUS.ON_WAY);
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.DELIVERED);
    expect(updated.status).toBe(ORDER_STATUS.DELIVERED);
  });

  it('acepta deliveryPerson como campo extra en en_camino', () => {
    orderService.updateStatus(orderId, ORDER_STATUS.CONFIRMED);
    orderService.updateStatus(orderId, ORDER_STATUS.PREPARING);
    const updated = orderService.updateStatus(
      orderId, ORDER_STATUS.ON_WAY, { deliveryPerson: 'Carlos' }
    );
    expect(updated.deliveryPerson).toBe('Carlos');
  });

  it('cancelado se permite desde cualquier estado', () => {
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.CANCELLED);
    expect(updated.status).toBe(ORDER_STATUS.CANCELLED);
  });
});

describe('orderService.updateStatus — transiciones INVÁLIDAS (no deben saltar estados)', () => {
  let orderId;

  beforeEach(() => {
    const order = orderService.createOrder(makeOrder());
    orderId = order.id;
  });

  it('NO permite saltar de pendiente a preparando', () => {
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.PREPARING);
    expect(updated.status).toBe(ORDER_STATUS.PENDING);
  });

  it('NO permite saltar de pendiente a en_camino', () => {
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.ON_WAY);
    expect(updated.status).toBe(ORDER_STATUS.PENDING);
  });

  it('NO permite saltar de pendiente a entregado', () => {
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.DELIVERED);
    expect(updated.status).toBe(ORDER_STATUS.PENDING);
  });

  it('NO permite retroceder de confirmado a pendiente', () => {
    orderService.updateStatus(orderId, ORDER_STATUS.CONFIRMED);
    const updated = orderService.updateStatus(orderId, ORDER_STATUS.PENDING);
    expect(updated.status).toBe(ORDER_STATUS.CONFIRMED);
  });

  it('retorna null si el id no existe', () => {
    const result = orderService.updateStatus('NO-EXISTE', ORDER_STATUS.CONFIRMED);
    expect(result).toBeNull();
  });
});

describe('orderService.getOrdersByUser', () => {
  it('filtra pedidos por userId', () => {
    orderService.createOrder(makeOrder({ userId: 'user-A' }));
    orderService.createOrder(makeOrder({ userId: 'user-B' }));
    orderService.createOrder(makeOrder({ userId: 'user-A' }));

    const userA = orderService.getOrdersByUser('user-A');
    expect(userA).toHaveLength(2);
    expect(userA.every(o => o.userId === 'user-A')).toBe(true);
  });

  it('devuelve array vacío si el usuario no tiene pedidos', () => {
    const result = orderService.getOrdersByUser('ghost');
    expect(result).toEqual([]);
  });
});

describe('orderService.deleteOrder', () => {
  it('elimina el pedido por id', () => {
    const order = orderService.createOrder(makeOrder());
    orderService.deleteOrder(order.id);
    const all = orderService.getOrders();
    expect(all.find(o => o.id === order.id)).toBeUndefined();
  });
});

describe('orderService.getStats', () => {
  it('calcula correctamente el total de ingresos', () => {
    orderService.createOrder(makeOrder({ total: 100 }));
    orderService.createOrder(makeOrder({ total: 50 }));
    const stats = orderService.getStats();
    expect(stats.revenue).toBe(150);
  });

  it('cuenta pedidos por estado', () => {
    const o1 = orderService.createOrder(makeOrder());
    const o2 = orderService.createOrder(makeOrder());
    orderService.updateStatus(o2.id, ORDER_STATUS.CONFIRMED);

    const stats = orderService.getStats();
    expect(stats.byStatus[ORDER_STATUS.PENDING]).toBe(1);
    expect(stats.byStatus[ORDER_STATUS.CONFIRMED]).toBe(1);
  });
});
