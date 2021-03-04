import cx from 'classnames';
import type {CSSProperties, FC, ReactNode} from 'react';
import React, {useCallback} from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import type {SvgProps} from 'src/types/common';

import s from './CheckBox.scss';

export declare namespace CheckBox {
  export type Props = {
    value: boolean,
    onChange(value: boolean, name: string | null): void,
    label: ReactNode,

    name?: string | null,
    className?: string,
    style?: CSSProperties
  };
}

const CheckIcon: FC<SvgProps> = (props) => {
  return (
    <svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M1.17969 4.06198L4.92357 8.08375L11.824 1.14062' stroke='white' strokeWidth='2' />
    </svg>

  );
};

export const CheckBox: FC<CheckBox.Props> = (props) => {
  const toggleValue = useCallback(() => {
    props.onChange(!props.value, props.name || null);
  }, [props.onChange, props.value, props.name]);

  return (
    <div style={props.style} className={cx(s.CheckBox, props.className)} onClick={toggleValue}>
      <div className={cx(s.toggle, {[s.checked]: props.value})}>
        <CheckIcon className={s.icon} />
      </div>
      <Text size={TextSize.body1} className={s.label}>{ props.label }</Text>
    </div>
  );
};
