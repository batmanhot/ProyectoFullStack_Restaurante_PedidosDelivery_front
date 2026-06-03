import { storage } from './storageService';
import { PRODUCTS, CATEGORIES } from '../data/products';

const seed = () => {
  if (!storage.get('products')) storage.set('products', PRODUCTS);
  if (!storage.get('categories')) storage.set('categories', CATEGORIES);
};

export const productService = {
  init: seed,

  getProducts: () => { seed(); return storage.get('products') || []; },
  getCategories: () => { seed(); return storage.get('categories') || []; },

  getProduct: (id) => {
    const products = productService.getProducts();
    return products.find(p => p.id === id) || null;
  },

  addProduct: (data) => {
    const products = productService.getProducts();
    const newProduct = { ...data, id: Date.now(), available: true, createdAt: new Date().toISOString() };
    storage.set('products', [...products, newProduct]);
    return newProduct;
  },

  updateProduct: (id, data) => {
    const products = productService.getProducts();
    const updated = products.map(p => p.id === id ? { ...p, ...data } : p);
    storage.set('products', updated);
    return updated.find(p => p.id === id);
  },

  deleteProduct: (id) => {
    const products = productService.getProducts();
    storage.set('products', products.filter(p => p.id !== id));
  },

  toggleAvailability: (id) => {
    const products = productService.getProducts();
    const updated = products.map(p => p.id === id ? { ...p, available: !p.available } : p);
    storage.set('products', updated);
  },

  toggleFeatured: (id) => {
    const products = productService.getProducts();
    const updated = products.map(p => p.id === id ? { ...p, featured: !p.featured } : p);
    storage.set('products', updated);
  },

  setBadge: (id, badge) => {
    const products = productService.getProducts();
    const updated = products.map(p => p.id === id ? { ...p, badge } : p);
    storage.set('products', updated);
  },

  getFeaturedProducts: () => {
    const products = productService.getProducts().filter(p => p.available !== false);
    const featured = products.filter(p => p.featured);
    if (featured.length > 0) return featured;
    // fallback: primer producto de las 4 categorías más importantes
    const priority = ['hamburguesas', 'pizzas', 'recomendaciones', 'menu_dia', 'platos_carta', 'ofertas'];
    const fallback = [];
    priority.forEach(cat => {
      const p = products.find(x => x.category === cat);
      if (p && fallback.length < 6) fallback.push(p);
    });
    return fallback;
  },

  addCategory: (data) => {
    const cats = productService.getCategories();
    const newCat = { ...data, id: data.name.toLowerCase().replace(/\s+/g, '_') };
    storage.set('categories', [...cats, newCat]);
    return newCat;
  },

  deleteCategory: (id) => {
    const cats = productService.getCategories();
    storage.set('categories', cats.filter(c => c.id !== id));
  },
};
