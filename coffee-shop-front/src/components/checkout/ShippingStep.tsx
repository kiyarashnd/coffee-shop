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

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
  phone: string;
  setPhone: any;
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
    .matches(/09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}/, 'فرمت شماره موبایل صحیح نیست.')
    .max(11, 'شماره موبایل حداکثر ۱۱ کاراکتر است.'),
  fullName: yup.string().required('نام و نام خانوادگی اجباری است.'),
  address: yup.string().required('آدرس اجباری است.'),
  city: yup.string().required('شهر اجباری است.'),
  postalCode: yup.string().required('کد پستی اجباری است.'),
});

export default function ShippingStep({
  onNext,
  onBack,
  setPhone,
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
    mode: 'onSubmit',
  });
  const phoneNumber = watch('phoneNumber');

  // استیت‌ها
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  // const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Modal کنترل
  const [openModal, setOpenModal] = useState(false);
  // const [otpCode] = useState('');

  const handleResend = async () => {
    // دوباره /api/auth/send-otp ...
    const resp = await fetch('http://localhost:3000/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneNumber }),
    });

    if (!resp.ok) {
      const errData = await resp.json();
      throw new Error(errData.message || 'Failed to send OTP');
    }
    setIsOtpSent(true);
    setErrorMessage('');
    // حالا که ارسال شد، مودال را باز می‌کنیم تا کد را بگیرد
    setOpenModal(true);
  };

  // وقتی کاربر فرم ارسال را سابمیت می‌کند
  const onSubmit: SubmitHandler<ShippingFormData> = async (data) => {
    try {
      // اگر OTP قبلاً تأیید شده، مستقیماً به مرحله بعد برو
      // if (isOtpVerified) {
      //   onNext();
      //   return;
      // }

      // اگر هنوز OTP فرستاده نشده، ارسال کنیم
      if (!isOtpSent) {
        const resp = await fetch('http://localhost:3000/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: data.phoneNumber }),
        });

        if (!resp.ok) {
          const errData = await resp.json();
          throw new Error(errData.message || 'Failed to send OTP');
        }
        setIsOtpSent(true);
        setErrorMessage('');
        // حالا که ارسال شد، مودال را باز می‌کنیم تا کد را بگیرد
        setOpenModal(true);
        setPhone(data.phoneNumber);
      } else {
        // اگر OTP ارسال شده ولی تأیید نشده
        setOpenModal(true);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // متد تأیید OTP (در Modal)
  // const handleVerifyOtp = async () => {
  // try {
  //   const phoneNumber = getValues('phoneNumber');
  //   if (!phoneNumber) {
  //     setErrorMessage('شماره تلفن وارد نشده است');
  //     return;
  //   }
  //   if (!otpCode) {
  //     setErrorMessage('کد OTP را وارد کنید');
  //     return;
  //   }

  //   const resp = await fetch('http://localhost:3000/api/auth/verify-otp', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ phone: phoneNumber, code: otpCode }),
  //   });
  //   if (!resp.ok) {
  //     const errData = await resp.json();
  //     throw new Error(errData.message || 'Failed to verify OTP');
  //   }

  //   // اگر موفقیت‌آمیز بود:
  //   const result = await resp.json();
  //   // اگر نیاز به دسترسی به accessToken دارید:
  //   sessionStorage.setItem('accessToken', result.accessToken);

  //   setIsOtpVerified(true);
  //   setErrorMessage('');
  //   alert('تأیید شد! شماره موبایل شما تأیید گردید.');
  //   onNext();
  //   // بستن مودال
  //   setOpenModal(false);
  // } catch (error: any) {
  //   setErrorMessage(error.message);
  // }
  // };

  return (
    <Box>
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
            {!isOtpSent ? 'ارسال OTP' : 'تأیید OTP'}
          </Button>
        </Box>
      </form>

      {/* ========== MODAL for OTP ==========
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>کد OTP</DialogTitle>
        <DialogContent>
          <Typography>کد ارسال‌شده به تلفن همراه را وارد کنید:</Typography>
          <TextField
            label='کد شش رقمی'
            variant='outlined'
            fullWidth
            sx={{ mt: 2 }}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
              reset();
            }}
          >
            انصراف
          </Button>
          <Button variant='contained' onClick={handleVerifyOtp}>
            تأیید
          </Button>
        </DialogActions>
      </Dialog> */}

      <OtpModal
        open={openModal}
        onClose={() => {
          reset();
          setOpenModal(false);
        }}
        // onVerify={handleVerifyOtp}
        onNext={onNext}
        onResend={handleResend}
        phoneNumber={phoneNumber}
      />
    </Box>
  );
}
