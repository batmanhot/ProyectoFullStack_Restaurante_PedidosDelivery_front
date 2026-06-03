import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const SettingsPage = () => {
  const { config, updateConfig, showToast } = useApp();
  const [form, setForm] = useState({ ...config });
  const [tab, setTab] = useState('negocio');

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const setPayment = (key, val) => setForm(prev => ({ ...prev, paymentMethods: { ...prev.paymentMethods, [key]: val } }));

  const handleSave = () => {
    updateConfig(form);
    showToast('Configuración guardada correctamente');
  };

  const tabs = [
    { id: 'negocio', label: 'Negocio' },
    { id: 'pagos', label: 'Pagos' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'apariencia', label: 'Apariencia' },
  ];

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800">Configuración</h1>
        <p className="text-gray-500 mt-1">Personaliza la aplicación a tu negocio</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-0">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${tab === t.id ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
        {tab === 'negocio' && (
          <>
            <Field label="Nombre del negocio" value={form.nombre} onChange={v => set('nombre', v)} />
            <Field label="Slogan" value={form.slogan} onChange={v => set('slogan', v)} />
            <Field label="Dirección" value={form.direccion} onChange={v => set('direccion', v)} />
            <Field label="WhatsApp (con código de país, ej: 51951655295)" value={form.whatsapp} onChange={v => set('whatsapp', v)} />
            <Field label="Email de contacto" value={form.email} onChange={v => set('email', v)} />
            <Field label="Horario de atención" value={form.horario} onChange={v => set('horario', v)} />
            <Field label="URL del logo" value={form.logo} onChange={v => set('logo', v)} />
            {form.logo && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <img src={form.logo} alt="Logo" className="w-16 h-16 rounded-full object-cover ring-2 ring-red-100" />
                <p className="text-sm text-gray-500">Vista previa del logo</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Field label="Calificación (ej: 4.8)" value={form.rating || ''} onChange={v => set('rating', v)} />
              <Field label="Reseñas (ej: 200+)" value={form.totalReviews || ''} onChange={v => set('totalReviews', v)} />
            </div>
            <Field label="Tiempo de entrega (ej: 30-45 min)" value={form.deliveryTime || ''} onChange={v => set('deliveryTime', v)} />

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-700 text-sm">Aceptando pedidos</p>
                <p className="text-xs text-gray-400">Desactiva para pausar los pedidos</p>
              </div>
              <button
                onClick={() => set('acceptingOrders', !form.acceptingOrders)}
                className={`w-12 h-6 rounded-full transition-all relative ${form.acceptingOrders ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.acceptingOrders ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="space-y-2 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-orange-700 text-sm">Banner promocional</p>
                <button
                  onClick={() => set('showPromo', !form.showPromo)}
                  className={`w-12 h-6 rounded-full transition-all relative ${form.showPromo ? 'bg-orange-500' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.showPromo ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <input
                value={form.promoText || ''}
                onChange={e => set('promoText', e.target.value)}
                placeholder="Ej: 🔥 ¡Envío GRATIS en tu primer pedido!"
                className="w-full px-3 py-2 border border-orange-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              />
            </div>
          </>
        )}

        {tab === 'pagos' && (
          <>
            <p className="text-sm text-gray-500 mb-2">Activa los métodos de pago disponibles para tus clientes.</p>
            {[
              { key: 'efectivo', label: 'Efectivo Contraentrega', icon: '💵' },
              { key: 'yape', label: 'Yape', icon: '📱' },
              { key: 'tarjeta', label: 'Tarjeta (simulado)', icon: '💳' },
            ].map(m => (
              <div key={m.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="font-semibold text-gray-700 text-sm">{m.label}</span>
                </div>
                <button
                  onClick={() => setPayment(m.key, !form.paymentMethods?.[m.key])}
                  className={`w-12 h-6 rounded-full transition-all relative ${form.paymentMethods?.[m.key] ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.paymentMethods?.[m.key] ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
            <Field label="Número Yape (para QR / contacto)" value={form.yapeNumber || ''} onChange={v => set('yapeNumber', v)} />
            <Field label="URL imagen QR Yape (opcional)" value={form.yapeQr || ''} onChange={v => set('yapeQr', v)} />
            {form.yapeQr && (
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <img src={form.yapeQr} alt="QR Yape" className="w-24 h-24 object-contain rounded-xl border" />
                <p className="text-sm text-gray-500">Vista previa QR Yape</p>
              </div>
            )}
          </>
        )}

        {tab === 'delivery' && (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Costo de delivery S/.</label>
              <input
                type="number" min="0" step="0.5"
                value={form.deliveryCost || 0}
                onChange={e => set('deliveryCost', parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Monto mínimo de pedido S/.</label>
              <input
                type="number" min="0" step="1"
                value={form.minOrderAmount || 0}
                onChange={e => set('minOrderAmount', parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </>
        )}

        {tab === 'apariencia' && (
          <>
            <Field label="URL imagen de portada (header)" value={form.headerImage || ''} onChange={v => set('headerImage', v)} />
            {form.headerImage && (
              <div className="rounded-xl overflow-hidden h-32">
                <img src={form.headerImage} alt="Header" className="w-full h-full object-cover" />
              </div>
            )}
          </>
        )}

        <div className="pt-4 flex gap-3">
          <button onClick={handleSave} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
    <input
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

export default SettingsPage;
