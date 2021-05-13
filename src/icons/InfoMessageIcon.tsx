import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const InfoMessageIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='54' height='55' viewBox='0 0 54 55' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M27 50.5C39.7025 50.5 50 40.2025 50 27.5C50 14.7975 39.7025 4.5 27 4.5C14.2975 4.5 4 14.7975 4 27.5C4 40.2025 14.2975 50.5 27 50.5Z' stroke='black' strokeWidth='2' />
      <path fillRule='evenodd' clipRule='evenodd' d='M28.3442 23.4362H23.1113L23.1121 25.4166L25.3885 25.9037V38.4512H28.3447L28.3442 23.4362ZM28.8295 18.25C28.8295 17.6929 28.6348 17.2218 28.2454 16.8366C27.856 16.4515 27.384 16.2589 26.8295 16.2589C26.2749 16.2589 25.8029 16.4515 25.4135 16.8366C25.0241 17.2218 24.8295 17.6929 24.8295 18.25C24.8295 18.807 25.0241 19.2811 25.4135 19.6722C25.8029 20.0633 26.2749 20.2589 26.8295 20.2589C27.384 20.2589 27.856 20.0633 28.2454 19.6722C28.6348 19.2811 28.8295 18.807 28.8295 18.25Z' fill='black' />
    </svg>
  );
};
