import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {Role} from 'src/contstants/Role';
import {userAtom} from 'src/recoil/userAtom';

export function useClaims() {
  const {user} = useRecoilValue(userAtom);

  return useMemo(() => ({
    individualEntrepreneurForm: {
      read: () => Boolean(user && user.roles.includes(Role.ip)),
    },
    requisitionsForm: {
      read: () => Boolean(user && user.roles.includes(Role.borrower)),
    },
  }), [user]);
}
