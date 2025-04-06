'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CoffeeScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // حتماً باید قبل از استفاده، پلاگین را ثبت کنیم
    gsap.registerPlugin(ScrollTrigger);

    // یک context برای مدیریت بهتر GSAP در React
    const ctx = gsap.context(() => {
      // مثال: المان‌هایی که کلاس .coffee-section دارند را با اسکرول انیمیت می‌کنیم
      gsap.utils.toArray('.coffee-section').forEach((section: any, index) => {
        // از ScrollTrigger استفاده می‌کنیم تا هر سکشن هنگامی که به آن رسیدیم،
        // انیمیشن وارد شدن (مثلاً از سمت چپ با شفافیت 0) را اعمال کند
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // از چه زمانی انیمیشن شروع شود
            end: 'bottom 60%', // تا چه زمانی اسکرول ادامه داشته باشد
            scrub: false, // اگر بخواهیم انیمیشن با حرکت اسکرول sync شود: scrub: true
            markers: false, // جهت تست و دیباگ
          },
          x: index % 2 === 0 ? -100 : 100, // یکی در میان از چپ یا راست وارد شود
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        });
      });

      // مثال: اگر بخواهید یک سکشن را پین کنید (ثابت بماند) تا انیمیشن خاصی روی آن اعمال شود:
      // gsap.to('.pinned-section', {
      //   scrollTrigger: {
      //     trigger: '.pinned-section',
      //     start: 'top top',
      //     end: '+=100%',   // به اندازه طول viewport دیگر (هر مقداری که می‌خواهید)
      //     pin: true,
      //     scrub: true,
      //   },
      //   // هر تغییری که مد نظر است...
      //   // opacity: 0.5,
      // });
    }, containerRef);

    // پاک‌سازی انیمیشن‌ها هنگام unmount
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={containerRef} sx={{ width: '100%', overflow: 'hidden' }}>
      {/* سکشن اول */}
      <Box
        className='coffee-section'
        sx={{
          height: '100vh',
          backgroundColor: '#F5F2ED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h3' sx={{ color: '#4F2C19' }}>
          اولین اسلاید قهوه
        </Typography>
      </Box>

      {/* سکشن دوم */}
      <Box
        className='coffee-section'
        sx={{
          height: '100vh',
          backgroundColor: '#EBEBDC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h3' sx={{ color: '#4F2C19' }}>
          دومین اسلاید قهوه
        </Typography>
      </Box>

      {/* سکشن سوم */}
      <Box
        className='coffee-section'
        sx={{
          height: '100vh',
          backgroundColor: '#D5C6B2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h3' sx={{ color: '#4F2C19' }}>
          سومین اسلاید قهوه
        </Typography>
      </Box>
    </Box>
  );
};

export default CoffeeScrollAnimation;
