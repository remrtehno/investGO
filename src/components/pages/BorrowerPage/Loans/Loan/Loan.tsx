import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';
import {Link} from 'react-router-dom';

import {RoutePaths} from 'src/components/common/App/routes';
import {CalendarDateIcon} from 'src/icons/CalendarDateIcon';
import {DropDownIcon} from 'src/icons/DropDownIcon';
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
    <Link to={RoutePaths.loanRequest(loan.loan_request_id)} className={s.link}>
      <span className={cx('row', 'align-items-center', s.row)}>
        <span className='col-1'>{ loan.loan_request_id }</span>
        <span className='col-2'>
          <span className={s.mainSum}>{ loan.amount } ₽</span>
          { loan.amount_percent }
        </span>
        <span className='col-2'>{ formatDate(new Date(loan.end_date)) }</span>
        <span className='col-2'>&mdash;</span>
        <span className='col-2'>
          <i className={s.icon}><CalendarDateIcon /></i>
          5 000.00 ₽
        </span>
        <span className='col-2'>
          { loan.status }
        </span>
        <i className={s.openBtn}><DropDownIcon /></i>
      </span>
    </Link>
  );
};
