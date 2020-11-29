import cx from "classnames";
import React, {FC} from "react";
import s from './Button.scss';

export enum ButtonSize {
  m = 'm',
  s = 's'
}

export enum ButtonTheme {
  black = 'black',
  red = 'red',
  white = 'white'
}

export declare namespace Button {
  export type Props = {
    size: ButtonSize,
    theme: ButtonTheme,

    className?: string
  };
}

export const Button: FC<Button.Props> = (props) => {
  return (
    <button className={cx(s.Button, s[`size_${props.size}`], s[`theme_${props.theme}`])}>
      {props.children}
    </button>
  )
};
