import React from 'react';

import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';

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
  return (
    <Page>
      <div className={s.loanRequestPage}>
        <TopMenu items={menuItems()} />
        <div className='container'>
          <div className={s.content}>
            <Text size={TextSize.h3} className={s.header}>Заявка #</Text>
          </div>
        </div>
      </div>
    </Page>
  );
});
