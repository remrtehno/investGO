
import {atom} from 'recoil';

import type {RequestError} from 'src/types/common';
import {RequestStatus} from 'src/types/common';

export type documentsAtom = {
  documents: [],
  status: RequestStatus,
  error: RequestError | null,
}

export const documentsAtom = atom<documentsAtom>({
  key: 'documentsAtom',
  default: {
    documents: [],
    status: RequestStatus.initial,
    error: null,
  },
});

