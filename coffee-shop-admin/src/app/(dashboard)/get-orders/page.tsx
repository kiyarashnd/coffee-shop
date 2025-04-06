'use client';

import React, { useEffect, useRef, useState } from 'react';
import Table from '@/components/table/Table';
import { ColDef } from 'ag-grid-community';
import { mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { AgGridReact } from 'ag-grid-react';
import { useRouter } from 'next/navigation';
import { Api } from '@/api/Api';
import useSWR from 'swr';
import { formatPriceToToman } from '@/utils/FormatPrice';
import Toast from '@/components/Toast/Toast';
import { toast } from 'react-toastify';
// import { RowSelectionOptions, ICellRendererParams } from "@ag-grid-community/core";

type RowData = {
  name: string;
  grouping_by: string;
  type: string;
  details: string;
  interface: string;
  ref: string;
  comments: string;
  excludeMembers: string;
  routable: string;
};

function GetAllpage() {
  const { push } = useRouter();

  const [selectRow, setSelectRow] = useState('');

  const deleteStaticRoute = async () => {
    const confirm = window.confirm('آیا از حذف این آیتم مطمئن هستید؟');
    if (confirm) {
      try {
        const result = await Api.deleteAdministrators(selectRow).enq();
        console.log('response is : ', result);
        mutate();
        toast.success(`آیتم مورد نظر با موفقیت حذف شد`);
        setSelectRow('');
      } catch (error) {
        console.log('ERROR', error);
      }
    }
  };

  const { data, mutate, isLoading } = useSWR(`/api/orders`, () =>
    Api.GetAllOrders().enq()
  );

  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs] = useState<ColDef[]>([
    { field: 'paymentStatus', headerName: 'وضعیت پرداخت', filter: false },
    { field: 'phone', headerName: 'شماره تلفن', filter: false },
    { field: 'totalAmount', headerName: 'قیمت', filter: false },
    { field: 'trackingCode', headerName: 'کد رهگیری', filter: false },
    {
      field: 'items',
      headerName: 'آیتم ها',
      cellRenderer: (params: any) => {
        // console.log('params is : ', params.data.items);
        return (
          <div className='mb-3 flex flex-row '>
            {/* {params?.data?.items?.map((item: any) => {
              return (
                <div> */}
            <p>{params?.data?.items?.name}</p>-
            <p>{params?.data?.items?.price}</p>-
            <p>{params?.data?.items?.quantity}</p>
            {/* </div> */}
          </div>
        );
      },
      filter: false,
    },
    { field: 'shippingAddress.addressLine', headerName: 'آدرس', filter: false },
    { field: 'shippingAddress.city', headerName: 'شهر', filter: false },
    {
      field: 'shippingAddress.fullName',
      headerName: 'نام و نام خانوادگی',
      filter: false,
    },
    {
      field: 'shippingAddress.postalCode',
      headerName: 'کد پستی',
      filter: false,
    },
  ]);

  const [tableData, setTableData] = useState();

  useEffect(() => {
    setTableData(
      data?.orders?.map((item: any) => {
        return {
          ...item,
          paymentStatus: item?.paymentStatus,
          totalAmount: formatPriceToToman(item?.totalAmount),
          phone: item?.phone,
          trackingCode: item?.trackingCode,
          items: item?.items[0], // Assuming available is a boolean in the API response
        };
      })
    );
  }, [data]);

  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   fetch(`${BASE_URL}/api/products`)
  //     .then((resp) => resp.json())
  //     .then((data: any) =>
  //       setTableData(
  //         data?.map((item: any) => {
  //           return {
  //             ...item,
  //             name: item?.name,
  //             price: formatPriceToToman(item?.price),
  //             description: item?.description,
  //           };
  //         })
  //       )
  //     );
  // }, []);
  if (isLoading) {
    return <div>is loading...</div>;
  }

  return (
    <div>
      <Toast />

      <Table
        rowData={tableData}
        columnDefs={columnDefs}
        // onGridReady={onGridReady}
        showQuickFilter
        ref={gridRef}
        groupDefaultExpanded={-1}
        // onRowSelected={(e) => {
        //   setSelectRow(e.data._id);
        // }}
        // onRowDoubleClicked={() => push(`/area/${selectRow}`)}
        headerClassName='px-2 py-2'
        headerStart={
          <>
            <button
              className='flex items-center gap-1 h-[24px] px-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100'
              color='#262626'
              onClick={() => deleteStaticRoute()}
              disabled={selectRow === ''}
            >
              <Icon path={mdiTrashCanOutline} size={0.8} /> حذف
            </button>
          </>
        }
      />
    </div>
  );
}

export default GetAllpage;
