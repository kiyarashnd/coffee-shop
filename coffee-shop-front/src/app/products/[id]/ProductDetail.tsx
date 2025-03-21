'use client';

import React, { useState } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import { useFetchData } from '@/hooks/useFetchData';
import { useCartStore } from '@/store/useCartStore';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchData(id as string);
  const product = data;

  // ----- Zustand cart store -----
  //   const { cart, addToCart, updateQuantity } = useCartStore((state) => ({
  //     cart: state.cart,
  //     addToCart: state.addToCart,
  //     updateQuantity: state.updateQuantity,
  //   }));
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // Find existing item in cart (if any)
  const existingItem = cart?.find((item) => item.id === product?._id);

  // Local quantity state
  const [quantity, setQuantity] = useState(
    existingItem ? existingItem.quantity : 1
  );

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error.message}</p>;
  if (!product) {
    return (
      <div className='container mx-auto px-6 py-24 text-center'>
        <Head>
          <title>محصول پیدا نشد - قهوه‌فروشی</title>
        </Head>
        <Typography className='text-2xl font-serif text-text-primary'>
          محصول پیدا نشد
        </Typography>
        <Link
          href='/products'
          className='mt-4 inline-flex items-center text-coffee-medium hover:underline'
        >
          <ArrowBack fontSize='small' className='mr-2' />
          بازگشت به محصولات
        </Link>
      </div>
    );
  }

  // Handler for adding/updating the cart item
  const handleAddToCart = () => {
    if (existingItem) {
      // If already in cart, just update the quantity
      updateQuantity(product._id, quantity);
      alert('قبلا به سبد خرید اضافه شده');
    } else {
      // Otherwise, add a brand-new item
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }
  };

  return (
    <>
      <div className='container mx-auto px-6 py-24'>
        <Link
          href='/products'
          className='flex justify-end items-center mb-8 text-coffee-medium hover:underline'
        >
          <ArrowBack fontSize='small' className='mr-2' />
          همه محصولات
        </Link>

        <Grid container spacing={4} className='animate-fadeIn'>
          <Grid item xs={12} md={6}>
            <div className='overflow-hidden rounded-lg shadow-md'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500'
              />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className='p-6 bg-white rounded-lg shadow-md'>
              <Typography className='text-base text-coffee-medium font-semibold'>
                {product?.category}
              </Typography>
              <Typography className='text-3xl md:text-4xl font-serif font-bold mt-2 mb-4 text-text-primary'>
                {product.name}
              </Typography>
              <Typography className='text-2xl font-semibold text-coffee-dark mb-6'>
                ${product.price.toFixed(2)}
              </Typography>
              <hr className='my-4 border-gray-200' />
              <Typography className='text-base text-text-secondary mb-8 font-sans'>
                {product.description}
              </Typography>
              <div className='flex items-center gap-4 mb-4'>
                {/* <TextField
                  type='number'
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  inputProps={{ min: 1 }}
                  size='small'
                  className='w-16'
                /> */}
                <Button
                  variant='contained'
                  className='bg-coffee-dark text-white hover:bg-coffee-medium px-8 py-3'
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                >
                  <p className='mx-2'>افزودن به سبد خرید</p>
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProductDetail;
