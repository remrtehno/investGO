import type {FC} from 'react';
import React, {useRef, useState} from 'react';

import {AccountInfo} from 'src/components/common/AccountInfo/AccountInfo';

import s from './Account.scss';

declare namespace Account {
  export type Props = {
  }
}

export const Account: FC<Account.Props> = (props) => {
  const accountInfoItems = [
    {
      label: 'Свободно:',
      value: '0 ₽',
    },
    {
      label: 'В инвестициях:',
      value: '0.00 ₽',
    },
    {
      label: 'Доход:',
      value: '0.00 ₽',
    },
  ];

  const accountMenuItems = [
    {
      to: '/',
      label: 'Пополнить счет',
    },
    {
      to: '/',
      label: 'Вывести средства',
    },
  ];

  return (
    <AccountInfo items={accountInfoItems} menuItems={accountMenuItems} />
  );
};
