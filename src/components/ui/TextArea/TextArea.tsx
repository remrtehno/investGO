import type {FC} from 'react';
import React, {ChangeEvent, useCallback} from 'react';
import cx from 'classnames';
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
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.currentTarget.value, props.name || null, e);
  }, [props.onChange]);

  return (
    <div className={s.TextArea}>
      { props.label ? (
        <div className={s.label}>{props.label}</div>
      ) : null }
      <textarea
        placeholder={props.placeholder}
        onChange={onChange}
        className={cx(s.control, props.className)}
      >{props.value}</textarea>
    </div>
  )
};
