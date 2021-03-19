import cx from 'classnames';
import React, {useMemo} from 'react';

import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';

import {AccountInfo} from 'src/components/pages/BorrowerPage/AccountInfo';
import s from './BorrowerPage.scss';
import {useRecoilValue} from 'recoil';
import { userAtom } from 'src/recoil/userAtom';
import { CompanyBrief } from './CompanyBrief';
import { Loans } from './Loans';

export declare namespace BorrowerPage {
}

export const BorrowerPage = withAuth(() => {
  const {user} = useRecoilValue(userAtom);
  const company = user?.company;

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
        <div className='container'>
          <div className={s.content}>
            <section className={s.section}>
              <Text size={TextSize.h2}>Счет</Text>
              <div className={s.accountNum}>№586920</div>
              <AccountInfo />
            </section>
            {company ? (
              <section className={s.section}>
                <Text size={TextSize.h2} className={s.sectionTitle}>Моя компания</Text>
                <CompanyBrief company={company} />
              </section>
            ) : null }
            <section className={s.section}>
              <Text size={TextSize.h2} className={s.sectionTitle}>Займы</Text>
              <Loans />
            </section>
          </div>
        </div>
      </div>
    </Page>
  );
});
