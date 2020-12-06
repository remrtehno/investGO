import cx from 'classnames';
import React, {ChangeEvent, FC, FocusEventHandler, useCallback, useRef, useState} from "react";
import {Color} from "../../../types/Color";
import {useOnClickOutside} from "../../../hooks/useOnClickOutside";
import {Text, TextSize} from "../Text";
import s from './Input.scss';

export declare namespace Input {
  export type Props = {
    value: string,
    label: string,
    onChange(value: string, name: string | null): void,

    error?: string | null,
    className?: string,
    name?: string | null,
    isDisabled?: boolean,
    regExp?: RegExp,
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
    const { value } = e.currentTarget;

    if (props.regExp && !props.regExp.test(value)) {
      return;
    }

    props.onChange(value, props.name || null);
  }, [props.onChange, props.name, props.regExp]);

  const onFocus = useCallback(() => {
    if (props.isDisabled) {
      return;
    }

    setIsFocused(true);
    if (controlRef.current) {
      controlRef.current.focus();
    }
  }, [props.isDisabled]);

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    setIsFocused(false);
  }, []);

  const isControlVisible = Boolean(props.value || isFocused);

  return (
    <div
      ref={inputRef}
      className={cx(s.input, props.className, {
        [s.withError]: props.error,
        [s.focused]: isFocused,
        [s.disabled]: props.isDisabled
      })}
      onClick={onFocus}
    >
      <Text
        className={cx(s.label, { [s.isControlVisible]: isControlVisible })}
        size={isControlVisible ? TextSize.caption1 : TextSize.body1}
        color={isControlVisible ? null : Color.gray4}
      >
        {props.label}
      </Text>
      <input
        autoComplete='off'
        onFocus={onFocus}
        onBlur={onBlur}
        ref={controlRef}
        className={cx(s.control, { [s.isControlVisible]: isControlVisible })}
        onChange={onChange}
        name={props.name || undefined}
        value={props.value || ''}
        disabled={props.isDisabled}
      />
      { props.error ? (
        <Text size={TextSize.bodyMini} color={Color.red} className={s.error}>{props.error}</Text>
      ) : null }
    </div>
  )
};
