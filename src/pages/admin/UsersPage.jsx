import { useState } from 'react';
import { authService } from '../../services/authService';
import { useApp } from '../../context/AppContext';

const UsersPage = () => {
  const { showToast } = useApp();
  const [users, setUsers] = useState(() => authService.getUsers());

  const refresh = () => setUsers(authService.getUsers());

  const handleDelete = (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    authService.deleteUser(id);
    refresh();
    showToast('Usuario eliminado', 'error');
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800">Usuarios</h1>
        <p className="text-gray-500 mt-1">{users.length} clientes registrados</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {users.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">👥</p>
            <p>No hay usuarios registrados aún.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Usuario</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Email</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Rol</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-4">Registrado</th>
                <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{u.email}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold capitalize">{u.role}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('es-PE') : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(u.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-sm text-yellow-700">
        <span className="font-bold">DEV:</span> Las contraseñas se almacenan en texto plano en localStorage. Esto se reemplaza con hash + backend en la siguiente etapa.
      </div>
    </div>
  );
};

export default UsersPage;
