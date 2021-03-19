import type {FC} from 'react';
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

declare namespace Loans {
  export type Props = {
  }
}

export const Loans: FC<Loans.Props> = (props) => {
  return (
    <div className={cx(s.loans)}>
      <div className={cx(s.header)}>
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
        <div className={cx('row', 'align-items-center', s.row)}>
          <div className='col-1'>57689</div>
          <div className='col-2'>
            <span className={s.mainSum}>50 000.00₽</span>
            + 7 500.00₽
          </div>
          <div className='col-2'>21.11.20</div>
          <div className='col-2'>0.00₽</div>
          <div className='col-2'>
            <i className={s.icon}><CalendarDateIcon /></i>
            5 000.00 ₽
          </div>
          <div className='col-2'>Просрочен</div>
          <i className={s.openBtn}><DropDownIcon /></i>
        </div>
      </div>
    </div>
  )
}