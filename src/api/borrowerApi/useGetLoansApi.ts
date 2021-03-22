import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {loansAtom} from 'src/recoil/loansAtom';
import {RequestStatus} from 'src/types/common';

export const useGetLoans = () => {
  const request = useApiRequest();
  const [, setLoans] = useRecoilState(loansAtom);

  return useApi(async() => {
    const loans = await request(api.borrower.loanRequest(), {
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
