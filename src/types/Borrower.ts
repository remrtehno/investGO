import type {User} from './User';

export declare namespace Borrower {
  export type Loans = [
    {
      amount: number,
      collection_start_at: string,
      company: User.Company,
      created_at: string,
      description: string,
      documents: [],
      id: string,
      is_buy_rights: true,
      is_send_to_investors: true,
      min_amount: number,
      min_investment_size: number,
      num: number,
      publish_before_at: string,
      rate: number,
      repayment_limit_month: number,
      repayment_schedule: string,
      repayment_type: string,
      status: string,
      target: string,
      term_limit: number,
      updated_at: string,
      user_id: string
    }
  ]
}
