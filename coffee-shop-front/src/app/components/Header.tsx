// app/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';

const Header = () => {
  return (
    <AppBar
      //   position='fixed'
      sx={{
        backgroundColor: '#B0A27B',
      }}
    >
      <Toolbar>
        <CoffeeIcon sx={{ ml: 1 }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          قهوه کورش
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '20px' }}>
          <Link href='#' color='inherit' underline='none' sx={{ mx: 1 }}>
            خانه
          </Link>
          <Link href='#about' color='inherit' underline='none' sx={{ mx: 1 }}>
            درباره ما
          </Link>

          <Link href='#menu' color='inherit' underline='none' sx={{ mx: 1 }}>
            محصولات
          </Link>
          <Link href='#contact' color='inherit' underline='none' sx={{ mx: 1 }}>
            ارتباط با ما
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
