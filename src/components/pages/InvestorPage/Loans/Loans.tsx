import cx from 'classnames';
import type {FC} from 'react';
import React, {useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import type {useGetPortfolioProjects} from 'src/api/investorApi/useGetPortfolioProjectsApi';
import {investorLoansAtom} from 'src/recoil/investorLoansAtom';

import {Loan} from './Loan/Loan';

import s from './Loans.scss';

declare namespace Loans {
  export type Props = {
    projects: useGetPortfolioProjects.Response,
  }
}

export const Loans: FC<Loans.Props> = (props) => {
  const {loans} = useRecoilValue(investorLoansAtom);
  const [showAll, setShowAll] = useState(false);
  const loansToShow = 5;
  const projects = props.projects;

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
          <div className='col-3'>Компания</div>
          <div className='col-1'>Заявка</div>
          <div className='col-2'>Инвестиции</div>
          <div className='col-1'>Ставка</div>
          <div className='col-2'>Начислено %</div>
          <div className='col-1'>Срок</div>
          <div className='col-2'>Статус</div>
        </div>
      </div>
      <div className={s.body}>
        { projects.map((project, index) => {
          if (showAll && index > loansToShow - 1) {
            return null;
          }

          const loan = loans?.filter((loan) => {
            return project.loan_request_id === loan.id;
          });

          return (
            <Loan loan={loan} project={project} key={index} />
          );
        }) }
      </div>
      { loans.length > loansToShow ? (
        <div className={s.showAll} onClick={toggleShowAll}>Все займы</div>
      ) : null }
    </div>
  );
};
