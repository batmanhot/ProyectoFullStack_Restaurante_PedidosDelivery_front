const TESTIMONIALS = [
  {
    name: 'María G.',
    avatar: '👩',
    rating: 5,
    comment: 'Entrega súper rápida y la comida llegó caliente y deliciosa. Las hamburguesas son increíbles. ¡Ya pedí 3 veces esta semana!',
    product: 'Cheese Burger Duplo',
  },
  {
    name: 'Carlos R.',
    avatar: '👨',
    rating: 5,
    comment: 'Las cremas de cortesía que incluyen son espectaculares. El pollo broaster está buenísimo, crocante por fuera y jugoso por dentro.',
    product: 'Medio Pollo Broaster',
  },
  {
    name: 'Lucía M.',
    avatar: '👩‍🦱',
    rating: 5,
    comment: 'Pedí para toda la familia. El combo familiar nos alcanzó perfecto y el precio es muy bueno. Sin duda el mejor delivery del sector.',
    product: 'Combo Duplo Familiar',
  },
  {
    name: 'Diego P.',
    avatar: '🧑',
    rating: 5,
    comment: 'La salchipapa XXL es enorme y riquísima. Siempre pago contra entrega y nunca ha habido ningún problema. Muy recomendado.',
    product: 'Salchipapa XXL',
  },
  {
    name: 'Ana F.',
    avatar: '👩‍🦰',
    rating: 5,
    comment: 'El pedido llegó en menos de 35 minutos y todo perfecto. Las cremas de cortesía son un detalle que no tienen otros delivery. ¡Volvería a pedir!',
    product: 'Smash Burger',
  },
  {
    name: 'Roberto S.',
    avatar: '👴',
    rating: 5,
    comment: 'Excelente variedad. Pedí hamburguesa para mí y pollo broaster para mi hijo. Los dos felices. Delivery puntual y atención muy amable.',
    product: 'Cuarto de Pollo Broaster',
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {[...Array(count)].map((_, i) => (
      <svg key={i} className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="bg-stone-50 py-14">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <span className="inline-block bg-yellow-50 text-yellow-600 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          Lo que dicen nuestros clientes
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
          Nuestros Clientes Opinan
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Más de 1,800 clientes satisfechos avalan nuestra calidad
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{t.avatar}</span>
              <div>
                <p className="font-black text-gray-800 text-sm">{t.name}</p>
                <Stars count={t.rating} />
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed italic">"{t.comment}"</p>
            <p className="mt-3 text-xs text-red-500 font-semibold">✅ Pidió: {t.product}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-full shadow-sm">
          <span className="text-2xl">⭐</span>
          <span className="font-black text-gray-800 text-lg">4.8</span>
          <span className="text-gray-500 text-sm">— Calificación promedio de nuestros clientes</span>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
