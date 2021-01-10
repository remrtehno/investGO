import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

import circle from 'src/assets/images/circle.png';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';

import s from './RoadMap.scss';
import {Color} from "src/types/Color";

declare namespace RoadMap {
  export type Items = {
    label: string,
    desc: string,
    active?: boolean,
  }
  export type Props = {
    data: Items[],
  }
}

function Circle() {
  return (
    <img src={circle} className={s.RoadMapItemImg} alt='circle' />
  );
}

function CircleActive() {
  return (
    <svg className={s.RoadMapItemImg} width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='3.80859' y='3.80896' width='12.8884' height='12.8884' rx='4' fill='#FF3B30' />
      <rect x='0.3' y='0.3' width='19.9064' height='19.9064' rx='5.7' stroke='#FF3B30' strokeWidth='0.6' />
    </svg>
  );
}


export const RoadMap: FC<RoadMap.Props> = ({data}) => {
  let afterActive = false;
  return (
    <div className={s.RoadMap}>
      {
        data && data.map(({label, desc, active}, index) => {
          if (active) {
            afterActive = true;
          }
          return (
            <div
              className={
                classNames(
                  s.RoadMapItem,
                  afterActive ? s.afterActive : '',
                  active ? s.active : '',
                )
              }
              key={index}
            >
              { active
                ? <CircleActive />
                : <Circle /> }

              <Text size={TextSize.subHeadline1} color={ active ? Color.red : Color.black }>{ label }</Text>
              <div className={s.RoadMapItemDescription}>
                <Text size={TextSize.body1} weight={TextWeight.light}>{ desc }</Text>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};
