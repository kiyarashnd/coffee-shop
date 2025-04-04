'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/navigation';

export default function PaymentFail() {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/checkout'); // مسیر پرداخت یا صفحه‌ای که می‌خواهید کاربر مجدداً تلاش کند
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', py: 8 }}>
      <CancelIcon color='error' sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant='h4' sx={{ mb: 2 }}>
        پرداخت ناموفق!
      </Typography>
      <Typography variant='body1' sx={{ mb: 4 }}>
        متأسفانه پرداخت شما انجام نشد. لطفاً مجدداً تلاش کنید یا با پشتیبانی
        تماس بگیرید.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant='contained' color='error' onClick={handleRetry}>
          تلاش مجدد
        </Button>
        <Button variant='outlined' onClick={handleGoHome}>
          بازگشت به صفحه اصلی
        </Button>
      </Box>
    </Container>
  );
}
