import { useApp } from '../context/AppContext';

const STATS = [
  { value: '2,500+', label: 'Pedidos Entregados', icon: '📦' },
  { value: '1,800+', label: 'Clientes Satisfechos', icon: '😊' },
  { value: '30-45 min', label: 'Tiempo de Entrega', icon: '⚡' },
  { value: '7 días', label: 'Atención Semanal', icon: '📅' },
];

const TrustIndicators = () => {
  const { config } = useApp();

  return (
    <section className="bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-black text-white">
            Números que nos avalan
          </h2>
          <p className="text-gray-400 text-sm mt-1">La confianza de nuestros clientes lo dice todo</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-2xl mb-2">{stat.icon}</span>
              <span className="text-2xl md:text-3xl font-black text-red-500 leading-none">{stat.value}</span>
              <span className="text-gray-400 text-xs mt-1.5 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Badges de confianza */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-green-600/15 border border-green-600/30 text-green-400 px-4 py-2 rounded-full text-xs font-semibold">
            <span>💵</span> Pago contra entrega
          </div>
          <div className="flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-full text-xs font-semibold">
            <span>🎁</span> Cremas de cortesía gratis
          </div>
          <div className="flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-xs font-semibold">
            <span>🛵</span> Delivery {config.deliveryTime || '30-45 min'}
          </div>
          <div className="flex items-center gap-2 bg-purple-500/15 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-xs font-semibold">
            <span>📱</span> Consultas al WhatsApp
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
