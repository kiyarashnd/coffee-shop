'use client';

import { Box, Button, Typography, Divider } from '@mui/material';

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ onNext, onBack }: PaymentStepProps) {
  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        نحوه پرداخت
      </Typography>
      <Typography>
        در اینجا روش‌های پرداخت (آنلاین، کارت به کارت و غیره) را قرار دهید...
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box display='flex' justifyContent='space-between'>
        <Button variant='outlined' onClick={onBack}>
          بازگشت
        </Button>
        <Button variant='contained' onClick={onNext}>
          مرحله بعد
        </Button>
      </Box>
    </Box>
  );
}
