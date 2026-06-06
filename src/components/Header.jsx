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
        className="relative h-96 md:h-128 bg-cover bg-center"
        style={{ backgroundImage: `url('${config.headerImage}')` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/85" />

        <Navbar />

        {/* Contenido central */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pt-16">

          {/* Logo */}
          <div className="relative mb-4">
            <img
              src={config.logo}
              alt={`Logo ${config.nombre}`}
              className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full shadow-2xl ring-4 ring-white/25"
            />
            {config.acceptingOrders && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse" title="Abierto" />
            )}
          </div>

          {/* Nombre — el foco principal */}
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[0.12em] drop-shadow-2xl leading-none">
            {config.nombre}
          </h1>

          {/* Línea divisora roja — ancla visual */}
          <div className="w-14 h-0.5 bg-red-500 rounded-full my-4" />

          {/* Tagline — limpio, una sola idea */}
          <p className="text-sm md:text-base font-medium text-white/85 tracking-wide max-w-xs leading-relaxed">
            {config.slogan || 'Todo tu antojo en un solo lugar'}
          </p>

          {/* Stats — inline, sin pills pesados */}
          <div className="flex items-center gap-3 mt-5 text-xs md:text-sm font-semibold text-white/90 flex-wrap justify-center">
            <div className="flex items-center gap-1">
              <StarIcon />
              <span>{config.rating || '4.8'}</span>
              <span className="text-white/50 ml-0.5">({config.totalReviews || '200+'})</span>
            </div>
            <span className="text-white/25">|</span>
            <div className="flex items-center gap-1.5">
              <span>🛵</span>
              <span>{config.deliveryTime || '30-45 min'}</span>
            </div>
            <span className="text-white/25">|</span>
            <div className={`flex items-center gap-1.5 font-bold ${config.acceptingOrders ? 'text-green-400' : 'text-red-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.acceptingOrders ? 'bg-green-400' : 'bg-red-400'}`} />
              <span>{config.acceptingOrders ? 'Abierto ahora' : 'Cerrado'}</span>
            </div>
          </div>

          {/* CTA único dominante */}
          <div className="mt-8 flex flex-col items-center gap-3">
            {config.acceptingOrders ? (
              <>
                <button
                  onClick={scrollToMenu}
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black px-10 py-4 rounded-2xl shadow-2xl shadow-red-900/60 transition-all text-base md:text-lg flex items-center gap-2.5 tracking-wide"
                >
                  🛒 Pedir Ahora
                </button>
                <button
                  onClick={scrollToMenu}
                  className="text-white/55 hover:text-white/90 text-xs font-medium transition-colors hover:underline underline-offset-4"
                >
                  Ver la carta completa →
                </button>
              </>
            ) : (
              <div className="bg-black/40 border border-white/20 text-white/70 px-6 py-3 rounded-2xl text-sm font-semibold backdrop-blur-sm">
                ⏰ Cerrado por ahora — vuelve pronto
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust strip mejorado */}
      <div className="bg-gray-900 border-t border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-5 flex-wrap">
          <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
            <span>💵</span><span>Pago contra entrega</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <span>🛵</span>
            <span>
              Delivery{' '}
              {config.deliveryCost > 0
                ? <span className="text-orange-200">S/{Number(config.deliveryCost).toFixed(2)}</span>
                : <span className="text-green-300">Gratis</span>}
              {config.deliveryTime ? ` · ${config.deliveryTime}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
            <span>🎁</span><span>Cremas de cortesía</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
            <span>🍔</span><span>Ingredientes frescos</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium">
            <span>📱</span><span>Consultas al WhatsApp</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
