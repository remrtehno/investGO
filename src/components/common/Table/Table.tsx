import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import s from './Table.scss';

declare namespace Table {
  export type Props = {
    className?: string,
    dense?: boolean,
    border?: boolean
  }
}

export const Table: FC<Table.Props> = (props) => {
  let {border} = props;
  if (typeof border === 'undefined') {
    border = true;
  }

  return (
    <div className={cx(s.tableWrapper,
      props.className && props.className)}>
      <table className={cx(s.table, props.dense && s.dense, !border && s.noBorder)}>
        { props.children }
      </table>
    </div>
  );
};
