import type {MutableRefObject} from 'react';
import {useEffect, useState} from 'react';

import {getElementPosition} from 'src/utils/getElementPosition';

export type ElementPosition = {
  top: number,
  left: number
}

export function usePosition(ref: MutableRefObject<Element | null>) {
  const [pos, setPos] = useState<ElementPosition | null>(null);

  function updatePos() {
    if (!ref.current) {
      return;
    }

    setPos(getElementPosition(ref.current));
  }

  useEffect(() => {
    updatePos();
  }, []);

  return pos;
}
