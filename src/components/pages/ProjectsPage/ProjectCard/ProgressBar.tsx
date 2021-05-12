import type {FC} from 'react';
import React from 'react';

import s from './ProjectCard.scss';

export declare namespace ProgressBar {
  export type Props = {
    progress?: number,
  };
}

export const ProgressBar: FC<ProgressBar.Props> = ({progress}) => (
  <div className={s.progressBar}>
    <div className={s.progressBarInner} style={{width: `${progress}%`}}> </div>
  </div>
);
