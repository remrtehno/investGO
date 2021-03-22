import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const InfoIcon: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M11 7.61719V9.61719H13V7.61719H11Z' fill='black' />
      <path d='M11 13.6172V17.6172H14V15.6172H13V11.6172H10V13.6172H11Z' fill='black' />
      <path fillRule='evenodd' clipRule='evenodd' d='M12 2.61719C6.48 2.61719 2 7.09719 2 12.6172C2 18.1372 6.48 22.6172 12 22.6172C17.52 22.6172 22 18.1372 22 12.6172C22 7.09719 17.52 2.61719 12 2.61719ZM4 12.6172C4 17.0272 7.59 20.6172 12 20.6172C16.41 20.6172 20 17.0272 20 12.6172C20 8.20719 16.41 4.61719 12 4.61719C7.59 4.61719 4 8.20719 4 12.6172Z' fill='black' />
    </svg>
  );
};
