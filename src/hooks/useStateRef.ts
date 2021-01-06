import type {MutableRefObject} from 'react';
import {useState} from 'react';

import {useLatestRef} from './useLatestRef';

export function useStateRef<TValue>(
  initialValue: TValue | (() => TValue)
): [TValue, (value: TValue) => void, MutableRefObject<TValue>] {
  const [value, setValue] = useState(initialValue);
  return [
    value,
    setValue,
    useLatestRef(value),
  ];
}
