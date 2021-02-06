import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {Role} from 'src/contstants/Role';
import {userAtom} from 'src/recoil/userAtom';
import {ModerationStatus} from 'src/contstants/ModerationStatus';

export function useClaims() {
  const {user} = useRecoilValue(userAtom);

  return useMemo(() => ({
    ipForm: {
      read: () => Boolean(user && user.roles.includes(Role.ip)),
    },
    urForm: {
      read: () => Boolean(user && user.roles.includes(Role.ur)),
    },
    bankDetailsForm: {
      read: () => Boolean(
        user?.company &&
        user?.company?.status !== ModerationStatus.filled  &&
        user?.company?.status !== ModerationStatus.waiting  &&
        user?.roles.includes(Role.borrower)),
    },
  }), [user]);
}
