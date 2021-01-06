import {atom} from 'recoil';

import type {RequestError} from 'src/types/common';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

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
});

