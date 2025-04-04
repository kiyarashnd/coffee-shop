// app/page.tsx
// 'use client';
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedCoffees from '@/components/home/FeaturedCoffees';
import CoffeeScrollAnimation from '@/components/home/CoffeeScrollAnimation';
import CategorySection from '@/components/home/CategorySection';
// import About from '@/components/About';
// import Blog from '@/components/Blog';
// import InstagramSection from '@/components/InstagramSection';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        {/* <CoffeeScrollAnimation /> */}
        <CategorySection />
        <FeaturedCoffees />
        {/* <About /> */}
        {/* <Blog /> */}
        {/* <InstagramSection /> */}
      </main>
    </>
  );
}
