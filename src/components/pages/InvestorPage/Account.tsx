import type {FC} from 'react';
import {useMemo} from 'react';
import React, {useRef, useState} from 'react';

import {AccountInfo} from 'src/components/common/AccountInfo/AccountInfo';
import type {Investor} from 'src/types/Investor';

import s from './Account.scss';

declare namespace Account {
  export type Props = {
    portfolio: Investor.Portfolio | null
  }
}

export const Account: FC<Account.Props> = (props) => {
  const accountInfoItems = useMemo(() => {
    return (
      [
        {
          label: 'Свободно:',
          value: `${props.portfolio?.balance || 0} ₽`,
        },
        {
          label: 'В инвестициях:',
          value: `${props.portfolio?.in_investment || 0} ₽`,
        },
        {
          label: 'Доход:',
          value: `${props.portfolio?.paid_out || 0} ₽`,
        },
      ]
    );
  }, [props.portfolio]);

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
