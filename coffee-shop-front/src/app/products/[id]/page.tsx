// app/product/[id]/page.tsx
'use client';

import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import { useFetchData } from '@/app/hooks/useFetchData';

const ProductDetail: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useFetchData(id as string); // Pass ID to fetch a single product

  const product = data;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle case where product is not found
  if (!product) {
    return (
      <div className='container mx-auto px-6 py-24 text-center'>
        <Head>
          <title>Product Not Found - Coffee Shop</title>
        </Head>
        <Typography className='text-2xl font-serif text-text-primary'>
          Product not found
        </Typography>
        <Link
          href='/products'
          className='mt-4 inline-flex items-center text-coffee-medium hover:underline'
        >
          <ArrowBack fontSize='small' className='mr-2' />
          Back to products
        </Link>
      </div>
    );
  }

  // Add to cart handler (placeholder)
  const handleAddToCart = () => {
    console.log(`${product.name} has been added to your cart.`);
    // Add your cart logic here (e.g., context, state management)
  };

  return (
    <>
      <Head>
        <title>{product.name} - Coffee Shop</title>
      </Head>
      <div className='container mx-auto px-6 py-24'>
        {/* Back to products link */}
        <Link
          href='/products'
          className='inline-flex items-center mb-8 text-coffee-medium hover:underline'
        >
          <ArrowBack fontSize='small' className='mr-2' />
          همه محصولات
        </Link>

        {/* Product details grid */}
        <Grid container spacing={4} className='animate-fadeIn'>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <div className='overflow-hidden rounded-lg shadow-md'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500'
              />
            </div>
          </Grid>

          {/* Product Details */}
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
              <Button
                variant='contained'
                className='bg-coffee-dark text-white hover:bg-coffee-medium px-8 py-3'
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
              >
                <p className='mx-2'>اضافه کردن به سبد خرید</p>
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProductDetail;
