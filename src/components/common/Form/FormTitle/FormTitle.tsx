import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {Text, TextSize} from 'src/components/ui/Text';

import s from './FormTitle.scss';

function ModeratedIcon() {
  return (
    <svg className={s.moderatedIcon} width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 3.10377L3.81381 6L9 1' stroke='#1D5CFF' strokeWidth='2' />
    </svg>
  );
}

export enum FormStatus {
  moderation = 'moderation',
  moderated = 'moderated',
}

export declare namespace FormTitle {
  export type Props = {
    status?: FormStatus | null,
  };
}

export const FormTitle: FC<FormTitle.Props> = (props) => {
  function renderStatus() {
    switch (props.status) {
    case FormStatus.moderation:
      return <Text className={cx(s.status, s.moderation)} size={TextSize.status}>Проверяется</Text>;

    case FormStatus.moderated:
      return (<Text className={cx(s.status, s.moderated)} size={TextSize.status}>
        <ModeratedIcon />
        Подтверждено
      </Text>);

    default:
      return null;
    }
  }

  return (
    <div className={s.FormTitle}>
      <Text className={s.title} size={TextSize.h2}>{ props.children }</Text>
      { renderStatus() }
    </div>
  );
};
