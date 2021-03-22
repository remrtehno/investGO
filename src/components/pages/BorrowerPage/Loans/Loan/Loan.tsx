import cx from 'classnames';
import type {FC} from 'react';
import React, {useRef, useState} from 'react';

import {CalendarDateIcon} from 'src/icons/CalendarDateIcon';
import {DropDownIcon} from 'src/icons/DropDownIcon';
import {LoanStatusTranslation} from 'src/translations/LoanStatusTranslation';
import type {Borrower} from 'src/types/Borrower';
import {formatDate} from 'src/utils/formatDate';

import s from './Loan.scss';

declare namespace Loan {
  export type Props = {
    loan: Borrower.Loan,
  }
}

export const Loan: FC<Loan.Props> = (props) => {
  const {loan} = props;

  return (
    <div className={cx('row', 'align-items-center', s.row)}>
      <div className='col-1'>{ loan.num }</div>
      <div className='col-2'>
        <span className={s.mainSum}>{ loan.amount } ₽</span>
        + 7 500.00₽
      </div>
      <div className='col-2'>{ formatDate(new Date(loan.collection_start_at)) }</div>
      <div className='col-2'>0.00 ₽</div>
      <div className='col-2'>
        <i className={s.icon}><CalendarDateIcon /></i>
        5 000.00 ₽
      </div>
      <div className='col-2'>{ LoanStatusTranslation[loan.status] }</div>
      <i className={s.openBtn}><DropDownIcon /></i>
    </div>
  );
};
