import { productService } from '../services/productService';
import { formatMoney } from '../utils/format';

const BADGE_STYLES = {
  popular:   { label: '🔥 Popular',   class: 'bg-orange-500' },
  nuevo:     { label: '✨ Nuevo',     class: 'bg-blue-500' },
  oferta:    { label: '🏷️ Oferta',   class: 'bg-green-500' },
  destacado: { label: '⭐ Chef',      class: 'bg-yellow-500' },
};

const FeaturedCard = ({ product, onAddToCart, onViewProduct }) => {
  const badge = product.badge && BADGE_STYLES[product.badge];

  return (
    <div
      className="relative shrink-0 w-52 md:w-60 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:-translate-y-1 cursor-pointer"
      onClick={() => onViewProduct(product)}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

        {badge ? (
          <span className={`absolute top-2 left-2 text-[10px] font-black text-white px-2 py-0.5 rounded-full ${badge.class}`}>
            {badge.label}
          </span>
        ) : (
          <span className="absolute top-2 left-2 text-[10px] font-black text-white px-2 py-0.5 rounded-full bg-red-600">
            ⭐ Destacado
          </span>
        )}

        <span className="absolute bottom-2 right-2 text-base font-black text-white drop-shadow-lg">
          {formatMoney(product.price)}
        </span>
      </div>

      <div className="p-3">
        <h4 className="font-black text-gray-800 text-sm line-clamp-1">{product.name}</h4>
        <p className="text-gray-400 text-xs line-clamp-1 mt-0.5">{product.description}</p>

        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2 rounded-xl transition-all active:scale-95 shadow-sm shadow-red-200 flex items-center justify-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

const FeaturedSection = ({ onAddToCart, onViewProduct }) => {
  const featured = productService.getFeaturedProducts();
  if (featured.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-5 px-1">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            🔥 <span>Los Más Pedidos</span>
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">Los favoritos de nuestros clientes</p>
        </div>
        <div className="hidden md:flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
          <span>Desliza</span>
          <span>→</span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide px-1">
        {featured.map(product => (
          <FeaturedCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewProduct={onViewProduct}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
