// // app/components/Footer.tsx
// import React from 'react';
// import { Box, Container, Typography } from '@mui/material';

// const Footer = () => {
//   return (
//     <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, mt: 8 }}>
//       <Container maxWidth='lg'>
//         <Typography variant='body1' align='center'>
//           © {new Date().getFullYear()} کافی شاپ. All rights reserved.
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <footer className='flex flex-col bg-white'>
      {/* <section className='flex flex-col-reverse lg:flex-row-reverse px-10 !justify-between py-10'>
        <p className='mt-5 flex lg:hidden text-sm'>
          تمامی حقوق برای هومینو محفوظ هست
        </p>

        <section className='flex gap-7 lg:ml-24'>
          <div className='flex flex-col text-center gap-4'>
            <h5 className='text-lg lg:text-xl'>با هومینو</h5>
            <p className='text-sm lg:text-lg'>قوانین و مقررات</p>
            <p className='text-sm lg:text-lg'>تماس با ما</p>
            <p className='text-sm lg:text-lg'>درباره ما</p>
          </div>
          <div className='flex flex-col text-center gap-4'>
            <h5 className='text-lg lg:text-xl'>دسترسی سربع</h5>
            <p className='text-sm lg:text-lg'>اجاره</p>
            <p className='text-sm lg:text-lg'>خرید</p>
            <p className='text-sm lg:text-lg'>تهاتر</p>
          </div>
        </section>
        <div className='xl:w-[52rem] gap-5 flex flex-col lg:text-right text-center mb-4 lg:mb-0 text-sm lg:text-lg'>
          <div className='w-[154px] h-[40px] bg-[#D9D9D9] mx-auto md:mx-0'></div>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم استلورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
          </p>
          <p className='hidden lg:flex'>تمامی حقوق برای هومینو محفوظ هست</p>
        </div>
      </section> */}
      <section className='flex flex-col lg:flex-row lg:justify-between lg:items-center bg-[#333333] py-10 text-[white]'>
        <div className='flex flex-col gap-6 lg:gap-16 lg:flex-row text-center'>
          <div className=' mr-4'>
            هر روز هفته ساعت ۸ تا ۲۴ پاسخگوی شما هستیم.
          </div>
          <p>راه های ارتباطی :‌</p>
          <div className=' flex gap-1 mx-auto'>
            <p className='mt-1'>09360627237</p>
            <CallIcon />
          </div>
          <div className='flex gap-1 mx-auto'>
            <p className='mt-1'>kiyarash.ndri@gmail.com</p>
            <EmailIcon />
          </div>
        </div>
        <div className='flex justify-center flex-1 gap-10 flex-row-reverse lg:mt-0 mt-10'>
          <TwitterIcon fontSize='large' />
          <Link
            href='https://www.instagram.com/koorowsh.coffee?igsh=Y2N1M2hueTU3MXho'
            target='_blank'
          >
            <InstagramIcon fontSize='large' />
          </Link>
          <YouTubeIcon fontSize='large' />
          <TelegramIcon fontSize='large' />
        </div>

        <Box>
          <a
            className='cursor-pointer p-2 lg:p-4 flex items-center justify-center border-complete-200 rounded mr-2'
            target='_blank'
            referrerPolicy='origin'
            href='https://trustseal.enamad.ir/?id=594292&Code=5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd'
          >
            <div>
              <img
                id='557535'
                referrerPolicy='origin'
                className='w-full inline-block'
                src='https://trustseal.enamad.ir/logo.aspx?id=594292&Code=5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd'
                width='100'
                height='110'
                alt='نماد اعتماد الکترونیک'
                title='enamad'
              />
            </div>
          </a>
          {/* <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=594292&Code=5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=594292&Code=5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd' alt='' style='cursor:pointer' code='5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd'></a> */}

          {/* <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=594292&Code=5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=594292&Code=5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd' alt='' style='cursor:pointer' code='5oWzYqP2g3iq8G2VT9LidDdQ1Jr0T1vd'></a> */}
        </Box>
      </section>
      {/* </div> */}
    </footer>
  );
};

export default Footer;
