const BENEFITS = [
  {
    icon: '🥩',
    title: 'Ingredientes Frescos',
    desc: 'Seleccionamos los mejores ingredientes cada día para garantizar sabor y calidad en cada plato.',
  },
  {
    icon: '🛵',
    title: 'Delivery Rápido',
    desc: 'Llevamos tu pedido directamente a tu puerta en 30-45 minutos. Rápido y calentito.',
  },
  {
    icon: '💵',
    title: 'Pago Contra Entrega',
    desc: 'Paga en efectivo, Yape o tarjeta al recibir tu pedido. Sin pagos anticipados.',
  },
  {
    icon: '🎁',
    title: 'Cremas de Cortesía',
    desc: 'Todos nuestros pedidos delivery incluyen cremas de cortesía. ¡Un detalle que nos distingue!',
  },
  {
    icon: '⚡',
    title: 'Atención Rápida',
    desc: 'Tu pedido se prepara al momento. Abiertos todos los días de 11:00 a 22:00.',
  },
  {
    icon: '🍽️',
    title: 'Amplia Variedad',
    desc: 'Hamburguesas, broasters, salchipapas, platos especiales, bebidas y mucho más.',
  },
];

const BenefitsSection = () => (
  <section className="bg-stone-50 py-14">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <span className="inline-block bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          Nuestros diferenciales
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
          ¿Por qué elegir <span className="text-red-600">Doña Nella</span>?
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          Más que comida rápida — una experiencia de sabor que llega hasta tu puerta.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="flex flex-col items-center text-center p-5 rounded-2xl bg-stone-50 border border-gray-100 hover:border-red-100 hover:shadow-md transition-all duration-200 group"
          >
            <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
              {b.icon}
            </span>
            <h3 className="font-black text-gray-800 text-sm mb-1.5">{b.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
