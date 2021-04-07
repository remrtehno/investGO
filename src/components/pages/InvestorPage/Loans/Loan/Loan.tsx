import cx from 'classnames';
import {FC, useState} from 'react';
import React from 'react';

import {DropDownIcon} from 'src/icons/DropDownIcon';
import {LoanStatusTranslation} from 'src/translations/LoanStatusTranslation';
import type {Borrower} from 'src/types/Borrower';
import {plural} from 'src/utils/plural';

import s from './Loan.scss';

declare namespace Loan {
  export type Props = {
    loan: Borrower.Loan,
  }
}

export const Loan: FC<Loan.Props> = (props) => {
  const {loan} = props;
  const [isOpened, setIsOpened] = useState(false)

  function toggle() {
    setIsOpened(!isOpened);
  }

  return (
    <div className={s.loan}>
      <div className={cx('row', 'align-items-center', s.row)}>
        <div className='col-3'>
          <i className={s.projectImg} />
          { loan?.company?.name || 'ООО Завод ЖБИ' }
        </div>
        <div className='col-1'>{ loan.num }</div>
        <div className='col-2'>
          <span className={s.mainSum}>{ loan.amount } ₽</span>
        </div>
        <div className='col-1'>{ loan.rate }%</div>
        <div className='col-2'>12 500 ₽</div>
        <div className='col-1'>
          { loan.term_limit } { plural(loan.term_limit, ['день', 'дня', 'дней']) }
        </div>
        <div className='col-2'>{ LoanStatusTranslation[loan.status] }</div>
        <i className={s.openBtn} onClick={toggle}><DropDownIcon /></i>
      </div>
    </div>
  );
};
