'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
} from '@mui/material';

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
}

// تایپ فرم - هر فیلدی که دارید، اینجا تعریف کنید
interface ShippingFormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
}

export default function ShippingStep({ onNext, onBack }: ShippingStepProps) {
  // راه‌اندازی React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>();

  // تابعی که هنگام سابمیت فرم صدا می‌شود
  const onSubmit: SubmitHandler<ShippingFormData> = (data) => {
    console.log('Shipping data: ', data);
    // در اینجا داده‌های فرم را می‌توانید در Zustand ذخیره کنید یا هر کاری که نیاز دارید
    // سپس به گام بعدی بروید
    onNext();
  };

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        اطلاعات ارسال
      </Typography>

      {/* جداکننده بالای فرم */}
      <Divider sx={{ mb: 3 }} />

      {/* خودِ فرم: از تابع handleSubmit ریکت هوک فرم استفاده می‌کنیم */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='نام و نام خانوادگی'
              fullWidth
              {...register('fullName', { required: true })}
              error={!!errors.fullName}
              helperText={
                errors.fullName ? 'لطفاً نام و نام خانوادگی را وارد کنید' : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='شماره تماس'
              fullWidth
              {...register('phoneNumber', { required: true })}
              error={!!errors.phoneNumber}
              helperText={
                errors.phoneNumber ? 'وارد کردن شماره تماس اجباری است' : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='آدرس کامل'
              fullWidth
              multiline
              rows={2}
              {...register('address', { required: true })}
              error={!!errors.address}
              helperText={
                errors.address ? 'لطفاً آدرس کامل خود را وارد کنید' : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='شهر'
              fullWidth
              {...register('city', { required: true })}
              error={!!errors.city}
              helperText={errors.city ? 'شهر را وارد کنید' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='کد پستی'
              fullWidth
              {...register('postalCode', { required: true })}
              error={!!errors.postalCode}
              helperText={errors.postalCode ? 'کد پستی الزامی است' : ''}
            />
          </Grid>
        </Grid>

        {/* دکمه‌های پایین فرم */}
        <Box display='flex' justifyContent='space-between' mt={4}>
          <Button variant='outlined' onClick={onBack}>
            بازگشت
          </Button>
          <Button variant='contained' type='submit'>
            مرحله بعد
          </Button>
        </Box>
      </form>
    </Box>
  );
}
