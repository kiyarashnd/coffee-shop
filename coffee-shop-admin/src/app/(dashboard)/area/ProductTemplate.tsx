'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

type FormInterface = {
  name: string;
  description: string;
  price: number;
  image?: any;
  category: { value?: string; label?: string }; // فیلد جدید دسته‌بندی
  available?: string | null;
};

const formSchema: ObjectSchema<FormInterface> = yup.object().shape({
  name: yup.string().required('عنوان را وارد کنید'),
  description: yup.string().required('توضیحات را وارد کنید'),
  price: yup.number().required('قیمت را وارد کنید'),
  image: yup.mixed(),
  category: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .required('لطفاً دسته‌بندی را انتخاب کنید'),
  available: yup.string().nullable(),
});

const Area = () => {
  const [selectedOption, setSelecteOption] = useState<string | undefined>('');
  const [imageChange, setImageChange] = useState<boolean>(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const id = pathname?.split('/')?.[2];

  const { data } = useSWR(`/${id}`, () => Api.getOneProduct(id).enq());

  useEffect(() => {
    if (data?.category) {
      setSelecteOption(data?.category);
    }
  }, [data?.category]);

  const {
    handleSubmit,
    register,
    setValue,
    control,
    setError,
    clearErrors,
    watch,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<FormInterface>({
    resolver: yupResolver(formSchema),
    values: {
      description: data?.description ? data?.description : '',
      available:
        data?.available === false
          ? 'false'
          : data?.available === true
          ? 'true'
          : 'true',
      name: data?.name ? data?.name : '',
      image: data?.image
        ? [new File([`blob:${data?.image}`], 'name.jpg')]
        : undefined,
      price: data?.price ? data?.price : '',
      category: data?.category
        ? { value: data?.category, label: data?.category }
        : { value: '', label: '' }, // مقدار اولیه دسته‌بندی
    },
    mode: 'all',
  });

  const category = watch('category');
  useEffect(() => {
    console.log('selected option is : ', selectedOption);
    // if (selectedOption) {
    clearErrors('category');
    // }
  }, [selectedOption, category]);

  const onSubmit: SubmitHandler<FormInterface> = async (formData) => {
    if (selectedOption === undefined || selectedOption === '') {
      setError('category', { message: 'لطفاً دسته‌بندی را انتخاب کنید' });
    } else {
      clearErrors('category');
    }
    try {
      console.log('data.availabl is : ');
      const available = formData.available === 'true' ? true : false;
      const formDataToSend = new FormData();
      console.log('form data is : ', formData);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', `${formData.price}`);
      formDataToSend.append('category', selectedOption ? selectedOption : ''); // ارسال دسته‌بندی
      formDataToSend.append('available', available as any); // تبدیل به بولین برای ارسال به بک‌اند

      if (imageChange && formData.image && formData.image.length > 0) {
        formData.image.forEach((img: File) => {
          formDataToSend.append('image', img);
        });
      }

      if (id === undefined) {
        await Api.postProduct(formDataToSend).enq();
      } else {
        formDataToSend.append('id', id);
        await Api.updataProduct(formDataToSend).enq();
      }

      toast.success(`محصول جدید اضافه شد`);
      push('/get-all');
    } catch (error) {
      toast.error('اطلاعات نادرست است!');
      console.log('error', error);
    }
  };

  const [imagesPreview, setImagesPreview] = useState<File[]>([]);

  useEffect(() => {
    if (data) {
      const existingImage = data.image
        ? [
            Object.assign(new File([], 'existing.jpg'), {
              preview: data.image, // Backend image URL
            }),
          ]
        : [];
      setImagesPreview(existingImage);
    }
  }, [data]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'image/*': [] },
      onDrop: (files) => {
        setImagesPreview([...imagesPreview, ...files]);
        setValue('image', [...imagesPreview, ...files]);
        setImageChange(true);
        files.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      },
    });

  // گزینه‌های دسته‌بندی برای react-select
  const categoryOptions = [
    { value: 'قهوه', label: 'قهوه' },
    { value: 'تجهیزات', label: 'تجهیزات' },
    { value: 'دستگاه ها', label: 'دستگاه ها' },
    { value: 'سایر', label: 'سایر' },
  ];

  console.log('error is : ', errors);

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
          className='border border-gray-300 rounded-sm h-8 p-1'
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

      <section className='flex gap-4'>
        <p>موجود :</p>
        <div className='flex gap-1'>
          <input
            type='radio'
            id='first'
            {...register('available')}
            value='true'
          />
          <label htmlFor='first' className='ml-2'>
            هست
          </label>
        </div>
        <div className='flex gap-1'>
          <input
            type='radio'
            id='second'
            {...register('available')}
            value='false'
          />
          <label htmlFor='second' className='ml-2'>
            نیست
          </label>
        </div>

        {errors.available && (
          <p className='text-red-500 text-sm'>{errors.available.message}</p>
        )}
      </section>

      {/* اضافه کردن فیلد دسته‌بندی با react-select */}
      <section className='flex flex-col gap-2'>
        <label htmlFor='category'>دسته‌بندی</label>
        <Controller
          control={control}
          name='category'
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              placeholder='دسته‌بندی را انتخاب کنید'
              onChange={(selectedOption) =>
                setSelecteOption(selectedOption?.value)
              }
              value={{ value: selectedOption, label: selectedOption }}
            />
          )}
        />
        <p className='text-red-500'>{errors?.category?.value?.message}</p>
      </section>

      <section className='flex flex-col gap-2'>
        <fieldset className='flex flex-col sm:flex-row sm:gap-3 sm:items-center gap-1 md:justify-center'>
          <div>
            {!imagesPreview?.length && (
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
            {imagesPreview?.length > 0 && (
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
                </div>
                {imagesPreview.map((img: any, index: number) => (
                  <div className='flex items-end gap-4 relative' key={index}>
                    <div className='inline-flex rounded-lg border-2 border-dashed border-[--gray-8] !w-[96px] !h-[96px] box-border'>
                      <div className='flex min-w-0 overflow-hidden'>
                        <Image
                          alt='image'
                          src={img?.preview}
                          className='block h-full rounded-lg'
                          onLoad={() => {
                            URL.revokeObjectURL(img?.preview);
                          }}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <button
                      type='button'
                      className='absolute left-1 bottom-1'
                      onClick={() => {
                        const filteredFiles = imagesPreview.filter(
                          (image: any) => image.preview !== img.preview
                        );
                        setImagesPreview(filteredFiles);
                        setValue('image', [...filteredFiles]);
                        imagesPreview.forEach((file: File) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          })
                        );
                      }}
                    >
                      <Icon path={mdiDeleteOutline} size={1.1} />
                    </button>
                  </div>
                ))}
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
