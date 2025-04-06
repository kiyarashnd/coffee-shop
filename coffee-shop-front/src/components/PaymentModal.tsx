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
} from '@mui/material';
import { formatPriceToToman } from '@/utils/formatPrice';

interface PaymentModalProps {
  open: boolean;
  updatedTotal: number;
  validItems: any[];
  invalidItems: any[];
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
      <DialogTitle>بررسی سبد خرید</DialogTitle>
      <DialogContent>
        {invalidItems.length > 0 && (
          <>
            <Typography variant='body1' gutterBottom>
              موارد زیر به دلیل عدم موجودی از سبد خرید شما حذف خواهند شد:
            </Typography>
            <List>
              {invalidItems.map((item) => (
                <ListItem key={item.id} dense>
                  <ListItemText
                    primary={item.name}
                    secondary={`(${item.reason})`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {validItems.length > 0 && (
          <>
            <Typography variant='body1' gutterBottom className='mt-2'>
              محصولات موجود در سبد خرید:
            </Typography>
            <List>
              {validItems.map((item) => (
                <ListItem key={item.id} dense>
                  <ListItemText
                    primary={item.name}
                    secondary={`تعداد: ${
                      item.quantity
                    } - قیمت هر واحد: ${formatPriceToToman(item.price)}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Typography variant='body2' color='text.secondary' className='mt-2'>
          مبلغ پرداخت به‌روز شده:{' '}
          <strong>{formatPriceToToman(updatedTotal)}</strong>
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
