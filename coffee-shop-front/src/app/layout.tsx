// app/layout.tsx
'use client';
import React from 'react';
import './globals.css'; // Optional: your global CSS
import localFont from 'next/font/local';
import ClientApp from '@/components/ClientApp';
import { Providers } from '../../src/Providers';

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

// const enamadCode = `<img src="https://trustseal.enamad.ir/logo.aspx?id=557535&Code=3zsyewjas6PTF83foIir8JqfDonBWcM6" width="100" height="110"

// onclick="window.open("https://trustseal.enamad.ir/?id=557535&Code=3zsyewjas6PTF83foIir8JqfDonBWcM6", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")"

// alt="enamad">`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' dir='rtl'>
      {/* <meta name='enamad' content='۵۲۰۰۲۴۲۰' /> */}
      <meta name='enamad' content='56408236' />

      <body className={`${dana.variable} bg-[#CCDEE5]`} dir='rtl'>
        <Providers>
          <ClientApp>{children}</ClientApp>
        </Providers>
      </body>
    </html>
  );
}
