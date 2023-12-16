import React from 'react';
import { renderStar } from '../../utils/renderStar';
import { Rate } from 'antd';

export default function Star({ totalRaitings, fs = 13 }) {
   return (
      <div>
         <Rate className='text-[14px]' disabled defaultValue={totalRaitings} />
      </div>
   );
}
