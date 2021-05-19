import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const WarningIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect y='0.5' width='40' height='40' rx='20' fill='white' />
      <path d='M3.28596 37.5C1.345 37.5 0.144392 35.3845 1.1396 33.7181L17.3536 6.56905C18.3237 4.94486 20.6764 4.94485 21.6464 6.56905L37.8604 33.7181C38.8556 35.3845 37.655 37.5 35.714 37.5H3.28596Z' fill='white' stroke='black' />
      <rect x='18' y='16' width='3' height='10' fill='black' />
      <rect width='3' height='4' transform='matrix(1 0 0 -1 18 32)' fill='black' />
    </svg>
  );
};
