// CartComponent.tsx
import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('./ProductDetail'), {
  ssr: false, // غیرفعال کردن SSR برای این کامپوننت
});

function Page() {
  return <Cart />;
}

export default Page;
