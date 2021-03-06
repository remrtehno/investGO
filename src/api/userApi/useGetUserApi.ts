import _ from 'lodash';
import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export async function getUserApi(request: useApiRequest.Request): Promise<User | null> {
  const user = await request(api.user.get(), {
    method: 'GET',
  });

  let company: User.Company | null = null;
  let passport: User.Passport | null = null;

  try {
    company = await request(api.company.save(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });
  } catch (e) {}

  try {
    passport = await request(api.passport.get(), {
      method: 'GET',
    });
  } catch (e) {}

  return user ? {
    ...user,
    passport,
    company,
    isCompanyLoaded: false,
  } : null;
}

export const useGetUserApi = () => {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);

  const [, getUser] = useApi<void, null>(async() => {
    try {
      const newUser = await getUserApi(request);
      setUser({
        user: newUser,
        status: RequestStatus.success,
        error: null,
      });
    } catch (err) {
      const error = _.get(err, '0', null);
      if (error && error.message === 'forbidden') {
        setUser({
          user,
          status: RequestStatus.failed,
          error: {code: 'accessDenied', data: {message: 'Пользователь не авторизован'}},
        });
      } else {
        setUser({
          user,
          status: RequestStatus.failed,
          error: {code: 'internalError', data: {message: 'Что-то пошло не так'}},
        });
      }
    }

    return null;
  }, null);

  return getUser;
};

