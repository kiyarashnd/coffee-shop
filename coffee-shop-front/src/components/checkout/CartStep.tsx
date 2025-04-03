'use client';

import { Box, Typography, Button, Divider } from '@mui/material';
import { useCartStore } from '@/store/useCartStore';

interface CartStepProps {
  onNext: () => void; // تابعی که با کلیک دکمه "مرحله بعد" صدا می‌زنیم
  totalAmout: number;
  setTotalAmount: (data: number) => void;
}

export default function CartStep({
  onNext,
  totalAmout,
  setTotalAmount,
}: CartStepProps) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // محاسبهٔ قیمت‌ها
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // const discountValue = Math.floor(totalPrice * 0.33);
  // const finalPrice = totalPrice - discountValue;
  setTotalAmount(totalPrice);

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        سبد خرید شما
      </Typography>

      {cart.length === 0 ? (
        <Typography>سبد خرید شما خالی است.</Typography>
      ) : (
        <Box
          sx={{
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            mb: 2,
          }}
        >
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography fontWeight='bold'>{item.name}</Typography>
                <Typography color='text.secondary'>
                  {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() =>
                    updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                  }
                >
                  -
                </Button>
                <Typography>{item.quantity}</Typography>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => removeFromCart(item.id)}
                >
                  حذف
                </Button>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* خلاصه قیمت‌ها */}
          <Typography>
            قیمت کالاها: {totalPrice.toLocaleString('fa-IR')} تومان
          </Typography>
          {/* <Typography color='error'>
            سود شما (تخفیف): {discountValue.toLocaleString('fa-IR')} تومان (۳۳٪)
          </Typography>
          <Typography fontWeight='bold'>
            جمع نهایی: {finalPrice.toLocaleString('fa-IR')} تومان
          </Typography> */}
        </Box>
      )}

      {/* خط جداکننده بین مرحله یک و دو */}
      <Divider sx={{ my: 3 }} />

      {/* این مرحله چون اول است، دکمه بازگشت ندارد */}
      <Box display='flex' justifyContent='space-between' mt={2}>
        <Box />
        <Button
          variant='contained'
          onClick={onNext}
          disabled={cart.length === 0}
        >
          مرحله بعد
        </Button>
      </Box>
    </Box>
  );
}
