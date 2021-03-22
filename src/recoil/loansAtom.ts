import {atom} from 'recoil';

import type {Borrower} from 'src/types/Borrower';
import type {RequestError} from 'src/types/common';
import {RequestStatus} from 'src/types/common';

export type loansAtom = {
  loans: Borrower.Loans | null,
  status: RequestStatus,
  error: RequestError | null,
}

export const loansAtom = atom<loansAtom>({
  key: 'loansAtom',
  default: {
    loans: null,
    status: RequestStatus.initial,
    error: null,
  },
});
