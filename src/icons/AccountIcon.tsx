import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const AccountIcon: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26.999" cy="27.499" r="19.2373" fill="white" stroke="black" strokeWidth="2"/>
    <path d="M18.625 26.1048L25.6034 32.3853L36.7688 19.8242" stroke="black" strokeWidth="2"/>
    </svg>
  );
};
