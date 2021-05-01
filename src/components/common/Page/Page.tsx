import cx from 'classnames';
import type {FC} from 'react';
import React, {useRef} from 'react';

import {PageScrollProvider} from 'src/hooks/usePageScroll';

import s from './Page.scss';
import {PageHeader} from './PageHeader';

type Props = {
  className?: string,
  classNameHeader?: string,
  isBigLogo?: boolean,
}

export const Page: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <PageScrollProvider pageRef={ref}>
      <div ref={ref} className={cx(s.page, props.className)}>
        <PageHeader className={props.classNameHeader} isBigLogo={props.isBigLogo} />
        <div className={cx(s.content, props.isBigLogo ? s.isBigLogoContent : null )}>{ props.children }</div>
      </div>
    </PageScrollProvider>
  );
};
