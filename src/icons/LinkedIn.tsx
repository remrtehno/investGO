import type {FC} from 'react';
import React from 'react';

import type {SvgProps} from 'src/types/common';

export const LinkedIn: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.0859375' y='0.000244141' width='32.8276' height='32.8276' rx='3.07759' fill='#3480BA' />
      <path fillRule='evenodd' clipRule='evenodd' d='M11.2257 9.47742C12.147 9.47742 12.8951 10.2255 12.8951 11.1474C12.8951 12.0697 12.147 12.8178 11.2257 12.8178C10.3007 12.8178 9.55469 12.0697 9.55469 11.1474C9.55469 10.2255 10.3007 9.47742 11.2257 9.47742Z' fill='white' />
      <path fillRule='evenodd' clipRule='evenodd' d='M9.78516 23.3511H12.6676V14.0845H9.78516V23.3511Z' fill='white' />
      <path fillRule='evenodd' clipRule='evenodd' d='M14.4688 14.0838H17.2293V15.3508H17.2687C17.6527 14.6221 18.5929 13.854 19.9942 13.854C22.9096 13.854 23.4484 15.7726 23.4484 18.2683V23.3504H20.5697V18.8439C20.5697 17.7694 20.5503 16.387 19.0724 16.387C17.574 16.387 17.3453 17.558 17.3453 18.7673V23.3504H14.4688V14.0838Z' fill='white' />
    </svg>
  );
};
