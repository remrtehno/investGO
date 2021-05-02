import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useRecoilValue} from 'recoil';

import {useGetLoan} from 'src/api/borrowerApi/useGetLoanApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextWeight} from 'src/components/ui/Text/Text';

import { LoanDetails } from './LoanDetails';

import s from './LoanRequestPage.scss';

export declare namespace LoanRequestPage {
}

const menuItems = () => {
  return (
    [
      {
        to: RoutePaths.borrowerDashboard,
        text: 'Портфель',
      },
      {
        to: RoutePaths.investorDashboard,
        text: 'Мои заявки',
      },
      {
        to: RoutePaths.investorDashboard,
        text: 'Транзакции',
      },
    ]
  );
};

export const LoanRequestPage = withAuth(() => {
  const {loanId} = useParams() as {loanId: string};
  const [loan, getLoan, getLoanState] = useGetLoan(loanId);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLoan(null);
  }, []);

  useEffect(() => {
    setError(getLoanState.error);
  }, [getLoanState.error]);

  return (
    <Page>
      <div className={s.loanRequestPage}>
        <TopMenu items={menuItems()} />
        <div className='container'>
          { loan ? (
            <div className={s.content}>
              <div className={s.header}>Заявка #{ loan?.num }</div>
              <LoanDetails loan={loan} />
            </div>
          ) : null }
          { error ? (
            <div className={s.content}>
              <div className={s.header}>Заявка не найдена</div>
            </div>
          ) : null }
        </div>
      </div>
    </Page>
  );
});
