import React, {FC} from "react";
import {Color} from "../../../types/Color";
import {DivProps} from "../../../types/common";
import s from './Text.scss';
import cx from 'classnames';
import _ from 'lodash';

export enum TextSize {
  h2 = 'h2',
  h3 = 'h3',
  subHeadline1 = 'subHeadline1',
  body1 = 'body1',
  caption1 = 'caption1',
  bodyMini = 'bodyMini',
}

export declare namespace Text {
  export type Props = Omit<DivProps, 'color'> & {
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
    <div {..._.omit(props, 'size', 'color', 'isBold', 'className')} className={className}>
      {props.children}
    </div>
  )
};
