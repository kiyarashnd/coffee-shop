'use client';

import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <Container maxWidth='md' className='py-10'>
      {/* بخش عنوان */}
      <Typography
        variant='h3'
        className='text-center font-serif font-bold mb-6 text-text-primary'
      >
        درباره ما
      </Typography>

      {/* معرفی شرکت */}
      <Grid container spacing={4} className='mb-8'>
        <Grid item xs={12} md={6}>
          <Box className='relative rounded-lg overflow-hidden shadow-lg'>
            <Image
              src='/cappuccino.jpg'
              alt='تجربه در اداره کافه‌ها'
              width={600}
              height={400}
              className='object-cover'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1' className='mb-4 text-justify'>
            با بیش از ده سال تجربه در اداره کافه‌ها و رستوران‌ها، و پنج سال
            سابقه در زمینه آموزش، تولید و فروش قهوه، ما در ارائه خدمات قهوه با
            کیفیت بالا به مشتریانمان افتخار می‌کنیم. تخصص ما در ترکیب منحصر به
            فرد علم قهوه با تجربه عملی در صنعت رستوران‌داری، تضمین‌کننده‌ی ارائه
            تجربه‌ای بی‌نظیر در هر فنجان قهوه است.
          </Typography>
          <Typography variant='body1' className='mb-4 text-justify'>
            هدف ما ایجاد فضایی است که در آن علاوه بر طعم بی‌نظیر قهوه، ارزش‌های
            فرهنگی و اجتماعی نیز به نمایش گذاشته شود. تیم متخصص ما با تلاش مستمر
            در بهبود فرایندها و استفاده از فناوری‌های نوین، استانداردهای جدیدی
            در صنعت قهوه ایجاد کرده است.
          </Typography>
        </Grid>
      </Grid>

      {/* ماموریت ما */}
      <Box className='mb-8'>
        <Typography
          variant='h4'
          className='font-serif font-bold mb-4 text-text-primary'
        >
          ماموریت ما
        </Typography>
        <Typography variant='body1' className='text-justify'>
          ماموریت ما ارائه‌ی تجربه‌ای منحصر به فرد در سرویس‌دهی قهوه است. ما
          معتقدیم که هر فنجان قهوه می‌تواند لحظاتی خاص را برای شما رقم بزند. از
          طریق بهره‌گیری از دانش تخصصی و تمرکز بر جزئیات، سعی در ایجاد تجربه‌ای
          داریم که نه تنها از لحاظ طعم و کیفیت، بلکه از نظر فرهنگی و اجتماعی نیز
          ارزشمند باشد.
        </Typography>
      </Box>

      {/* ارزش‌های ما */}
      <Box className='mb-8'>
        <Typography
          variant='h4'
          className='font-serif font-bold mb-4 text-text-primary'
        >
          ارزش‌های ما
        </Typography>
        <Typography variant='body1' className='mb-4 text-justify'>
          ما به نوآوری، کیفیت، صداقت و خدمات مشتری محور باور داریم. این ارزش‌ها
          در تمامی جنبه‌های کاری ما، از انتخاب دانه‌های قهوه با کیفیت گرفته تا
          ارائه خدمات پس از فروش، موجبات موفقیت ما را فراهم می‌کند. ما همواره در
          تلاشیم تا با به‌کارگیری بهترین روش‌ها، رضایت مشتریان را تضمین کنیم.
        </Typography>
      </Box>

      {/* فرآیند تولید و نوآوری */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className='relative rounded-lg overflow-hidden shadow-lg'>
            <Image
              src='/about-coffee.jpg'
              alt='فرآیند تولید قهوه'
              width={600}
              height={400}
              className='object-cover'
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1' className='mb-4 text-justify'>
            ما بهبود و نوآوری را در هر مرحله از تولید قهوه در دستور کار خود قرار
            داده‌ایم. از فرایند انتخاب دانه‌های برتر گرفته تا تکنیک‌های پیشرفته
            در آسیاب و دم‌کردن، همه با هدف ارائه یک تجربه متفاوت و لذت‌بخش برای
            مشتریان انجام می‌شود.
          </Typography>
          <Typography variant='body1' className='mb-4 text-justify'>
            تمرکز ما بر روی کیفیت و خلاقیت، ما را در مسیر ایجاد تحول در صنعت
            قهوه هدایت می‌کند. ما از فناوری‌های نوین و روش‌های استاندارد
            بین‌المللی بهره می‌بریم تا اطمینان حاصل کنیم هر فنجان قهوه با
            بالاترین کیفیت و طعم اصیل سرو شود.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
