'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import GroupRowInnerRenderer from '@/components/table/GroupRowInnerRenderer';
import Table from '@/components/table/Table';
import {
  ColDef,
  GridReadyEvent,
  RowClassRules,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { AgGridReact } from 'ag-grid-react';
import { useRouter } from 'next/navigation';
import { Api } from '@/api/Api';
import useSWR from 'swr';
import { formatPriceToToman } from '@/utils/FormatPrice';
import Toast from '@/components/Toast/Toast';
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  const [selectRow, setSelectRow] = useState('');

  const deleteStaticRoute = async () => {
    const confirm = window.confirm('آیا از حذف این آیتم مطمئن هستید؟');
    if (confirm) {
      const formData = new FormData();
      formData.append('Id', selectRow);
      try {
        // await Api.deleteAdministrators({
        //   Id: selectRow,
        // }).enq();

        const response = await fetch(`${BASE_URL}/v1/Admin/Properties/Delete`, {
          method: 'DELETE',
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
          body: formData,
        });

        const result = await response.json();
        console.log('response is : ', result);
        mutate();

        toast.success(`item deleted successfully`);
      } catch (error) {
        console.log('ERROR', error);
      }
    }
  };

  const { data: rowData, mutate } = useSWR(`/1/40/`, () =>
    Api.GetAllProperties().enq()
  );
  console.log('data is : ', rowData?.value?.items);

  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs] = useState<ColDef[]>([
    { field: 'title', headerName: 'عنوان', filter: false },
    { field: 'city', headerName: 'شهر', filter: false },
    { field: 'state', headerName: 'استان', filter: false },
    { field: 'price', headerName: 'قیمت', filter: false },
    { field: 'documentKind', headerName: 'نوع سند', filter: false },
  ]);

  const [tableData, setTableData] = useState(rowData?.value?.items);

  useEffect(() => {
    setTableData(
      rowData?.value?.items?.map((item: any) => {
        return {
          ...item,
          title: item?.title,
          city: item?.city,
          state: item?.state,
          price: formatPriceToToman(item?.price),
          documentKind: item?.documentKind?.title,
        };
      })
    );
  }, [rowData]);

  useEffect(() => {
    fetch(`${BASE_URL}/1/50`)
      .then((resp) => resp.json())
      .then((data: any) => console.log('data issssssssssss : ', data?.value));
  }, []);

  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   fetch(`${BASE_URL}/1/50`)
  //     .then((resp) => resp.json())
  //     .then((data: any) =>
  //       setTableData(
  //         data?.value.items?.map((item: any) => {
  //           return {
  //             ...item,
  //             title: item?.title,
  //             city: item?.city,
  //             state: item?.state,
  //             price: formatPriceToToman(item?.price),
  //             documentKind: item?.documentKind?.title,
  //           };
  //         })
  //       )
  //     );
  // }, []);

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
        onRowSelected={(e) => {
          setSelectRow(e.data.id);
        }}
        headerClassName='px-2 py-2'
        headerStart={
          <>
            <button
              className='flex items-center gap-1 h-[24px] px-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100'
              color='#262626'
              onClick={() => deleteStaticRoute()}
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
