'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

interface FeaturedCoffeesProps {
  // اگر به داده‌ی داینامیک نیاز دارید، اینجا تعریف کنید
}

const FeaturedCoffees: React.FC<FeaturedCoffeesProps> = () => {
  const articles = [
    {
      id: 1,
      title: 'چگونه قهوه هاتریک درست کنیم؟',
      image: '/about-coffee.jpg',
      desc: 'یادگیری روش‌های صحیح دم‌کردن قهوهٔ هاتریک...',
    },
    {
      id: 2,
      title: 'قهوه ترک، آداب و اتیکت نوشیدن',
      image: '/about-coffee.jpg',
      desc: 'نکات کلیدی درباره قهوه ترک و روش‌های سرو...',
    },
    {
      id: 3,
      title: 'آشنایی با انواع مختلف قهوه',
      image: '/about-coffee.jpg',
      desc: 'در این مقاله انواع مختلف قهوه را بررسی می‌کنیم...',
    },
  ];

  return (
    <Box component='section' className='px-4 py-8 bg-[#f8f8f8] text-[#3e2c00]'>
      <Typography variant='h5' className='font-bold mb-6'>
        مقالات آموزشی
      </Typography>

      <Box className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {articles.map((article) => (
          <Card key={article.id} className='shadow-md'>
            <CardMedia
              component='img'
              height='180'
              image={article.image}
              alt={article.title}
            />
            <CardContent className='flex flex-col space-y-2'>
              <Typography variant='h6' className='font-bold'>
                {article.title}
              </Typography>
              <Typography variant='body2' className='text-gray-600'>
                {article.desc}
              </Typography>
              <Button
                variant='text'
                className='self-end text-[#6c4b1a] font-semibold'
              >
                ادامه مطلب
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedCoffees;
