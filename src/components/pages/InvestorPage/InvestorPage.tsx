import React, {useEffect, useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {useGetInvestorLoans} from 'src/api/investorApi/useGetInvestorLoansApi';
import { useGetInvestorPortfolio } from 'src/api/investorApi/useGetInvestorPortfolioApi';
import { useGetPortfolioProjects } from 'src/api/investorApi/useGetPortfolioProjectsApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Account} from 'src/components/pages/InvestorPage/Account';
import {Text, TextSize} from 'src/components/ui/Text';
import {investorLoansAtom} from 'src/recoil/investorLoansAtom';
import { investorPortfolioAtom } from 'src/recoil/investorPortfolioAtom';

import s from './InvestorPage.scss';
import {InvestorStats} from './InvestorStats';
import {Loans} from './Loans';

export declare namespace InvestorPage {
}

export const InvestorPage = withAuth(() => {
  const [, getLoans] = useGetInvestorLoans();
  const {loans} = useRecoilValue(investorLoansAtom);
  const [, getPortfolio] = useGetInvestorPortfolio();
  const {portfolio} = useRecoilValue(investorPortfolioAtom);
  const [portfolioProjects, getPortfolioProjects] = useGetPortfolioProjects();

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

  useEffect(() => {
    getLoans(null);
  }, []);

  useEffect(() => {
    getPortfolio(null);
  }, []);

  useEffect(() => {
    getPortfolioProjects(null);
  }, []);

  return (
    <Page>
      <div className={s.investorPage}>
        <TopMenu items={menuItems} />
        <div className='container'>
          <div className={s.content}>
            <section className={s.section}>
              <Text size={TextSize.h2}>Ваш счет инвестора</Text>
              <div className={s.accountNum}>№586920</div>
              <Account portfolio={portfolio} />
            </section>
            <section className={s.section}>
              <Text size={TextSize.h2} className={s.sectionTitle}>Статистика</Text>
              <InvestorStats portfolio={portfolio} />
            </section>
            { loans && loans.length ? (
              <section className={s.section}>
                <Text size={TextSize.h2} className={s.sectionTitle}>
                  Список инвестируемых проектов
                </Text>
                <Loans projects={portfolioProjects} />
              </section>
            ) : null }
          </div>
        </div>
      </div>
    </Page>
  );
});
