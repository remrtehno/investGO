import _ from 'lodash';
import type {FC, MutableRefObject} from 'react';
import React, {createContext, useCallback, useContext, useMemo} from 'react';

import {useScroll} from './useScroll';

const context = createContext<{scrollTop: number, setScrollTop(pos: number): void}>({
  scrollTop: 0, setScrollTop: _.noop,
});
const {Provider} = context;

export declare namespace PagePositionProvider {
  export type Props = {
    pageRef: MutableRefObject<HTMLDivElement | null>
  }
}

export const PageScrollProvider: FC<PagePositionProvider.Props> = (props) => {
  const scrollTop = useScroll(props.pageRef);

  const setScrollTop = useCallback((newPos: number) => {
    if (!props.pageRef.current) {
      return;
    }

    props.pageRef.current.scrollTo(0, newPos);
  }, []);

  const value = useMemo(() => ({scrollTop, setScrollTop}), [scrollTop, setScrollTop]);

  return (
    <Provider value={value}>
      { props.children }
    </Provider>
  );
};

export function usePageScroll() {
  return useContext(context);
}
