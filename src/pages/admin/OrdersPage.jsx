import { useState } from 'react';
import { orderService, ORDER_STATUS } from '../../services/orderService';
import { STATUS_COLORS } from '../../constants/orderStatus';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/format';

const NEXT_STATUS = {
  [ORDER_STATUS.PENDING]:   ORDER_STATUS.CONFIRMED,
  [ORDER_STATUS.CONFIRMED]: ORDER_STATUS.PREPARING,
  [ORDER_STATUS.PREPARING]: ORDER_STATUS.ON_WAY,
  [ORDER_STATUS.ON_WAY]:    ORDER_STATUS.DELIVERED,
};

const NEXT_LABEL = {
  [ORDER_STATUS.PENDING]:   'Confirmar pedido',
  [ORDER_STATUS.CONFIRMED]: 'Iniciar preparación',
  [ORDER_STATUS.PREPARING]: 'Asignar repartidor',
  [ORDER_STATUS.ON_WAY]:    'Marcar como entregado',
};

const OrdersPage = () => {
  const { config, showToast } = useApp();
  const [orders, setOrders] = useState(() =>
    orderService.getOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [deliveryModal, setDeliveryModal] = useState(null); // { id, order }
  const [deliveryPerson, setDeliveryPerson] = useState('');
  const [sendWA, setSendWA] = useState(true);

  const refresh = () =>
    setOrders(orderService.getOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

  const advance = (id, currentStatus) => {
    if (currentStatus === ORDER_STATUS.PREPARING) {
      const order = orders.find(o => o.id === id);
      setDeliveryModal({ id, order });
      setDeliveryPerson('');
      setSendWA(true);
      return;
    }
    orderService.updateStatus(id, NEXT_STATUS[currentStatus]);
    refresh();
  };

  const confirmDelivery = () => {
    if (!deliveryPerson.trim()) return;
    const { id, order } = deliveryModal;

    orderService.updateStatus(id, ORDER_STATUS.ON_WAY, { deliveryPerson: deliveryPerson.trim() });

    if (sendWA && order?.phone) {
      const now = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
      const msg =
        `🛵 *¡Tu pedido está en camino!*\n\n` +
        `Hola *${order.customerName}*, tu pedido *#${order.orderNumber}* de *${config.nombre}* ya salió.\n\n` +
        `🏍 *Repartidor:* ${deliveryPerson.trim()}\n` +
        `⏰ *Hora de salida:* ${now}\n` +
        `📍 *Entrega en:* ${order.address}\n` +
        `${order.reference ? `📌 *Referencia:* ${order.reference}\n` : ''}` +
        `\n💰 *Total:* ${formatMoney(order.total)}\n` +
        `\n_¡Gracias por tu preferencia en ${config.nombre}! 😊_`;

      window.open(`https://wa.me/${order.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
      showToast('Pedido enviado a delivery · WhatsApp abierto');
    } else {
      showToast('Pedido enviado a delivery');
    }

    setDeliveryModal(null);
    refresh();
  };

  const cancel = (id) => {
    orderService.updateStatus(id, ORDER_STATUS.CANCELLED);
    refresh();
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black text-gray-800 mb-2">Pedidos</h1>
      <p className="text-gray-500 mb-6">Gestiona y actualiza el estado de los pedidos</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...Object.values(ORDER_STATUS)].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${filter === s ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
          >
            {s === 'all' ? 'Todos' : s.replace('_', ' ')}
            {s !== 'all' && (
              <span className="ml-1.5 text-xs">({orders.filter(o => o.status === s).length})</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          No hay pedidos{filter !== 'all' ? ` con estado "${filter}"` : ''}.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div>
                  <p className="font-bold text-gray-800">#{order.orderNumber} — {order.customerName}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleString('es-PE')} · {order.paymentMethod}
                  </p>
                  {order.deliveryPerson && (
                    <p className="text-xs text-purple-600 font-semibold mt-0.5">🛵 {order.deliveryPerson}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-green-600">{formatMoney(order.total)}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${STATUS_COLORS[order.status]}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                  <span className="text-gray-400 text-sm">{expanded === order.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === order.id && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Datos de entrega</p>
                      <p className="text-sm"><span className="font-semibold">Nombre:</span> {order.customerName}</p>
                      <p className="text-sm"><span className="font-semibold">Celular:</span> {order.phone}</p>
                      <p className="text-sm"><span className="font-semibold">Dirección:</span> {order.address}</p>
                      {order.reference && (
                        <p className="text-sm"><span className="font-semibold">Referencia:</span> {order.reference}</p>
                      )}
                      {order.deliveryPerson && (
                        <p className="text-sm">
                          <span className="font-semibold">Repartidor:</span>{' '}
                          <span className="text-purple-600 font-bold">{order.deliveryPerson}</span>
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Detalle del pedido</p>
                      {order.items?.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.quantity}x {item.name}</span>
                          <span className="font-semibold">{formatMoney(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-green-600">{formatMoney(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    {NEXT_STATUS[order.status] && (
                      <button
                        onClick={() => advance(order.id, order.status)}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all"
                      >
                        ✓ {NEXT_LABEL[order.status]}
                      </button>
                    )}
                    {order.status !== ORDER_STATUS.CANCELLED && order.status !== ORDER_STATUS.DELIVERED && (
                      <button
                        onClick={() => cancel(order.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 text-sm font-bold rounded-xl hover:bg-red-200 transition-all"
                      >
                        Cancelar pedido
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal asignar repartidor */}
      {deliveryModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-zoom-in">
            <div className="text-center mb-5">
              <span className="text-5xl block mb-3">🛵</span>
              <h2 className="text-xl font-black text-gray-800">Enviar a Delivery</h2>
              <p className="text-gray-500 text-sm mt-1">
                Pedido <strong>#{deliveryModal.order?.orderNumber}</strong> — {deliveryModal.order?.customerName}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 mb-4 space-y-1 text-sm">
              <p className="text-gray-600"><span className="font-semibold">📍 Dirección:</span> {deliveryModal.order?.address}</p>
              {deliveryModal.order?.reference && (
                <p className="text-gray-600"><span className="font-semibold">📌 Referencia:</span> {deliveryModal.order.reference}</p>
              )}
              <p className="text-gray-600"><span className="font-semibold">📱 Celular:</span> {deliveryModal.order?.phone}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Nombre del repartidor *</label>
                <input
                  type="text"
                  value={deliveryPerson}
                  onChange={e => setDeliveryPerson(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && confirmDelivery()}
                  placeholder="Ej: Carlos Mamani"
                  autoFocus
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              {deliveryModal.order?.phone && (
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-all">
                  <input
                    type="checkbox"
                    checked={sendWA}
                    onChange={e => setSendWA(e.target.checked)}
                    className="w-4 h-4 accent-green-600"
                  />
                  <div>
                    <p className="text-sm font-bold text-green-700">Notificar al cliente por WhatsApp</p>
                    <p className="text-xs text-green-600">{deliveryModal.order.phone}</p>
                  </div>
                  <svg className="w-6 h-6 fill-green-600 ml-auto shrink-0" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.422 1.096 3.37l-1.127 4.12 4.221-1.107c.928.508 1.99.799 3.123.799 3.182 0 5.768-2.585 5.768-5.767 0-3.181-2.586-5.782-5.714-5.782zm3.393 8.24c-.15.422-.751.767-1.05.81-.255.03-.585.045-1.02-.09-.239-.074-.539-.18-.915-.345-1.396-.615-2.28-2.025-2.355-2.13-.074-.105-.623-.84-.623-1.605 0-.765.405-1.14.54-1.29.135-.15.3-.18.405-.18h.27c.09 0 .21.015.315.225.105.255.375.915.405.99.03.075.045.165.015.255-.03.09-.06.15-.12.225-.06.075-.12.165-.18.24-.06.06-.12.135-.045.24.075.105.345.57.735.915.51.45.945.585 1.08.66.135.075.21.06.285-.015.075-.075.33-.39.42-.525.09-.135.18-.105.3-.06.12.045.765.36.9.435.135.075.225.105.255.165.03.06.03.345-.12.765zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.116 1.81 5.74L2 22l4.318-1.132C7.884 21.393 9.866 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </label>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setDeliveryModal(null)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelivery}
                  disabled={!deliveryPerson.trim()}
                  className="flex-2 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all disabled:opacity-50 shadow-lg"
                >
                  🛵 Enviar a Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
