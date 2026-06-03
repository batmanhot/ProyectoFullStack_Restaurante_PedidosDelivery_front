import { useApp } from '../context/AppContext';
import Navbar from './Navbar';

const StarIcon = () => (
  <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Header = () => {
  const { config } = useApp();

  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative bg-gray-900">
      {/* Promo banner */}
      {config.showPromo && config.promoText && (
        <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-semibold tracking-wide animate-pulse-once">
          {config.promoText}
        </div>
      )}

      {/* Hero image */}
      <div
        className="relative h-80 md:h-120 bg-cover bg-center"
        style={{ backgroundImage: `url('${config.headerImage}')` }}
      >
        {/* Gradient overlay — cálido, no plano negro */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/75" />

        <Navbar />

        {/* Contenido central */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pt-12">
          <div className="relative mb-4">
            <img
              src={config.logo}
              alt={`Logo ${config.nombre}`}
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full shadow-2xl ring-4 ring-white/30"
            />
            {config.acceptingOrders && (
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" title="Abierto" />
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest drop-shadow-lg">
            {config.nombre}
          </h1>
          <p className="mt-1 text-white/80 text-sm md:text-base max-w-sm">{config.slogan}</p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-4 flex-wrap justify-center">
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold">
              <StarIcon />
              <span>{config.rating || '4.8'}</span>
              <span className="text-white/60 text-xs">({config.totalReviews || '200+'})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold">
              <span>🛵</span>
              <span>{config.deliveryTime || '30-45 min'}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${config.acceptingOrders ? 'bg-green-500/80' : 'bg-red-600/80'} backdrop-blur-sm`}>
              <span>{config.acceptingOrders ? '🟢' : '🔴'}</span>
              <span>{config.acceptingOrders ? 'Abierto ahora' : 'Cerrado'}</span>
            </div>
          </div>

          {/* CTA */}
          {config.acceptingOrders && (
            <button
              onClick={scrollToMenu}
              className="mt-6 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black px-8 py-3 rounded-2xl shadow-xl shadow-red-900/40 transition-all flex items-center gap-2 text-sm md:text-base"
            >
              Ver Menú Completo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Trust strip */}
      <div className="bg-gray-900 border-t border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-6 flex-wrap">
          {[
            { icon: '✅', text: 'Pago 100% seguro' },
            { icon: '🛵', text: `Entrega ${config.deliveryTime || '30-45 min'}` },
            { icon: '📱', text: 'Pedido por WhatsApp' },
            { icon: '🍔', text: 'Ingredientes frescos' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
