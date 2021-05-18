import {atom} from 'recoil';

import type {RequestError} from 'src/types/common';
import {RequestStatus} from 'src/types/common';
import type {Investor} from 'src/types/Investor';

export type investorPortfolioAtom = {
  portfolio: Investor.Portfolio | null,
  status: RequestStatus,
  error: RequestError | null,
}

export const investorPortfolioAtom = atom<investorPortfolioAtom>({
  key: 'investorPortfolioAtom',
  default: {
    portfolio: null,
    status: RequestStatus.initial,
    error: null,
  },
});
