'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// داده دسته‌بندی‌ها (می‌توانید تصویر و متن را از API هم بگیرید)
const categories = [
  { title: 'اکسسوری', image: '/images/accessories.png' },
  { title: 'سیروپ', image: '/images/syrup.png' },
  { title: 'دریپ بک', image: '/images/dripbag.png' },
  { title: 'پودر جات', image: '/images/powder.png' },
  { title: 'دانه قهوه', image: '/images/coffee-bean.png' },
];

const CategorySection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // یک context برای مدیریت بهتر انیمیشن‌ها در React
    const ctx = gsap.context(() => {
      // انیمیشن ورود سکشن از چپ
      gsap.from('.category-container', {
        scrollTrigger: {
          trigger: '.category-container',
          start: 'top 85%', // وقتی بالای سکشن به 85% ویوپورت رسید، انیمیشن شروع شود
          end: 'bottom 50%', // تا وقتی انتهای سکشن به 50% ویوپورت برسد
          scrub: false, // اگر بخواهید انیمیشن با اسکرول sync شود، این را true بگذارید
          markers: false, // جهت تست کردن می‌توانید true بگذارید
        },
        x: -200, // از سمت چپ بیاید
        opacity: 0, // از شفافیت 0
        duration: 1.2, // مدت زمان
        ease: 'power2.out',
      });

      //   // اگر بخواهید بعد از عبور کاربر، سکشن به بالا برگردد یا پین شود، می‌توانید یک انیمیشن جدا تعریف کنید.
      //   // نمونه: انیمیشن بیرون رفتن سکشن به بالا
      //   gsap.to('.category-container', {
      //     scrollTrigger: {
      //       trigger: '.category-container',
      //       start: 'bottom 40%',
      //       end: 'bottom 20%',
      //       scrub: true, // برای هماهنگی با اسکرول
      //     },
      //     y: -100, // 100 پیکسل به بالا برود
      //     opacity: 0.5, // کمی شفاف شود
      //   });
    }, containerRef);

    // پاک‌سازی انیمیشن‌ها هنگام unmount
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={containerRef} sx={{ display: 'flex', alignItems: 'center' }}>
      <Container
        className='category-container'
        sx={{
          borderRadius: 2,
          py: 4,
          px: { xs: 2, md: 4 },
          textAlign: 'center',
        }}
      >
        <Typography variant='h4' component='h2' sx={{ mb: 1 }}>
          دسته بندی محصولات
        </Typography>
        <Typography variant='subtitle1' sx={{ mb: 4, color: '#6f6f6f' }}>
          بهترین و باکیفیت‌ترین برندها، چون شما لایق بهترین‌ها هستید
        </Typography>

        {/* نمایش آیتم‌های دسته‌بندی */}
        <Stack
          direction='row'
          spacing={2}
          sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}
        >
          {categories.map((cat) => (
            <Box
              key={cat.title}
              sx={{
                backgroundColor: '#EBEBDC',
                borderRadius: '9999px', // حالت گرد (pill)
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                py: 1.5,
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {/* تصویر و عنوان هر دسته */}
              <Box
                component='img'
                src={cat.image}
                alt={cat.title}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  ml: 1, // فاصله از متن
                }}
              />
              <Typography
                variant='body1'
                sx={{ color: '#4F2C19', fontWeight: 'bold' }}
              >
                {cat.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default CategorySection;
