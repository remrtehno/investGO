import React, {FC} from 'react';
import {PageHeader} from "./PageHeader";
import cx from 'classnames';
import s from './Page.scss';

type Props = {
  className?: string,
}

export const Page: FC<Props> = (props) => {
  return (
    <div className={cx(s.Page, props.className)}>
      <PageHeader/>
      {props.children}
    </div>
  );
};
