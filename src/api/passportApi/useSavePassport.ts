import {useRecoilState} from 'recoil';
import {api} from '../../contstants/api';
import useApi from '../../hooks/useApi';
import useApiRequest from '../../hooks/useApiRequest';
import {userAtom} from '../../recoil/userAtom';
import {RequestStatus} from '../../types/common';
import {User} from '../../types/User';

export declare namespace useSavePassport {
  export type Payload = User.Passport;
}

export function useSavePassport() {
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
