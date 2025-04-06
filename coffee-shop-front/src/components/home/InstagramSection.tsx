'use client';

import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const InstagramSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ساخت یک تایم‌لاین که المان‌ها با اسکرول و پین شدن ظاهر شوند
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // عنصری که باید پین شود
          start: 'top top',
          end: '+=200%', // طول پین (2 برابر ارتفاع ویوپورت)
          pin: true, // در این فاصله سکشن پین بماند
          scrub: true, // با اسکرول هماهنگ شود
          markers: false,
        },
      });

      // (1) گوشی از پایین بالا بیاید
      tl.from('.phone', {
        y: 300, // از 300px پایین صفحه
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });

      // (2) متن "اینستاگرام ما" از چپ وارد شود
      tl.from(
        '.insta-text',
        {
          x: -200,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      // (3) متن آیدی اینستاگرام از راست وارد شود
      tl.from(
        '.insta-handle',
        {
          x: 200,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      // (4) متن توضیحات از پایین بیاید
      tl.from(
        '.insta-desc',
        {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.3'
      );
      // '-=0.3' یعنی 0.3 ثانیه قبل از پایان انیمیشن قبلی شروع شود
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F5F1',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // py: { xs: 5, md: 10 }, // حاشیه عمودی بنا به نیاز
          py: 2,
        }}
      >
        {/* تصویر گوشی */}
        <Box
          className='phone'
          component='img'
          src='/images/instagrampage.png' // مسیر عکس گوشی
          alt='Instagram Phone'
          sx={{
            width: { xs: '180px', md: '280px' },
            borderRadius: '30px',
            mx: 'auto',
          }}
        />

        {/* باکس متن سمت راست گوشی */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            maxWidth: { xs: '90%', md: '50%' },
            mx: 'auto',
            p: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant='h4'
            className='insta-text'
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#3D3D3D',
            }}
          >
            اینستاگرام ما
          </Typography>

          <Typography
            variant='h5'
            className='insta-handle'
            sx={{
              color: '#8B6B43',
              mb: 3,
            }}
          >
            @Koowrosh.coffee
          </Typography>

          {/* متن توضیحات که از پایین ظاهر می‌شود */}
          <Typography
            variant='body1'
            className='insta-desc'
            sx={{
              color: '#6B5840',
              lineHeight: 1.7,
            }}
          >
            با بیش از ده سال تجربه در اداره کافه‌ها و رستوران‌ها، و پنج سال
            سابقه در عرصه‌ی آموزش و تولید و فروش قهوه، ما در زمینه‌ی خدمات قهوه
            به شما اطمینان می‌دهیم. تخصص ما در ترکیب بی‌نظیر علم قهوه با تجربه‌ی
            رستورانی، تجربه‌ی بی‌نظیری را برای شما ایجاد خواهیم کرد.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default InstagramSection;
