export const formatYen = (price: number) => {
  return price.toLocaleString('ja-JP', { currency: 'JPY', style: 'currency' });
};
