export const formatMoney = (amount) =>
  `S/. ${Number(amount ?? 0).toFixed(2)}`;

export const formatMoneyRaw = (amount) =>
  Number(amount ?? 0).toFixed(2);
