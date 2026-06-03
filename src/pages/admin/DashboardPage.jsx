import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { orderService, ORDER_STATUS } from '../../services/orderService';
import { STATUS_COLORS } from '../../constants/orderStatus';
import { productService } from '../../services/productService';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';
import { formatMoney } from '../../utils/format';

const StatCard = ({ label, value, sub, color, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <span className="text-3xl">{icon}</span>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${color}`}>{sub}</span>
    </div>
    <p className="text-3xl font-black text-gray-800">{value}</p>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);

const DashboardPage = () => {
  const { config } = useApp();
  const stats = useMemo(() => orderService.getStats(), []);
  const products = productService.getProducts();
  const users = authService.getUsers();

  const recentOrders = orderService.getOrders()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const statusColors = STATUS_COLORS;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido al panel de {config.nombre}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="🛒" label="Pedidos Totales" value={stats.total} sub="Total" color="bg-blue-100 text-blue-700" />
        <StatCard icon="💰" label="Ingresos Totales" value={formatMoney(stats.revenue)} sub="Acumulado" color="bg-green-100 text-green-700" />
        <StatCard icon="🍔" label="Productos" value={products.length} sub="En carta" color="bg-orange-100 text-orange-700" />
        <StatCard icon="👥" label="Clientes" value={users.length} sub="Registrados" color="bg-purple-100 text-purple-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(stats.byStatus).map(([status, count]) => (
          <div key={status} className={`rounded-2xl px-4 py-3 flex justify-between items-center ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
            <span className="font-semibold capitalize text-sm">{status.replace('_', ' ')}</span>
            <span className="text-2xl font-black">{count}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Últimos Pedidos</h2>
          <Link to="/admin/orders" className="text-red-600 text-sm font-semibold hover:underline">Ver todos →</Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No hay pedidos aún.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-gray-800 text-sm">#{order.orderNumber} — {order.customerName}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('es-PE')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-green-600 text-sm">{formatMoney(order.total)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
