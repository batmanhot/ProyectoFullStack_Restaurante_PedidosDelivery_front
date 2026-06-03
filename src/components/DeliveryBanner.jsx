import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderService, ORDER_STATUS } from '../services/orderService';

const POLL_INTERVAL = 5000;

const DeliveryBanner = () => {
  const { user, isAdmin } = useAuth();
  const [order, setOrder] = useState(null);

  const checkOrders = useCallback(() => {
    if (!user || isAdmin) { setOrder(null); return; }
    const onWay = orderService
      .getOrdersByUser(user.id)
      .find(o => o.status === ORDER_STATUS.ON_WAY);
    setOrder(onWay || null);
  }, [user, isAdmin]);

  useEffect(() => {
    checkOrders();
    const interval = setInterval(checkOrders, POLL_INTERVAL);
    const onStorage = (e) => {
      if (e.key === 'bq_orders' || e.key === null) checkOrders();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, [checkOrders]);

  if (!order) return null;

  const departureTime = order.departureTime
    ? new Date(order.departureTime).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <Link
      to="/mis-pedidos"
      className="block w-full bg-orange-50 border-b-2 border-orange-200 hover:bg-orange-100 transition-colors animate-slide-up"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl shrink-0 animate-[wiggle_1s_ease-in-out_infinite]">🛵</span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-wider leading-none mb-0.5">
              Tu pedido va en camino
            </p>
            <p className="text-sm font-black text-orange-800 truncate">
              {order.deliveryPerson
                ? <>Lo trae: <span className="text-red-700">{order.deliveryPerson}</span></>
                : <>Pedido #{order.orderNumber} · {order.address}</>
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {departureTime && (
            <span className="text-xs text-orange-500 font-semibold hidden sm:block">
              Salió a las {departureTime}
            </span>
          )}
          <span className="text-xs font-bold text-orange-600 bg-orange-200 px-3 py-1.5 rounded-full whitespace-nowrap">
            Ver seguimiento →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DeliveryBanner;
