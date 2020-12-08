import React, {FC, useRef} from 'react';
import {PageScrollProvider} from "../../../hooks/usePageScroll";
import {PageHeader} from "./PageHeader";
import cx from 'classnames';
import s from './Page.scss';

type Props = {
  className?: string,
}

export const Page: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <PageScrollProvider pageRef={ref}>
      <div ref={ref} className={cx(s.page, props.className)}>
        <PageHeader/>
        <div className={s.content}>{props.children}</div>
      </div>
    </PageScrollProvider>
  );
};
