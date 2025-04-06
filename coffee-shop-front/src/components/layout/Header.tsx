// components/Header.tsx
'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CoffeeIcon from '@mui/icons-material/Coffee';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'محصولات', href: '/products' },

  { label: 'درباره ما', href: '/about' },
  // { label: 'ارتباط با ما', href: '/contact' },
  { label: 'پیگیری محصول', href: '/tracking' },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 1) Grab the entire cart from Zustand
  const cart = useCartStore((state) => state.cart);
  // 2) Derive total items:
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const router = useRouter();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleCartClick = () => {
    router.push('/checkout');
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.label}>
            <Link href={link.href} passHref>
              <ListItemText primary={link.label} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#B0A27B' }}>
        <Toolbar className='flex justify-between items-center px-4'>
          {/* Logo */}
          <Box className='flex items-center'>
            <CoffeeIcon sx={{ ml: 1 }} />
            <Typography
              variant='h6'
              component='div'
              className='text-white font-bold'
            >
              قهوه کورش
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box className='hidden sm:flex space-x-4'>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} passHref>
                <Button className='text-white hover:bg-[#8d6e63] normal-case'>
                  {link.label}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Cart Icon & Mobile Menu */}
          <Box className='flex items-center'>
            <IconButton
              className='text-white hover:bg-[#8d6e63]'
              onClick={handleCartClick}
            >
              <Badge badgeContent={totalItems} color='error'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='start'
              className='sm:hidden text-white'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
