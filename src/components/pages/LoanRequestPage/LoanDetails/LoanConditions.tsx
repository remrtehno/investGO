import type {FC} from 'react';
import {Fragment} from 'react';
import React, {useEffect, useState} from 'react';

import {Table} from 'src/components/common/Table';
import type {Borrower} from 'src/types/Borrower';
import {formatDate} from 'src/utils/formatDate';
import {plural} from 'src/utils/plural';

import s from './LoanDetails.scss';
import { formatNumber } from 'src/utils/formatNumber';

export declare namespace LoanConditions {
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
  annuity = 'Аннуитетный'
}

export const LoanConditions: FC<LoanConditions.Props> = (props) => {
  const {loan} = props;

  function getCollectionEnd() {
    const startDate = new Date(loan.collection_start_at);
    const days = startDate.getDate() + loan.term_limit - 1;
    startDate.setDate(days);
    return startDate;
  }

  return (
    <Fragment>
      <Table className={s.table}>
        <tbody>
          <tr>
            <td>Период сбора</td>
            <td className='text-end'>
              { formatDate(new Date(loan.collection_start_at)) } – { formatDate(getCollectionEnd()) }
            </td>
          </tr>
          <tr>
            <td>Минимальный объем инвестиций</td>
            <td className='text-end'>{ formatNumber(loan.min_investment_size) }₽</td>
          </tr>
          <tr>
            <td>Максимальный объем инвестиций</td>
            <td className='text-end'>{ formatNumber(loan.amount) }₽</td>
          </tr>
          <tr>
            <td>Минимальная сумма инвестиции</td>
            <td className='text-end'>{ formatNumber(loan.min_amount) }₽</td>
          </tr>
          <tr>
            <td>Срок действия предложения</td>
            <td className='text-end'>
              { loan.term_limit } { plural(loan.term_limit, ['день', 'дня', 'дней']) }
            </td>
          </tr>
          <tr>
            <td>Ставка</td>
            <td className='text-end'>{ loan.rate }%</td>
          </tr>
          <tr>
            <td>Срок погашения займа</td>
            <td className='text-end'>
              {
                `до ${loan.repayment_limit_month} 
                  ${plural(loan.repayment_limit_month, ['месяца', 'месяцев', 'месяцев'])}`
              }
            </td>
          </tr>
          <tr>
            <td>График погашения</td>
            <td className='text-end'>
              { translateRepaymentShedule[loan.repayment_schedule] }
            </td>
          </tr>
          <tr>
            <td>Тип погашения</td>
            <td className='text-end'>
              { translateRepaymentType[loan.repayment_type] }
            </td>
          </tr>
        </tbody>
      </Table>
      <div className={s.target}>
        <div className={s.targetLabel}>Цель займа</div>
        <div className={s.targetText}>{ loan.target }</div>
      </div>
    </Fragment>
  );
};
