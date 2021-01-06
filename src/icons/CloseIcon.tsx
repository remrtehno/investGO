import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export declare namespace CloseIcon {
  export type Props = SvgProps & {
    color: string,
  };
}

export const CloseIcon: FC<CloseIcon.Props> = (props) => {
  const {color, ...svgProps} = props;

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <path d='M7.48828 16.5117L16.5119 7.48808' stroke={color} strokeWidth='2' />
      <path d='M16.5117 16.5117L7.48808 7.48808' stroke={color} strokeWidth='2' />
    </svg>
  );
};
