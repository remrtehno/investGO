import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import s from './FormRow.scss';

export declare namespace FormRow {
  export type Props = {
    className?: string
  };
}

export const FormRow: FC<FormRow.Props> = (props) => {
  return (
    <div className={cx('row', s.FormRow, props.className)}>{ props.children }</div>
  );
};

