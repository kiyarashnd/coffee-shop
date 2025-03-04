'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Api } from '@/api/Api';
import Select from 'react-select';
import useSWR from 'swr';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Icon from '@mdi/react';
import { mdiDeleteOutline, mdiPlusCircleOutline } from '@mdi/js';
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FormInterface = {
  name: string;
  description: string;

  price?: number | null;

  image?: any;
};

const formSchema: ObjectSchema<FormInterface> = yup.object().shape({
  name: yup.string().required('عنوان را وارد کنید'),
  description: yup.string().required('توضیحات را وارد کنید'),

  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue?.trim() === '' ? null : value
    )
    .nullable(),

  image: yup.mixed(),
});

const Area = () => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInterface>({
    resolver: yupResolver(formSchema),
    defaultValues: {},
    mode: 'all',
  });

  const onSubmit = async (data: FormInterface) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', `${data.price}`);

      if (data.image.length > 0) {
        data?.image?.forEach((img: File) => {
          formData.append('image', img);
        });
      }

      const response = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('response is : ', result);
      toast.success(`ملک جدید اضافه شد`);
    } catch (error) {
      toast.error('اطلاعات نادرست است!');
      console.log('error', error);
    }
  };

  const [imagesPreview, setimagesPreview] = useState<File[]>([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      // accept: { 'image/jpeg': [], 'image/png': [] },
      accept: { 'image/*': [] },

      onDrop: (files) => {
        setimagesPreview([...imagesPreview, ...files]);

        setValue('image', [...imagesPreview, ...files]);

        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      },
    });

  console.log('errors is :', errors);

  return (
    <form
      className='flex flex-col gap-4 mx-auto w-[30%] mb-10'
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className='flex flex-col gap-2'>
        <label htmlFor='PhoneNumber'>عنوان</label>
        <input
          type='text'
          id='PhoneNumber'
          className={`border border-gray-300 rounded-sm h-8 p-1`}
          {...register('name')}
        />
        <p className='text-red-500'>{errors.name?.message}</p>
      </section>
      <section className='flex flex-col gap-2'>
        <label htmlFor='description'>توضیحات‌</label>
        <textarea
          id='description'
          className='border border-gray-300 rounded-sm h-[8rem] p-1'
          {...register('description')}
        />
        <p className='text-red-500'>{errors.description?.message}</p>
      </section>

      <section className='flex flex-col gap-2'>
        <label htmlFor='price'>قیمت</label>
        <input
          type='number'
          id='price'
          className='border border-gray-300 rounded-sm h-8'
          {...register('price')}
        />
      </section>

      <section className='flex flex-col gap-2'>
        <fieldset className='flex flex-col sm:flex-row sm:gap-3 sm:items-center gap-1 md:justify-center'>
          <div>
            {!imagesPreview.length && (
              <div
                {...getRootProps({
                  className: `
                    					flex flex-1 flex-col justify-center items-center gap-4 p-[20px] rounded-2xl border-2 
                    					border-[--gray-8] border-dashed outline-none duration-200
                    					${isFocused && 'border-[#2196f3]'}
                    					${isDragAccept && 'border-[#00e676]'}
                    					${isDragReject && 'border-[#ff1744]'}
                  								`,
                })}
              >
                <input {...getInputProps()} id='image' {...register('image')} />

                <p>افزودن پیوست</p>
                <p className='flex items-center gap-3 !text-[--accent-9]'>
                  <Icon path={mdiPlusCircleOutline} size={1.1} />
                  انتخاب فایل
                </p>
                <p className='hidden md:block'>
                  عکس خود را به اینجا بیندازید یا برای انتخاب تصویر کلیک کنید.
                </p>
              </div>
            )}

            {imagesPreview.length > 0 && (
              <div className='flex gap-4 max-w-[18rem] overflow-scroll'>
                <div
                  {...getRootProps({
                    className: `
											!w-[96px] !h-[96px] min-w-[96px] max-w-[96px]
											flex flex-1 flex-col justify-center items-center gap-[8px] rounded-2xl border-2 
											border-[--gray-8] border-dashed outline-none duration-200
											${isFocused && 'border-[#2196f3]'}
											${isDragAccept && 'border-[#00e676]'}
											${isDragReject && 'border-[#ff1744]'}
										`,
                  })}
                >
                  <input
                    {...getInputProps()}
                    id='image'
                    {...register('image')}
                  />

                  <p className='flex flex-col items-center gap-3'>
                    افزودن
                    <Icon path={mdiPlusCircleOutline} size={1.1} />
                  </p>
                  {/* <p className='hidden md:block'>
                    عکس خود را به اینجا بیندازید یا برای انتخاب تصویر کلیک کنید.
                  </p> */}
                </div>

                {imagesPreview.map((img: any, index: number) => {
                  return (
                    <div className='flex items-end gap-4 relative' key={index}>
                      <div
                        className='inline-flex rounded-lg border-2 border-dashed border-[--gray-8]
												!w-[96px] !h-[96px] box-border'
                      >
                        <div className='flex min-w-0 overflow-hidden'>
                          <Image
                            alt='image'
                            src={img.preview}
                            className='block h-full rounded-lg'
                            onLoad={() => {
                              URL.revokeObjectURL(img.preview);
                            }}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      <button
                        // size='2'
                        type='button'
                        className='absolute left-1 bottom-1'
                        onClick={() => {
                          const filteredFiles = imagesPreview.filter(
                            (image: any) => {
                              return image.preview !== img.preview;
                            }
                          );
                          setimagesPreview(filteredFiles);
                          setValue('image', [...filteredFiles]);

                          imagesPreview.forEach((file: any) =>
                            Object.assign(file, {
                              preview: URL.createObjectURL(file),
                            })
                          );
                        }}
                      >
                        <Icon path={mdiDeleteOutline} size={1.1} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </fieldset>
      </section>

      <section>
        <button
          type='submit'
          className='border border-black w-full bg-yellow-300 py-2'
        >
          ثبت
        </button>
      </section>
    </form>
  );
};

export default Area;
