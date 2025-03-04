import Icon from '@mdi/react';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

interface GroupFlagCellRendererParams extends ICellRendererParams {
  icon?: string;
}

function GroupRowInnerRenderer(props: GroupFlagCellRendererParams) {
  const node = props.node;
  const headerTitle = node.key;
  const { icon } = props;
  // console.log("props", props.customVar);

  return (
    <div className='flex items-center gap-2'>
      {icon && <Icon path={icon} size={0.8} />}
      <span className='font-bold'>{headerTitle}</span>
    </div>
  );
}

export default GroupRowInnerRenderer;
