// utils/formatPrice.ts

/**
 * دریافت عدد قیمت (مثلا 120000) و تبدیل آن به رشتهٔ فرمت‌دار به همراه "تومان"
 * به طور مثال: 120000 -> "۱۲۰,۰۰۰ تومان"
 */
export function formatPriceToToman(amount: number): string {
  // اگر عدد منفی است یا نیاز به مدیریت عدد صفر داریم،
  // می‌توانید بسته به نیاز پروژه شرط اضافه کنید.

  // با استفاده از toLocaleString و تنظیم 'fa-IR' برای هزارگان
  const formattedNumber = amount.toLocaleString('fa-IR');

  // اضافه کردن کلمهٔ "تومان" در انتها
  return `${formattedNumber} تومان`;
}
