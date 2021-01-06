import cx from 'classnames';
import type {ChangeEvent, FC, FocusEventHandler} from 'react';
import React, {useCallback, useRef, useState} from 'react';
import InputMask from 'react-input-mask';

import {Text, TextSize} from 'src/components/ui/Text';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {Color} from 'src/types/Color';
import type {DivProps} from 'src/types/common';

import s from './Input.scss';

export declare namespace Input {
  export type Props = {
    value: string,
    label: string,
    onChange(value: string, name: string | null, e: ChangeEvent<HTMLInputElement>): void,

    className?: string,
    containerProps?: DivProps,
    error?: string | null,
    name?: string | null,
    disabled?: boolean,
    regExp?: RegExp,
    isPassword?: boolean,
    mask?: string,
    postfix?: string,
  };
}

export const Input: FC<Input.Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLInputElement | null>(null);

  useOnClickOutside(inputRef, () => {
    setIsFocused(false);
  });

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget;

    if (props.regExp && !props.regExp.test(value)) {
      return;
    }

    props.onChange(value, props.name || null, e);
  }, [props.onChange, props.name, props.regExp]);

  const onFocus = useCallback(() => {
    if (props.disabled) {
      return;
    }

    setIsFocused(true);
    if (controlRef.current) {
      controlRef.current.focus();
    }
  }, [props.disabled]);

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setIsFocused(false);
  }, []);

  const isControlVisible = Boolean(props.value || isFocused);

  const controlProps = {
    type: props.isPassword ? 'password' : 'text',
    autoComplete: 'off',
    onFocus,
    onBlur,
    className: cx(s.control, {[s.isControlVisible]: isControlVisible}),
    onChange,
    name: props.name || undefined,
    value: props.value || '',
    disabled: props.disabled,
  };

  return (
    <div
      {...props.containerProps}
      ref={inputRef}
      className={cx(s.input, props.className, {
        [s.withError]: props.error,
        [s.focused]: isFocused,
        [s.disabled]: props.disabled,
      })}
      onClick={onFocus}
    >
      <Text
        className={cx(s.label, {[s.isControlVisible]: isControlVisible})}
        size={isControlVisible ? TextSize.caption1 : TextSize.body1}
        color={isControlVisible ? null : Color.gray4}
      >
        { props.label }
      </Text>
      { props.mask ? (
        <InputMask mask={props.mask} {...controlProps}>
          { (inputProps: any) => (
            <input
              {...inputProps}
              ref={controlRef}
            />
          ) }
        </InputMask>
      )
        : <input {...controlProps} ref={controlRef} />
      }
      { props.error
        ? <Text size={TextSize.bodyMini} color={Color.red} className={s.error}>{ props.error }</Text>
        : null }
    </div>
  );
};
