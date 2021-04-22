import type {FC} from 'react';
import React from 'react';

import s from './PageTitle.scss';

declare namespace PageTitle {
  export type Props = {
  }
}

export const PageTitle: FC<PageTitle.Props> = (props) => {
  return (
    <div className={s.title}>{ props.children }</div>
  );
};
