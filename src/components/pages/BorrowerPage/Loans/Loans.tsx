import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';

import {borrowerLoansAtom} from 'src/recoil/borrowerLoansAtom';

import {Loan} from './Loan/Loan';

import s from './Loans.scss';

declare namespace Loans {
  export type Props = {
  }
}

export const Loans: FC<Loans.Props> = (props) => {
  const {loans} = useRecoilValue(borrowerLoansAtom);
  const [showAll, setShowAll] = useState(false);
  const loansToShow = 5;

  function toggleShowAll() {
    setShowAll(!showAll);
  }

  if (!loans) {
    return null;
  }

  return (
    <div className={s.loans}>
      <div className={s.header}>
        <div className={cx('row', 'align-items-center', s.headerRow)}>
          <div className='col-1'>№ заявки</div>
          <div className='col-2'>Сумма + %</div>
          <div className='col-2'>Срок до</div>
          <div className='col-2'>Выплачено</div>
          <div className='col-2'>Ближайший платеж</div>
          <div className='col-2'>Статус</div>
        </div>
      </div>
      <div className={s.body}>
        { loans.map((loan, index) => {
          if (showAll && index > loansToShow - 1) {
            return null;
          }

          return (
            <Loan loan={loan} key={index} />
          );
        }) }
      </div>
      { loans.length > loansToShow ? (
        <div className={s.showAll} onClick={toggleShowAll}>Все займы</div>
      ) : null }
    </div>
  );
};
