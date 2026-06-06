import { storage } from './storageService';
import { PRODUCTS, CATEGORIES } from '../data/products';

const seed = () => {
  const storedProducts = storage.get('products');
  const storedCats = storage.get('categories');

  if (!storedProducts) {
    storage.set('products', PRODUCTS);
  } else {
    const existingIds = new Set(storedProducts.map(p => p.id));
    const newProducts = PRODUCTS.filter(p => !existingIds.has(p.id));
    if (newProducts.length > 0) storage.set('products', [...storedProducts, ...newProducts]);
  }

  if (!storedCats) {
    storage.set('categories', CATEGORIES);
  } else {
    const existingCatIds = new Set(storedCats.map(c => c.id));
    const newCats = CATEGORIES.filter(c => !existingCatIds.has(c.id));
    if (newCats.length > 0) storage.set('categories', [...storedCats, ...newCats]);
  }
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
    const newProduct = { id: Date.now(), available: true, createdAt: new Date().toISOString(), ...data };
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
    // fallback: primer producto de las categorías más importantes
    const priority = ['hamburguesas', 'salchipapas', 'broasters', 'ofertas', 'platos_carta', 'recomendaciones', 'menu_dia', 'pizzas'];
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
