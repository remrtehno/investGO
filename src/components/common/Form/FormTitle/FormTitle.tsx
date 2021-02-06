import cx from 'classnames';
import type {CSSProperties, FC} from 'react';
import React from 'react';

import {Text, TextSize} from 'src/components/ui/Text';
import {ModerationStatus} from 'src/contstants/ModerationStatus';

import s from './FormTitle.scss';

function ModeratedIcon() {
  return (
    <svg className={s.moderatedIcon} width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 3.10377L3.81381 6L9 1' stroke='#1D5CFF' strokeWidth='2' />
    </svg>
  );
}

export declare namespace FormTitle {
  export type Props = {
    status?: ModerationStatus | null,
    className?: string,
    style?: CSSProperties,
  };
}

export const FormTitle: FC<FormTitle.Props> = (props) => {
  function renderStatus() {
    switch (props.status) {
    case ModerationStatus.filled:
    case ModerationStatus.waiting:
      return <Text className={cx(s.status, s.moderation)} size={TextSize.status}>Проверяется</Text>;

    case ModerationStatus.approved:
      return (
        <Text className={cx(s.status, s.appreoved)} size={TextSize.status}>
          <ModeratedIcon />
          Подтверждено
        </Text>
      );

    case ModerationStatus.declined:
      return (
        <Text className={cx(s.status, s.declined)} size={TextSize.status}>
          <ModeratedIcon />
          Отклонено
        </Text>
      );

    default:
      return null;
    }
  }

  return (
    <div style={props.style} className={cx(s.FormTitle, props.className)}>
      <Text className={s.title} size={TextSize.h2}>{ props.children }</Text>
      { renderStatus() }
    </div>
  );
};
