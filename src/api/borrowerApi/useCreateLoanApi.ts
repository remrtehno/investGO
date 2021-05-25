import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {Borrower} from 'src/types/Borrower';

export declare namespace useCreateLoan {
  export type Payload = {
    amount?: number,
    collection_start_at?: Date,
    company_id?: string,
    documents?: [{
      id?: string
    }],
    is_buy_rights?: boolean,
    is_send_to_investors?: boolean,
    min_amount?: number,
    min_investment_size?: number,
    rate?: number,
    repayment_limit_month?: number,
    repayment_schedule?: string,
    repayment_type?: string,
    target?: string,
    term_limit?: number
  }

  export type Response = {
    result: Borrower.Loan,
    status: string
  }
}

export const useCreateLoan = () => {
  const request = useApiRequest();

  return useApi<useCreateLoan.Payload, null>(async(payload) => {
    const result = await request<useCreateLoan.Response>(api.borrower.createLoanRequest(), {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return null;
  }, null);
};
