import { describe, it, expect } from 'vitest';
import { ORDER_STATUS, STATUS_COLORS, STATUS_LABELS } from '../constants/orderStatus';

describe('ORDER_STATUS — constantes', () => {
  it('define los 6 estados esperados', () => {
    expect(Object.keys(ORDER_STATUS)).toHaveLength(6);
    expect(ORDER_STATUS.PENDING).toBe('pendiente');
    expect(ORDER_STATUS.CONFIRMED).toBe('confirmado');
    expect(ORDER_STATUS.PREPARING).toBe('preparando');
    expect(ORDER_STATUS.ON_WAY).toBe('en_camino');
    expect(ORDER_STATUS.DELIVERED).toBe('entregado');
    expect(ORDER_STATUS.CANCELLED).toBe('cancelado');
  });
});

describe('STATUS_COLORS', () => {
  it('tiene color definido para cada estado', () => {
    Object.values(ORDER_STATUS).forEach(status => {
      expect(STATUS_COLORS[status]).toBeDefined();
      expect(typeof STATUS_COLORS[status]).toBe('string');
    });
  });
});

describe('STATUS_LABELS', () => {
  it('tiene etiqueta definida para cada estado', () => {
    Object.values(ORDER_STATUS).forEach(status => {
      expect(STATUS_LABELS[status]).toBeDefined();
      expect(STATUS_LABELS[status].length).toBeGreaterThan(0);
    });
  });

  it('las etiquetas están en español', () => {
    expect(STATUS_LABELS[ORDER_STATUS.PENDING]).toBe('Pendiente');
    expect(STATUS_LABELS[ORDER_STATUS.ON_WAY]).toBe('En camino');
    expect(STATUS_LABELS[ORDER_STATUS.DELIVERED]).toBe('Entregado');
  });
});
