import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { productService } from '../services/productService';

const BADGE_COLORS = {
  popular:   'bg-orange-500',
  oferta:    'bg-red-600',
  destacado: 'bg-green-600',
  nuevo:     'bg-blue-500',
};

const getBadgeColor = (badge) => BADGE_COLORS[badge] || 'bg-gray-500';

const getItems = (description) =>
  (description || '')
    .split('+')
    .map(s => s.trim())
    .filter(Boolean);

const ComboSection = ({ onScrollToMenu, onAddToCart }) => {
  const { config } = useApp();
  const [combos, setCombos] = useState([]);

  const loadCombos = useCallback(() => {
    const products = productService.getProducts();
    setCombos(
      products
        .filter(p => p.category === 'combos' && p.available !== false)
    );
  }, []);

  useEffect(() => {
    loadCombos();
    const interval = setInterval(loadCombos, 5000);
    const onStorage = (e) => {
      if (e.key === 'bq_products' || e.key === null) loadCombos();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, [loadCombos]);

  if (combos.length === 0) return null;

  return (
    <section className="bg-stone-50 py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Combos especiales
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Pide Más, Paga Menos
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Arma tu combo y ahorra en cada pedido
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 max-w-4xl mx-auto ${
          combos.length === 1 ? 'md:grid-cols-1 max-w-sm' :
          combos.length === 2 ? 'md:grid-cols-2 max-w-2xl' :
                                'md:grid-cols-3'
        }`}>
          {combos.map((combo) => {
            const items = getItems(combo.description);
            const hasDiscount = combo.originalPrice && combo.originalPrice > combo.price;
            const badgeColor = getBadgeColor(combo.badge);

            return (
              <div
                key={combo.id}
                className={`relative rounded-2xl border-2 p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  combo.featured
                    ? 'border-red-500 bg-red-50 shadow-lg shadow-red-100'
                    : 'border-gray-100 bg-stone-50 hover:border-red-200'
                }`}
              >
                {/* Badge */}
                {combo.comboTag && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${badgeColor} text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap`}>
                    {combo.comboTag}
                  </span>
                )}

                {/* Imagen o icono */}
                <div className="flex justify-center mb-4 mt-2">
                  {combo.image ? (
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-20 h-20 rounded-2xl object-cover shadow-md"
                    />
                  ) : (
                    <span className="text-5xl">🎁</span>
                  )}
                </div>

                <h3 className="font-black text-gray-900 text-lg text-center mb-1">{combo.name}</h3>

                {/* Subtítulo: descripción completa */}
                {combo.description && (
                  <p className="text-gray-500 text-xs text-center mb-4 leading-relaxed">
                    {combo.description}
                  </p>
                )}

                {/* Lista de ítems (solo si hay separadores +) */}
                {items.length > 1 && (
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500 font-black">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Precio */}
                <div className="text-center mb-4 mt-auto">
                  {hasDiscount && (
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-gray-400 line-through text-sm">
                        S/{combo.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs font-black px-2 py-0.5 rounded-full">
                        Ahorras S/{(combo.originalPrice - combo.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <p className={`text-3xl font-black ${combo.featured ? 'text-red-600' : 'text-gray-900'}`}>
                    S/{combo.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => onAddToCart ? onAddToCart(combo) : onScrollToMenu?.()}
                  className={`w-full font-black py-3 rounded-xl transition-all active:scale-95 text-sm ${
                    combo.featured
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ComboSection;
