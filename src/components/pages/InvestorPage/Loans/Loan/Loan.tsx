import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {TabsContent} from 'src/components/pages/AboutUs/TabsContent';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {DropDownIcon} from 'src/icons/DropDownIcon';
import {LoanStatusTranslation} from 'src/translations/LoanStatusTranslation';
import type {Borrower} from 'src/types/Borrower';
import {plural} from 'src/utils/plural';

import s from './Loan.scss';
import { LoanDocuments } from './LoanDocuments';
import { LoanEvents } from './LoanEvents';
import {PaymentSchedule} from './PaymentSchedule';

declare namespace Loan {
  export type Props = {
    loan: Borrower.Loan,
  }
}

const tabs = [
  {id: '1', label: 'Выплаты'},
  {id: '2', label: 'Документы'},
  {id: '3', label: 'События'},
];

export const Loan: FC<Loan.Props> = (props) => {
  const {loan} = props;
  const [isOpened, setIsOpened] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  function toggle() {
    setIsOpened(!isOpened);
  }

  return (
    <div className={cx(s.loan, isOpened && s.opened)}>
      <div className={cx('row', 'align-items-center', s.row)}>
        <div className='col-3'>
          <i className={s.projectImg} />
          { loan?.company?.name || 'ООО Завод ЖБИ' }
        </div>
        <div className='col-1'><Link to='/'>{ loan.num }</Link></div>
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

      <TransitionGroup>
        { isOpened ? (
          <CSSTransition timeout={400} classNames='loan-details-transition'>
            <div className={cx('row', s.details)}>
              <div className={s.detailsInner}>
                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  viewType='about-boroow'
                />
                { activeTab === '1' ? (
                  <div>
                    <PaymentSchedule />
                  </div>
                ) : null }
                { activeTab === '2' ? (
                  <LoanDocuments />
                ) : null }
                { activeTab === '3' ? (
                  <LoanEvents />
                ) : null }
              </div>
            </div>
          </CSSTransition>
        ) : null }
      </TransitionGroup>
    </div>
  );
};
