// 'use client';

// import React, { useState } from 'react';
// import {
//   Grid,
//   Typography,
//   Button,
//   Chip,
//   Divider,
//   Breadcrumbs,
// } from '@mui/material';
// import ArrowBack from '@mui/icons-material/ArrowBack';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';
// import CategoryIcon from '@mui/icons-material/Category';
// import Link from 'next/link';
// import { useParams, useRouter } from 'next/navigation';
// import Head from 'next/head';
// import { useFetchData } from '@/hooks/useFetchData';
// import { useCartStore } from '@/store/useCartStore';
// import { formatPriceToToman } from '@/utils/formatPrice';

// const ProductDetail: React.FC = () => {
//   const categoryOptions = ['قهوه', 'تجهیزات', 'دستگاه ها', 'سایر'];

//   const { push } = useRouter();
//   const { id } = useParams();
//   const { data, isLoading, error } = useFetchData(id as string);
//   const product = data;

//   const cart = useCartStore((state) => state.cart);
//   const addToCart = useCartStore((state) => state.addToCart);
//   const updateQuantity = useCartStore((state) => state.updateQuantity);
//   const existingItem = cart?.find((item) => item.id === product?._id);
//   const [quantity] = useState(existingItem ? existingItem.quantity : 1);

//   if (isLoading) return <p className='text-center py-10'>در حال بارگذاری...</p>;
//   if (error)
//     return <p className='text-center text-red-500'>خطا: {error.message}</p>;
//   if (!product) {
//     return (
//       <div className='container mx-auto px-6 py-24 text-center'>
//         <Head>
//           <title>محصول پیدا نشد - قهوه‌فروشی</title>
//         </Head>
//         <Typography className='text-2xl font-serif text-text-primary'>
//           محصول پیدا نشد
//         </Typography>
//         <Link
//           href='/products'
//           className='mt-4 inline-flex items-center text-coffee-medium hover:underline'
//         >
//           <ArrowBack fontSize='small' className='mr-2' />
//           بازگشت به محصولات
//         </Link>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     if (existingItem) {
//       updateQuantity(product._id, quantity);
//       alert('قبلاً به سبد خرید اضافه شده');
//     } else {
//       addToCart({
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         quantity,
//       });
//       push('/checkout');
//     }
//   };

//   return (
//     <div className='container mx-auto px-4 md:px-8 py-10'>
//       <Head>
//         <title>{product.name} | قهوه‌فروشی</title>
//       </Head>

//       <div className='flex justify-between items-center mb-4'>
//         <Breadcrumbs aria-label='breadcrumb'>
//           <Link href='/' className='text-sm text-gray-500 hover:underline'>
//             خانه
//           </Link>
//           <Link
//             href='/products'
//             className='text-sm text-gray-500 hover:underline'
//           >
//             محصولات
//           </Link>
//           <Typography color='text.primary' className='text-sm'>
//             {product.name}
//           </Typography>
//         </Breadcrumbs>
//       </div>

//       <Grid container spacing={4} dir='ltr'>
//         <Grid item xs={12} md={6}>
//           <div className='overflow-hidden rounded-xl shadow-md'>
//             <img
//               src={product.image}
//               alt={product.name}
//               className='w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500'
//             />
//           </div>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <div className='p-6 bg-white rounded-xl shadow-lg'>
//             <Chip
//               icon={<CategoryIcon />}
//               label={product.category}
//               className='mb-4 font-sans bg-coffee-light text-coffee-dark'
//             />
//             <Typography
//               variant='h4'
//               className='font-serif text-text-primary mb-3'
//             >
//               {product.name}
//             </Typography>
//             <Typography
//               variant='h5'
//               className='text-coffee-dark font-bold mb-4'
//             >
//               {formatPriceToToman(product.price)}
//             </Typography>

//             <Divider className='my-4' />

//             <Typography className='text-base text-gray-600 leading-loose mb-6 font-sans'>
//               {product.description}
//             </Typography>

//             <Button
//               variant='contained'
//               color='primary'
//               className='bg-coffee-dark hover:bg-coffee-medium px-6 py-2 text-white shadow'
//               startIcon={<ShoppingCart />}
//               onClick={handleAddToCart}
//             >
//               افزودن به سبد خرید
//             </Button>
//           </div>
//         </Grid>
//       </Grid>

//       {/* ✅ نمایش دسته‌های مرتبط (اگر بیشتر از یک دسته دارید) */}
//       {/* {product.tags?.length > 0 && ( */}
//       <div className='mt-12'>
//         <Typography variant='h6' className='mb-4 font-bold text-coffee-dark'>
//           دسته‌بندی‌های مرتبط
//         </Typography>
//         <div className='flex flex-wrap gap-2'>
//           {categoryOptions.map((tag: string) => (
//             <Chip
//               key={tag}
//               label={tag}
//               variant='outlined'
//               className='text-sm text-coffee-medium border-coffee-medium'
//             />
//           ))}
//         </div>
//       </div>
//       {/* )} */}
//     </div>
//   );
// };

