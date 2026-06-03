// DEV-ONLY: hardcoded admin + localStorage users. Replace with API calls for backend.
import { storage } from './storageService';

const ADMIN = {
  id: 'admin-001',
  name: 'Administrador',
  email: 'admin@burguer.com',
  password: 'admin123',
  role: 'admin',
};

export const authService = {
  login: (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      const session = { id: ADMIN.id, name: ADMIN.name, email: ADMIN.email, role: 'admin' };
      storage.set('session', session);
      return { ok: true, user: session };
    }
    const users = storage.get('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const session = { id: user.id, name: user.name, email: user.email, role: 'customer' };
      storage.set('session', session);
      return { ok: true, user: session };
    }
    return { ok: false, error: 'Credenciales incorrectas' };
  },

  register: (name, email, password) => {
    const users = storage.get('users') || [];
    if (users.find(u => u.email === email)) {
      return { ok: false, error: 'El email ya está registrado' };
    }
    const newUser = { id: `u-${Date.now()}`, name, email, password, role: 'customer', createdAt: new Date().toISOString() };
    storage.set('users', [...users, newUser]);
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'customer' };
    storage.set('session', session);
    return { ok: true, user: session };
  },

  logout: () => storage.remove('session'),

  getSession: () => storage.get('session'),

  getUsers: () => storage.get('users') || [],

  deleteUser: (id) => {
    const users = storage.get('users') || [];
    storage.set('users', users.filter(u => u.id !== id));
  },

  updateUser: (id, data) => {
    const users = storage.get('users') || [];
    const user = users.find(u => u.id === id);
    if (!user) return { ok: false, error: 'Usuario no encontrado' };

    if (data.email && data.email !== user.email) {
      if (users.find(u => u.email === data.email && u.id !== id)) {
        return { ok: false, error: 'Ese email ya está en uso' };
      }
    }

    const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
    storage.set('users', users.map(u => u.id === id ? updated : u));

    const session = { id: updated.id, name: updated.name, email: updated.email, role: updated.role };
    storage.set('session', session);
    return { ok: true, user: session };
  },
};
