import {FilePrimitive} from "./FilePrimitive";

export declare namespace User {
  export type Role = 'user' | 'admin' | 'individual';

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
  }
}

export type User = {
  id: string,
  login: string,
  roles: User.Role[],
  passport: User.Passport | null,
  email: string,
}
