'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

interface HeroProps {
  // اگر پارامتر یا پروپی نیاز داشتید اینجا تعریف کنید
}

const Hero: React.FC<HeroProps> = () => {
  return (
    <Box
      component='section'
      className='flex flex-col items-center justify-center px-4 py-8 md:flex-row md:justify-between'
    >
      {/* متن معرفی */}
      <Box className='md:w-1/2 space-y-6'>
        <Typography
          variant='h4'
          className='font-bold text-[#3e2c00] leading-relaxed'
        >
          خانه_قهوه_جاووس
        </Typography>
        <Typography variant='body1' className='text-gray-600 leading-7'>
          با ما بهترین تجربهٔ نوشیدن قهوه را داشته باشید. باریستاهای حرفه‌ای ما
          با ذوق و سلیقه، خدماتی خاص و آموزشی جهت سرو قهوه ارائه می‌دهند.
        </Typography>
        <Button
          variant='contained'
          className='bg-[#6c4b1a] hover:bg-[#4e3412] text-white px-6 py-3 rounded'
        >
          ورود به ما
        </Button>
      </Box>

      {/* تصویر سمت راست یا چپ */}
      <Box className='relative mt-8 md:mt-0 md:w-1/2 flex justify-center'>
        <Box className='w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg'>
          <Image
            src='/about-coffee.jpg'
            alt='Coffee Hero Image'
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
