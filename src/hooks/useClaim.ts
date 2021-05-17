import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {ModerationStatus} from 'src/contstants/ModerationStatus';
import {Role} from 'src/contstants/Role';
import {userAtom} from 'src/recoil/userAtom';

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
      read: () => {
        return Boolean(
          user?.company
          && user?.company?.status !== ModerationStatus.filled
          && user?.company?.status !== ModerationStatus.waiting
          && user?.roles.includes(Role.borrower)
        );
      },
    },
    signDocuments: {
      read: () => {
        if (user && user.roles.includes(Role.fl)) {
          return Boolean(
            true
          );
        }

        if (user && user.company && user.company.status === ModerationStatus.approved) {
          return true;
        }

        return false;
      },
    },
  }), [user]);
}
