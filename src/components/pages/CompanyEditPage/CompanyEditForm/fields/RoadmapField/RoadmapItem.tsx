import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {CloseIcon} from 'src/icons/CloseIcon';

import type {AddPointForm} from './AddPointForm';
import s from './RoadmapField.scss';

export declare namespace RoadmapItem {
  export type Props = {
    item: AddPointForm.Values,
    className?: string,
    index: number,
    onRemove(index: number): void,
  }
}

export const RoadmapItem: FC<RoadmapItem.Props> = (props) => {
  const {item} = props;
  const dateStart = new Date(item.dateStart).getTime();
  const dateEnd = new Date(item.dateEnd).getTime();
  const dateNow = Date.now();
  const isActive = dateNow >= dateStart && dateNow <= dateEnd;
  const isFuture = dateNow < dateStart;

  function handleRemoveClick() {
    props.onRemove(props.index);
  }

  return (
    <div
      className={cx(
        s.item,
        isActive && s.itemActive,
        isFuture && s.itemFuture,
        props.className
      )}
    >
      <div className={s.name}>{ item.name }</div>
      <Text size={TextSize.body0}>{ item.description }</Text>
      <i className={s.closeButton} onClick={handleRemoveClick}><CloseIcon color={Color.black} /></i>
    </div>
  );
};
