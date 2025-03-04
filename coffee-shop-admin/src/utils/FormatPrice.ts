export const formatPriceToToman = (
  value: string | number,
  locale: string = 'fa-IR'
): string => {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  const tomanValue = number / 10; // Convert Rials to Tomans
  return (
    new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(tomanValue) + ' تومان'
  );
};
