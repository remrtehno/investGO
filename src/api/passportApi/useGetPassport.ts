import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export function useGetPassport() {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);

  return useApi<void, null>(async() => {
    if (!user) {
      return null;
    }

    const passport = await request<User.Passport | null>(api.passport.get(), {
      method: 'GET',
    });

    setUser({
      user: {
        ...user,
        passport,
      },
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
}
