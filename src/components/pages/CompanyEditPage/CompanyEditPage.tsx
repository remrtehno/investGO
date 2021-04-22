
import cx from 'classnames';
import React, {useMemo} from 'react';

import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {PageTitle} from 'src/components/common/Page/PageTitle';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';

import {CompanyEditForm} from './CompanyEditForm';
import s from './CompanyEditPage.scss';

export declare namespace CompanyEditPage {
}

export const CompanyEditPage = withAuth(() => {
  const menuItems = useMemo(() => {
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
  }, [RoutePaths]);

  return (
    <Page>
      <div className={s.companyEditPage}>
        <TopMenu items={menuItems} />
        <PageTitle>Данные компании</PageTitle>
        <div className={cx('container', s.container)}>
          <Text size={TextSize.headLine1} className={s.header}>Компания</Text>
          <CompanyEditForm />
        </div>
      </div>
    </Page>
  );
});
