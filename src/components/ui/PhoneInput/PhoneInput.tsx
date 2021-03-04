import type {FC} from 'react';
import React, {useCallback, useMemo} from 'react';

import {Input} from 'src/components/ui/Input';

export declare namespace PhoneInput {
  export type Props = Omit<Input.Props, 'mask'>;
}

function fromValue(value: string) {
  if (!value) {
    return '';
  }
  return value.replace(/-/g, '');
}

function toValue(v: string) {
  if (!v) {
    return '';
  }
  return `${v.slice(0, 2)}-${v.slice(2, 5)}-${v.slice(5, 8)}-${v.slice(8, 10)}-${v.slice(-2)}`;
}


export const PhoneInput: FC<PhoneInput.Props> = (props) => {
  const value = useMemo(() => {
    return toValue(props.value);
  }, [props.value]);

  const onChange: Input.OnChange = useCallback((value, name, e) => {
    props.onChange(fromValue(value), name, e);
  }, [props.onChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={onChange}
      mask='+7-999-999-99-99'
    />
  );
};
