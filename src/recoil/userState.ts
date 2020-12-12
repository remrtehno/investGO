import {atom} from "recoil";
import {RequestError, RequestStatus} from "../types/common";
import {User} from "../types/User";

export type UserResult = {
  user: User | null,
  status: RequestStatus,
  error: RequestError | null,
}

export const userState = atom<UserResult>({
  key: 'user',
  default: {
    user: null,
    status: RequestStatus.initial,
    error: null,
  },
})

