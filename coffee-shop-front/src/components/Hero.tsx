// app/components/Hero.tsx
'use client';
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { push } = useRouter();
  return (
    <Box
      sx={{
        backgroundImage: 'url(/coffee-hero.png)', // Place this image in the public folder
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // height: { xs: '60vh', md: '80vh' },
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Container
        sx={{
          color: 'black',
          mt: '80px',
        }}
      >
        <Typography variant='h2' component='h1' gutterBottom>
          <b className='text-[#4F2C19]'>قهوه</b> یادت نره
        </Typography>
        <Typography variant='h5' component='p' gutterBottom>
          بهترین و با کیفیت ترین قهوه ها و اکسسوری ها با کورش
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          size='large'
          sx={{
            backgroundColor: '#B0A27B',
            color: 'white',
            borderRadius: '35px',
            width: '188.97px',
          }}
          onClick={() => push('/products')}
        >
          نمایش محصولات
        </Button>
        <Container
          sx={{
            color: 'black',
            display: 'felx',
            justifyContent: 'center',
          }}
        >
          {/* <RotatingImage
            src='/coffee-heroص.png'
            alt='Coffee Cup'
            width='600'
            height='300'
          /> */}
          <Box
            component='img'
            sx={{
              height: 220,
              width: 220,
              //   maxHeight: { xs: 233, md: 167 },
              //   maxWidth: { xs: 350, md: 250 },
              marginX: 'auto',
            }}
            alt='The house from the offer.'
            src='/coffee-gif.gif'
          />
          {/* <Box
            component='img'
            sx={{
              //   height: 233,
              //   width: 350,
              //   maxHeight: { xs: 233, md: 167 },
              //   maxWidth: { xs: 350, md: 250 },
              marginX: 'auto',
            }}
            alt='The house from the offer.'
            src='/coffee-heroص.png'
          /> */}
        </Container>
        <Box
          sx={{
            backgroundImage: 'url(/image.png)', // Place this image in the public folder
            backgroundSize: 'cover',
            // backgroundPosition: 'center',
            // height: { xs: '60vh', md: '80vh' },
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            // color: 'white',
            // textAlign: 'center',
            // px: 2,
            // rotate: '180deg',
            // marginTop: '-35px',
          }}
        >
          <Typography
            component='div'
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-evenly',
              width: '100%',

              //   flexDirection: { sm: 'column', lg: 'column' },
              //   flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                fontStyle: 'italic',
                m: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  color: '#4F2C19',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                }}
              >
                +۱۰۰
              </Typography>
              <Typography
                sx={{
                  color: '#3D3D3D',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                اکسسوری
              </Typography>
            </Box>

            <Box
              sx={{
                fontStyle: 'italic',
                m: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  color: '#4F2C19',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                }}
              >
                +۱۰۰۰
              </Typography>
              <Typography
                sx={{
                  color: '#3D3D3D',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                رضایت مشتری
              </Typography>
            </Box>
            <Box
              sx={{
                fontStyle: 'italic',
                m: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  color: '#4F2C19',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                }}
              >
                +8
              </Typography>
              <Typography
                sx={{
                  color: '#3D3D3D',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                نوع قهوه
              </Typography>
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
