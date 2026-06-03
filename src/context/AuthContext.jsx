import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getSession());

  const login = (email, password) => {
    const result = authService.login(email, password);
    if (result.ok) setUser(result.user);
    return result;
  };

  const register = (name, email, password) => {
    const result = authService.register(name, email, password);
    if (result.ok) setUser(result.user);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = (data) => {
    if (!user) return { ok: false, error: 'No hay sesión activa' };
    const result = authService.updateUser(user.id, data);
    if (result.ok) setUser(result.user);
    return result;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAdmin: user?.role === 'admin', isLogged: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
