import {MutableRefObject, useState} from 'react';
import {useLatestRef} from './useLatestRef';

export function useStateRef<TValue>(
  initialValue: TValue | (() => TValue)
): [MutableRefObject<TValue>, (value: TValue) => void] {
  const [value, setValue] = useState(initialValue);
  return [
    useLatestRef(value),
    setValue,
  ];
}
