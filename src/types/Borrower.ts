import type {LoanModerationStatus} from 'src/contstants/ModerationStatus';
import { Project } from './Project';

import type {User} from './User';

export declare namespace Borrower {
  export type Loans = Loan[]

  export type Loan = {
    amount: number,
    collection_start_at: string,
    company: User.Company,
    created_at: string,
    description: string,
    documents: [],
    id: string,
    is_buy_rights: boolean,
    is_send_to_investors: true,
    min_amount: number,
    min_investment_size: number,
    num: number,
    publish_before_at: string,
    rate: number,
    repayment_limit_month: number,
    repayment_schedule: string,
    repayment_type: string,
    status: LoanModerationStatus,
    target: string,
    term_limit: number,
    updated_at: string,
    user_id: string
  }

  export type LoanDetails = {
    amount: 0,
    borrower: {
      additional_info: string,
      bank_details: {
        account: string,
        bank_name: string,
        bic: string,
        company_id: string,
        correspondent_account: string,
        created_at: string,
        deleted_at: string,
        id: string,
        inn: string,
        kpp: string,
        owner_name: string,
        updated_at: string
      },
      date_director_set: string,
      date_issue_ogrn: string,
      director: {
        authority: string,
        created_at: string,
        date_of_birth: string,
        date_of_issue: string,
        fio: string,
        id: string,
        is_approved: boolean,
        number: string,
        place_of_register: string,
        place_of_residence: string,
        serial: string,
        snils: string,
        subdivision_code: string,
        updated_at: string,
        user_id: string
      },
      director_passport_id: string,
      document_director_approved_file: {
        id: string,
        original_name: string,
        size: number,
        url: string,
        user_id: string
      },
      document_registry_file: {
        id: string,
        original_name: string,
        size: number,
        url: string,
        user_id: string
      },
      document_rule_file: {
        id: string,
        original_name: string,
        size: number,
        url: string,
        user_id: string
      },
      emails: [
        string
      ],
      founders: [
        {
          company_id: string,
          id: string,
          name: string,
          passport_number: string,
          passport_page_photo_file: {
            id: string,
            original_name: string,
            size: number,
            url: string,
            user_id: string
          },
          passport_page_registration_file: {
            id: string,
            original_name: string,
            size: number,
            url: string,
            user_id: string
          },
          passport_serial: string,
          percent: number
        }
      ],
      id: string,
      inn: string,
      name: string,
      ogrn: string,
      okved: [
        {
          cod: string,
          name: string
        }
      ],
      phones: [
        string
      ],
      place: string,
      postal_address: string,
      status: string,
      user_id: string
    },
    collection_start_at: string,
    created_at: string,
    description: string,
    documents: [
      {
        id: string,
        original_name: string,
        size: number,
        url: string,
        user_id: string
      }
    ],
    founders: [
      {
        company_id: string,
        id: string,
        name: string,
        passport_number: string,
        passport_page_photo_file: {
          id: string,
          original_name: string,
          size: number,
          url: string,
          user_id: string
        },
        passport_page_registration_file: {
          id: string,
          original_name: string,
          size: number,
          url: string,
          user_id: string
        },
        passport_serial: string,
        percent: number
      }
    ],
    id: string,
    investors: [
      {
        accrued_amount: number,
        amount: number,
        name: string,
        paid_amount: number
      }
    ],
    is_buy_rights: boolean,
    is_send_to_investors: boolean,
    min_amount: number,
    min_investment_size: number,
    num: number,
    publish_before_at: string,
    rate: number,
    received_amount: number,
    repayment_limit_month: number,
    repayment_schedule: string,
    repayment_type: string,
    status: string,
    target: string,
    term_limit: number,
    updated_at: string,
    user_id: string,
    project: Project.InvestorProject
  }
}
