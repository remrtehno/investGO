import {useState, useEffect, MutableRefObject} from 'react';

const useScroll = (ref: MutableRefObject<Element | null>) => {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener('scroll', scrollHandler);
    return () => {
      if (!ref.current) {
        return;
      }
      ref.current.removeEventListener('scroll', scrollHandler);
    };
  });

  const scrollHandler = () => {
    setScroll(ref.current ? ref.current.scrollTop : 0);
  };

  return scroll;
};

export default useScroll;