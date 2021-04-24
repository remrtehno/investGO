import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const VKIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32' height='32' rx='3' fill='#5376A4' />
      <path fillRule='evenodd' clipRule='evenodd' d='M23.9792 11.6923H21.1694C20.9358 11.6923 20.721 11.8158 20.6105 12.0137C20.6105 12.0137 19.4899 13.9977 19.1299 14.6659C18.1616 16.4636 17.5345 15.8992 17.5345 15.0649V12.1882C17.5345 11.6876 17.1123 11.2818 16.5916 11.2818H14.4791C13.8941 11.24 13.3283 11.4924 12.9839 11.9488C12.9839 11.9488 14.0566 11.7821 14.0566 13.1715C14.0566 13.5161 14.0751 14.5073 14.0919 15.3386C14.0984 15.5896 13.9414 15.8178 13.6986 15.9102C13.4559 16.0026 13.1789 15.9397 13.0049 15.7526C12.1402 14.5965 11.4239 13.3442 10.8716 12.0229C10.7748 11.8211 10.5645 11.6919 10.3333 11.6923C9.72398 11.6923 8.50462 11.6923 7.78049 11.6923C7.63795 11.6913 7.50403 11.7578 7.42225 11.87C7.34046 11.9823 7.32126 12.1259 7.37088 12.2544C8.14604 14.2984 11.4852 20.7218 15.2965 20.7218H16.9007C17.2507 20.7218 17.5345 20.449 17.5345 20.1126V19.1814C17.5345 18.9426 17.682 18.7267 17.91 18.6319C18.1379 18.5372 18.4027 18.5816 18.5837 18.7451L20.5037 20.4794C20.6762 20.6351 20.9039 20.7218 21.1405 20.7218H23.6619C24.878 20.7218 24.878 19.9106 24.215 19.2829C23.7484 18.8411 22.0646 17.135 22.0646 17.135C21.7667 16.8383 21.7382 16.3771 21.9977 16.0486C22.5419 15.3601 23.4321 14.2331 23.8097 13.7502C24.3257 13.0903 25.2596 11.6923 23.9792 11.6923Z' fill='white' />
    </svg>
  );
};