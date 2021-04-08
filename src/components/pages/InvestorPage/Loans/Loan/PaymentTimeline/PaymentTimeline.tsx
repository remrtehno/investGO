import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';

import s from './PaymentTimeline.scss';

declare namespace PaymentTimeline {
  export type Props = {}
}

const dots = [
  {paid: false},
  {paid: false},
  {paid: false},
  {paid: false},
  {paid: false},
  {paid: false},
  {paid: true},
  {paid: true},
  {paid: true},
];

export const PaymentTimeline: FC<PaymentTimeline.Props> = (props) => {
  return (
    <div className={s.line}>
      <div className={s.fill} style={{left: '62.5%'}} />
      { dots.map((item, index) => {
        const percentage = (index) * 100 / (dots.length - 1);
        return (
          <i
            className={cx(s.dot, item.paid && s.dotPaid)}
            key={index}
            style={{left: `${percentage}%`}}
          />
        );
      }) }
    </div>
  );
};
