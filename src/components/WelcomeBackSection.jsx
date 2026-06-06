import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderService, ORDER_STATUS } from '../services/orderService';
import { formatMoney } from '../utils/format';

const STATUS_INFO = {
  [ORDER_STATUS.PENDING]:   { label: 'Pendiente de confirmación', icon: '📋', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  [ORDER_STATUS.CONFIRMED]: { label: 'Confirmado — en preparación próxima', icon: '✅', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  [ORDER_STATUS.PREPARING]: { label: 'Preparando tu pedido', icon: '👨‍🍳', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  [ORDER_STATUS.ON_WAY]:    { label: '¡Tu pedido va en camino!', icon: '🛵', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  [ORDER_STATUS.DELIVERED]: { label: 'Entregado con éxito', icon: '🎉', color: 'text-green-600 bg-green-50 border-green-200' },
  [ORDER_STATUS.CANCELLED]: { label: 'Cancelado', icon: '❌', color: 'text-red-600 bg-red-50 border-red-200' },
};

const ACTIVE_STATUSES = [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED, ORDER_STATUS.PREPARING, ORDER_STATUS.ON_WAY];

const WelcomeBackSection = ({ onScrollToMenu }) => {
  const { user, isAdmin, isLogged } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(() => {
    if (!isLogged || isAdmin || !user) return;
    setOrders(
      orderService.getOrdersByUser(user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, [user, isAdmin, isLogged]);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    const onStorage = (e) => {
      if (e.key === 'bq_orders' || e.key === null) loadOrders();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, [loadOrders]);

  if (!isLogged || isAdmin) return null;

  const activeOrder = orders.find(o => ACTIVE_STATUSES.includes(o.status));
  const lastOrder = orders[0];
  const totalOrders = orders.length;

  const displayOrder = activeOrder || lastOrder;
  const statusInfo = displayOrder ? STATUS_INFO[displayOrder.status] : null;

  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Saludo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl font-black shrink-0">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-black text-lg leading-tight">
                ¡Bienvenido de vuelta, {user.name?.split(' ')[0]}! 👋
              </p>
              <p className="text-red-100 text-xs mt-0.5">
                {totalOrders === 0
                  ? '¿Listo para tu primer pedido?'
                  : `${totalOrders} pedido${totalOrders > 1 ? 's' : ''} en tu historial`}
              </p>
            </div>
          </div>

          {/* Estado del pedido activo o último */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {displayOrder && statusInfo && (
              <Link
                to="/mis-pedidos"
                className="flex items-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/40 px-4 py-2.5 rounded-2xl transition-all group"
              >
                <span className="text-xl">{statusInfo.icon}</span>
                <div>
                  <p className="text-xs text-red-100 leading-none mb-0.5">
                    {activeOrder ? 'Pedido activo' : 'Último pedido'}
                  </p>
                  <p className="font-bold text-sm text-white leading-tight">
                    #{displayOrder.orderNumber} · {formatMoney(displayOrder.total)}
                  </p>
                  <p className="text-[11px] text-red-100 leading-none mt-0.5">{statusInfo.label}</p>
                </div>
                <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors ml-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}

            {/* CTAs */}
            <div className="flex gap-2">
              {displayOrder && (
                <Link
                  to="/mis-pedidos"
                  className="text-xs font-bold bg-white text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-all shrink-0"
                >
                  📋 Mis Pedidos
                </Link>
              )}
              <button
                onClick={onScrollToMenu}
                className="text-xs font-bold bg-white/15 hover:bg-white/25 border border-white/30 text-white px-4 py-2.5 rounded-xl transition-all shrink-0"
              >
                {totalOrders === 0 ? '🍔 Ver Menú' : '🔄 Volver a Pedir'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBackSection;
