'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import OtpModal from '../OtpModal';
import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import WarningIcon from '@mui/icons-material/Warning';

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
  phone: string;
  setPhone: any;
  defaultValues: ShippingFormData;
  setShippingData: (data: ShippingFormData) => void;
}

// فیلدهای فرم اطلاعات ارسال
interface ShippingFormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
}

const formSchema: ObjectSchema<ShippingFormData> = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('شماره موبایل اجباری است.')
    .matches(/^09\d{9}$/, 'فرمت شماره موبایل صحیح نیست.')
    .max(11, 'شماره موبایل حداکثر ۱۱ کاراکتر است.'),
  fullName: yup.string().required('نام و نام خانوادگی اجباری است.'),
  address: yup
    .string()
    .required('آدرس اجباری است.')
    .matches(/^[\u0600-\u06FF\s\d-–]+$/, 'آدرس را به فرمت درست وارد کنید'),
  city: yup.string().required('شهر اجباری است.'),
  postalCode: yup
    .string()
    .required('کد پستی اجباری است.')
    .matches(
      /\b(?!(d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
      'فرمت کد پستی صحیح نیست'
    ),
});

export default function ShippingStep({
  onNext,
  onBack,
  setPhone,
  defaultValues,
  setShippingData,
}: ShippingStepProps) {
  // مدیریت فرم با react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ShippingFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: defaultValues, // استفاده از داده‌های قبلی
    mode: 'all',
  });
  // const phoneNumber = watch('phoneNumber');

  // استیت‌ها
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  // const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Modal کنترل
  const [openModal, setOpenModal] = useState(false);
  // const [otpCode] = useState('');

  // const handleResend = async () => {
  //   // دوباره /api/auth/send-otp ...
  //   const resp = await fetch('http://localhost:3000/api/auth/send-otp', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ phone: phoneNumber }),
  //   });

  //   if (!resp.ok) {
  //     const errData = await resp.json();
  //     throw new Error(errData.message || 'Failed to send OTP');
  //   }
  //   setIsOtpSent(true);
  //   setErrorMessage('');
  //   // حالا که ارسال شد، مودال را باز می‌کنیم تا کد را بگیرد
  //   setOpenModal(true);
  // };

  // وقتی کاربر فرم ارسال را سابمیت می‌کند
  const onSubmit: SubmitHandler<ShippingFormData> = async (data) => {
    try {
      console.log('data is : ', data);
      // if (!isOtpSent) {
      //   const resp = await fetch('http://localhost:3000/api/auth/send-otp', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ phone: data.phoneNumber }),
      //   });

      //   if (!resp.ok) {
      //     const errData = await resp.json();
      //     throw new Error(errData.message || 'Failed to send OTP');
      //   }
      //   setIsOtpSent(true);
      //   setErrorMessage('');
      //   // حالا که ارسال شد، مودال را باز می‌کنیم تا کد را بگیرد
      //   setOpenModal(true);
      //   setPhone(data.phoneNumber);
      // } else {
      //   // اگر OTP ارسال شده ولی تأیید نشده
      //   setOpenModal(true);
      // }
      setShippingData(data);
      onNext();
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box dir='rtl'>
      <Typography
        variant='h6'
        sx={{ mb: 2, fontWeight: 'bold', justifyContent: 'center' }}
      >
        اطلاعات ارسال
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {errorMessage && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <div className='bg-yellow-100 border border-yellow-300 text-yellow-700 text-sm rounded p-3 mb-6 w-full text-right shadow'>
        <WarningIcon />
        دقت کنید محصول به نشانی و کد پستی وارد شده ارسال میشود و در صورت نادرست
        بودن اطلاعات، سفارش شما با تأخیر مواجه خواهد شد.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} dir='ltr'>
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
        <Box display='flex' justifyContent='space-between' mt={4} dir='ltr'>
          <Button variant='outlined' onClick={onBack}>
            بازگشت
          </Button>
          <Button
            variant='contained'
            type='submit'
            // onClick={}
          >
            {/* {!isOtpSent ? 'ارسال OTP' : 'تأیید OTP'} */}
            نحوه پرداخت
          </Button>
        </Box>
      </form>

      {/* <OtpModal
        open={openModal}
        onClose={() => {
          reset();
          setOpenModal(false);
        }}
        onNext={onNext}
        onResend={handleResend}
        phoneNumber={phoneNumber}
      /> */}
    </Box>
  );
}
