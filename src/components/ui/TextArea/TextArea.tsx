import cx from 'classnames';
import type {ChangeEvent, FC} from 'react';
import React, {useCallback, useRef, useState} from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';

import s from './TextArea.scss';

export declare namespace TextArea {
  export type OnChange = (value: string, name: string | null, e: ChangeEvent<HTMLTextAreaElement>) => void;

  export type Props = {
    value: string,
    onChange: OnChange,

    label?: string,
    className?: string,
    error?: string | null,
    disabled?: boolean,
    name?: string | null,
    placeholder?: string
  };
}

export const TextArea: FC<TextArea.Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<HTMLTextAreaElement | null>(null);

  useOnClickOutside(inputRef, () => {
    setIsFocused(false);
  });

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.currentTarget.value, props.name || null, e);
  }, [props.onChange]);

  const isControlVisible = Boolean(props.value || isFocused);

  return (
    <div className={s.TextArea} ref={inputRef}>
      { props.label ? (
        <Text
          className={cx(s.label, {[s.isControlVisible]: isControlVisible})}
          size={isControlVisible ? TextSize.caption1 : TextSize.body1}
          color={isControlVisible ? null : Color.gray4}
        >
          { props.label }
        </Text>
      ) : null }
      <textarea
        placeholder={props.placeholder}
        onChange={onChange}
        className={cx(s.control, props.className, {
          [s.withLabel]: props.label,
          [s.withError]: props.error,
          [s.focused]: isFocused,
        })}
        ref={controlRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={props.value || ''}
      />
      { props.error ? (
        <Text size={TextSize.bodyMini} color={Color.red} className={s.error}>{ props.error }</Text>
      ) : null }
    </div>
  );
};
