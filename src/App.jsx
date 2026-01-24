import { useState, useEffect } from 'react';
import Header from './components/Header';
import CartBar from './components/CartBar';
import CartModal from './components/CartModal';
import ProductViewModal from './components/ProductViewModal';
import CategoryFilter from './components/CategoryFilter';
import PaginatedSection from './components/PaginatedSection';
import Toast from './components/Toast';
import { PRODUCTS, CATEGORIES } from './data/products';

function App() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewProduct, setViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= 10) {
          setToast({ message: 'Límite alcanzado (10)', type: 'error' });
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast({ message: '¡Añadido al carrito!', type: 'success' });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    if (quantity > 10) {
      setToast({ message: 'Límite máximo: 10 unidades', type: 'error' });
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans selection:bg-red-100 selection:text-red-900">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight leading-tight">
            Nuestra Carta
          </h2>
          <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
            Descubre los mejores sabores preparados con ingredientes de la más alta calidad.
          </p>
        </div>

        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium animate-pulse">Preparando el menú...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeCategory === 'all'
              ? CATEGORIES.map(cat => (
                <PaginatedSection
                  key={cat.id}
                  category={cat}
                  products={PRODUCTS.filter(p => p.category === cat.id)}
                  onAddToCart={addToCart}
                  onViewProduct={setViewProduct}
                />
              ))
              : (
                <PaginatedSection
                  category={CATEGORIES.find(c => c.id === activeCategory)}
                  products={PRODUCTS.filter(p => p.category === activeCategory)}
                  onAddToCart={addToCart}
                  onViewProduct={setViewProduct}
                />
              )
            }
          </div>
        )}
      </main>

      <CartBar
        count={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onClick={() => setIsCartOpen(true)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        onShowToast={(msg) => setToast({ message: msg, type: 'success' })}
      />

      <ProductViewModal
        product={viewProduct}
        isOpen={!!viewProduct}
        onClose={() => setViewProduct(null)}
        onAddToCart={addToCart}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
