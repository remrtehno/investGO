import type {FC} from 'react';
import {Fragment} from 'react';
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {Table} from 'src/components/common/Table';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {userAtom} from 'src/recoil/userAtom';
import type {Borrower} from 'src/types/Borrower';
import {formatDate} from 'src/utils/formatDate';
import {plural} from 'src/utils/plural';

import s from './LoanDetails.scss';
import { LoanConditions } from './LoanConditions';

export declare namespace LoanDetails {
  export type Props = {
    loan: Borrower.LoanDetails
  };
}

enum translateRepaymentShedule {
  month ='Ежемесячно',
  day ='Ежеквартально',
  year ='В конце срока',
}

enum translateRepaymentType {
  classical = 'Дифференцированный',
  annuity = 'Аннуитентный'
}

export const LoanDetails: FC<LoanDetails.Props> = (props) => {
  const {loan} = props;
  const {user} = useRecoilValue(userAtom);
  const company = user?.company;
  const [activeTab, setActiveTab] = useState('1');

  const tabs = [
    {id: '1', label: 'Общая информация'},
    {id: '2', label: 'Заемщик'},
    {id: '3', label: 'Документы'},
    {id: '4', label: 'Инвесторы'},
  ];

  return (
    <div className={s.loan}>
      <div className={s.preview}>
        <div className={s.logo} />
        <div className={s.desc}>
          <Text size={TextSize.body2} weight={TextWeight.semibold}>
            { company?.name }
          </Text>
          <div className={s.description}>
            { loan.description }
          </div>
        </div>
      </div>
      <div className={s.stats}>
        <div className={s.amount}>{ loan.amount } ₽</div>
      </div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      { activeTab === '1' ? (
        <LoanConditions loan={loan} />
      ) : null }
    </div>
  );
};
