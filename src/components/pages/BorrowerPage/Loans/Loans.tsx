import {FC, useEffect} from 'react';
import React, {useRef, useState} from 'react';
import cx from 'classnames';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {KebabMenuIcon} from 'src/icons/KebabMenuIcon';
import type {User} from 'src/types/User';

import s from './Loans.scss';
import { CalendarDateIcon } from 'src/icons/CalendarDateIcon';
import { DropDownIcon } from 'src/icons/DropDownIcon';
import { useGetLoans } from 'src/api/borrowerApi/useGetLoansApi';
import { useRecoilValue } from 'recoil';
import { loansAtom } from 'src/recoil/loansAtom';
import { formatDate } from 'src/utils/formatDate';

declare namespace Loans {
  export type Props = {
  }
}

export const Loans: FC<Loans.Props> = (props) => {
  const {loans} = useRecoilValue(loansAtom);

  console.log(loans)

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
        {loans.map((loan, index) => {
          return (
            <div className={cx('row', 'align-items-center', s.row)} key={index}>
              <div className='col-1'>{loan.num}</div>
              <div className='col-2'>
                <span className={s.mainSum}>{loan.amount} ₽</span>
                + 7 500.00₽
              </div>
              <div className='col-2'>{formatDate(new Date(loan.collection_start_at))}</div>
              <div className='col-2'>0.00 ₽</div>
              <div className='col-2'>
                <i className={s.icon}><CalendarDateIcon /></i>
                5 000.00 ₽
              </div>
              <div className='col-2'>{loan.status}</div>
              <i className={s.openBtn}><DropDownIcon /></i>
            </div>
          )
        })}
      </div>
    </div>
  )
}