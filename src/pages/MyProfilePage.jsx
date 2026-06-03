import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { orderService, ORDER_STATUS } from '../services/orderService';
import { storage } from '../services/storageService';

const ACTIVE_STATUSES = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.ON_WAY,
];

const MyProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { config, showToast } = useApp();

  const activeOrders = useMemo(
    () => orderService.getOrdersByUser(user.id).filter(o => ACTIVE_STATUSES.includes(o.status)),
    [user.id]
  );
  const isLocked = activeOrders.length > 0;

  const [tab, setTab] = useState('datos');
  const [saving, setSaving] = useState(false);

  const [dataForm, setDataForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
  });
  const [passForm, setPassForm] = useState({
    current: '',
    next: '',
    confirm: '',
  });
  const [dataError, setDataError] = useState('');
  const [passError, setPassError] = useState('');

  const handleSaveData = (e) => {
    e.preventDefault();
    if (!dataForm.name.trim() || !dataForm.email.trim()) {
      setDataError('Nombre y email son obligatorios.');
      return;
    }
    setDataError('');
    setSaving(true);
    setTimeout(() => {
      const result = updateProfile({ name: dataForm.name.trim(), email: dataForm.email.trim(), phone: dataForm.phone.trim() });
      setSaving(false);
      if (result.ok) {
        showToast('Datos actualizados correctamente');
      } else {
        setDataError(result.error);
      }
    }, 500);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setPassError('');
    const users = storage.get('users') || [];
    const storedUser = users.find(u => u.id === user.id);

    if (!storedUser || storedUser.password !== passForm.current) {
      setPassError('La contraseña actual es incorrecta.');
      return;
    }
    if (passForm.next.length < 8) {
      setPassError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (passForm.next !== passForm.confirm) {
      setPassError('Las contraseñas nuevas no coinciden.');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      const result = updateProfile({ password: passForm.next });
      setSaving(false);
      if (result.ok) {
        showToast('Contraseña actualizada correctamente');
        setPassForm({ current: '', next: '', confirm: '' });
      } else {
        setPassError(result.error);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <img src={config.logo} alt="Logo" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <h1 className="font-black text-gray-800 leading-tight">Mi Perfil</h1>
              <p className="text-xs text-gray-400">{config.nombre}</p>
            </div>
          </div>
          <Link to="/mis-pedidos" className="text-sm text-gray-500 hover:text-red-600 font-semibold transition-colors">
            Mis Pedidos →
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">

        {/* Avatar + nombre */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-red-500 to-orange-400 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-black text-xl text-gray-800 truncate">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            {user.phone && <p className="text-sm text-gray-400">{user.phone}</p>}
          </div>
        </div>

        {/* Alerta de bloqueo */}
        {isLocked && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
            <span className="text-2xl shrink-0">🔒</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">No puedes editar tus datos ahora</p>
              <p className="text-amber-700 text-xs mt-0.5">
                Tienes {activeOrders.length} pedido{activeOrders.length > 1 ? 's' : ''} activo{activeOrders.length > 1 ? 's' : ''} en proceso.
                Podrás actualizar tu información una vez que {activeOrders.length > 1 ? 'sean entregados' : 'sea entregado'}.
              </p>
              <Link to="/mis-pedidos" className="inline-block mt-2 text-xs font-bold text-amber-600 hover:underline">
                Ver mis pedidos activos →
              </Link>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
          {[
            { id: 'datos', label: '👤 Mis Datos' },
            { id: 'password', label: '🔑 Contraseña' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${tab === t.id ? 'bg-red-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Datos personales */}
        {tab === 'datos' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-5">Datos Personales</h2>

            {dataError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                {dataError}
              </div>
            )}

            <form onSubmit={handleSaveData} className="space-y-4">
              <Field
                label="Nombre completo"
                value={dataForm.name}
                onChange={v => setDataForm({ ...dataForm, name: v })}
                disabled={isLocked}
                placeholder="Tu nombre completo"
              />
              <Field
                label="Email"
                type="email"
                value={dataForm.email}
                onChange={v => setDataForm({ ...dataForm, email: v })}
                disabled={isLocked}
                placeholder="tu@email.com"
              />
              <Field
                label="Celular (WhatsApp)"
                type="tel"
                value={dataForm.phone}
                onChange={v => setDataForm({ ...dataForm, phone: v })}
                disabled={isLocked}
                placeholder="Ej: 951655295"
              />

              {isLocked ? (
                <div className="flex items-center gap-2 py-3 px-4 bg-gray-50 rounded-2xl text-gray-400 text-sm font-medium">
                  <span>🔒</span> Edición bloqueada durante pedido activo
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-red-600 text-white font-bold py-3.5 rounded-2xl hover:bg-red-700 transition-all disabled:opacity-50 shadow-lg shadow-red-100"
                >
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              )}
            </form>
          </div>
        )}

        {/* Tab: Contraseña */}
        {tab === 'password' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-1">Cambiar Contraseña</h2>
            <p className="text-xs text-gray-400 mb-5">Ingresa tu contraseña actual y la nueva que deseas usar.</p>

            {passError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                {passError}
              </div>
            )}

            <form onSubmit={handleSavePassword} className="space-y-4">
              <Field
                label="Contraseña actual"
                type="password"
                value={passForm.current}
                onChange={v => setPassForm({ ...passForm, current: v })}
                disabled={isLocked}
                placeholder="••••••••"
              />
              <Field
                label="Nueva contraseña"
                type="password"
                value={passForm.next}
                onChange={v => setPassForm({ ...passForm, next: v })}
                disabled={isLocked}
                placeholder="Mínimo 4 caracteres"
              />
              <Field
                label="Confirmar nueva contraseña"
                type="password"
                value={passForm.confirm}
                onChange={v => setPassForm({ ...passForm, confirm: v })}
                disabled={isLocked}
                placeholder="••••••••"
              />

              {isLocked ? (
                <div className="flex items-center gap-2 py-3 px-4 bg-gray-50 rounded-2xl text-gray-400 text-sm font-medium">
                  <span>🔒</span> Edición bloqueada durante pedido activo
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gray-800 text-white font-bold py-3.5 rounded-2xl hover:bg-gray-900 transition-all disabled:opacity-50 shadow-lg"
                >
                  {saving ? 'Guardando...' : 'Cambiar Contraseña'}
                </button>
              )}
            </form>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl text-xs text-yellow-700">
              <span className="font-bold">DEV:</span> Contraseñas en texto plano — se hashearán con bcrypt en la etapa de backend.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, type = 'text', disabled, placeholder }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all ${
        disabled
          ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed'
          : 'border-gray-200 focus:ring-2 focus:ring-red-500 bg-white'
      }`}
    />
  </div>
);

export default MyProfilePage;
