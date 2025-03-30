'use client';

import { Container, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push('/'); // هدایت به صفحه اصلی
  };

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center', py: 8 }}>
      <CheckCircleIcon color='success' sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant='h4' sx={{ mb: 2 }}>
        پرداخت موفق!
      </Typography>
      <Typography variant='body1' sx={{ mb: 4 }}>
        از پرداخت شما سپاسگزاریم. سفارش شما با موفقیت ثبت شده و در حال پردازش
        است.
      </Typography>
      <Button variant='contained' size='large' onClick={handleGoToHome}>
        بازگشت به صفحه اصلی
      </Button>
    </Container>
  );
}
