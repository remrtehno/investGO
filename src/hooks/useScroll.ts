import _ from 'lodash';
import type {MutableRefObject} from 'react';
import {useEffect, useState} from 'react';

export const useScroll = (ref: MutableRefObject<Element | null>) => {
  const [scroll, setScroll] = useState<number>(0);

  const scrollHandler = () => {
    setScroll(ref.current ? ref.current.scrollTop : 0);
  };

  useEffect(() => {
    if (!ref.current) {
      return _.noop;
    }

    ref.current.addEventListener('scroll', scrollHandler);
    return () => {
      if (!ref.current) {
        return;
      }
      ref.current.removeEventListener('scroll', scrollHandler);
    };
  });

  return scroll;
};
