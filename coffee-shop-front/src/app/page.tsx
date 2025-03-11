// app/page.tsx
'use client';
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedCoffees from '@/components/FeaturedCoffees';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedCoffees />
      </main>
    </>
  );
}
