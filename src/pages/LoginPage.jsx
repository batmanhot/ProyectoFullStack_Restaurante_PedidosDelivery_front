import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const BENEFITS = [
  { icon: '📍', text: 'Sigue tu pedido en tiempo real' },
  { icon: '⚡', text: 'Checkout más rápido' },
  { icon: '📋', text: 'Historial completo de pedidos' },
  { icon: '🎁', text: 'Accede a promociones exclusivas' },
];

const LoginPage = () => {
  const { login } = useAuth();
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
    <div className="min-h-screen bg-stone-50 flex flex-col">

      {/* Top bar */}
      <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={config.logo} alt="Logo" className="w-8 h-8 rounded-full object-cover ring-2 ring-red-500" />
          <span className="font-black text-sm">{config.nombre}</span>
        </Link>
        <Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la tienda
        </Link>
      </div>

      <div className="flex flex-1 flex-col md:flex-row">

        {/* Panel izquierdo — beneficios */}
        <div className="hidden md:flex md:w-5/12 bg-linear-to-br from-gray-900 to-red-950 text-white flex-col justify-center px-12 py-16">
          <div className="mb-8">
            <img src={config.logo} alt="Logo" className="w-20 h-20 rounded-full object-cover ring-4 ring-red-500/50 mb-6" />
            <h2 className="text-3xl font-black leading-tight mb-2">
              Todo tu antojo<br />en un solo lugar
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Inicia sesión para una experiencia de pedido más rápida y personalizada.
            </p>
          </div>

          <div className="space-y-4">
            {BENEFITS.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <span className="text-xl w-8 shrink-0">{b.icon}</span>
                <span className="text-sm text-gray-300 font-medium">{b.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">Nuestros clientes dicen</p>
            <p className="text-sm text-white/80 italic">"Entrega rápida y comida deliciosa. Las cremas de cortesía son un detalle que me encanta."</p>
            <p className="text-xs text-red-300 font-semibold mt-2">— María G. ⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        {/* Panel derecho — formulario */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">

            {/* Logo mobile */}
            <div className="md:hidden text-center mb-8">
              <img src={config.logo} alt="Logo" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 shadow-lg ring-4 ring-red-100" />
              <h1 className="text-2xl font-black text-gray-800">{config.nombre}</h1>
              <p className="text-gray-500 text-sm mt-1">Todo tu antojo en un solo lugar</p>
            </div>

            <h2 className="text-2xl font-black text-gray-800 mb-1">Inicia Sesión</h2>
            <p className="text-gray-500 text-sm mb-6">¿No tienes cuenta?{' '}
              <Link to="/register" className="text-red-600 font-bold hover:underline">Regístrate gratis</Link>
            </p>

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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm bg-white"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm bg-white"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-black py-3.5 rounded-2xl hover:bg-red-700 transition-all disabled:opacity-50 shadow-lg shadow-red-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Ingresando...
                  </>
                ) : 'Ingresar →'}
              </button>
            </form>

            {/* Beneficios mobile */}
            <div className="md:hidden mt-6 grid grid-cols-2 gap-2">
              {BENEFITS.map((b) => (
                <div key={b.text} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                  <span className="text-base">{b.icon}</span>
                  <span className="text-xs text-gray-600 font-medium leading-tight">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Continuar sin cuenta →
              </Link>
            </div>

            {/* DEV accesos rápidos */}
            {import.meta.env.DEV && (
              <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                <p className="text-xs text-gray-400 text-center mb-2 font-mono">[ DEV — Acceso rápido ]</p>
                <button
                  onClick={fillAdmin}
                  className="w-full text-xs py-2 px-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl hover:bg-yellow-100 transition-all font-mono"
                >
                  🔧 Admin: admin@burguer.com / admin123
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
