import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { orderService, ORDER_STATUS } from '../services/orderService';
import { storage } from '../services/storageService';

const POLL_INTERVAL = 5000;
const DISMISSED_KEY = 'delivery_alerts_dismissed';

const getDismissed = () => storage.get(DISMISSED_KEY) || [];
const dismiss = (orderId) => {
  const dismissed = getDismissed();
  if (!dismissed.includes(orderId)) storage.set(DISMISSED_KEY, [...dismissed, orderId]);
};

const DeliveryAlert = () => {
  const { user, isAdmin } = useAuth();
  const { config } = useApp();
  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState(false);

  const checkOrders = useCallback(() => {
    if (!user || isAdmin) return;
    const dismissed = getDismissed();
    const onWayOrder = orderService
      .getOrdersByUser(user.id)
      .find(o => o.status === ORDER_STATUS.ON_WAY && !dismissed.includes(o.id));

    if (onWayOrder && (!alert || alert.id !== onWayOrder.id)) {
      setAlert(onWayOrder);
      setVisible(true);
    }
  }, [user, isAdmin, alert]);

  useEffect(() => {
    checkOrders();

    // Polling — respaldo para mismo tab
    const interval = setInterval(checkOrders, POLL_INTERVAL);

    // storage event — real-time cuando el admin cambia estado desde otro tab/ventana
    const onStorage = (e) => {
      if (e.key === 'bq_orders' || e.key === null) checkOrders();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, [checkOrders]);

  const handleDismiss = () => {
    if (alert) dismiss(alert.id);
    setVisible(false);
    setTimeout(() => setAlert(null), 400);
  };

  if (!alert || !visible) return null;

  const departureTime = alert.departureTime
    ? new Date(alert.departureTime).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <>
      {/* Overlay oscuro */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90"
        onClick={handleDismiss}
      />

      {/* Alerta central */}
      <div className="fixed inset-0 z-91 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm animate-bounce-in">

          {/* Pulso de fondo */}
          <div className="absolute inset-0 rounded-3xl bg-orange-400 opacity-20 animate-ping" style={{ animationDuration: '2s' }} />

          <div className="relative bg-linear-to-br from-orange-500 to-red-600 rounded-3xl shadow-2xl overflow-hidden">

            {/* Barra superior animada */}
            <div className="h-1.5 bg-white/30">
              <div className="h-full bg-white animate-[slide-right_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 text-center">
              <div className="relative inline-block mb-3">
                <span className="text-6xl block animate-[wiggle_1s_ease-in-out_infinite]">🛵</span>
                <span className="absolute -top-1 -right-1 text-xl animate-bounce">💨</span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">
                ¡Tu pedido está en camino!
              </h2>
              <p className="text-orange-100 text-sm mt-1 font-medium">
                Pedido #{alert.orderNumber} · {config.nombre}
              </p>
            </div>

            {/* Info tarjeta */}
            <div className="mx-4 mb-4 bg-white/15 backdrop-blur-sm rounded-2xl p-4 space-y-3">
              {alert.deliveryPerson && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
                    🏍
                  </div>
                  <div>
                    <p className="text-orange-100 text-xs font-semibold uppercase tracking-wider">Tu repartidor</p>
                    <p className="text-white font-black text-lg leading-tight">{alert.deliveryPerson}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <div className="min-w-0">
                  <p className="text-orange-100 text-xs font-semibold uppercase tracking-wider">Dirección de entrega</p>
                  <p className="text-white font-bold text-sm leading-tight truncate">{alert.address}</p>
                  {alert.reference && (
                    <p className="text-orange-200 text-xs">Ref: {alert.reference}</p>
                  )}
                </div>
              </div>

              {departureTime && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
                    ⏰
                  </div>
                  <div>
                    <p className="text-orange-100 text-xs font-semibold uppercase tracking-wider">Hora de salida</p>
                    <p className="text-white font-black text-lg leading-tight">{departureTime}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer botones */}
            <div className="px-4 pb-5 space-y-2">
              <Link
                to="/mis-pedidos"
                onClick={handleDismiss}
                className="block w-full bg-white text-orange-600 font-black py-3.5 rounded-2xl text-center hover:bg-orange-50 transition-all shadow-lg text-sm"
              >
                Ver seguimiento completo →
              </Link>
              <button
                onClick={handleDismiss}
                className="w-full text-white/70 hover:text-white py-2 text-xs font-medium transition-colors"
              >
                Entendido, cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryAlert;
