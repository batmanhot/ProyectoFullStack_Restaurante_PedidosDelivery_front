import { formatMoney } from '../utils/format';

const BADGE_STYLES = {
  popular:  { label: '🔥 Popular',  class: 'bg-orange-500 text-white' },
  nuevo:    { label: '✨ Nuevo',    class: 'bg-blue-500 text-white' },
  oferta:   { label: '🏷️ Oferta',  class: 'bg-green-500 text-white' },
  destacado:{ label: '⭐ Chef',    class: 'bg-yellow-500 text-white' },
};

const ProductCard = ({ product, onAddToCart, onViewProduct }) => {
  const badge = product.badge && BADGE_STYLES[product.badge];

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {badge && (
          <span className={`absolute top-2.5 left-2.5 text-xs font-black px-2.5 py-1 rounded-full shadow-lg ${badge.class}`}>
            {badge.label}
          </span>
        )}

        {product.featured && !badge && (
          <span className="absolute top-2.5 left-2.5 text-xs font-black px-2.5 py-1 rounded-full shadow-lg bg-red-600 text-white">
            ⭐ Destacado
          </span>
        )}

        {product.available === false && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-white text-gray-700 font-black text-sm px-4 py-2 rounded-full shadow">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-base font-black text-gray-800 line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-gray-400 text-xs line-clamp-2 grow leading-relaxed">{product.description}</p>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
          <span className="text-xl font-black text-green-600">
            {formatMoney(product.price)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewProduct(product)}
              className="p-2.5 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition-all duration-200"
              title="Ver detalles"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="p-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-200 shadow-md shadow-red-200"
              title="Añadir al carrito"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
