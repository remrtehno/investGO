import React, {CSSProperties, FC, useMemo} from "react";
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
  tabMenu = 'tabMenu'
}

export enum TextWeight {
  bold= 700,
  semibold =  600,
  normal = 400,
}

export declare namespace Text {
  export type Props = Omit<DivProps, 'color'> & {
    size: TextSize,

    color?: Color | null,
    className?: string,
    weight?: TextWeight,
  };
}

export const Text: FC<Text.Props> = (props) => {
  const className = cx(s.Text, s[`size_${props.size}`], {
    [s[`color_${props.color}`]]: props.color,
  }, props.className);

  const style = useMemo((): CSSProperties => {
    return { fontWeight: props.weight };
  }, [props.weight]);

  return (
    <div
      {..._.omit(props, 'size', 'color', 'weight', 'className')}
      className={className}
      style={style}
    >
      {props.children}
    </div>
  )
};
