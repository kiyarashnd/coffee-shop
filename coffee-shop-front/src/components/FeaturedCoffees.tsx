'use client';
import React from 'react';
import {
  Container,
  Typography,
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
import { formatPriceToToman } from '@/utils/formatPrice';

interface Coffee {
  _id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const FeaturedCoffees = () => {
  const { push } = useRouter();

  const { data, isLoading, error } = useFetchData();
  const coffeeList: Coffee[] = data;
  console.log('data is : ', data);
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error while fetch data...</div>;
  }

  return (
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
          gap: '15px',
        }}
      >
        {coffeeList?.length < 1 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              text: '#000000',
              width: '100%',
            }}
          >
            <Typography
              variant='h4'
              component='h2'
              fontSize='2rem'
              color='gray'
            >
              فعلا محصولی موجود نداریم...!😢
            </Typography>
          </Box>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
              320: { slidesPerView: 1 }, // Mobile screens
              640: { slidesPerView: 2 }, // Tablets
              1024: {
                slidesPerView: coffeeList?.length > 3 ? 3 : coffeeList?.length,
              }, // Laptops & Desktops
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {coffeeList?.map((coffee, index) => (
              <SwiperSlide
                onClick={() => push(`/products/${coffee?._id}`)}
                key={index}
              >
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
                    <Typography>{formatPriceToToman(coffee.price)}</Typography>
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
        )}
      </Container>
    </Container>
  );
};

export default FeaturedCoffees;
