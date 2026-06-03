import { createContext, useContext, useState, useCallback } from 'react';
import { configService } from '../services/configService';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [config, setConfig] = useState(() => configService.get());
  const [toast, setToast] = useState(null);

  const updateConfig = (data) => {
    const updated = configService.update(data);
    setConfig(updated);
    return updated;
  };

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const closeToast = useCallback(() => setToast(null), []);

  return (
    <AppContext.Provider value={{ config, updateConfig, toast, showToast, closeToast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
