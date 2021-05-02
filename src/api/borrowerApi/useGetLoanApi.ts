import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {borrowerLoansAtom} from 'src/recoil/borrowerLoansAtom';
import type {Borrower} from 'src/types/Borrower';
import {RequestStatus} from 'src/types/common';

export declare namespace useGetLoan {
  export type Response = Borrower.LoanDetails
}

export const useGetLoan = (loanId: string) => {
  const request = useApiRequest();

  return useApi(async() => {
    const loan = await request<useGetLoan.Response>(api.borrower.getLoanRequest(loanId), {
      method: 'GET',
    });

    return loan;
  }, null);
};
