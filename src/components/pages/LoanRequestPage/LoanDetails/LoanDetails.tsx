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
import {plural} from 'src/utils/plural';

import {LoanConditions} from './LoanConditions';
import s from './LoanDetails.scss';
import {LoanDocuments} from './LoanDocuments';

export declare namespace LoanDetails {
  export type Props = {
    loan: Borrower.LoanDetails
  };
}

enum translateRepaymentType {
  classical = 'Дифференцированный',
  annuity = 'Аннуитентный'
}

const translateLoanStatus = {
  [LoanModerationStatus.new]: 'Новая',
  [LoanModerationStatus.moderating]: 'На модерации',
  [LoanModerationStatus.declined]: 'Отклонена',
  [LoanModerationStatus.wait_activate]: 'Ожидает активации',
  [LoanModerationStatus.completed]: 'Завершена',
  [LoanModerationStatus.canceled]: 'Отменена',
  [LoanModerationStatus.filled]: 'Новая',
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
        <div className={s.amount}>{ loan.amount } ₽</div>
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
        <Fragment>
          <div className={s.title}>
            { user?.roles.includes(Role.ur) ? (
              'Данные юридического лица'
            ) : null }
            { user?.roles.includes(Role.ip) ? (
              '   Данные индивидуального предпринимателя'
            ) : null }
          </div>
          <Table dense={true} className={s.borrowerSection}>
            <tbody>
              <tr>
                <td style={{width: '29%'}}>Наименование:</td>
                <td><b>{ loan.borrower.name }</b></td>
              </tr>
              <tr>
                <td style={{width: '29%'}}>ИНН:</td>
                <td>{ loan.borrower.inn }</td>
              </tr>
              <tr>
                <td style={{width: '29%'}}>ОРГН / Дата присвоения:</td>
                <td>
                  { loan.borrower.ogrn } &nbsp;/&nbsp;&nbsp;
                  { loan.borrower.date_issue_ogrn ? (
                    formatDate(new Date(loan.borrower.date_issue_ogrn))
                  ) : null }
                </td>
              </tr>
            </tbody>
          </Table>
          { loan.founders && loan.founders.length ? (
            <Fragment>
              <div className={s.title}>Учредители и доли владения (%)</div>
              <Table className={s.borrowerSection}>
                <tbody>
                  { loan.founders.map((founder, index) => {
                    <tr key={index}>
                      <td>{ founder.name }</td>
                      <td className='text-end'>{ founder.percent }%</td>
                    </tr>;
                  }) }
                </tbody>
              </Table>
            </Fragment>
          ) : null }
          { loan.borrower.okved ? (
            <div className={s.title}>Деятельность</div>
          ) : null }
        </Fragment>
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
