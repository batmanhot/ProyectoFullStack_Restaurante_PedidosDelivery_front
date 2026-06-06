import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CartBar from '../components/CartBar';
import DeliveryBanner from '../components/DeliveryBanner';
import CartModal from '../components/CartModal';
import ProductViewModal from '../components/ProductViewModal';
import CategoryFilter from '../components/CategoryFilter';
import PaginatedSection from '../components/PaginatedSection';
import FeaturedSection from '../components/FeaturedSection';
import BenefitsSection from '../components/BenefitsSection';
import TrustIndicators from '../components/TrustIndicators';
import TestimonialsSection from '../components/TestimonialsSection';
import ComboSection from '../components/ComboSection';
import PromotionsSection from '../components/PromotionsSection';
import WelcomeBackSection from '../components/WelcomeBackSection';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { productService } from '../services/productService';

const HomePage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, count } = useCart();
  const { toast, showToast, closeToast, config } = useApp();

  const [products, setProducts] = useState(() => productService.getProducts());
  const [categories, setCategories] = useState(() => productService.getCategories());
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewProduct, setViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    const result = addToCart(product);
    if (result?.ok === false) showToast(result.error, 'error');
    else showToast('¡Añadido al carrito!');
  };

  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const availableProducts = products.filter(p => p.available !== false);
  const menuCategories = categories.filter(c => c.id !== 'combos');

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-red-100 selection:text-red-900 flex flex-col">
      <Header />

      {/* Bienvenida para clientes logueados — justo después del hero */}
      <WelcomeBackSection onScrollToMenu={scrollToMenu} />

      <DeliveryBanner />

      {/* Carrusel de destacados — lo primero que ve el cliente son los platos */}
      {!loading && (
        <div className="bg-stone-50 border-b border-stone-100">
          <div className="container mx-auto px-4 py-10">
            <FeaturedSection
              onAddToCart={handleAddToCart}
              onViewProduct={setViewProduct}
            />
          </div>
        </div>
      )}

      {/* Combos especiales */}
      {!loading && (
        <ComboSection onScrollToMenu={scrollToMenu} onAddToCart={handleAddToCart} />
      )}

      <main id="menu-section" className="flex-1 container mx-auto px-4 pt-8 pb-6">

        {/* Separador + título carta */}
        <div className="flex items-center gap-4 mb-6 mt-4">
          <div className="flex-1 h-px bg-gray-200" />
          <h2 className="text-xl font-black text-gray-700 flex items-center gap-2 shrink-0">
            <span>🍽️</span> Nuestra Carta Completa
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Category filter */}
        <CategoryFilter
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 font-semibold animate-pulse">Preparando el menú...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeCategory === 'all'
              ? menuCategories.map(cat => (
                <PaginatedSection
                  key={cat.id}
                  category={cat}
                  products={availableProducts.filter(p => p.category === cat.id)}
                  onAddToCart={handleAddToCart}
                  onViewProduct={setViewProduct}
                />
              ))
              : (
                <PaginatedSection
                  category={menuCategories.find(c => c.id === activeCategory)}
                  products={availableProducts.filter(p => p.category === activeCategory)}
                  onAddToCart={handleAddToCart}
                  onViewProduct={setViewProduct}
                />
              )
            }
          </div>
        )}
      </main>

      {/* Indicadores de confianza */}
      {!loading && <TrustIndicators />}

      {/* Promociones */}
      {!loading && <PromotionsSection onScrollToMenu={scrollToMenu} />}

      {/* Nuestros Diferenciales — refuerzo de confianza al final del recorrido */}
      {!loading && <BenefitsSection />}

      {/* Testimonios */}
      {!loading && <TestimonialsSection />}

      {!loading && <Footer />}

      <CartBar count={count} onClick={() => setIsCartOpen(true)} />

      {/* Botón flotante WhatsApp */}
      {!loading && <WhatsAppButton />}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        onShowToast={(msg) => showToast(msg)}
      />

      <ProductViewModal
        product={viewProduct}
        isOpen={!!viewProduct}
        onClose={() => setViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
};

export default HomePage;
