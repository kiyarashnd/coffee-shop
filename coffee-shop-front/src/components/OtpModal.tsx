'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import OtpInput from 'react-otp-input';

interface OtpModalProps {
  open: boolean; // آیا مودال باز است؟
  onClose: () => void; // تابع بستن مودال
  //   onVerify: (otp: string) => Promise<void>; // تابعی برای ارسال کد به بک‌اند (verify-otp)
  onNext(): any;
  onResend: () => Promise<void>; // تابعی برای ارسال مجدد /send-otp
  phoneNumber?: string; // جهت نمایش به کاربر در صورت تمایل
  length?: number; // پیش‌فرض تعداد خانه‌های OTP (۶)
}

export default function OtpModal({
  open,
  onClose,
  onNext,
  onResend,
  phoneNumber,
  length = 6,
}: OtpModalProps) {
  // استیت نگه‌داری مقدار OTP
  const [otpValue, setOtpValue] = useState('');
  // پیام خطا یا هشدار
  const [errorMessage, setErrorMessage] = useState('');
  // تایمر ۲ دقیقه‌ای (۱۲۰ ثانیه)
  const [timeLeft, setTimeLeft] = useState(120);

  // هر بار مودال باز شد، ریست
  useEffect(() => {
    if (open) {
      setOtpValue('');
      setErrorMessage('');
      setTimeLeft(120);
    }
  }, [open]);

  // تایمر کاهش‌یابنده
  useEffect(() => {
    if (!open) return;
    if (timeLeft <= 0) return; // اگر صفر یا منفی شد، دکمه ارسال مجدد فعال شود

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [open, timeLeft]);

  // زمانی که دکمه “تأیید” را می‌زنیم
  const handleVerifyClick = async () => {
    if (otpValue.length < length) {
      setErrorMessage('لطفاً همه ارقام کد را وارد کنید');
      return;
    }

    try {
      if (!phoneNumber) {
        setErrorMessage('شماره تلفن وارد نشده است');
        return;
      }

      const resp = await fetch('http://localhost:3000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, code: otpValue }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || 'Failed to verify OTP');
      }

      // اگر موفقیت‌آمیز بود:
      const result = await resp.json();
      // اگر نیاز به دسترسی به accessToken دارید:
      sessionStorage.setItem('accessToken', result.accessToken);

      //   setIsOtpVerified(true);
      setErrorMessage('');
      alert('تأیید شد! شماره موبایل شما تأیید گردید.');
      onClose();
      onNext();
      // بستن مودال
      //   setOpenModal(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // وقتی کاربر می‌خواهد مجدداً کد دریافت کند
  const handleResendClick = async () => {
    try {
      setErrorMessage('');
      await onResend();
      // ریست تایمر
      setTimeLeft(120);
      setOtpValue('');
    } catch (err: { messge: string } | any) {
      setErrorMessage(err.message || 'خطا در ارسال مجدد کد');
    }
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={onClose} dir='ltr'>
          <DialogTitle
            sx={{
              marginX: 'auto',
            }}
          >
            کد تأیید (OTP)
          </DialogTitle>
          <DialogContent>
            {phoneNumber && (
              <Typography variant='body2' sx={{ mb: 1 }} color='text.secondary'>
                کد تأیید به شماره {phoneNumber} ارسال شده است.
              </Typography>
            )}

            {errorMessage && (
              <Typography variant='body2' sx={{ mb: 1, color: 'error.main' }}>
                {errorMessage}
              </Typography>
            )}

            <OtpInput
              value={otpValue}
              onChange={(value: string) => setOtpValue(value)}
              numInputs={length}
              shouldAutoFocus
              renderSeparator={<span style={{ margin: '0 4px' }}>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className='w-[40px] h-[40px] text-center border border-gray-300 rounded-md'
                />
              )}
              skipDefaultStyles
            />
            {/* تایمر یا دکمه ارسال مجدد */}
            <Box textAlign='center' mt={2}>
              {timeLeft > 0 ? (
                <Typography variant='body2' color='text.secondary'>
                  تا ارسال مجدد کد: {timeLeft} ثانیه
                </Typography>
              ) : (
                <Button variant='text' onClick={handleResendClick}>
                  ارسال مجدد کد
                </Button>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>انصراف</Button>
            <Button
              variant='contained'
              onClick={handleVerifyClick}
              disabled={otpValue.length < length}
            >
              تأیید
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
