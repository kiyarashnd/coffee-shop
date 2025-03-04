// app/page.tsx
'use client';
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCoffees from './components/FeaturedCoffees';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedCoffees />
      </main>
      <Footer />
    </>
  );
}
