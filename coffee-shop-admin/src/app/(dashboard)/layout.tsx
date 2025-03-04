'use client';

import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MainLayout(props: { children: ReactElement }) {
  // const { push } = useRouter();
  // const [isClientReady, setClientReady] = useState(false);
  // const [hasTokens, setHasTokens] = useState(false);

  // useEffect(() => {
  //   // This code now runs only on the client after mounting
  //   const access_token = localStorage.getItem('accessToken');
  //   // const refresh_token = localStorage.getItem('refreshToken');

  //   // Check tokens and update state accordingly
  //   if (access_token) {
  //     setHasTokens(true);
  //   } else {
  //     push('/');
  //   }

  //   // Signal that the client-side script has executed
  //   setClientReady(true);
  // }, [push]);

  // // Ensure that the component renders nothing or a loading state until the useEffect runs
  // if (!isClientReady) {
  //   return <div>Loading...</div>; // Or show nothing or a spinner
  // }

  // // After ensuring tokens exist, render the layout or redirect
  // if (!hasTokens) {
  //   return <div>REDIRECTING...</div>;
  // }

  return (
    <div>
      <div className='flex gap-4 m-4'>
        <Link
          href='/ostan'
          className='border-b border-black hover:text-gray-500'
        >
          استان و منطقه
        </Link>
        <Link
          href='/area'
          className='border-b border-black hover:text-gray-500'
        >
          ملک
        </Link>
        <Link
          href='/get-all'
          className='border-b border-black hover:text-gray-500'
        >
          نمایش همه
        </Link>
        <div
          // onClick={() => {
          //   localStorage.removeItem('accessToken');
          //   localStorage.removeItem('refreshToken');
          //   push('/');
          // }}
          className='border-b border-black hover:text-gray-500 cursor-pointer'
        >
          خروج
        </div>
      </div>
      {props.children}
    </div>
  );
}
