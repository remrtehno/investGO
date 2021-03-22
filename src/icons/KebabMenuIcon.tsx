import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const KebabMenuIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='15' height='30' viewBox='0 0 15 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.171875' width='14.6748' height='30' rx='6.62733' fill='#F2F2F2' />
      <path d='M6.54297 8.85938H8.47182' stroke='black' strokeWidth='2' strokeLinecap='round' />
      <path d='M6.54297 14.8594H8.47182' stroke='black' strokeWidth='2' strokeLinecap='round' />
      <path d='M6.54297 20.8594H8.47182' stroke='black' strokeWidth='2' strokeLinecap='round' />
    </svg>
  );
};
