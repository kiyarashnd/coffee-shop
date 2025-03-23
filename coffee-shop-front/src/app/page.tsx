// app/page.tsx
// 'use client';
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedCoffees from '@/components/FeaturedCoffees';
import About from '@/components/About';
import Blog from '@/components/Blog';
import InstagramSection from '@/components/InstagramSection';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedCoffees />
        <About />
        <Blog />
        <InstagramSection />
      </main>
    </>
  );
}
