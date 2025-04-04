'use client';

import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

export default function ClientApp({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  // Create a custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#6d4c41', // coffee-brown
      },
      secondary: {
        main: '#ffab40', // accent
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
