import { useApp } from '../context/AppContext';

const PROMOS = [
  {
    id: 'dia',
    tag: 'Promoción del Día',
    tagColor: 'bg-red-600',
    emoji: '🔥',
    title: 'Lunes a Viernes',
    subtitle: '11:00 am – 4:00 pm',
    desc: '2 Hamburguesas + 2 Bebidas al precio especial. ¡Solo en horario de almuerzo!',
    discount: '15% OFF',
    discountColor: 'bg-red-100 text-red-700',
    bg: 'from-red-50 to-orange-50',
    border: 'border-red-100',
  },
  {
    id: 'finde',
    tag: 'Especial Fin de Semana',
    tagColor: 'bg-purple-600',
    emoji: '🎉',
    title: 'Sábado y Domingo',
    subtitle: 'Todo el día',
    desc: 'Combo Familiar con bebida gratis incluida. Ideal para reunirse con familia y amigos.',
    discount: 'Bebida GRATIS',
    discountColor: 'bg-purple-100 text-purple-700',
    bg: 'from-purple-50 to-pink-50',
    border: 'border-purple-100',
  },
  {
    id: 'grupos',
    tag: 'Para Grupos',
    tagColor: 'bg-green-600',
    emoji: '👥',
    title: '4 personas o más',
    subtitle: 'Cualquier día',
    desc: 'Pedidos grupales desde S/120 con descuento especial y cremas de cortesía adicionales.',
    discount: '10% OFF',
    discountColor: 'bg-green-100 text-green-700',
    bg: 'from-green-50 to-teal-50',
    border: 'border-green-100',
  },
];

const PromotionsSection = ({ onScrollToMenu }) => {
  const { config } = useApp();

  return (
    <section className="bg-stone-50 py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-orange-50 text-orange-600 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Ofertas especiales
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            Promociones que no te puedes perder
          </h2>
          <p className="text-gray-500 text-sm mt-2">Más sabor, mejor precio — cada día hay una razón para pedir</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PROMOS.map((promo) => (
            <div
              key={promo.id}
              className={`relative rounded-2xl border-2 ${promo.border} bg-gradient-to-br ${promo.bg} p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}
            >
              {/* Tag */}
              <span className={`absolute -top-3 left-5 ${promo.tagColor} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full`}>
                {promo.tag}
              </span>

              <div className="flex items-start justify-between mt-3 mb-4">
                <span className="text-4xl">{promo.emoji}</span>
                <span className={`text-xs font-black px-3 py-1.5 rounded-full ${promo.discountColor}`}>
                  {promo.discount}
                </span>
              </div>

              <h3 className="font-black text-gray-900 text-lg leading-tight">{promo.title}</h3>
              <p className="text-gray-500 text-xs font-semibold mt-0.5 mb-3">{promo.subtitle}</p>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{promo.desc}</p>

              <button
                onClick={onScrollToMenu}
                className="mt-5 w-full bg-gray-900 hover:bg-gray-800 text-white font-black text-sm py-3 rounded-xl transition-all active:scale-95"
              >
                Aprovechar oferta →
              </button>
            </div>
          ))}
        </div>

        {/* Cremas de cortesía reminder */}
        <div className="mt-8 flex items-center justify-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold px-5 py-2.5 rounded-full">
            <span>🎁</span>
            En TODOS los pedidos delivery incluimos cremas de cortesía sin costo adicional
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
