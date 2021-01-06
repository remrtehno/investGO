import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import {userAtom} from 'src/recoil/userAtom';

export function useClaims() {
  const {user} = useRecoilValue(userAtom);

  return useMemo(() => ({
    individualEntrepreneurForm: {
      read: () => false || Boolean(user && user.roles.includes('individual')),
    },
    requisitionsForm: {
      read: () => false || Boolean(user && user.roles.includes('individual')),
    },
  }), [user]);
}
