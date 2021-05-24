import {atom} from 'recoil';

import type {RequestError} from 'src/types/common';
import {RequestStatus} from 'src/types/common';
import type {Project} from 'src/types/Project';

export type projectAtom = {
  project: Project.Project | null,
  status: RequestStatus,
  error: RequestError | null,
}

export const projectAtom = atom<projectAtom>({
  key: 'projectAtom',
  default: {
    project: null,
    status: RequestStatus.initial,
    error: null,
  },
});
