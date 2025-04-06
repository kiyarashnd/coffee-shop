'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { formatPriceToToman } from '@/utils/formatPrice';

interface PaymentModalProps {
  open: boolean;
  updatedTotal: number;
  validItems: any[]; // آیتم‌های موجود در سبد که معتبر هستند
  invalidItems: any[]; // آیتم‌های نامعتبر (حذف شده یا ناموجود)
  onProceed: () => void;
  onCancel: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  updatedTotal,
  validItems,
  invalidItems,
  onProceed,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth='sm'>
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontSize: '2rem',
        }}
      >
        بررسی نهایی سبد خرید
      </DialogTitle>
      <DialogContent
        dir='rtl'
        sx={{
          textAlign: 'center',
        }}
      >
        {invalidItems.length > 0 && (
          <Box dir='rtl'>
            <Typography variant='body1' gutterBottom>
              شما در سبد خرید خود مواردی داشتید که نا موجود بودند.
            </Typography>
            <Typography variant='body1' gutterBottom>
              موارد موجود نهایی به شرح زیر است :
            </Typography>
            <Box dir='rtl'>
              {validItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '5px',
                  }}
                >
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    className='mt-2'
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    className='mt-2'
                  >
                    x{item.quantity}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    className='mt-2'
                  >
                    {formatPriceToToman(item.price)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant='body2' color='text.secondary' className='mt-2'>
              {/* مبلغ پرداخت به‌روز شده بر اساس آیتم‌های موجود: */}
              مبلغ پرداخت نهایی :
              <strong>{formatPriceToToman(updatedTotal)}</strong>
            </Typography>
          </Box>
        )}
        {/* {invalidItems.length === 0 && (
          <Typography variant='body1'>
            تمامی محصولات در سبد خرید شما موجود هستند. مبلغ پرداخت:
            <strong>{formatPriceToToman(updatedTotal)}</strong>
          </Typography>
        )} */}
        {/* <Typography variant='body2' color='error' className='mt-2'>
          در صورت تایید، آیتم‌های نامعتبر از سبد خرید حذف خواهند شد.
        </Typography> */}
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {/* <Button onClick={onCancel} variant='outlined' color='error'>
          بازگشت به سبد
        </Button> */}
        <Button
          className='bg-green-500 hover:bg-green-600 text-white'
          onClick={onProceed}
          variant='contained'
          // color='primary'
        >
          پرداخت نهایی
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
