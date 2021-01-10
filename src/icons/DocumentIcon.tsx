import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const DocumentIcon:FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width='35' height='40' viewBox='0 0 35 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='35' height='40' fill='black' />
      <line x1='27.5117' y1='11' x2='6.94608' y2='11' stroke='white' strokeWidth='2' />
      <line x1='27.5117' y1='19.8145' x2='6.94608' y2='19.8145' stroke='white' strokeWidth='2' />
      <path d='M12.4844 28.6289L6.94387 28.6289' stroke='white' strokeWidth='2' />
    </svg>

  );
};
