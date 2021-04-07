import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {investorLoansAtom} from 'src/recoil/investorLoansAtom';
import {RequestStatus} from 'src/types/common';

export const useGetInvestorLoans = () => {
  const request = useApiRequest();
  const [, setLoans] = useRecoilState(investorLoansAtom);

  return useApi(async() => {
    const loans = await request(api.investor.loanRequest(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setLoans({
      loans,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};
