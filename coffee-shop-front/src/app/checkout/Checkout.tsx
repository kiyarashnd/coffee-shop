'use client';

import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, useTheme } from '@mui/material';

// ایمپورت از فایل‌های مرحله:
import CartStep from '@/components/checkout/CartStep';
import ShippingStep from '@/components/checkout/ShippingStep';
import PaymentStep from '@/components/checkout/PaymentStep';
import CompleteStep from '@/components/checkout/CompleteStep';

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);

  // این آرایه لیست مراحل و اینکه چه چیزی رندر شوند را مشخص می‌کند
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
