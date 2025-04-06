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
  // اضافه کردن mutate برای refetch
  const { data, isLoading, mutate } = useFetchData();

  const { cart, removeFromCart } = useCartStore();

  const [phone, setPhone] = useState('');

  const [shippingData, setShippingData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [totalAmout, setTotalAmount] = useState<number>(0);

  // این useEffect بررسی می‌کند که آیا محصولات موجود در سبد خرید تغییر کرده‌اند
  useEffect(() => {
    if (isLoading || !data) return;

    cart.forEach((item) => {
      const found = data.find((dbProd: Product) => dbProd._id === item.id);

      // اگر محصول حذف شده باشد (یا در صورت نیاز اگر available بررسی شود)
      if (!found) {
        removeFromCart(item.id);
      }
    });
  }, [isLoading, data, cart, removeFromCart]);

  // // useEffect برای رفرش اطلاعات در صورت تغییر تب یا برگشت به صفحه (برای مرحله اول)
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'visible') {
  //       // بازخوانی اطلاعات محصولات از بک‌اند
  //       setActiveStep(0);
  //       mutate();
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, [activeStep, mutate]);

  const steps = [
    {
      label: 'بررسی سبد خرید',
      component: (
        <CartStep
          onNext={() => setActiveStep((prev) => prev + 1)}
          totalAmout={totalAmout}
          setTotalAmount={setTotalAmount}
          productsData={data} // داده‌های دریافت شده از بک‌اند
        />
      ),
    },
    {
      label: 'اطلاعات ارسال',
      component: (
        <ShippingStep
          onNext={() => setActiveStep((prev) => prev + 1)}
          onBack={() => setActiveStep((prev) => prev - 1)}
          phone={phone}
          setPhone={setPhone}
          defaultValues={shippingData}
          setShippingData={setShippingData}
        />
      ),
    },
    {
      label: 'نحوه پرداخت',
      component: (
        <PaymentStep
          onNext={() => setActiveStep((prev) => prev + 1)}
          onBack={() => setActiveStep((prev) => prev - 1)}
          items={cart}
          totalAmount={totalAmout}
          shippingData={shippingData}
        />
      ),
    },
    // {
    //   label: 'پایان خرید',
    //   component: (
    //     <CompleteStep onBack={() => setActiveStep((prev) => prev - 1)} />
    //   ),
    // },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }} dir='ltr'>
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
