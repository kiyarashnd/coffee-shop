'use client';

import { useEffect, useState } from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

// ایمپورت از فایل‌های مرحله:
import CartStep from '@/components/checkout/CartStep';
import ShippingStep from '@/components/checkout/ShippingStep';
import PaymentStep from '@/components/checkout/PaymentStep';
import CompleteStep from '@/components/checkout/CompleteStep';
import { useFetchData } from '@/hooks/useFetchData';
import { useCartStore } from '@/store/useCartStore';

type Product = {
  _id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  __v: number;
};

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { data, isLoading } = useFetchData();
  console.log('data is : ', data);

  const { cart, removeFromCart } = useCartStore();

  useEffect(() => {
    if (isLoading || !data) return;

    // بررسی تک‌تک محصولات سبد
    cart.forEach((item) => {
      // آیا این محصول در data (از دیتابیس) وجود دارد؟
      const found = data.find((dbProd: Product) => dbProd._id === item.id);

      // اگر وجود نداشت، یعنی حذف شده یا دیگر فعال نیست
      if (!found) {
        removeFromCart(item.id);
      } else {
        // اگر لازم است قیمت یا موجودی را هم چک کنید، اینجا مقایسه انجام دهید
        // مثلا اگر found.price !== item.price => آپدیت قیمت یا اطلاع کاربر
      }
    });
  }, [isLoading, data, cart, removeFromCart]);

  const steps = [
    {
      label: 'بررسی سبد خرید',
      component: <CartStep onNext={() => setActiveStep((prev) => prev + 1)} />,
    },
    {
      label: 'اطلاعات ارسال',
      component: (
        <ShippingStep
          onNext={() => setActiveStep((prev) => prev + 1)}
          onBack={() => setActiveStep((prev) => prev - 1)}
        />
      ),
    },
    {
      label: 'نحوه پرداخت',
      component: (
        <PaymentStep
          onNext={() => setActiveStep((prev) => prev + 1)}
          onBack={() => setActiveStep((prev) => prev - 1)}
        />
      ),
    },
    {
      label: 'پایان خرید',
      component: (
        <CompleteStep onBack={() => setActiveStep((prev) => prev - 1)} />
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }} dir='ltr'>
      {/* استپر بالای صفحه */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: 4 }}
        dir='ltr'
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel dir='rtl'>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {steps[activeStep].component}
    </Box>
  );
}
