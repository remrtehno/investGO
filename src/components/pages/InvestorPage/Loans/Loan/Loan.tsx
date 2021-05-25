import cx from 'classnames';
import type {FC} from 'react';
import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import type {useGetPortfolioProjects} from 'src/api/investorApi/useGetPortfolioProjectsApi';
import { RoutePaths } from 'src/components/common/App/routes';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {adaptiveBreackpoints} from 'src/contstants/adaptiveBreackpoints';
import {DropDownIcon} from 'src/icons/DropDownIcon';
import {InvestorLoanStatusTranslation} from 'src/translations/InvestorLoanStatusTranslation';
import type {Borrower} from 'src/types/Borrower';
import {breackpointDown} from 'src/utils/breackpointUtils';
import {plural} from 'src/utils/plural';

import s from './Loan.scss';
import {LoanDocuments} from './LoanDocuments';
import {LoanEvents} from './LoanEvents';
import {PaymentSchedule} from './PaymentSchedule';
import {PaymentTimeline} from './PaymentTimeline';

declare namespace Loan {
  export type Props = {
    loan: Borrower.Loan,
    project: useGetPortfolioProjects.PortfolioProject
  }
}

const tabs = [
  {id: '1', label: 'Выплаты'},
  {id: '2', label: 'Документы'},
  {id: '3', label: 'События'},
];

export const Loan: FC<Loan.Props> = (props) => {
  const {loan} = props;
  const {project} = props;
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  function toggle() {
    setIsOpened(!isOpened);
  }

  return (
    <div className={cx(s.loan, isOpened && s.opened)}>
      <div className={cx('row', 'align-items-center', s.row)}>
        <div className='col-11 col-md-3'>
          { project?.company_name }
        </div>
        <div className='col-1 d-none d-md-block d-lg-block d-xl-block d-xxl-block'>
          <Link to={RoutePaths.investOffer(project.loan_request_id)}>{ project.loan_request_num }</Link>
        </div>
        <div className='col-2 d-none d-md-block d-lg-block d-xl-block d-xxl-block'>
          <span className={s.mainSum}>{ project.invest_amount } ₽</span>
        </div>
        <div className='col-1 d-none d-md-block d-lg-block d-xl-block d-xxl-block'>
          { project.rate }%
        </div>
        <div className='col-2 d-none d-md-block d-lg-block d-xl-block d-xxl-block'>
          { props.project && props.project.accrued_amount ? props.project.accrued_amount : '0' } ₽
        </div>
        <div className='col-1 d-none d-md-block d-lg-block d-xl-block d-xxl-block'>
          { project.term } { plural(project.term, ['день', 'дня', 'дней']) }
        </div>
        <div className='col-2 d-none d-md-block d-lg-block d-xl-block d-xxl-block'>
          { InvestorLoanStatusTranslation[project.status] }
        </div>
        <i className={s.openBtn} onClick={toggle}><DropDownIcon /></i>
      </div>

      <TransitionGroup>
        { isOpened ? (
          <CSSTransition timeout={400} classNames='loan-details-transition'>
            <div className={cx('row', s.details)}>
              <div className={s.detailsInner}>
                { breackpointDown(adaptiveBreackpoints.md) ? (
                  <div className={s.fields}>
                    <div className={s.field}>
                      <div className={s.fieldLabel}>Заявка</div>
                      <div className={s.fieldValue}>{ project.loan_request_num }</div>
                    </div>
                    <div className={s.field}>
                      <div className={s.fieldLabel}>Инвестиции</div>
                      <div className={s.fieldValue}>{ project.invest_amount } ₽</div>
                    </div>
                    <div className={s.field}>
                      <div className={s.fieldLabel}>Ставка</div>
                      <div className={s.fieldValue}>{ project.rate }%</div>
                    </div>
                    <div className={s.field}>
                      <div className={s.fieldLabel}>Начислено %</div>
                      <div className={s.fieldValue}>{ project.accrued_amount } ₽</div>
                    </div>
                    <div className={s.field}>
                      <div className={s.fieldLabel}>Срок</div>
                      <div className={s.fieldValue}>
                        { project.term } { plural(project.term, ['день', 'дня', 'дней']) }
                      </div>
                    </div>
                    <div className={s.field}>
                      <div className={s.fieldLabel}>Статус</div>
                      <div className={s.fieldValue}>{ InvestorLoanStatusTranslation[project.status] }</div>
                    </div>
                  </div>
                ) : null }
                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  viewType='about-boroow'
                />
                { activeTab === '1' ? (
                  <Fragment>
                    <div className={s.timeline}>
                      <PaymentTimeline />
                    </div>
                    <PaymentSchedule />
                  </Fragment>
                ) : null }
                { activeTab === '2' ? (
                  <div className='row'>
                    <LoanDocuments project={project} />
                  </div>
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
