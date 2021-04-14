import type {FC} from 'react';
import React, {useCallback, useMemo} from 'react';

import {Input} from 'src/components/ui/Input';

export declare namespace EmailInput {
  export type Props = Omit<Input.Props, 'mask'>;
}

export const EmailInput: FC<EmailInput.Props> = (props) => {
  const value = useMemo(() => {
    return (props.value);
  }, [props.value]);

  const onChange: Input.OnChange = useCallback((value, name, e) => {
    props.onChange(value, name, e);
  }, [props.onChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={onChange}
    />
  );
};
