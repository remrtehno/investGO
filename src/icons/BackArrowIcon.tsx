import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const BackArrowIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M9.39062 14.8838L4.26605 10.1053L9.39062 5.3268' stroke='#7F7F7F' strokeWidth='1.16667' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

