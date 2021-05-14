import React, {useEffect, useMemo, useState} from 'react';
import { useParams } from 'react-router';
import {useRecoilValue} from 'recoil';

import {useGetInvestorLoans} from 'src/api/investorApi/useGetInvestorLoansApi';
import { useGetLoan } from 'src/api/investorApi/useGetLoanApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';
import { TextWeight } from 'src/components/ui/Text/Text';
import {investorLoansAtom} from 'src/recoil/investorLoansAtom';

import s from './InvestOfferPage.scss';
import { OfferDetails } from './OfferDetails';

export declare namespace InvestOfferPage {
}

export const InvestOfferPage = withAuth(() => {
  const {loanId} = useParams() as {loanId: string};
  const [loan, getLoan, getLoanState] = useGetLoan(loanId);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLoan(null);
  }, []);

  useEffect(() => {
    setError(getLoanState.error);
  }, [getLoanState.error]);

  const menuItems = useMemo(() => {
    return (
      [
        {
          to: RoutePaths.investorDashboard,
          text: 'Портфель',
        },
        {
          to: RoutePaths.projects,
          text: 'Предложения',
        },
        {
          to: RoutePaths.home,
          text: 'Транзакции',
        },
      ]
    );
  }, []);

  return (
    <Page>
      <div className={s.investOfferPage}>
        <TopMenu items={menuItems} />
        <div className='container'>
          { loan ? (
            <div className={s.content}>
              <div className={s.preview}>
                <div className={s.logo} />
                <div className={s.desc}>
                  <Text size={TextSize.headLine1}>
                    { loan.borrower.name }
                  </Text>
                  <Text size={TextSize.tabMenu} weight={TextWeight.semibold} className={s.description}>
                    { loan.description }
                  </Text>
                </div>
              </div>
              <OfferDetails loan={loan} />
            </div>
          ) : null }
          { error ? (
            <div className={s.content}>
              <div className={s.header}>Предложение не найдено</div>
            </div>
          ) : null }
        </div>
      </div>
    </Page>
  );
});
