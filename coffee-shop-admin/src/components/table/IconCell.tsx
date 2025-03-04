import Icon from '@mdi/react';
import { ICellRendererParams } from 'ag-grid-community';

const IconCell = (
  props: ICellRendererParams & { icon: string; color?: string }
) => {
  return (
    <div className={`h-full flex`}>
      <span className={`flex items-center gap-1 leading-none`}>
        {props.icon && (
          <Icon
            path={props.icon}
            size={0.75}
            className={`
						${props.color === 'danger' && 'text-[--danger-color]'} 
						${props.color === 'success' && 'text-[--success-color]'}
					`}
          />
        )}
        {props.value}
      </span>
    </div>
  );
};

export default IconCell;
