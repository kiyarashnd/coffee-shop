'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
// import { categories, products, ProductCategory } from '../data/products';
import { useFetchData } from '@/app/hooks/useFetchData';
import { Product } from '../types/products';
import { Coffee, Package, ShoppingBag } from 'lucide-react';

const Products: React.FC = () => {
  type ProductCategory = 'Coffee' | 'Equipment' | 'Accessories';

  const categories = [
    { name: 'قهوه' as ProductCategory, icon: Coffee },
    { name: 'تجهیزات' as ProductCategory, icon: Package },
    { name: 'دستگاه ها' as ProductCategory, icon: ShoppingBag },
  ];

  const { data, isLoading, error } = useFetchData();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'همه'>(
    'همه'
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);

  useEffect(() => {
    let result = data as Product[];

    // Apply category filter
    if (activeCategory !== 'همه') {
      result = result.filter(
        (product: Product) => product.category === activeCategory
      );
    }

    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(lowercasedSearch) ||
          product.description.toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, activeCategory]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='min-h-screen bg-white pt-24'>
      <div className='container mx-auto px-6 py-12'>
        <h1 className='text-3xl md:text-4xl font-serif font-bold text-text-primary text-center mb-8'>
          محصولات ما
        </h1>

        {/* Search Bar */}
        <div className='max-w-md mx-auto mb-8'>
          <div className='relative'>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              placeholder='محصول خاصی مد نظرته؟'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-coffee-medium'
            />
          </div>
        </div>

        {/* Categories */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          <button
            onClick={() => setActiveCategory('همه')}
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === 'همه'
                ? 'bg-coffee-dark text-amber-900'
                : 'bg-coffee-light text-text-primary hover:bg-coffee-medium hover:text-amber-900'
            }`}
          >
            همه محصولات
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                activeCategory === category.name
                  ? 'bg-coffee-dark text-amber-900'
                  : 'bg-coffee-light text-text-primary hover:bg-coffee-medium hover:text-amber-900'
              }`}
            >
              <category.icon size={18} />
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts?.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-xl text-gray-500'>
              محصول مورد نظر یافت نشد دوباره جستجو کن!
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {data.map((product: Product) => (
              <Link
                href={`/products/${product?._id}`}
                key={product?._id}
                className='group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow'
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={product?.image}
                    alt={product?.name}
                    width={400}
                    height={400}
                    className='w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-serif font-semibold text-text-primary mb-2'>
                    {product?.name}
                  </h3>
                  <p className='text-text-secondary mb-4'>
                    {product?.category}
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-coffee-dark font-semibold'>
                      ${product.price.toFixed(2)}
                    </span>
                    <span className='text-sm text-coffee-medium underline'>
                      جزئیات محصول
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
