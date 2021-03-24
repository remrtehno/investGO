import cx from 'classnames';
import type {ChangeEvent, FC} from 'react';
import React, {useCallback, useRef, useState} from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';

import s from './Switch.scss';

export declare namespace Switch {
  export type OnChange = (value: boolean, name: string | null) => void;

  export type Props = {
    value: boolean,
    onChange: OnChange,

    label?: string,
    className?: string,
    error?: string | null,
    disabled?: boolean,
    name?: string,
  };
}

export const Switch: FC<Switch.Props> = (props) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.checked, props.name ? props.name : null)
  }

  return (
    <div className={cx(s.switch, props.className)}>
      <div className={s.outer}>
        <input
          type='checkbox'
          className={s.control}
          name={props.name}
          id={props.name}
          onChange={handleChange}
          checked={props.value}
        />
        <label className={cx(s.bg, props.value && s.checked)} htmlFor={props.name}>
          <span className={s.inner} />
          <span className={cx(s.knob, props.value && s.checked)} />
        </label>
      </div>
    </div>
  );
};
