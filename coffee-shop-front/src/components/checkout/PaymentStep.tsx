'use client';

import { useState, useEffect } from 'react';
import { Button, Typography, Alert, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PaymentModal from './PaymentModal'; // مسیر را بر اساس ساختار پروژه تنظیم کنید
import { formatPriceToToman } from '@/utils/formatPrice';

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
  items: any[]; // آیتم‌های سبد خرید (با فیلدهایی مانند id, price, quantity, available)
  totalAmount: number; // مبلغ اولیه (از CartStep)
  shippingData: ShippingFormData;
}

function updatedTotalValue(items: any[]): number {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export default function PaymentStep({
  onBack,
  items,
  totalAmount,
  shippingData,
}: PaymentStepProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedTotal, setUpdatedTotal] = useState<number>(totalAmount);
  const [validItems, setValidItems] = useState<any[]>([]);
  const [invalidItems, setInvalidItems] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const phone = shippingData.phoneNumber;
  console.log('shiping data is : ', shippingData);

  // useEffect برای بررسی سبد خرید به صورت مداوم (مثلاً قبل از پرداخت)
  useEffect(() => {
    // هر بار که items تغییر می‌کنند، مجدداً مبلغ پرداخت محاسبه شود
    const recalcTotal = () => {
      const valid = items.filter((item) => item.available !== false);
      const newTotal = updatedTotalValue(valid);
      setUpdatedTotal(newTotal);
      setValidItems(valid);
    };
    recalcTotal();
  }, [items]);

  // تابع بررسی سبد خرید بر اساس داده‌های به‌روز محصولات از بک‌اند
  const checkCartItems = async (): Promise<{
    valid: any[];
    invalid: any[];
  }> => {
    const respProducts = await fetch('http://localhost:3000/api/products');
    if (!respProducts.ok) {
      throw new Error('خطا در دریافت اطلاعات محصولات');
    }
    const productsData = await respProducts.json();
    const valid: any[] = [];
    const invalid: any[] = [];
    for (const item of items) {
      const productFromBackend = productsData.find(
        (p: any) => p._id === item.id
      );
      if (!productFromBackend) {
        invalid.push({ ...item, reason: 'حذف شده' });
      } else if (productFromBackend.available === false) {
        invalid.push({ ...item, reason: 'ناموجود' });
      } else {
        valid.push(item);
      }
    }
    return { valid, invalid };
  };

  const proceedPayment = async (itemsToPay: any[], newTotal: number) => {
    const resp = await fetch('http://localhost:3000/api/payment/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: itemsToPay,
        totalAmount: newTotal,
        phone,
        shippingData,
      }),
    });
    if (!resp.ok) {
      const errData = await resp.json();
      throw new Error(errData.message || 'خطا در ایجاد پرداخت');
    }
    const data = await resp.json();
    console.log('paymentUrl is : ', data.paymentUrl);
    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
    }
  };

  const handlePayment = async () => {
    try {
      setErrorMessage('');
      // بررسی سبد خرید با داده‌های به‌روز
      const { valid, invalid } = await checkCartItems();
      // اگر آیتم‌های نامعتبر وجود داشته باشند
      if (invalid.length > 0) {
        // به‌روز رسانی لیست‌های valid و invalid
        setValidItems(valid);
        setInvalidItems(invalid);
        const newTotal = updatedTotalValue(valid);
        setUpdatedTotal(newTotal);
        setModalOpen(true);
        return;
      }
      // اگر همه آیتم‌ها معتبر باشند
      const newTotal = updatedTotalValue(valid);
      await proceedPayment(valid, newTotal);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleModalProceed = async () => {
    try {
      // setModalOpen(false);
      // در اینجا می‌توانید آیتم‌های نامعتبر را از سبد حذف کنید (در صورت نیاز)
      await proceedPayment(validItems, updatedTotal);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setErrorMessage('پرداخت متوقف شد. لطفاً سبد خرید خود را بررسی کنید.');
  };

  return (
    <div className='flex flex-col items-center justify-center px-4 py-10'>
      <div
        className='bg-orange-100 border border-orange-300 text-orange-700 text-sm rounded p-3 mb-6 w-full max-w-md text-right shadow'
        dir='rtl'
      >
        در صورتی که از فیلترشکن (VPN) استفاده می‌کنید، قبل از ورود به درگاه
        پرداخت آن را خاموش کنید.
      </div>

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
          <Typography className='mt-2 text-sm text-gray-500 mb-2'>
            درگاه پرداخت امن زرین‌پال
          </Typography>

          {/* نمایش مبلغ به‌روز */}
          {/* <div className='mt-6 mb-4 text-lg font-semibold text-gray-800'>
            مبلغ قابل پرداخت:{' '}
            <span className='text-coffee-dark'>
              {formatPriceToToman(updatedTotal)}
            </span>
          </div> */}

          {errorMessage && (
            <Alert severity='error' className='w-full mb-4'>
              {errorMessage}
            </Alert>
          )}

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

      <PaymentModal
        open={modalOpen}
        updatedTotal={updatedTotal}
        invalidItems={invalidItems}
        validItems={validItems}
        onProceed={handleModalProceed}
        onCancel={handleModalCancel}
      />
    </div>
  );
}
