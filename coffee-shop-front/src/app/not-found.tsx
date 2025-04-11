// import { useLocation } from 'react-router-dom';
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [pathname]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center'>
        {/* <h1 className='text-4xl font-bold mb-4'>404</h1> */}
        <Image
          src='/images/404-page-not-found.png'
          alt=''
          width={400}
          height={400}
        />
        <p className='text-xl text-gray-600 mb-4'>صفحه پیدا نشد</p>
        <a href='/' className='text-blue-500 hover:text-blue-700 underline'>
          برو به صفحه اصلی
        </a>
      </div>
    </div>
  );
};

export default NotFound;
