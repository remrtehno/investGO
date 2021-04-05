import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const CloseIconLarge: FC<SvgProps> = (props) => {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect y='12.7279' width='18' height='1' transform='rotate(-45 0 12.7279)' fill='black' />
      <rect width='18' height='1' transform='matrix(-0.707107 -0.707107 -0.707107 0.707107 13.4355 12.7279)' fill='black' />
    </svg>
  );
};
