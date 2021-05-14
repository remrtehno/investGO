import React, {useEffect, useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {useGetInvestorLoans} from 'src/api/investorApi/useGetInvestorLoansApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';
import {investorLoansAtom} from 'src/recoil/investorLoansAtom';

import s from './InvestOfferPage.scss';

export declare namespace InvestOfferPage {
}

export const InvestOfferPage = withAuth(() => {
  const [, getLoans] = useGetInvestorLoans();
  const {loans} = useRecoilValue(investorLoansAtom);

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

  // useEffect(() => {
  //   getLoans(null);
  // }, []);

  return (
    <Page>
      <div className={s.investOfferPage}>
        <TopMenu items={menuItems} />
        <div className='container'>
          <div className={s.content}>
            <div className={s.header}>
            <Text size={TextSize.h2}>!!!</Text>
            </div>
            
          </div>
        </div>
      </div>
    </Page>
  );
});
