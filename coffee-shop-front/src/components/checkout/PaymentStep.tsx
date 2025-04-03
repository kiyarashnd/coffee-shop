// 'use client';

// import { useState } from 'react';
// import { Button, Typography, Alert } from '@mui/material';

// interface PaymentStepProps {
//   onBack: () => void;
//   onNext: () => void;
//   items: any[]; // سبد
//   totalAmount: number; // مبلغ
//   phone: string;
// }

// export default function PaymentStep({
//   onBack,
//   items,
//   totalAmount,
//   phone,
// }: PaymentStepProps) {
//   const [errorMessage, setErrorMessage] = useState('');

//   const handlePayment = async () => {
//     try {
//       setErrorMessage('');
//       // اکسس‌توکن را از localStorage یا جایی که ذخیره کردید بخوانید
//       // const token = sessionStorage.getItem('accessToken');

//       const resp = await fetch('http://localhost:3000/api/payment/pay', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${token}`, // در صورتی که نیاز دارید
//         },
//         body: JSON.stringify({ items, totalAmount, phone }),
//       });
//       if (!resp.ok) {
//         const errData = await resp.json();
//         throw new Error(errData.message || 'failed to create payment');
//       }

//       const data = await resp.json();
//       if (data.paymentUrl) {
//         // ریدایرکت کاربر به درگاه زرين‌پال
//         window.location.href = data.paymentUrl;
//       }
//     } catch (error: any) {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div>
//       <Typography variant='h6'>مرحله پرداخت</Typography>
//       {/* نمایش سبد یا مبلغ */}
//       <Typography>مبلغ قابل پرداخت: {totalAmount} تومان</Typography>

//       {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}

//       <Button variant='outlined' onClick={onBack}>
//         بازگشت
//       </Button>
//       <Button variant='contained' onClick={handlePayment}>
//         پرداخت
//       </Button>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { Button, Typography, Alert, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
// import zarinpalLogo from '../../../zarinpal.svg'; // مسیر فرضی لوگو، باید داشته باشی یا تغییرش بدی

interface ShippingFormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
}
interface PaymentStepProps {
  onBack: () => void;
  onNext: () => void;
  items: any[];
  totalAmount: number;
  // phone: string;
  shippingData: ShippingFormData;
}

const formatPriceToToman = (price: number) => {
  return price.toLocaleString('fa-IR') + ' تومان';
};

export default function PaymentStep({
  onBack,
  items,
  totalAmount,
  // phone,
  shippingData,
}: PaymentStepProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const phone = shippingData.phoneNumber;

  const handlePayment = async () => {
    try {
      setErrorMessage('');

      const resp = await fetch('http://localhost:3000/api/payment/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, totalAmount, phone }),
      });

      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || 'خطا در ایجاد پرداخت');
      }

      const data = await resp.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center px-4 py-10'>
      {/* هشدار VPN */}
      <div className='bg-orange-100 border border-orange-300 text-orange-700 text-sm rounded p-3 mb-6 w-full max-w-md text-center shadow'>
        در صورتی که از فیلترشکن (VPN) استفاده می‌کنید، قبل از ورود به درگاه
        پرداخت آن را خاموش کنید.
      </div>

      {/* کارت پرداخت زرین‌پال */}
      <Card className='w-full max-w-md border border-green-300 shadow-md hover:shadow-lg transition-shadow duration-300'>
        <CardContent className='flex flex-col items-center justify-center p-6'>
          <CheckCircleIcon className='text-green-500 text-4xl mb-3' />
          <div className='flex items-center gap-2'>
            <Image
              src='/zarinpal.svg'
              alt='زرین‌پال'
              width={100}
              height={100}
              className='object-contain'
            />
            <Typography className='text-xl font-bold text-gray-800'>
              زرین‌پال
            </Typography>
          </div>
          <Typography className='mt-2 text-sm text-gray-500'>
            درگاه پرداخت امن زرین‌پال
          </Typography>

          {/* مبلغ */}
          <div className='mt-6 mb-4 text-lg font-semibold text-gray-800'>
            مبلغ قابل پرداخت:{' '}
            <span className='text-coffee-dark'>
              {formatPriceToToman(totalAmount)}
            </span>
          </div>

          {/* پیام خطا */}
          {errorMessage && (
            <Alert severity='error' className='w-full mb-4'>
              {errorMessage}
            </Alert>
          )}

          {/* دکمه‌ها */}
          <div className='flex gap-3 w-full'>
            <Button variant='outlined' onClick={onBack} className='w-1/2'>
              بازگشت
            </Button>
            <Button
              variant='contained'
              onClick={handlePayment}
              className='bg-green-500 hover:bg-green-600 text-white w-1/2'
            >
              پرداخت
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
