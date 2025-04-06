// app/components/Hero.tsx
'use client';
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { push } = useRouter();

  const beans: { top: string; left: string }[] = [
    { top: '320px', left: '20%' },
    { top: '320px', left: '20%' },
    { top: '320px', left: '20%' },
    { top: '320px', left: '20%' },
    { top: '350px', left: '60%' },
    { top: '280px', left: '65%' },
    { top: '380px', left: '40%' },
    { top: '320px', left: '20%' },
    { top: '480px', left: '40%' },
    { top: '280px', left: '45%' },
    { top: '300px', left: '35%' },
    { top: '300px', left: '5%' },
    { top: '380px', left: '15%' },
    { top: '280px', left: '80%' },
  ];
  return (
    <Box
      sx={{
        backgroundImage: 'url(/coffee-hero.png)', // Place this image in the public folder
        display: 'flex',
        color: 'white',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Container
        sx={{
          color: 'black',
          mt: '50px',
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
            zIndex: 1,
          }}
          onClick={() => push('/products')}
        >
          نمایش محصولات
        </Button>
        {/* <Container
          sx={{
            color: 'black',
            // display: 'felx',
            // justifyContent: 'center',
            position: 'absolute',
          }}
        >
          <Box
            component='img'
            sx={{
              height: 220,
              width: 220,
              marginX: 'auto',
            }}
            alt='The house from the offer.'
            src='/coffee-gif.gif'
          />
        </Container> */}
        <Box
          // ref={beansRef}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            // height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        {beans?.map((item) => {
          console.log('item is : ');
          return (
            <>
              <Box
                className='coffee-bean'
                component='img'
                src='/images/bean.png'
                alt='bean1'
                sx={{
                  position: 'absolute',
                  top: `${item.top}`,
                  left: `${item.left}`,
                  width: '50px',
                }}
              />
            </>
          );
        })}

        {/* <Box
          sx={{
            backgroundImage: 'url(/image.png)', // Place this image in the public folder
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            component='div'
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-evenly',
              width: '100%',
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
                +۸
              </Typography>
              <Typography
                sx={{
                  color: '#3D3D3D',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                نوع قهوه و تجهیزات
              </Typography>
            </Box>
          </Typography>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Hero;
