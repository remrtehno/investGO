import {atom} from "recoil";
import {RequestError, RequestStatus} from "../types/common";
import {User} from "../types/User";

export type UserAtom = {
  user: User | null,
  status: RequestStatus,
  error: RequestError | null,
}

export const userAtom = atom<UserAtom>({
  key: 'userAtom',
  default: {
    user: null,
    status: RequestStatus.initial,
    error: null,
  },
})

