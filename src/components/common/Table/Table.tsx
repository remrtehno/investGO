import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import s from './Table.scss';

declare namespace Table {
  export type Props = {
    className?: string,
    dense?: boolean,
  }
}

export const Table: FC<Table.Props> = (props) => {
  return (
    <div className={cx(s.tableWrapper,
      props.className && props.className)}>
      <table className={cx(s.table, props.dense && s.dense)}>
        { props.children }
      </table>
    </div>
  );
};
