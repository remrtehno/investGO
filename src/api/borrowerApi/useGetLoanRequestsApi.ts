import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {Borrower} from 'src/types/Borrower';
import {RequestStatus} from 'src/types/common';

export declare namespace useGetLoanRequests {
  export type Response = Borrower.LoanRequests
}

export const useGetLoanRequests = () => {
  const request = useApiRequest();

  return useApi(async() => {
    const loanRequests = await request<useGetLoanRequests.Response>(api.borrower.getLoanRequests(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return loanRequests;
  }, null);
};
