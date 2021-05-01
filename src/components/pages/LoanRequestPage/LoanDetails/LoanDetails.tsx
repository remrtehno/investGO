import cx from 'classnames';
import type {FC} from 'react';
import React, {Fragment, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {Table} from 'src/components/common/Table';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {LoanModerationStatus} from 'src/contstants/ModerationStatus';
import {Role} from 'src/contstants/Role';
import {Document2Icon} from 'src/icons/Document2Icon';
import {DownloadIcon} from 'src/icons/DownloadIcon';
import {FilePdfIcon} from 'src/icons/files/FilePdfIcon';
import {userAtom} from 'src/recoil/userAtom';
import type {Borrower} from 'src/types/Borrower';
import {breackpointUp} from 'src/utils/breackpointUtils';
import {formatDate} from 'src/utils/formatDate';
import { formatSum } from 'src/utils/formatSum';
import {plural} from 'src/utils/plural';

import {LoanBorrowerInfo} from './LoanBorrowerInfo';
import {LoanConditions} from './LoanConditions';
import s from './LoanDetails.scss';
import {LoanDocuments} from './LoanDocuments';

export declare namespace LoanDetails {
  export type Props = {
    loan: Borrower.LoanDetails
  };
}

const translateLoanStatus = {
  [LoanModerationStatus.new]: 'новая',
  [LoanModerationStatus.moderating]: 'на модерации',
  [LoanModerationStatus.declined]: 'отклонена',
  [LoanModerationStatus.wait_activate]: 'ожидает активации',
  [LoanModerationStatus.completed]: 'завершена',
  [LoanModerationStatus.canceled]: 'отменена',
  [LoanModerationStatus.filled]: 'новая',
  active: 'активна',
};

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
        <div className={s.amount}>{ formatSum(loan.amount) } ₽</div>
        <div className={cx('row', s.statsRow)}>
          <div className='col'>Собрано <b>999 000 ₽</b></div>
          <div className='col text-end'>
            { translateLoanStatus[loan.status] }
          </div>
        </div>
        <div className={s.statsLine}>
          <div className={s.statsFill} style={{width: '10%'}} />
        </div>
      </div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      { activeTab === '1' ? (
        <LoanConditions loan={loan} />
      ) : null }
      { activeTab === '2' ? (
        <LoanBorrowerInfo loan={loan} />
      ) : null }
      { activeTab === '3' && loan.documents.length ? (
        <LoanDocuments loan={loan} />
      ) : null }
      { activeTab === '4' && loan.investors.length ? (
        <Table>
          <thead>
            <tr>
              <th>Инвестор</th>
              <th>Сумма</th>
              <th>Начислено</th>
              <th>Выплачено</th>
              <th>Договор</th>
            </tr>
          </thead>
          <tbody>
            { loan.investors.map((investor, index) => {
              <tr key={index}>
                <td>{ investor.name }</td>
                <td>{ investor.amount }</td>
                <td>{ investor.accrued_amount }</td>
                <td>{ investor.paid_amount }</td>
                <td>!</td>
              </tr>;
            }) }
          </tbody>
        </Table>
      ) : null }
      { activeTab === '4' && !loan.investors.length ? (
        <Text size={TextSize.body0}>Пока нет инвесторов</Text>
      ) : null }
    </div>
  );
};
