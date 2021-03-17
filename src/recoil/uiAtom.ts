
import {atom} from 'recoil';

export type uiAtom = {
  profileStep: ProfileSteps
}

export enum ProfileSteps {
  profile = 'profile',
  rules = 'rules',
  account = 'account',
  access = 'access'
}

export const uiAtom = atom<uiAtom>({
  key: 'uiAtom',
  default: {
    profileStep: ProfileSteps.profile,
  },
});

