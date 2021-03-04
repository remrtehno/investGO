import cx from 'classnames';
import _ from 'lodash';
import type {CSSProperties, FC} from 'react';
import React, {useMemo} from 'react';

import type {Color} from 'src/contstants/Color';
import type {DivProps} from 'src/types/common';

import s from './Text.scss';

export enum TextSize {
  h2 = 'h2',
  h3 = 'h3',
  subHeadline1 = 'subHeadline1',
  body0 = 'body0',
  body1 = 'body1',
  body2 = 'body2',
  caption1 = 'caption1',
  bodyMini = 'bodyMini',
  tabMenu = 'tabMenu',
  status = 'status',
}

export enum TextWeight {
  bold= 700,
  semibold = 600,
  normal = 400,
  light = 300,
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
    return {
      fontWeight: props.weight,
      ...props.style,
    };
  }, [props.weight]);

  return (
    <div
      {..._.omit(props, 'size', 'color', 'weight', 'className')}
      className={className}
      style={style}
    >
      { props.children }
    </div>
  );
};
