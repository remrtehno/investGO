import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const Document2Icon: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect y='-1.875' width='14.5833' height='18.75' fill='black' />
      <line x1='11.4632' y1='3.8125' x2='2.89418' y2='3.8125' stroke='white' strokeWidth='2' />
      <line x1='11.4632' y1='7.94434' x2='2.89418' y2='7.94434' stroke='white' strokeWidth='2' />
      <path d='M5.20262 11.5449L2.89406 11.5449' stroke='white' strokeWidth='2' />
    </svg>
  );
};