// export default ProductDetail;

'use client';

import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Breadcrumbs,
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { useFetchData } from '@/hooks/useFetchData';
import { useCartStore } from '@/store/useCartStore';
import { formatPriceToToman } from '@/utils/formatPrice';

const ProductDetail: React.FC = () => {
  const categoryOptions = ['قهوه', 'تجهیزات', 'دستگاه ها', 'سایر'];

  const { push } = useRouter();
  const { id } = useParams();
  const { data, isLoading, error } = useFetchData(id as string);
  const product = data;
  console.log('product is :', product); // For debugging purposes

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const existingItem = cart?.find((item) => item.id === product?._id);
  const [quantity] = useState(existingItem ? existingItem.quantity : 1);

  if (isLoading) return <p className='text-center py-10'>در حال بارگذاری...</p>;
  if (error)
    return <p className='text-center text-red-500'>خطا: {error.message}</p>;
  if (!product) {
    return (
      <div className='container mx-auto px-6 py-24 text-center'>
        <Head>
          <title>محصول پیدا نشد - قهوه‌فروشی</title>
        </Head>
        <Typography className='text-2xl font-serif text-text-primary'>
          محصول پیدا نشد
        </Typography>
        <Link
          href='/products'
          className='mt-4 inline-flex items-center text-coffee-medium hover:underline'
        >
          <ArrowBack fontSize='small' className='mr-2' />
          بازگشت به محصولات
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.available) {
      alert('متأسفانه این محصول موجود نیست');
      return;
    }
    if (existingItem) {
      updateQuantity(product._id, quantity);
      alert('قبلاً به سبد خرید اضافه شده');
    } else {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
      push('/checkout');
    }
  };

  return (
    <>
      <div className='container mx-auto px-4 md:px-8 py-10'>
        <Head>
          <title>{product.name} | قهوه‌فروشی</title>
        </Head>

        <div className='flex justify-between items-center mb-4'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link href='/' className='text-sm text-gray-500 hover:underline'>
              خانه
            </Link>
            <Link
              href='/products'
              className='text-sm text-gray-500 hover:underline'
            >
              محصولات
            </Link>
            <Typography color='text.primary' className='text-sm'>
              {product.name}
            </Typography>
          </Breadcrumbs>
        </div>

        <Grid container spacing={4} dir='ltr'>
          <Grid item xs={12} md={6}>
            <div className='relative overflow-hidden rounded-xl shadow-md'>
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-[400px] object-cover transition-transform duration-500 ${
                  product.available ? 'hover:scale-105' : 'grayscale'
                }`}
              />
              {/* Overlay برای نمایش عدم موجودیت */}
              {!product.available && (
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                  <Typography variant='h6' className='text-white font-bold'>
                    {/* این محصول موجود نیست */}
                    در حال تامین کالا
                  </Typography>
                </div>
              )}
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className='p-6 bg-white rounded-xl shadow-lg'>
              {/* نمایش دسته‌بندی به عنوان Chip */}
              <Chip
                icon={<CategoryIcon />}
                label={product.category}
                className='mb-4 font-sans bg-coffee-light text-coffee-dark'
              />
              <Typography
                variant='h4'
                className='font-serif font-bold mt-2 mb-3 text-text-primary'
              >
                {product.name}
              </Typography>
              <Typography
                variant='h5'
                className='text-coffee-dark font-bold mb-4'
              >
                {formatPriceToToman(product.price)}
              </Typography>

              <Divider className='my-4 border-gray-200' />

              <Typography className='text-base text-gray-600 leading-loose mb-6 font-sans'>
                {product.description}
              </Typography>
              <div className='flex flex-col md:flex-row items-center gap-4 mb-4'>
                <Button
                  variant='contained'
                  color='primary'
                  className={`px-8 py-3 text-white shadow ${
                    !product.available && 'bg-gray-500 cursor-not-allowed'
                  }`}
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={!product.available}
                >
                  افزودن به سبد خرید
                </Button>
                {/* <Link
                  href={`/products/${product._id}`}
                  className='text-sm text-coffee-medium underline'
                >
                  جزئیات محصول
                </Link> */}
              </div>
            </div>
          </Grid>
        </Grid>

        {/* نمایش دسته‌بندی‌های مرتبط (مثلاً اگر بخواهید) */}
        <div className='mt-12'>
          <Typography variant='h6' className='mb-4 font-bold text-coffee-dark'>
            دسته‌بندی‌های مرتبط
          </Typography>
          <div className='flex flex-wrap gap-2'>
            {categoryOptions.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                variant='outlined'
                className='text-sm text-coffee-medium border-coffee-medium'
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
