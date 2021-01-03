import React, {FC} from 'react';
import s from './ProjectsPage.scss';

export declare namespace ProgressBar {
  export type Props = {
    progress?: string,
  };
}

const ProgressBar: FC<ProgressBar.Props> = ({progress}) => (
  <div className={s.progressBar}>
    <div className={s.progressBarInner} style={{width: `${progress}%`}}> </div>
  </div>
);

export default ProgressBar;
