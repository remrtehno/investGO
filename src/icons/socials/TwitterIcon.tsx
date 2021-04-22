import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const TwitterIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32' height='32' rx='3' fill='#479BE4' />
      <path fillRule='evenodd' clipRule='evenodd' d='M13.0466 22.5757C19.0553 22.5757 22.3418 17.5146 22.3418 13.1257C22.3418 12.982 22.3418 12.8389 22.3323 12.6964C22.9716 12.2262 23.5235 11.6441 23.9621 10.9772C23.3659 11.2458 22.7334 11.422 22.0858 11.4998C22.7677 11.0847 23.2782 10.4318 23.522 9.66274C22.8807 10.0496 22.1792 10.3222 21.4476 10.4689C20.4349 9.37419 18.8258 9.10626 17.5226 9.81534C16.2193 10.5244 15.546 12.0342 15.8802 13.498C13.2535 13.3642 10.8062 12.1028 9.14731 10.0279C8.28022 11.5455 8.72311 13.4869 10.1587 14.4616C9.63885 14.4459 9.13029 14.3033 8.67599 14.0458C8.67599 14.0594 8.67599 14.0737 8.67599 14.0879C8.67641 15.6689 9.77261 17.0306 11.2969 17.3437C10.816 17.4771 10.3113 17.4965 9.82181 17.4007C10.2498 18.7536 11.4763 19.6805 12.8739 19.7072C11.7171 20.6315 10.2881 21.1332 8.81675 21.1317C8.55682 21.1312 8.29715 21.1152 8.03906 21.0838C9.53305 22.0585 11.2714 22.5755 13.0466 22.5731' fill='white' />
    </svg>
  );
};
