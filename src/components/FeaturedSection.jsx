import { productService } from '../services/productService';
import { formatMoney } from '../utils/format';

const BADGE_STYLES = {
  popular:   { label: '🔥 Más Vendido', class: 'bg-orange-500' },
  nuevo:     { label: '✨ Nuevo',        class: 'bg-blue-500' },
  oferta:    { label: '🏷️ Oferta',      class: 'bg-green-500' },
  destacado: { label: '⭐ Chef',         class: 'bg-yellow-500' },
};

const FeaturedCard = ({ product, onAddToCart, onViewProduct }) => {
  const badge = product.badge && BADGE_STYLES[product.badge];

  return (
    <div
      className="relative shrink-0 w-56 md:w-64 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:-translate-y-1 cursor-pointer"
      onClick={() => onViewProduct(product)}
    >
      <div className="relative h-44 overflow-hidden">
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
            ⭐ Favorito
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

  // Duplicar ítems para el loop seamless — triplicar si hay pocos
  const items = featured.length < 4
    ? [...featured, ...featured, ...featured]
    : [...featured, ...featured];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-1 h-6 bg-red-600 rounded-full" />
            <span className="text-xs font-black uppercase tracking-widest text-red-600">Lo más pedido</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
            Los Favoritos de Nuestros Clientes
          </h2>
          <p className="text-gray-400 text-sm mt-1">Elegidos semana a semana — añade al carrito con un clic</p>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full shrink-0 animate-pulse">
          <span>En movimiento</span>
          <span>•</span>
          <span>Hover para pausar</span>
        </div>
      </div>

      {/* Contenedor con fade lateral y overflow oculto */}
      <div className="relative overflow-hidden">
        {/* Fade izquierdo */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
        {/* Fade derecho */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />

        {/* Track animado — se pausa al hacer hover */}
        <div
          className="flex gap-4 pb-4 animate-marquee hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {items.map((product, i) => (
            <FeaturedCard
              key={`${product.id}-${i}`}
              product={product}
              onAddToCart={onAddToCart}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
