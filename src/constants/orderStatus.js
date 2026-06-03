export const ORDER_STATUS = {
  PENDING:   'pendiente',
  CONFIRMED: 'confirmado',
  PREPARING: 'preparando',
  ON_WAY:    'en_camino',
  DELIVERED: 'entregado',
  CANCELLED: 'cancelado',
};

export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]:   'bg-yellow-100 text-yellow-700 border-yellow-200',
  [ORDER_STATUS.CONFIRMED]: 'bg-blue-100 text-blue-700 border-blue-200',
  [ORDER_STATUS.PREPARING]: 'bg-orange-100 text-orange-700 border-orange-200',
  [ORDER_STATUS.ON_WAY]:    'bg-purple-100 text-purple-700 border-purple-200',
  [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-700 border-green-200',
  [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-700 border-red-200',
};

export const STATUS_LABELS = {
  [ORDER_STATUS.PENDING]:   'Pendiente',
  [ORDER_STATUS.CONFIRMED]: 'Confirmado',
  [ORDER_STATUS.PREPARING]: 'Preparando',
  [ORDER_STATUS.ON_WAY]:    'En camino',
  [ORDER_STATUS.DELIVERED]: 'Entregado',
  [ORDER_STATUS.CANCELLED]: 'Cancelado',
};
