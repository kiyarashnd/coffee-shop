'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useSWR from 'swr';
import { Api } from '@/api/Api';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { toast } from 'react-toastify';

type FormInterface = {
  name: string;
  // stateId: string;
};

const formSchema: ObjectSchema<FormInterface> = yup.object().shape({
  name: yup.string().required('name is required'),
  // stateId: yup.string().required('stateId is required'),
});

const formSchematwo: ObjectSchema<{ name: string }> = yup.object().shape({
  name: yup.string().required('name is required'),
});

const Ostan = () => {
  const [selectedOption, setSelectedOption] = useState('');
  // const [selectArea, setSelectArea] = useState('');

  const { data, mutate } = useSWR('/v1/Admin/Cities/AllStates', () =>
    Api.GetAllStates().enq()
  );
  const options = data?.value?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  // const { data: cityNames } = useSWR(
  //   `/v1/Cities/GetCitiesWithStateId/${selectedOption}`,
  //   () => Api.GetCitiesWithStateId(selectedOption).enq()
  // );

  // const cityOptions = cityNames?.value?.map((item: any) => {
  //   return {
  //     value: item?.id,
  //     label: item?.name,
  //   };
  // });

  // useEffect(() => {
  //   setSelectArea('');
  // }, [selectedOption]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormInterface>({
    resolver: yupResolver(formSchema),
    defaultValues: {},
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormInterface) => {
    // console.log('data is : ', data);
    try {
      const response = await Api.AddArea({
        name: data.name,
        stateId: selectedOption,
      }).enq();
      reset();
      toast.success(`منطقه جدید اضافه شد`);

      // console.log('response is : ', response);
    } catch (error) {
      toast.error('اطلاعات نادرست است!');

      console.log('error', error);
    }
  };

  const {
    handleSubmit: handleSubmit2,
    register: register2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<FormInterface>({
    resolver: yupResolver(formSchematwo),
    defaultValues: {},
    mode: 'onSubmit',
  });

  const secondOnSubmit = async (data: any) => {
    // console.log('data is : ', data);
    try {
      const response = await Api.AddState({
        name: data.name,
      }).enq();
      mutate();
      reset2();
      // console.log('response is : ', response);
      toast.success(`استان جدید اضافه شد`);
    } catch (error) {
      toast.error('اطلاعات نادرست است!');
      console.log('error', error);
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='mx-auto text-xl font-bold mb-10 md:mb-0'>
        اضافه کردن استان و منطقه
      </h1>

      <main className='flex flex-col gap-16 md:flex-row md:gap-0'>
        <form
          className='w-[18rem] mx-auto flex flex-col gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>اضافه کردن منطقه</p>
          {/* <label htmlFor='ostan'>استان :</label> */}
          <Select
            defaultValue={selectedOption}
            onChange={(e: any) => setSelectedOption(e.value)}
            options={options}
            placeholder='استان را انتخاب کنید'
            id='ostan'
            name='ostan'
          />
          <input
            type='text'
            // value={selectArea}
            {...register('name')}
            className='border border-black'
            placeholder='اسم منطقه'
          />

          {errors.name && (
            <p className='text-red-500 text-sm'>{errors.name.message}</p>
          )}
          <button type='submit' className='border border-black bg-yellow-300'>
            ثبت
          </button>
        </form>

        <form
          className='w-[18rem] mx-auto flex flex-col gap-2'
          onSubmit={handleSubmit2(secondOnSubmit)}
        >
          <p>اضافه کردن استان</p>

          <input
            type='text'
            // value={selectArea}
            className='border border-black'
            placeholder='اسم استان'
            {...register2('name')}
          />
          <button type='submit' className='border border-black bg-yellow-300'>
            ثبت
          </button>
        </form>

        {/* <div className='w-[18rem] mx-auto flex flex-col gap-2'>
        <label htmlFor='ostan'>منطقه :‌</label>
        <Select
          //   defaultValue={selectArea}
          onChange={(e: any) => setSelectArea(e.label)}
          value={{
            name: selectArea,
            label: selectArea,
          }}
          options={cityOptions}
          placeholder='انتخاب کنید'
          id='ostan'
          name='ostan'
        />
      </div> */}
      </main>
    </div>
  );
};

export default Ostan;
