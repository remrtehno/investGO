import cx from 'classnames';
import type {FC} from 'react';
import {useState} from 'react';
import React from 'react';

import s from './Table.scss';

declare namespace Table {
  export type Props = {
    className?: string
  }
}

export const Table: FC<Table.Props> = (props) => {
  return (
    <div className={cx('row', s.tableWrapper, props.className && props.className)}>
      <table className={s.table}>
        {props.children}
      </table>
    </div>
  )
}