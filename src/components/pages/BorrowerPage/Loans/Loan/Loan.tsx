import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';
import {Link} from 'react-router-dom';

import {RoutePaths} from 'src/components/common/App/routes';
import {CalendarDateIcon} from 'src/icons/CalendarDateIcon';
import {DropDownIcon} from 'src/icons/DropDownIcon';
import {BorrowerLoanStatusTranslation} from 'src/translations/BorrowerLoanStatusTranslation';
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
    <Link to={RoutePaths.loanRequest(loan.id)} className={s.link}>
      <span className={cx('row', 'align-items-center', s.row)}>
        <span className='col-1'>{ loan.num }</span>
        <span className='col-2'>
          <span className={s.mainSum}>{ loan.amount } ₽</span>
          + 7 500.00₽
        </span>
        <span className='col-2'>{ formatDate(new Date(loan.collection_start_at)) }</span>
        <span className='col-2'>0.00 ₽</span>
        <span className='col-2'>
          <i className={s.icon}><CalendarDateIcon /></i>
          5 000.00 ₽
        </span>
        <span className='col-2'>
          { BorrowerLoanStatusTranslation[loan.status] }
        </span>
        <i className={s.openBtn}><DropDownIcon /></i>
      </span>
    </Link>
  );
};
