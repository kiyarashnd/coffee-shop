'use client';

import { Box, Button, Typography, Divider } from '@mui/material';

interface CompleteStepProps {
  onBack: () => void;
}

export default function CompleteStep({ onBack }: CompleteStepProps) {
  return (
    <Box textAlign='center'>
      <Typography variant='h5' sx={{ mb: 2, fontWeight: 'bold' }}>
        خرید شما با موفقیت تکمیل شد!
      </Typography>
      <Typography sx={{ mb: 2 }}>
        از خرید شما سپاسگزاریم. سفارش شما در حال پردازش است...
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Box display='flex' justifyContent='center' mt={2}>
        <Button variant='outlined' onClick={onBack} sx={{ mr: 2 }}>
          بازگشت
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            alert('سفارش شما ثبت شد!');
          }}
        >
          ثبت سفارش
        </Button>
      </Box>
    </Box>
  );
}
