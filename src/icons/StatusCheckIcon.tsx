import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const StatusCheckIcon: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='4.7' y='4.7' width='13.6' height='13.6' rx='5.3' stroke='black' strokeWidth='1.4' />
      <path d='M8.00002 11.2201L10.9765 14L16 9' stroke='black' strokeWidth='1.6' />
    </svg>
  );
};
