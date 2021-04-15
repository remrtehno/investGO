
import React, {useEffect, useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import cx from 'classnames';

import {useGetLoans} from 'src/api/borrowerApi/useGetLoansApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import { PageTitle } from 'src/components/common/Page/PageTitle';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import { Text, TextSize } from 'src/components/ui/Text';
import {borrowerLoansAtom} from 'src/recoil/borrowerLoansAtom';
import {userAtom} from 'src/recoil/userAtom';
import { CompanyEditForm } from './CompanyEditForm';

import s from './CompanyEditPage.scss';

export declare namespace CompanyEditPage {
}

export const CompanyEditPage = withAuth(() => {
  const {user} = useRecoilValue(userAtom);
  const company = user?.company;
  const [, getLoans] = useGetLoans();
  const {loans} = useRecoilValue(borrowerLoansAtom);

  /*
   * useEffect(() => {
   *   getLoans(null);
   * }, []);
   */

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
