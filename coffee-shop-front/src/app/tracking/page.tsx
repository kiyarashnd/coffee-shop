'use client';

import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { formatPriceToToman } from '@/utils/formatPrice';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type Order = {
  _id: string;
  phone: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    addressLine: string;
    city: string;
    postalCode: string;
  };
  trackingCode: string;
  paymentStatus: 'pending' | 'paid' | 'canceled' | 'failed';
  createdAt: string;
};

const TrackingPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  //   const [orders, setOrders] = useState<Order[]>([]);
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setLoading(true);
    try {
      // Assume you have implemented a tracking endpoint at /api/order/track?phone=...
      const res = await fetch(
        `http://${baseUrl}/api/order/my?phone=${encodeURIComponent(phone)}`
      );
      if (!res.ok) {
        throw new Error('خطا در دریافت سفارش‌ها');
      }
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.message || 'سفارش‌هایی یافت نشد');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='md' className='py-10'>
      <Typography variant='h4' className='text-center font-bold mb-6'>
        پیگیری سفارش
      </Typography>
      <Box className='flex flex-col items-center mb-6'>
        <TextField
          label='شماره تلفن'
          variant='outlined'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='mb-4 w-full'
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleSearch}
          disabled={loading || !phone}
          className='w-full'
        >
          {loading ? 'در حال جستجو...' : 'جستجو'}
        </Button>
      </Box>
      {error && (
        <Typography variant='body1' color='error' className='text-center mb-6'>
          {error}
        </Typography>
      )}
      {orders === undefined ? (
        <Box></Box>
      ) : orders?.length > 0 ? (
        <Box className='mt-10'>
          <Typography variant='h5' className='mb-4 text-center'>
            سفارش‌های شما:
          </Typography>
          {orders?.map((order) => (
            <Card key={order._id} className='mb-4'>
              <CardContent>
                <Typography variant='subtitle1' className='font-bold'>
                  کد رهگیری: {order.trackingCode}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  className='mb-1'
                >
                  وضعیت پرداخت: {order.paymentStatus}
                </Typography>
                <Divider className='my-2' />
                <Typography variant='body1' className='mb-2'>
                  مبلغ قابل پرداخت: {formatPriceToToman(order.totalAmount)}
                </Typography>
                <Typography variant='body2' className='mb-1'>
                  اطلاعات ارسال:
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  {order.shippingAddress.fullName} -{' '}
                  {order.shippingAddress.addressLine},{' '}
                  {order.shippingAddress.city} -{' '}
                  {order.shippingAddress.postalCode}
                </Typography>
                <Divider className='my-2' />
                <Typography variant='body2' className='font-bold mb-1'>
                  محصولات:
                </Typography>
                {order.items.map((item, index) => (
                  <Box key={index} className='flex justify-between'>
                    <Typography variant='body2'>
                      {item.name} (x{item.quantity})
                    </Typography>
                    <Typography variant='body2'>
                      {formatPriceToToman(item.price * item.quantity)}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          هیچ سفارشی با این شماره موبایل ثبت نشده.😥
        </Box>
      )}
    </Container>
  );
};

export default TrackingPage;
