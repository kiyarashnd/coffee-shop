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

interface Coffee {
  id: number;
  name: string;
  description: string;
  image: string;
}

const coffeeList: Coffee[] = [
  {
    id: 1,
    name: 'اسپرسو',
    description: 'یک قهوه قوی و جسورانه برای شروع روز شما',
    image: '/espresso.jpg', // Place this image in the public folder
  },
  {
    id: 2,
    name: 'کاپوچینو',
    description: 'ترکیبی عالی از اسپرسو، شیر بخار پز و فوم.',
    image: '/cappuccino.jpg', // Place this image in the public folder
  },
  {
    id: 3,
    name: 'لاته',
    description: 'قهوه صاف و شیری با طعمی از اسپرسو.',
    image: '/latte.jpg', // Place this image in the public folder
  },
];

const FeaturedCoffees = () => {
  return (
    <Container sx={{ py: { xl: 8, xs: 2 }, direction: 'rtl' }} maxWidth='md'>
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
          flexDirection: { xs: 'column', xl: 'row' },
          gap: '15px',
        }}
      >
        {coffeeList.map((coffee) => (
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
        ))}
      </Container>
    </Container>
  );
};

export default FeaturedCoffees;
