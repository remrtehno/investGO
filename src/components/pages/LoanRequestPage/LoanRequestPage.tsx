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
import {userAtom} from 'src/recoil/userAtom';

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
  const {user} = useRecoilValue(userAtom);
  const company = user?.company;

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
              <div className={s.loan}>
                <div className={s.preview}>
                  <div className={s.logo} />
                  <div className={s.desc}>
                    <Text size={TextSize.body2} weight={TextWeight.semibold}>
                      { company?.name }
                    </Text>
                    <div className={s.description}>
                      { loan.description }
                    </div>
                  </div>
                </div>
                <div className={s.stats}>
                  <div className={s.amount}>{ loan.amount } ₽</div>
                </div>
              </div>
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
