import {atom} from 'recoil';

export const isPageInitAtom = atom<boolean>({
  key: 'isPageInitAtom',
  default: false,
});
