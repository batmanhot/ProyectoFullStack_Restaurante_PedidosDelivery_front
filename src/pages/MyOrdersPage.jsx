import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { orderService, ORDER_STATUS } from '../services/orderService';
import { STATUS_LABELS } from '../constants/orderStatus';
import DeliveryAlert from '../components/DeliveryAlert';
import { formatMoney } from '../utils/format';

const STATUS_STEPS = [
  { key: ORDER_STATUS.PENDING,   label: 'Recibido',    icon: '📋' },
  { key: ORDER_STATUS.CONFIRMED, label: 'Confirmado',  icon: '✅' },
  { key: ORDER_STATUS.PREPARING, label: 'Preparando',  icon: '👨‍🍳' },
  { key: ORDER_STATUS.ON_WAY,    label: 'En camino',   icon: '🛵' },
  { key: ORDER_STATUS.DELIVERED, label: 'Entregado',   icon: '🎉' },
];

const STATUS_ORDER = STATUS_STEPS.map(s => s.key);

const getStepIndex = (status) => STATUS_ORDER.indexOf(status);

const StatusTimeline = ({ status }) => {
  const currentIndex = getStepIndex(status);
  const isCancelled = status === ORDER_STATUS.CANCELLED;

  if (isCancelled) {
    return (
      <div className="flex items-center justify-center py-3">
        <span className="bg-red-100 text-red-600 font-bold px-4 py-2 rounded-full text-sm">
          ❌ Pedido Cancelado
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-between mt-4 mb-2 px-2">
      {/* connecting line */}
      <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200 mx-8 z-0" />
      <div
        className="absolute left-0 top-5 h-1 bg-green-500 mx-8 z-0 transition-all duration-700"
        style={{ width: currentIndex === 0 ? '0%' : `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
      />

      {STATUS_STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        return (
          <div key={step.key} className="flex flex-col items-center z-10 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all border-2 ${
              done    ? 'bg-green-500 border-green-500 text-white shadow-md' :
              active  ? 'bg-white border-green-500 shadow-lg scale-110' :
                        'bg-white border-gray-200 text-gray-300'
            }`}>
              {done ? '✓' : step.icon}
            </div>
            <p className={`text-xs mt-2 font-semibold text-center leading-tight ${
              active ? 'text-green-600' : done ? 'text-green-500' : 'text-gray-300'
            }`}>
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const isActive = ![ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED].includes(order.status);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all ${
      isActive ? 'border-green-200 shadow-green-50' : 'border-gray-100'
    }`}>
      {/* Card header */}
      <div
        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-gray-800 text-lg">#{order.orderNumber}</span>
              {isActive && (
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full animate-pulse">
                  En proceso
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              {new Date(order.createdAt).toLocaleDateString('es-PE', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit',
              })}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-black text-green-600">{formatMoney(order.total)}</p>
            <p className="text-xs text-gray-400">{order.items?.length} producto(s)</p>
          </div>
        </div>

        <StatusTimeline status={order.status} />

        {/* Delivery person — visible only when on the way */}
        {order.status === ORDER_STATUS.ON_WAY && order.deliveryPerson && (
          <div className="mt-3 flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
            <span className="text-2xl">🛵</span>
            <div>
              <p className="text-xs text-orange-500 font-semibold uppercase tracking-wider">Tu pedido va en camino</p>
              <p className="text-sm font-bold text-orange-700">
                Lo trae: <span className="text-orange-800">{order.deliveryPerson}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Entrega</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Dirección:</span> {order.address}</p>
              {order.reference && <p className="text-sm text-gray-700"><span className="font-semibold">Referencia:</span> {order.reference}</p>}
              <p className="text-sm text-gray-700"><span className="font-semibold">Contacto:</span> {order.phone}</p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Pago:</span>{' '}
                {{ efectivo: 'Efectivo contraentrega', yape: 'Yape', tarjeta: 'Tarjeta' }[order.paymentMethod] || order.paymentMethod}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Detalle del pedido</p>
              {order.items?.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-semibold text-gray-800">{formatMoney(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-2 space-y-1">
                {order.deliveryCost > 0 && (
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span><span>{formatMoney(order.deliveryCost)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{formatMoney(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MyOrdersPage = () => {
  const { user } = useAuth();
  const { config } = useApp();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('activos');

  useEffect(() => {
    const userOrders = orderService.getOrdersByUser(user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOrders(userOrders);
  }, [user.id]);

  const activeOrders = orders.filter(o =>
    ![ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED].includes(o.status)
  );
  const historyOrders = orders.filter(o =>
    [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED].includes(o.status)
  );

  const displayed = filter === 'activos' ? activeOrders : historyOrders;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <DeliveryAlert />
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <img src={config.logo} alt="Logo" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <h1 className="font-black text-gray-800 leading-tight">Mis Pedidos</h1>
              <p className="text-xs text-gray-400">{config.nombre}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-gray-700 hidden sm:block">{user?.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
          <button
            onClick={() => setFilter('activos')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${filter === 'activos' ? 'bg-red-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
          >
            En Proceso
            {activeOrders.length > 0 && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === 'activos' ? 'bg-white/30' : 'bg-red-100 text-red-600'}`}>
                {activeOrders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('historial')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${filter === 'historial' ? 'bg-red-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Historial
            {historyOrders.length > 0 && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === 'historial' ? 'bg-white/30' : 'bg-gray-100 text-gray-600'}`}>
                {historyOrders.length}
              </span>
            )}
          </button>
        </div>

        {/* Orders list */}
        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">{filter === 'activos' ? '🛵' : '📋'}</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {filter === 'activos' ? 'No tienes pedidos activos' : 'Sin historial aún'}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {filter === 'activos' ? '¡Haz tu primer pedido ahora!' : 'Tus pedidos entregados aparecerán aquí.'}
            </p>
            {filter === 'activos' && (
              <Link to="/" className="inline-block bg-red-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100">
                Ver el Menú
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayed.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
