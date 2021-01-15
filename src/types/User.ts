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
  }

  export type BankDetails = {
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
    ogrn: string,
    date_issue_ogrn: string,
    document_registry_file: FilePrimitive,
    bank_details: User.BankDetails | null,
  };
}

export type User = {
  id: string,
  login: string,
  roles: Role[],
  passport: User.Passport | null,
  company: User.Company | null,
  email: string,
  phone: string,
  is_approved_passport: boolean,
  is_selected_role: boolean,
  isCompanyLoaded: boolean,
}
