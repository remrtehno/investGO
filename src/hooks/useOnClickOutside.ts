import React from 'react';

export function useOnClickOutside(
  ref: React.RefObject<Element>,
  fn: (e: MouseEvent) => void,
  isActive: boolean = true,
) {
  React.useEffect(() => {
    if (!isActive) {
      return;
    }

    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target)) {
        fn(event);
      }
    }

    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  }, [fn, isActive, ref]);
}
