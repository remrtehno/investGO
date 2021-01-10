import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const AddIcon: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M5.62109 12.0002H18.3824' stroke='black' />
      <path d='M12 18.3809V5.61951' stroke='black' />
    </svg>
  );
};
