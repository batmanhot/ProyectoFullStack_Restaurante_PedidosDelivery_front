import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const LoginPage = () => {
  const { login, isAdmin } = useAuth();
  const { showToast, config } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (result.ok) {
        showToast(`¡Bienvenido, ${result.user.name}!`);
        navigate(result.user.role === 'admin' ? '/admin' : '/');
      } else {
        setError(result.error);
      }
    }, 600);
  };

  const fillAdmin = () => setForm({ email: 'admin@burguer.com', password: 'admin123' });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={config.logo} alt="Logo" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow-lg ring-4 ring-red-100" />
          <h1 className="text-3xl font-black text-gray-800">{config.nombre}</h1>
          <p className="text-gray-500 mt-1">Inicia sesión para hacer tu pedido</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-2xl hover:bg-red-700 transition-all disabled:opacity-50 shadow-lg shadow-red-100"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-red-600 font-bold hover:underline">Regístrate</Link>
          </p>

          <p className="text-center text-sm text-gray-400 mt-2">
            <Link to="/" className="hover:text-gray-600">← Continuar sin cuenta</Link>
          </p>

          {/* Visible solo en desarrollo local */}
          {import.meta.env.DEV && (
            <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
              <p className="text-xs text-gray-400 text-center mb-2 font-mono">[ DEV — Accesos rápidos ]</p>
              <button
                onClick={fillAdmin}
                className="w-full text-xs py-2 px-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl hover:bg-yellow-100 transition-all font-mono"
              >
                Admin: admin@burguer.com / admin123
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
