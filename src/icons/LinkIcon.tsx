import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const LinkIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='27' height='26' viewBox='0 0 27 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15.6915 12.5491L15.2169 11.9478V11.9478C14.0427 10.4602 11.8848 10.2061 10.3972 11.3803L8.21308 13.1044C6.72547 14.2786 6.47143 16.4364 7.64565 17.924V17.924C8.81987 19.4116 10.9777 19.6657 12.4653 18.4915L13.5574 17.6294' stroke='black' strokeWidth='1.4' strokeLinecap='round' />
      <path d='M14.172 8.40167L15.3855 7.44382C16.8731 6.2696 19.0309 6.52365 20.2052 8.01125V8.01125C21.3794 9.49886 21.1253 11.6567 19.6377 12.8309L17.4536 14.5549C15.966 15.7292 13.8082 15.4751 12.6339 13.9875V13.9875L12.1593 13.3862' stroke='black' strokeWidth='1.4' strokeLinecap='round' />
    </svg>
  );
};
