import { describe, it, expect, beforeEach } from 'vitest';
import { productService } from '../services/productService';

const makeProduct = (overrides = {}) => ({
  name: 'Burger Test',
  price: 25,
  category: 'hamburguesas',
  image: 'https://example.com/burger.jpg',
  description: 'Un burger de prueba',
  available: true,
  featured: false,
  badge: '',
  ...overrides,
});

describe('productService.addProduct', () => {
  it('agrega un producto con id numérico único', () => {
    const p = productService.addProduct(makeProduct());
    expect(p.id).toBeDefined();
    expect(typeof p.id).toBe('number');
  });

  it('agrega con available: true por defecto', () => {
    const p = productService.addProduct(makeProduct());
    expect(p.available).toBe(true);
  });

  it('persiste en la lista de productos', () => {
    const p = productService.addProduct(makeProduct({ name: 'Smash Único' }));
    const all = productService.getProducts();
    expect(all.find(x => x.id === p.id)).toBeDefined();
  });
});

describe('productService.updateProduct', () => {
  it('actualiza el nombre del producto', () => {
    const p = productService.addProduct(makeProduct());
    const updated = productService.updateProduct(p.id, { name: 'Nuevo Nombre' });
    expect(updated.name).toBe('Nuevo Nombre');
  });

  it('no modifica otros campos no enviados', () => {
    const p = productService.addProduct(makeProduct({ price: 30 }));
    productService.updateProduct(p.id, { name: 'Cambiado' });
    const all = productService.getProducts();
    const found = all.find(x => x.id === p.id);
    expect(found.price).toBe(30);
  });
});

describe('productService.deleteProduct', () => {
  it('elimina el producto por id', () => {
    const p = productService.addProduct(makeProduct());
    productService.deleteProduct(p.id);
    const all = productService.getProducts();
    expect(all.find(x => x.id === p.id)).toBeUndefined();
  });
});

describe('productService.toggleAvailability', () => {
  it('cambia available de true a false', () => {
    const p = productService.addProduct(makeProduct({ available: true }));
    productService.toggleAvailability(p.id);
    const all = productService.getProducts();
    expect(all.find(x => x.id === p.id).available).toBe(false);
  });

  it('cambia available de false a true', () => {
    const p = productService.addProduct(makeProduct({ available: false }));
    productService.toggleAvailability(p.id);
    const all = productService.getProducts();
    expect(all.find(x => x.id === p.id).available).toBe(true);
  });
});

describe('productService.toggleFeatured', () => {
  it('marca como destacado', () => {
    const p = productService.addProduct(makeProduct({ featured: false }));
    productService.toggleFeatured(p.id);
    const all = productService.getProducts();
    expect(all.find(x => x.id === p.id).featured).toBe(true);
  });
});

describe('productService.setBadge', () => {
  it('asigna el badge correcto', () => {
    const p = productService.addProduct(makeProduct());
    productService.setBadge(p.id, 'popular');
    const all = productService.getProducts();
    expect(all.find(x => x.id === p.id).badge).toBe('popular');
  });
});

describe('productService.getFeaturedProducts', () => {
  it('devuelve solo productos con featured: true y available: true', () => {
    productService.addProduct(makeProduct({ featured: true,  available: true  }));
    productService.addProduct(makeProduct({ featured: true,  available: false }));
    productService.addProduct(makeProduct({ featured: false, available: true  }));

    const featured = productService.getFeaturedProducts();
    expect(featured.every(p => p.featured)).toBe(true);
    expect(featured.every(p => p.available !== false)).toBe(true);
  });

  it('devuelve fallback de categorías si no hay destacados', () => {
    productService.addProduct(makeProduct({ featured: false, category: 'hamburguesas' }));
    const featured = productService.getFeaturedProducts();
    expect(featured.length).toBeGreaterThan(0);
  });
});

describe('productService — categorías', () => {
  it('agrega una nueva categoría', () => {
    const cat = productService.addCategory({ name: 'Especialidades', icon: '🌟' });
    expect(cat.id).toBe('especialidades');
    const cats = productService.getCategories();
    expect(cats.find(c => c.id === 'especialidades')).toBeDefined();
  });

  it('la categoría combos existe en el seed', () => {
    const cats = productService.getCategories();
    expect(cats.find(c => c.id === 'combos')).toBeDefined();
  });

  it('elimina una categoría creada', () => {
    productService.addCategory({ name: 'Temporal', icon: '⏳' });
    productService.deleteCategory('temporal');
    const cats = productService.getCategories();
    expect(cats.find(c => c.id === 'temporal')).toBeUndefined();
  });
});
