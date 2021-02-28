import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const EmailSendedIcon: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width="63" height="55" viewBox="0 0 63 55" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="17.9453" y="13.5" width="34.2471" height="28.0333" rx="3" fill="white" stroke="black" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.207 14.0977L32.4633 25.881C33.9789 27.2282 36.2627 27.2282 37.7782 25.881L51.0345 14.0977"
        stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.207 40.5371L26.5126 34.1097L30.1655 30.896M51.0345 40.6211L43.6805 34.1517L40.0035 30.917"
        stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 21.6953H12" stroke="black" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M1 27.6953H12" stroke="black" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M8 33.6953H12" stroke="black" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>

  );
};
