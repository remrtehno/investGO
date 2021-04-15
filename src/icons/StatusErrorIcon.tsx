import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const StatusErrorIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='4.7' y='4.7' width='13.6' height='13.6' rx='5.3' stroke='#FF3B30' strokeWidth='1.4' />
      <path d='M7.76172 15.2852L15.2854 7.76152' stroke='#FF3B30' strokeWidth='1.6' />
      <path d='M15.2852 15.2852L7.76152 7.76152' stroke='#FF3B30' strokeWidth='1.6' />
    </svg>
  );
};
