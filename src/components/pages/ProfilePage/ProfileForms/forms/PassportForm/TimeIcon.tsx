import React from 'react';

import type {SvgProps} from 'src/types/common';

export function TimeIcon(props: SvgProps) {
  return (
    <svg width='34' height='33' viewBox='0 0 34 33' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect x='1.80469' y='6' width='31' height='13' rx='1' fill='black' stroke='black' />
      <circle cx='17.3047' cy='12.5' r='10.5' fill='#F2F2F2' />
      <circle cx='17.3047' cy='12.5' r='8.5' fill='black' />
      <path d='M17.8047 8V12H23.8047' stroke='#F2F2F2' strokeWidth='2' strokeLinejoin='round' />
    </svg>
  );
}
