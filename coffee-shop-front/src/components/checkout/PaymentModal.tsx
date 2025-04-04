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
        }}
      >
        بررسی سبد خرید
      </DialogTitle>
      <DialogContent dir='rtl'>
        {invalidItems.length > 0 && (
          <Box dir='rtl'>
            <Typography variant='body1' gutterBottom>
              موارد زیر قبلاً ناموجود یا حذف شده بودند اما اکنون موجود شده‌اند:
            </Typography>
            <List dir='rtl'>
              {validItems.map((item) => (
                <ListItem key={item.id} dense dir='rtl'>
                  <ListItemText
                    dir='rtl'
                    primary={item.name}
                    secondary={`تعداد: ${
                      item.quantity
                    } - قیمت: ${formatPriceToToman(item.price)}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant='body2' color='text.secondary' className='mt-2'>
              مبلغ پرداخت به‌روز شده بر اساس آیتم‌های موجود:
              <strong>{formatPriceToToman(updatedTotal)}</strong>
            </Typography>
          </Box>
        )}
        {invalidItems.length === 0 && (
          <Typography variant='body1'>
            تمامی محصولات در سبد خرید شما موجود هستند. مبلغ پرداخت:
            <strong>{formatPriceToToman(updatedTotal)}</strong>
          </Typography>
        )}
        <Typography variant='body2' color='error' className='mt-2'>
          در صورت تایید، آیتم‌های نامعتبر از سبد خرید حذف خواهند شد.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='error'>
          بازگشت به سبد
        </Button>
        <Button onClick={onProceed} variant='contained' color='primary'>
          ادامه پرداخت
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
