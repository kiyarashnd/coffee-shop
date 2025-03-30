'use client';

import { useState } from 'react';
import { Button, Typography, Alert } from '@mui/material';
import { Product } from '@/types/products';

interface PaymentStepProps {
  onBack: () => void;
  onNext: () => void;
  items: any[]; // سبد
  totalAmount: number; // مبلغ
  phone: string;
}

export default function PaymentStep({
  onBack,
  onNext,
  items,
  totalAmount,
  phone,
}: PaymentStepProps) {
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    try {
      setErrorMessage('');
      // اکسس‌توکن را از localStorage یا جایی که ذخیره کردید بخوانید
      // const token = sessionStorage.getItem('accessToken');

      const resp = await fetch('http://localhost:3000/api/payment/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, // در صورتی که نیاز دارید
        },
        body: JSON.stringify({ items, totalAmount, phone }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || 'failed to create payment');
      }

      const data = await resp.json();
      if (data.paymentUrl) {
        // ریدایرکت کاربر به درگاه زرين‌پال
        window.location.href = data.paymentUrl;
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Typography variant='h6'>مرحله پرداخت</Typography>
      {/* نمایش سبد یا مبلغ */}
      <Typography>مبلغ قابل پرداخت: {totalAmount} تومان</Typography>

      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}

      <Button variant='outlined' onClick={onBack}>
        بازگشت
      </Button>
      <Button variant='contained' onClick={handlePayment}>
        پرداخت
      </Button>
    </div>
  );
}
