'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface InstagramSectionProps {}

const InstagramSection: React.FC<InstagramSectionProps> = () => {
  return (
    <Box
      component='section'
      className='bg-[#CCDEE5] py-8 px-4 flex flex-col items-center justify-center'
    >
      <Typography variant='h5' className='font-bold mb-4 text-[#3e2c00]'>
        اینستاگرام ما
      </Typography>
      <Typography variant='body1' className='mb-6'>
        @Coffeehouse_north
      </Typography>

      {/* تصویر موبایل یا اسکرین‌شات اینستا */}
      <Box className='relative w-64 h-96 md:w-80 md:h-[480px] overflow-hidden'>
        <Image
          src='/about-coffee.jpg'
          alt='Instagram preview'
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};

export default InstagramSection;
