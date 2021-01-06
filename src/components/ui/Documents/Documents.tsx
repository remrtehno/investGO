import type {FC} from 'react';
import React from 'react';

import s from './Documents.scss';

export declare namespace Documents {
  export type Props = {};
}

export const Documents: FC<Documents.Props> = () => {
  return (
    <div className={s.Documents} />
  );
};

