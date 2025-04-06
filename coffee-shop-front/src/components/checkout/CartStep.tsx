'use client';

import { Box, Typography, Button, Divider } from '@mui/material';
import { useCartStore } from '@/store/useCartStore';

interface CartStepProps {
  onNext: () => void;
  totalAmout: number;
  setTotalAmount: (data: number) => void;
  productsData: any[]; // آرایه‌ای از محصولات دریافتی از بک‌اند
}

export default function CartStep({
  onNext,
  totalAmout,
  setTotalAmount,
  productsData,
}: CartStepProps) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // محاسبه قیمت کل فقط برای محصولاتی که موجود هستند (available === true)
  const totalPrice = cart.reduce((sum, item) => {
    const productFromBackend = productsData?.find((p) => p._id === item.id);
    if (!productFromBackend) {
      // محصول حذف شده، باید از سبد حذف شود (این کار در useEffect CheckoutPage انجام شده)
      return sum;
    }
    if (productFromBackend.available === false) {
      // اگر محصول موجود نیست، قیمت آن لحاظ نشود
      return sum;
    }
    return sum + item.price * item.quantity;
  }, 0);
  setTotalAmount(totalPrice);

  return (
    <Box dir='rtl'>
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
          {cart.map((item) => {
            const productFromBackend = productsData?.find(
              (p) => p._id === item.id
            );
            const isAvailable = productFromBackend?.available !== false;
            return (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  opacity: isAvailable ? 1 : 0.6,
                }}
              >
                <Box>
                  <Typography fontWeight='bold'>{item.name}</Typography>
                  <Typography color='text.secondary'>
                    {(isAvailable
                      ? item.price * item.quantity
                      : 0
                    ).toLocaleString('fa-IR')}{' '}
                    تومان
                  </Typography>
                  {!isAvailable && (
                    <Typography variant='caption' color='error'>
                      {/* این محصول موجود نیست! */}
                      در حال تامین کالا
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() =>
                      updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                    }
                    disabled={!isAvailable}
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={!isAvailable}
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
            );
          })}

          <Divider sx={{ my: 2 }} />

          {/* نمایش قیمت کالاها */}
          <Typography>
            قیمت کالاها: {totalPrice.toLocaleString('fa-IR')} تومان
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Box display='flex' justifyContent='space-between' mt={2}>
        {/* <Box /> */}
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
