import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {Borrower} from 'src/types/Borrower';

export declare namespace useGetLoan {
  export type Response = Borrower.LoanDetails
}

export const useGetLoan = (loanId: string) => {
  const request = useApiRequest();

  return useApi(async() => {
    const loan = await request<useGetLoan.Response>(api.investor.getLoanRequest(loanId), {
      method: 'GET',
    });

    return loan;
  }, null);
};
