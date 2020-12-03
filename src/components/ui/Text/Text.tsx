import React, {FC} from "react";
import {Color} from "../../../types/Color";
import s from './Text.scss';
import cx from 'classnames';

export enum TextSize {
  h3 = 'h3',
  subHeadline1 = 'subHeadline1',
  body1 = 'body1',
  caption1 = 'caption1',
  bodyMini = 'bodyMini'
}

export declare namespace Text {
  export type Props = {
    size: TextSize,

    color?: Color | null,
    className?: string,
    isBold?: boolean,
  };
}

export const Text: FC<Text.Props> = (props) => {
  const className = cx(s.Text, s[`size_${props.size}`], {
    [s[`color_${props.color}`]]: props.color,
    [s.bold]: props.isBold
  }, props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  )
};
