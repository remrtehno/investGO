import cx from "classnames";
import React, {FC, useCallback} from "react";
import s from './Button.scss';

export enum ButtonSize {
  m = 'm',
  s = 's'
}

export enum ButtonTheme {
  black = 'black',
  red = 'red',
  white = 'white',
  light = 'light',
}

export declare namespace Button {
  export type Props = {
    size: ButtonSize,
    theme: ButtonTheme,
    onClick(): void,

    className?: string,
    disabled?: boolean,
  };
}

export const Button: FC<Button.Props> = (props) => {
  const className = cx(
    s.Button,
    s[`size_${props.size}`],
    s[`theme_${props.theme}`],
    props.disabled ? s.disabled : null,
    props.className,
  );

  const onClick = useCallback(() => {
    if (props.disabled) {
      return;
    }

    props.onClick();
  }, [props.onClick, props.disabled]);

  return (
    <button className={className} onClick={onClick}>
      {props.children}
    </button>
  )
};
