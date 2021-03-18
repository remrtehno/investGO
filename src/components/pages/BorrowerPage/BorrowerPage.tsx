import React, {useMemo} from 'react';

import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';

import s from './BorrowerPage.scss';

export declare namespace BorrowerPage {
}

export const BorrowerPage = withAuth(() => {
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
      <div className={s.borrowerPage}>
        <TopMenu items={menuItems} />
      </div>
    </Page>
  );
});
