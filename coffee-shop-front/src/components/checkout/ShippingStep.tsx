'use client';

import { Box, Button, Typography, Divider } from '@mui/material';

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ShippingStep({ onNext, onBack }: ShippingStepProps) {
  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        اطلاعات ارسال
      </Typography>
      <Typography>
        در اینجا می‌توانید فرم آدرس و مشخصات تحویل گیرنده را قرار دهید...
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
