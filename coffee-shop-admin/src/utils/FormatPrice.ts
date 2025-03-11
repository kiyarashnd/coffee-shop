export const formatPriceToToman = (value: string | number): string => {
  const number = typeof value === 'string' ? Number(value) : value;
  const tomanValue = number / 10; // Convert Rials to Tomans
  return (
    new Intl.NumberFormat('fa-IR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(tomanValue) + ' تومان'
  );
};
