// app/components/FeaturedCoffees.tsx
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetchData } from '@/hooks/useFetchData';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import { useRouter } from 'next/navigation';

interface Coffee {
  _id: number;
  name: string;
  description: string;
  image: string;
}

// const coffeeList: Coffee[] = [
//   {
//     id: 1,
//     name: 'اسپرسو',
//     description: 'یک قهوه قوی و جسورانه برای شروع روز شما',
//     image: '/espresso.jpg', // Place this image in the public folder
//   },
//   {
//     id: 2,
//     name: 'کاپوچینو',
//     description: 'ترکیبی عالی از اسپرسو، شیر بخار پز و فوم.',
//     image: '/cappuccino.jpg', // Place this image in the public folder
//   },
//   {
//     id: 3,
//     name: 'لاته',
//     description: 'قهوه صاف و شیری با طعمی از اسپرسو.',
//     image: '/latte.jpg', // Place this image in the public folder
//   },
// ];

const FeaturedCoffees = () => {
  const { push } = useRouter();

  const { data, isLoading, error } = useFetchData();
  const coffeeList: Coffee[] = data;
  console.log('data is : ', data);
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    // <Container sx={{ py: { xl: 8, xs: 2 }, direction: 'rtl' }} maxWidth='md'>
    <Container sx={{ py: { xl: 8, xs: 2 }, direction: 'rtl' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          text: '#000000',
        }}
      >
        <Typography variant='h4' component='h2' align='center' gutterBottom>
          دسته بندی محصولات
        </Typography>
      </Box>
      <Container
        sx={{
          display: 'flex',
          // flexDirection: { xs: 'column', xl: 'row' },
          gap: '15px',
        }}
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile screens
            640: { slidesPerView: 2 }, // Tablets
            1024: { slidesPerView: 3 }, // Laptops & Desktops
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          // centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          // className='mySwiper'
        >
          {/* <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          ... */}
          {coffeeList?.map((coffee, index) => (
            <SwiperSlide onClick={() => push(`/products/${coffee?._id}`)}>
              <Card
                className='cursor-pointer'
                key={index}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#EBEBDC',
                }}
              >
                <CardMedia
                  component='img'
                  sx={{ height: 200 }}
                  image={coffee.image}
                  alt={coffee.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {coffee.name}
                  </Typography>
                  <Typography>{coffee.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary'>
                    دیدن محصول
                  </Button>
                  <Button size='small' color='secondary'>
                    خرید
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {coffeeList.map((coffee) => (
          <Grid item key={coffee.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#EBEBDC',
              }}
            >
              <CardMedia
                component='img'
                sx={{ height: 200 }}
                image={coffee.image}
                alt={coffee.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant='h5' component='h2'>
                  {coffee.name}
                </Typography>
                <Typography>{coffee.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  دیدن محصول
                </Button>
                <Button size='small' color='secondary'>
                  خرید
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))} */}
      </Container>
    </Container>
  );
};

export default FeaturedCoffees;
