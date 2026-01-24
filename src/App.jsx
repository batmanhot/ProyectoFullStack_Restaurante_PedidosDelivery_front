import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartBar from './components/CartBar';
import CartModal from './components/CartModal';
import ProductViewModal from './components/ProductViewModal';
import CategoryFilter from './components/CategoryFilter';
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

  const renderProductSection = (category) => {
    const filteredProducts = PRODUCTS.filter(p => p.category === category.id);
    if (filteredProducts.length === 0) return null;

    return (
      <section key={category.id} className="mb-16 last:mb-0">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <span className="text-4xl">{category.icon}</span> {category.name}
          </h3>
          <div className="flex-grow h-1 bg-gradient-to-r from-gray-200 to-transparent rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewProduct={setViewProduct}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans selection:bg-red-100 selection:text-red-900">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-gray-800 mb-4 tracking-tight">Nuestra Carta</h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 text-lg">El sabor auténtico hecho hamburguesa. Calidad premium en cada mordida.</p>
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
          <div className="animate-zoom-in">
            {activeCategory === 'all'
              ? CATEGORIES.map(cat => renderProductSection(cat))
              : renderProductSection(CATEGORIES.find(c => c.id === activeCategory))
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
