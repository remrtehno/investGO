import type {CSSProperties, FC} from 'react';
import React from 'react';

export declare namespace Margin {
  export type Props = {
    margin: CSSProperties['margin']
  };
}

export const Margin: FC<Margin.Props> = (props) => (
  <div className={'margin'} style={{margin: props.margin}}>
    { props.margin }
  </div>
);
