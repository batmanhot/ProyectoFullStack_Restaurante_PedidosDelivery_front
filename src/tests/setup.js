import '@testing-library/jest-dom';

// Mock localStorage para todos los tests
const localStorageMock = (() => {
  let store = {};
  return {
    getItem:   (key) => store[key] ?? null,
    setItem:   (key, value) => { store[key] = String(value); },
    removeItem:(key) => { delete store[key]; },
    clear:     () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Limpiar localStorage entre cada test
afterEach(() => {
  localStorage.clear();
});
