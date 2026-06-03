import { storage } from './storageService';
import { BUSINESS_INFO } from '../data/products';

const DEFAULT_CONFIG = {
  ...BUSINESS_INFO,
  headerImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2865&auto=format&fit=crop',
  deliveryCost: 5.00,
  minOrderAmount: 0,
  acceptingOrders: true,
  paymentMethods: { efectivo: true, yape: true, tarjeta: false },
  yapeNumber: BUSINESS_INFO.whatsapp,
  yapeQr: '',
  deliveryTime: '30-45 min',
  rating: '4.8',
  totalReviews: '200+',
  promoText: '🔥 ¡Envío GRATIS en tu primer pedido!',
  showPromo: true,
};

export const configService = {
  get: () => storage.get('config') || DEFAULT_CONFIG,

  update: (data) => {
    const current = configService.get();
    const updated = { ...current, ...data };
    storage.set('config', updated);
    return updated;
  },

  reset: () => {
    storage.set('config', DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  },
};
