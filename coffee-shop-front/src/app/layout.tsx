// app/layout.tsx
'use client';
import React from 'react';
import './globals.css'; // Optional: your global CSS
import localFont from 'next/font/local';
import ClientApp from '@/components/ClientApp';

// export const metadata = {
//   title: 'Coffee Shop Landing',
//   description:
//     'A beautiful coffee shop landing page built with Next.js, TypeScript, and MUI.',
// };

const dana = localFont({
  src: [
    {
      path: '../assets/fonts/dana/DanaNoEn-Thin.woff2',
      weight: '300',
    },
    {
      path: '../assets/fonts/dana/DanaNoEn-Medium.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/dana/DanaNoEn-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-dana',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${dana.variable} bg-[#CCDEE5]`} dir='rtl'>
        <ClientApp>{children}</ClientApp>
      </body>
    </html>
  );
}
