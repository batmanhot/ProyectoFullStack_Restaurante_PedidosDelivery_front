import { describe, it, expect } from 'vitest';
import { formatMoney, formatMoneyRaw } from '../utils/format';

describe('formatMoney', () => {
  it('formatea un número entero', () => {
    expect(formatMoney(25)).toBe('S/. 25.00');
  });

  it('formatea un número decimal', () => {
    expect(formatMoney(12.5)).toBe('S/. 12.50');
  });

  it('formatea cero', () => {
    expect(formatMoney(0)).toBe('S/. 0.00');
  });

  it('devuelve S/. 0.00 para null y undefined', () => {
    expect(formatMoney(null)).toBe('S/. 0.00');
    expect(formatMoney(undefined)).toBe('S/. 0.00');
  });

  it('formatea precios grandes correctamente', () => {
    expect(formatMoney(1234.99)).toBe('S/. 1234.99');
  });
});

describe('formatMoneyRaw', () => {
  it('devuelve string sin prefijo S/.', () => {
    expect(formatMoneyRaw(38)).toBe('38.00');
  });

  it('devuelve 0.00 para valores nulos', () => {
    expect(formatMoneyRaw(null)).toBe('0.00');
  });
});
