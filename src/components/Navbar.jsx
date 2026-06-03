import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { orderService, ORDER_STATUS } from '../services/orderService';

const ACTIVE_STATUSES = [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED, ORDER_STATUS.PREPARING, ORDER_STATUS.ON_WAY];

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { config } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeOrdersCount = user && !isAdmin
    ? orderService.getOrdersByUser(user.id).filter(o =>
        ![ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED].includes(o.status)
      ).length
    : 0;

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Link
            to="/admin"
            className="text-xs bg-red-600 text-white font-bold px-3 py-1.5 rounded-full hover:bg-red-700 transition-all shadow"
          >
            Panel Admin
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            {!isAdmin && (
              <Link
                to="/mis-pedidos"
                className="relative flex items-center gap-1.5 text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full transition-all font-medium"
              >
                <span>📋</span>
                <span className="hidden sm:inline">Mis Pedidos</span>
                {activeOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {activeOrdersCount}
                  </span>
                )}
              </Link>
            )}
            <Link
              to="/mi-perfil"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
              title="Ver mi perfil"
            >
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold shrink-0">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <span className="hidden sm:inline">{user.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full transition-all"
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all font-medium"
            >
              Ingresar
            </Link>
            <Link
              to="/register"
              className="text-sm bg-white text-red-600 font-bold px-4 py-2 rounded-full hover:bg-red-50 transition-all shadow"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
