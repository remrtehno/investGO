import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const BurgerIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='18' height='13' viewBox='0 0 18 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='18' height='1' fill='black' />
      <rect y='6' width='18' height='1' fill='black' />
      <rect y='12' width='18' height='1' fill='black' />
    </svg>
  );
};
