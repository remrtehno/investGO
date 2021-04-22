import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const NextIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='24' height='72' viewBox='0 0 24 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M9.38427 47.2133C9.01566 47.6432 8.36399 47.6815 7.94755 47.2978L5.70965 45.2358C5.31369 44.871 5.27767 44.2581 5.62815 43.8494L12.3592 36L5.62815 28.1506C5.27767 27.7419 5.31369 27.129 5.70965 26.7642L7.94755 24.7022C8.36399 24.3185 9.01566 24.3568 9.38427 24.7867L18.4418 35.349C18.763 35.7236 18.763 36.2764 18.4418 36.651L9.38427 47.2133Z' fill='#717171' />
    </svg>
  );
};
