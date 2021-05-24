import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
// import {borrowerLoanRequestsAtom} from 'src/recoil/borrowerLoanRequestsAtom';
import { Borrower } from 'src/types/Borrower';
import {RequestStatus} from 'src/types/common';

export declare namespace useGetLoanRequests {
  export type Response = Borrower.LoanRequests
}

export const useGetLoanRequests = () => {
  const request = useApiRequest();
  // const [, setLoanRequests] = useRecoilState(borrowerLoanRequestsAtom);

  return useApi(async() => {
    const loanRequests = await request<useGetLoanRequests.Response>(api.borrower.getLoanRequests(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    // setLoanRequests({
    //   loanRequests,
    //   status: RequestStatus.success,
    //   error: null,
    // });

    return loanRequests;
  }, null);
};
