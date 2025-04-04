'use client';

import { ReactElement } from 'react';
import Link from 'next/link';
import { Api } from '@/api/Api';
import { useRouter } from 'next/navigation';

export default function MainLayout(props: { children: ReactElement }) {
  const { push } = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await Api.signout().enq();
      push('/login');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <div className='flex gap-4 m-4'>
        <Link
          href='/area'
          className='border-b border-black hover:text-gray-500'
        >
          اضافه کردن محصول جدید
        </Link>
        <Link
          href='/get-all'
          className='border-b border-black hover:text-gray-500'
        >
          همه محصولات
        </Link>
        <Link
          href='/get-all'
          className='border-b border-black hover:text-gray-500'
        >
          محصولات ثبت شده
        </Link>
        <div
          onClick={logoutHandler}
          className='border-b border-black hover:text-gray-500 cursor-pointer'
        >
          خروج
        </div>
      </div>
      {props.children}
    </div>
  );
}
