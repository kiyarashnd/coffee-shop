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

  useEffect(() => {
    if (isLoading || !data) return;

    // بررسی تک‌تک محصولات سبد
    cart.forEach((item) => {
      const found = data.find((dbProd: Product) => dbProd._id === item.id);

      // if (!found  || found.available === false) {
      if (!found) {
        removeFromCart(item.id);
      }
    });
  }, [isLoading, data, cart, removeFromCart]);

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
          // totalAmount={cart.reduce((total, item) => total + item.price, 0)}
          totalAmount={totalAmout}
          // phone={phone}
          shippingData={shippingData}
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
