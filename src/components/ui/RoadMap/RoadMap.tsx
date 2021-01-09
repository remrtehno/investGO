import type {FC} from 'react';
import React from 'react';
import circle from '../../../assets/images/circle.png';

import s from './RoadMap.scss';
import {Text, TextSize} from "src/components/ui/Text";
import {TextWeight} from "src/components/ui/Text/Text";

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

export const RoadMap:FC<RoadMap.Props> = ({data}) => {
  return (
    <div className={s.RoadMap}>
      {
        data && data.map(({label, desc}) => {
          return (
            <div className={s.RoadMapItem}>
              <img src={circle} className={s.RoadMapItemImg} alt="circle"/>
              <Text size={TextSize.subHeadline1}>{ label }</Text>
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
