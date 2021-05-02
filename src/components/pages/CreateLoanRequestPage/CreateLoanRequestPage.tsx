import React from 'react';

import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {PageTitle} from 'src/components/common/Page/PageTitle';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './CreateLoanRequestPage.scss';
import {LoanRequestForm} from './LoanRequestForm';

export declare namespace CreateLoanRequestPage {
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

export const CreateLoanRequestPage = withAuth(() => {
  return (
    <Page>
      <div className={s.createLoanRequestPage}>
        <TopMenu items={menuItems()} />
        <PageTitle>Новая заявка на привлечение инвестиций</PageTitle>
        <div className='container'>
          <div className={s.content}>
            <Text size={TextSize.h3} className={s.header}>Параметры займа</Text>
            <LoanRequestForm />
          </div>
        </div>
      </div>
    </Page>
  );
});
