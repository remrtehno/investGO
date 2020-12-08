import React, {createContext, FC, MutableRefObject, useCallback, useContext, useMemo} from "react";
import useScroll from "./useScroll";
import _ from 'lodash';

const context = createContext<{ scrollTop: number, setScrollTop(pos: number): void }>({
  scrollTop: 0, setScrollTop: _.noop
});
const Provider = context.Provider;

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

  const value = useMemo(() => {
    return { scrollTop, setScrollTop };
  }, [scrollTop, setScrollTop]);

  return (
    <Provider value={value}>
      {props.children}
    </Provider>
  )
}

export function usePageScroll() {
  return useContext(context);
}
