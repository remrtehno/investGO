import React, {useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import {useGetLoanRequests} from 'src/api/borrowerApi/useGetLoanRequestsApi';
import {RoutePaths} from 'src/components/common/App/routes';
import {Page} from 'src/components/common/Page';
import {Table} from 'src/components/common/Table';
import {TopMenu} from 'src/components/common/TopMenu';
import {withAuth} from 'src/components/hocs/withAuth';
import {Text, TextSize} from 'src/components/ui/Text';
import {borrowerLoansAtom} from 'src/recoil/borrowerLoansAtom';
import {userAtom} from 'src/recoil/userAtom';
import {LoanRequestStatusTranslation} from 'src/translations/LoanRequestStatusTranslation';
import {formatDate} from 'src/utils/formatDate';
import {plural} from 'src/utils/plural';

import s from './BorrowerLoanRequestsPage.scss';

export declare namespace BorrowerLoanRequestsPage {
}

export const BorrowerLoanRequestsPage = withAuth(() => {
  const {user} = useRecoilValue(userAtom);
  const [loanRequests, getLoanRequests, getLoanRequestsState] = useGetLoanRequests();

  useEffect(() => {
    getLoanRequests(null);
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
      <div className={s.BorrowerLoanRequestsPage}>
        <TopMenu items={menuItems} />
        <div className='container'>
          <div className={s.content}>
            <Text size={TextSize.h4}>Мои заявки</Text>
            { loanRequests && loanRequests.length ? (
              <div className={s.section}>
                <Table>
                  <thead>
                    <tr>
                      <th>Заявка</th>
                      <th>Начало</th>
                      <th>Ставка</th>
                      <th>Срок</th>
                      <th>Сумма</th>
                      <th>Собрано</th>
                      <th>Инвесторов</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    { loanRequests.map((loanRequest, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Link to={RoutePaths.loanRequest(loanRequest.id)} className={s.link}>
                              { loanRequest.num }
                            </Link>
                          </td>
                          <td>
                            { formatDate(new Date(loanRequest.collection_start_at)) }
                          </td>
                          <td>
                            { loanRequest.rate }%
                          </td>
                          <td>
                            { loanRequest.term_limit } { plural(loanRequest.term_limit, ['день', 'дня', 'дней']) }
                          </td>
                          <td>
                            { loanRequest.amount }
                          </td>
                          <td>
                            -
                          </td>
                          <td>
                            0
                          </td>
                          <td>
                            { LoanRequestStatusTranslation[loanRequest.status] }
                          </td>
                        </tr>
                      );
                    }) }
                  </tbody>
                </Table>
              </div>
            ) : null }
          </div>
        </div>
      </div>
    </Page>
  );
});
