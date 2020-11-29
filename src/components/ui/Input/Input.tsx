import cx from 'classnames';
import React, {ChangeEvent, FC, FocusEventHandler, useCallback, useRef, useState} from "react";
import {Color} from "../../../constants/colors";
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
    props.onChange(e.currentTarget.value, props.name || null);
  }, [props.onChange, props.name]);

  const onFocus = useCallback(() => {
    setIsFocused(true);
    if (controlRef.current) {
      controlRef.current.focus();
    }
  }, []);

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
        onFocus={onFocus}
        onBlur={onBlur}
        ref={controlRef}
        className={cx(s.control, { [s.isControlVisible]: isControlVisible })}
        onChange={onChange}
        name={props.name || undefined}
        value={props.value || ''}
      />
      { props.error ? (
        <Text size={TextSize.bodyMini} color={Color.red} className={s.error}>{props.error}</Text>
      ) : null }
    </div>
  )
};
