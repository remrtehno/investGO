import type {ModerationStatus} from 'src/contstants/ModerationStatus';
import type {Role} from 'src/contstants/Role';

import type {FilePrimitive} from './FilePrimitive';

export declare namespace User {
  export type Passport = {
    authority: string,
    date_of_birth: string,
    date_of_issue: string,
    fio: string,
    inn: string,
    number: string,
    personal_data_documents: FilePrimitive[],
    place_of_register: string,
    place_of_residence: string,
    serial: string,
    snils: string,
    subdivision_code: string,
    status: ModerationStatus,
    phone_confirmed: boolean,
  }

  export type BankDetails = {
    id: string | null,
    account: string,
    bank_name: string,
    bic: string,
    company_id: string,
    correspondent_account: string,
    inn: string,
    kpp: string,
    owner_name: string
  }

  export type Company = {
    id: string | null,
    inn: string,
    ogrn: string,
    date_issue_ogrn: string,
    document_registry_file: FilePrimitive,
    bank_details: User.BankDetails | null,
    emails: string[],
    phones: string[],
    status: ModerationStatus,
    name: string,
  };

  export type SignDocuments = {
    company: Company,
    created_at: string,
    file: {
      id: string,
      user_id: string,
      url: string,
      original_name: string,
      size: 0
    }
    num: number
    status: string,
    type: string,
    updated_at: string,
    uuid: string,
  }
}

export type User = {
  id: string,
  login: string,
  roles: Role[],
  passport: User.Passport | null,
  company: User.Company | null,
  email: string[],
  phone: string,
  is_selected_role: boolean,
  isCompanyLoaded: boolean,
  sign_document: string[]
}
