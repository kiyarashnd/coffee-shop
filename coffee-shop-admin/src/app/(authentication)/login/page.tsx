'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Api } from '@/api/Api';
import { toast } from 'react-toastify';

type FormInterface = {
  PhoneNumber: string;
  Password: string;
};

const formSchema: ObjectSchema<FormInterface> = yup.object().shape({
  PhoneNumber: yup.string().required('PhoneNumber is required'),
  // .matches(
  // 	/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
  // 	"Invalid Email address"
  // ),
  Password: yup.string().required('Password in required'),
  // .matches(
  // 	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/,
  // 	"Be at least ten characters,Contains one letter and one number"
  // ),
});

export default function Home() {
  // const { push } = useRouter();
  // const [hasTokens, setHasTokens] = useState(false);
  // const [isClientReady, setClientReady] = useState(false);

  // useEffect(() => {
  //   // This code now runs only on the client after mounting
  //   const access_token = localStorage.getItem('accessToken');
  //   // const refresh_token = localStorage.getItem('refreshToken');

  //   // Check tokens and update state accordingly
  //   if (!access_token) {
  //     setHasTokens(true);
  //   } else {
  //     push('/ostan');
  //   }

  //   // Signal that the client-side script has executed
  //   setClientReady(true);
  // }, [push]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInterface>({
    resolver: yupResolver(formSchema),
    defaultValues: {},
    mode: 'onSubmit',
  });

  const { push } = useRouter();

  const onSubmit = async (data: FormInterface) => {
    // console.log('data is : ', data);
    try {
      const response = await Api.signin({
        username: data.PhoneNumber,
        password: data.Password,
      }).enq();
      const { accessToken } = response;
      sessionStorage.setItem('accessToken', accessToken);

      push('/area');
      toast.success(`Welcome`);
    } catch (error: any) {
      // if (isError(error)) {
      if (error) {
        toast.error(`Error: ${error.message}`);
      } else if (typeof error === 'object' && error != null) {
        toast.error(`Error: ${error.error || 'Unknown error occurred.'}`);
      } else {
        toast.error(`Unexpected error: ${String(error)}`);
      }
      console.error('ERROR', error);
    }
  };

  // // Ensure that the component renders nothing or a loading state until the useEffect runs
  // if (!isClientReady) {
  //   return <div>Loading...</div>; // Or show nothing or a spinner
  // }

  // // After ensuring tokens exist, render the layout or redirect
  // if (!hasTokens) {
  //   return <div>REDIRECTING...</div>;
  // }
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <h1 className='mx-auto text-xl font-bold mb-10'>صفحه ورود</h1>
      <form
        className='flex flex-col gap-4 border border-black p-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className='flex gap-2'>
          <label htmlFor='PhoneNumber' className='w-[5rem]'>
            نام کاربری :‌{' '}
          </label>
          <input
            type='text'
            id='PhoneNumber'
            className='border border-black'
            {...register('PhoneNumber')}
          />
        </section>
        <section className='flex gap-2'>
          <label htmlFor='Password' className='w-[5rem]'>
            رمز عبور :{' '}
          </label>
          <input
            type='Password'
            id='Password'
            className='border border-black flex-1'
            {...register('Password')}
          />
        </section>
        <section>
          <button
            type='submit'
            className='border border-black w-full bg-yellow-300'
          >
            ورود
          </button>
        </section>
      </form>
    </main>
  );
}
