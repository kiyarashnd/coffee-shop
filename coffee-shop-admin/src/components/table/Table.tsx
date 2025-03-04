import React, {
  HTMLProps,
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import "ag-grid-enterprise";
import './custom-ag-grid.css';

interface TableProps extends GridOptions {
  containerClassName?: HTMLProps<HTMLElement>['className'];
  gridClassName?: HTMLProps<HTMLElement>['className'];
  headerStart?: ReactNode;
  showQuickFilter?: boolean;
  headerEnd?: ReactNode;
  headerClassName?: string;
  headerStartContainerClassName?: string;
  headerEndContainerClassName?: string;
  onRowDoubleClicked?: (event: any) => void;
}

const Table = forwardRef(function TableComp(props: TableProps, gridRef: any) {
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      resizable: true,
      sortable: true,
      unSortIcon: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'reset'],
        closeOnApply: true,
      },
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }, []);

  const getRowStyle = (params: any) => {
    if (params.node.isSelected()) {
      return { background: '#499258' };
    }
  };

  return (
    <div
      className={`
				w-full
				${props.containerClassName}
			`}
    >
      {(props.headerStart || props.showQuickFilter || props.headerEnd) && (
        <div
          className={`
						flex justify-between flex-wrap
						${props.headerClassName}
					`}
        >
          <div
            className={`
							flex items-center flex-wrap gap-2
							${props.headerStartContainerClassName}
						`}
          >
            {props.headerStart && props.headerStart}

            {props.showQuickFilter && (
              <input
                id='filter-text-box'
                placeholder='جستجو'
                onInput={onFilterTextBoxChanged}
                className='w-[150px] border border-gray-800 rounded-md px-2'
              />
            )}
          </div>

          <div
            className={`
							flex items-center gap-2
							${props.headerEndContainerClassName}
						`}
          >
            {props.headerEnd && props.headerEnd}
          </div>
        </div>
      )}

      <div className='ag-theme-alpine'>
        <AgGridReact
          enableRtl
          //   localeText={locale}
          ref={gridRef}
          defaultColDef={defaultColDef}
          animateRows
          //   localeText={'fa'}
          //   enableRtl={'rtl'}
          rowDragManaged
          // suppressMoveWhenRowDragging={true}
          rowSelection='single'
          enableRangeSelection={false}
          // suppressRowClickSelection={true}
          groupDisplayType='groupRows'
          allowContextMenuWithControlKey
          cacheQuickFilter
          domLayout='autoHeight'
          //   icons={icons}
          getRowStyle={getRowStyle}
          // onRowSelected={rowDataSelection}
          // onRowDoubleClicked={props.onRowDoubleClicked}
          {...(props as any)}
        />
      </div>
    </div>
  );
});

export default Table;
