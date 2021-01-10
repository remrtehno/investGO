import React, {FC} from 'react';
import {SvgProps} from "src/types/common";

export const FacebookIcon: FC<SvgProps> = (props) => {
  return (
    <svg className={props.className} width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32.8276' height='32.8276' rx='3.07759' fill='#3477E9' />
      <path fillRule='evenodd' clipRule='evenodd' d='M17.5886 23.9619V17.0752H19.909L20.2564 14.3912H17.5886V12.6776C17.5886 11.9006 17.8052 11.371 18.9237 11.371L20.3503 11.3704V8.96988C20.1035 8.93723 19.2567 8.86414 18.2716 8.86414C16.2147 8.86414 14.8067 10.1149 14.8067 12.4119V14.3912H12.4805V17.0752H14.8067V23.9619H17.5886Z' fill='white' />
    </svg>
  )
}