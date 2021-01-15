import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSavePassport {
  export type Payload = User.Passport;
}

export function useSavePassportApi() {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);

  return useApi<useSavePassport.Payload, null>(async(payload) => {
    if (!user) {
      return null;
    }

    const passport = await request<User.Passport | null>(api.passport.save(), {
      method: user.passport ? 'PUT' : 'POST',
      body: payload,
    });

    setUser({
      user: {
        ...user,
        passport: passport || null,
      },
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
}
