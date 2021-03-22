import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const DropDownIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0)'>
        <path fillRule='evenodd' clipRule='evenodd' d='M1.11305 12.1057C0.774471 11.8048 0.743974 11.2863 1.04493 10.9478C1.34589 10.6092 1.86433 10.5787 2.20291 10.8796L4.32622 12.767L6.44953 10.8796C6.78811 10.5787 7.30655 10.6092 7.60751 10.9478C7.90847 11.2863 7.87797 11.8048 7.53939 12.1057L4.99058 14.3713C4.6117 14.7081 4.04074 14.7081 3.66186 14.3713L1.11305 12.1057Z' fill='black' />
      </g>
      <defs>
        <clipPath id='clip0'>
          <rect width='24' height='24' fill='white' transform='translate(0.5 0.648438)' />
        </clipPath>
      </defs>
    </svg>
  );
};
