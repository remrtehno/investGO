import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import type {Role} from 'src/contstants/Role';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSignInApi {
  export type Payload = {
    mainRole: Role,
    roles: Role[],
  }
}

export const useSelectRolesApi = () => {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);
  const userRef = useLatestRef(user);

  return useApi<useSignInApi.Payload, null>(async(payload) => {
    const newUser = await request<User>(api.user.selectRoles(), {
      method: 'PUT',
      body: JSON.stringify({
        role: payload.mainRole,
        type: payload.roles,
      }),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    if (!userRef.current) {
      return null;
    }

    setUser({
      user: {
        ...newUser,
        passport: userRef.current.passport,
        company: userRef.current.company,
      },
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

