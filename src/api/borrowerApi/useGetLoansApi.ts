import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {borrowerLoansAtom} from 'src/recoil/borrowerLoansAtom';
import { Borrower } from 'src/types/Borrower';
import {RequestStatus} from 'src/types/common';

export declare namespace useGetLoans {
  export type Response = Borrower.Loans
}

export const useGetLoans = () => {
  const request = useApiRequest();
  const [, setLoans] = useRecoilState(borrowerLoansAtom);

  return useApi(async() => {
    const loans = await request<useGetLoans.Response>(api.borrower.getLoans(), {
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
