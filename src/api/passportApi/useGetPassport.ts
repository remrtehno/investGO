import {useRecoilState} from 'recoil';
import {api} from '../../contstants/api';
import useApi from '../../hooks/useApi';
import useApiRequest from '../../hooks/useApiRequest';
import {userAtom} from '../../recoil/userAtom';
import {RequestStatus} from '../../types/common';
import {User} from '../../types/User';

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
