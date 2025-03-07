// app/components/Header.tsx
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CoffeeIcon from '@mui/icons-material/Coffee';
import Link from 'next/link';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'درباره ما', href: '/about' },
  { label: 'محصولات', href: '/products' },
  { label: 'ارتباط با ما', href: '/contact' },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
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
      <AppBar
        position='static'
        sx={{ backgroundColor: '#B0A27B' }}
        className='shadow-md'
      >
        <Toolbar className='flex justify-between items-center px-4'>
          {/* Logo and Title */}
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

          {/* Desktop Navigation Links */}
          <Box className='hidden sm:flex space-x-4'>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} passHref>
                <Button className='text-white hover:bg-[#8d6e63] normal-case'>
                  {link.label}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Cart Icon and Mobile Menu */}
          <Box className='flex items-center'>
            <IconButton className='text-white hover:bg-[#8d6e63]'>
              <ShoppingCartIcon />
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
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
