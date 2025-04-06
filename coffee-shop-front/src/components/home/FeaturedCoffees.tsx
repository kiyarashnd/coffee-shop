'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useFetchData } from '@/hooks/useFetchData';
import { useRouter } from 'next/navigation';
import { formatPriceToToman } from '@/utils/formatPrice';

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  available: boolean;
}

const FeaturedCoffees = () => {
  const { data, isLoading, error } = useFetchData();
  const router = useRouter();

  if (isLoading) return <p className='text-center py-10'>Loading...</p>;
  if (error)
    return <p className='text-center text-red-500'>Error: {error.message}</p>;

  const products: Product[] = data;

  return (
    <Box sx={{ py: { xl: 8, xs: 2 }, direction: 'rtl' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Typography variant='h4' component='h2' align='center' gutterBottom>
          محصولات ویژه
        </Typography>
      </Box>

      <Container
        sx={{
          display: 'flex',
          gap: '15px',
        }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: {
              slidesPerView: products?.length > 3 ? 3 : products?.length,
            },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {products.map((product) => (
            <SwiperSlide
              key={product._id}
              onClick={() => {
                router.push(`/products/${product._id}`);
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#EBEBDC',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <CardMedia
                  component='img'
                  sx={{ height: 200 }}
                  image={product.image}
                  alt={product.name}
                  className={`${
                    product.available ? '' : 'grayscale'
                  } hover:scale-105`}
                />
                {!product.available && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant='h6' color='white' fontWeight='bold'>
                      در حال تامین کالا
                    </Typography>
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='h2'
                    sx={{
                      fontFamily: 'serif',
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#555', mb: 1 }}>
                    {product.category}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between', // Distribute space between items
                    }}
                  >
                    <Typography
                      variant='body1'
                      sx={{ color: '#333', fontWeight: '600' }}
                    >
                      {formatPriceToToman(product.price)}
                    </Typography>
                    <span className='text-sm text-coffee-medium underline'>
                      جزئیات محصول
                    </span>
                  </Box>
                </CardContent>
                {/* <CardActions>
                  <Button size='small' color='primary'>
                    دیدن محصول
                  </Button>
                  <Button size='small' color='secondary'>
                    خرید
                  </Button>
                </CardActions> */}
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default FeaturedCoffees;
