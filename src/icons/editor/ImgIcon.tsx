import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const ImgIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='27' height='26' viewBox='0 0 27 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='6.50781' y='7' width='14.604' height='12' rx='1' stroke='black' strokeWidth='1.4' />
      <path d='M8.51172 13.1217C8.51172 12.8527 8.6201 12.5951 8.81237 12.407L10.7412 10.5198C11.1281 10.1412 11.7461 10.1393 12.1354 10.5155L14.7538 13.0455C15.0961 13.3762 15.624 13.4198 16.016 13.1498L16.5323 12.7942C16.949 12.5071 17.5146 12.5766 17.8494 12.9561L18.8575 14.0986C19.0187 14.2813 19.1076 14.5166 19.1076 14.7602V16.0768C19.1076 16.629 18.6599 17.0768 18.1076 17.0768H9.51172C8.95943 17.0768 8.51172 16.629 8.51172 16.0768V13.1217Z' fill='black' />
    </svg>
  );
};
