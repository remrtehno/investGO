import React, {useEffect, useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {useGetLoans} from 'src/api/borrowerApi/useGetLoansApi';
import { useGetProjectApi } from 'src/api/projectApi/useGetProjectApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Account} from 'src/components/pages/BorrowerPage/Account';
import {Text, TextSize} from 'src/components/ui/Text';
import {borrowerLoansAtom} from 'src/recoil/borrowerLoansAtom';
import {userAtom} from 'src/recoil/userAtom';

import s from './BorrowerPage.scss';
import {CompanyBrief} from './CompanyBrief';
import {Loans} from './Loans';

export declare namespace BorrowerPage {
}

export const BorrowerPage = withAuth(() => {
  const {user} = useRecoilValue(userAtom);
  const company = user?.company;
  const [, getLoans] = useGetLoans();
  const {loans} = useRecoilValue(borrowerLoansAtom);
  const [project, getProject, getProjectState] = useGetProjectApi();

  useEffect(() => {
    getLoans(null);
  }, []);

  useEffect(() => {
    getProject(null);
  }, []);

  const menuItems = useMemo(() => {
    return (
      [
        {
          to: RoutePaths.borrowerDashboard,
          text: 'Портфель',
        },
        {
          to: RoutePaths.borrowerLoanRequests,
          text: 'Мои заявки',
        },
        {
          to: RoutePaths.home,
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
              <Account />
            </section>
            { company ? (
              <section className={s.section}>
                <Text size={TextSize.h2} className={s.sectionTitle}>Моя компания</Text>
                <CompanyBrief company={company} />
              </section>
            ) : null }
            { loans && loans.length ? (
              <section className={s.section}>
                <Text size={TextSize.h2} className={s.sectionTitle}>Займы</Text>
                <Loans />
              </section>
            ) : null }
          </div>
        </div>
      </div>
    </Page>
  );
});
